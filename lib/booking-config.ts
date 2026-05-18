// ── CẤU HÌNH LỊCH ĐẶT TƯ VẤN ──────────────────────────────────────────────
// Chỉnh file này để thay đổi ngày và giờ cho phép đặt lịch

export const BOOKING_CONFIG = {
  // Chỉ cho phép khách hàng đặt lịch trong các ngày này
  allowedDates: [
    '2026-05-19',
    '2026-05-20',
    '2026-05-21',
    '2026-05-22',
  ],

  // Ngày nhỏ nhất / lớn nhất để hiển thị trên ô chọn ngày
  minDate: '2026-05-19',
  maxDate: '2026-05-22',

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
  return BOOKING_CONFIG.minDate
}

export function getMaxDate(): string {
  return BOOKING_CONFIG.maxDate
}

export function isDateAllowed(dateStr: string): boolean {
  if (!dateStr) return false
  return BOOKING_CONFIG.allowedDates.includes(dateStr)
}

export function getAllowedDatesText(): string {
  return 'Chỉ nhận lịch tư vấn trong các ngày 19–22/05/2026'
}