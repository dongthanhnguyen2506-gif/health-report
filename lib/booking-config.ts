// ── CẤU HÌNH LỊCH ĐẶT TƯ VẤN ──────────────────────────────────────────────
// Chỉnh file này để thay đổi ngày và giờ cho phép đặt lịch

export const BOOKING_CONFIG = {
  // Số ngày tối thiểu kể từ hôm nay (0 = có thể đặt ngay hôm nay)
  minDaysFromToday: 1,

  // Số ngày tối đa có thể đặt trước (30 = đặt trong vòng 30 ngày tới)
  maxDaysFromToday: 30,

  // Các ngày trong tuần KHÔNG nhận lịch (0=CN, 1=T2, ..., 6=T7)
  // Ví dụ: [0] = không nhận CN, [0, 6] = không nhận T7 và CN
  blockedWeekdays: [0] as number[], // Chỉ chặn Chủ nhật

  // Khung giờ cho phép đặt
  timeSlots: [
    '08:00 – 09:00',
    '09:00 – 10:00',
    '10:00 – 11:00',
    '13:30 – 14:30',
    '14:30 – 15:30',
    '15:30 – 17:00',
  ],
}

// ── HELPERS ──────────────────────────────────────────────────────────────────
export function getMinDate(): string {
  const d = new Date()
  d.setDate(d.getDate() + BOOKING_CONFIG.minDaysFromToday)
  return d.toISOString().split('T')[0]
}

export function getMaxDate(): string {
  const d = new Date()
  d.setDate(d.getDate() + BOOKING_CONFIG.maxDaysFromToday)
  return d.toISOString().split('T')[0]
}

export function isDateAllowed(dateStr: string): boolean {
  if (!dateStr) return false
  const d = new Date(dateStr)
  const day = d.getDay()
  return !BOOKING_CONFIG.blockedWeekdays.includes(day)
}
