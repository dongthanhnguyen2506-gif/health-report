import type { Metric } from "./types";

type SafeStatus = "normal" | "high" | "low" | "attention" | "nodata";

function parseNumber(value: unknown): number | null {
  if (value === null || value === undefined) return null;

  const raw = String(value)
    .trim()
    .replace(",", ".")
    .replace(/[^\d.-]/g, "");

  if (!raw) return null;

  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

function normalizeText(value: unknown): string {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export function deriveStatusFromRef(metric: Metric): SafeStatus {
  const value = parseNumber((metric as any).value);
  const ref = String((metric as any).ref || "").trim();

  if (value === null || !ref) {
    return ((metric as any).status || "nodata") as SafeStatus;
  }

  // Dạng: 4.0-6.5 hoặc 4.0 – 6.5
  const rangeMatch = ref.match(/([\d.,]+)\s*[-–]\s*([\d.,]+)/);

  if (rangeMatch) {
    const low = parseNumber(rangeMatch[1]);
    const high = parseNumber(rangeMatch[2]);

    if (low !== null && high !== null) {
      if (value < low) return "low";
      if (value > high) return "high";
      return "normal";
    }
  }

  // Dạng: <5.7 hoặc <=5.7 hoặc ≤5.7
  const lessMatch = ref.match(/^(<|<=|≤)\s*([\d.,]+)/);

  if (lessMatch) {
    const high = parseNumber(lessMatch[2]);

    if (high !== null) {
      return value <= high ? "normal" : "high";
    }
  }

  // Dạng: >10 hoặc >=10 hoặc ≥10
  const moreMatch = ref.match(/^(>|>=|≥)\s*([\d.,]+)/);

  if (moreMatch) {
    const low = parseNumber(moreMatch[2]);

    if (low !== null) {
      return value >= low ? "normal" : "low";
    }
  }

  return ((metric as any).status || "nodata") as SafeStatus;
}

export function getSafeMetric(metric: Metric): Metric {
  const safeStatus = deriveStatusFromRef(metric);
  const name = normalizeText((metric as any).name);

  // Nếu value nằm trong khoảng tham chiếu, ép về normal và thay diễn giải an toàn
  if (safeStatus === "normal") {
    const isHbA1c =
      name === "hba1c" ||
      name.includes("hba1c") ||
      name.includes("hb a1c") ||
      name.includes("hemoglobin a1c");

    return {
      ...(metric as any),
      status: "normal",
      explain: isHbA1c
        ? "HbA1c hiện nằm trong giới hạn tham chiếu. Chỉ số này phản ánh mức đường huyết trung bình trong khoảng 2–3 tháng gần đây."
        : "Chỉ số hiện nằm trong giới hạn tham chiếu.",
      relate: "Chưa ghi nhận bất thường dựa trên khoảng tham chiếu của phiếu xét nghiệm.",
      suggest: "Tiếp tục duy trì lối sống lành mạnh và theo dõi định kỳ theo khuyến nghị.",
    } as Metric;
  }

  // Nếu không bình thường thì giữ nguyên diễn giải cũ, chỉ sửa status theo value/ref
  return {
    ...(metric as any),
    status: safeStatus,
  } as Metric;
}