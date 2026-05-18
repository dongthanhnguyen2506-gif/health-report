// ── CẤU HÌNH LỊCH ĐẶT TƯ VẤN ──────────────────────────────────────────────
// Chỉnh file này để thay đổi ngày và giờ cho phép đặt lịch

export const BOOKING_CONFIG = {
  // Chỉ nhận lịch các ngày Thứ 3 - Thứ 6
  // JS: 0=CN, 1=T2, 2=T3, 3=T4, 4=T5, 5=T6, 6=T7
  allowedWeekdays: [2, 3, 4, 5],

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

function toDateInputValue(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseDateInput(dateStr: string): Date | null {
  if (!dateStr) return null

  const [year, month, day] = dateStr.split('-').map(Number)
  if (!year || !month || !day) return null

  return new Date(year, month - 1, day)
}

function getToday(): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

function getEndOfCurrentMonth(): Date {
  const today = getToday()
  return new Date(today.getFullYear(), today.getMonth() + 1, 0)
}

export function getMinDate(): string {
  return toDateInputValue(getToday())
}

export function getMaxDate(): string {
  return toDateInputValue(getEndOfCurrentMonth())
}

export function isDateAllowed(dateStr: string): boolean {
  const selectedDate = parseDateInput(dateStr)
  if (!selectedDate) return false

  selectedDate.setHours(0, 0, 0, 0)

  const today = getToday()
  const endOfMonth = getEndOfCurrentMonth()
  const weekday = selectedDate.getDay()

  const isWithinRange = selectedDate >= today && selectedDate <= endOfMonth
  const isAllowedWeekday = BOOKING_CONFIG.allowedWeekdays.includes(weekday)

  return isWithinRange && isAllowedWeekday
}

export function getAllowedDateOptions() {
  const today = getToday()
  const endOfMonth = getEndOfCurrentMonth()

  const dates: { value: string; label: string; subLabel: string }[] = []
  const cursor = new Date(today)

  while (cursor <= endOfMonth) {
    const weekday = cursor.getDay()

    if (BOOKING_CONFIG.allowedWeekdays.includes(weekday)) {
      const value = toDateInputValue(cursor)

      const weekdayLabel = new Intl.DateTimeFormat('vi-VN', {
        weekday: 'long',
      }).format(cursor)

      const dateLabel = new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
      }).format(cursor)

      dates.push({
        value,
        label: dateLabel,
        subLabel: weekdayLabel,
      })
    }

    cursor.setDate(cursor.getDate() + 1)
  }

  return dates
}

export function getAllowedDatesText(): string {
  return 'Chỉ nhận lịch tư vấn từ hôm nay đến cuối tháng, trong các ngày Thứ 3 – Thứ 6.'
}