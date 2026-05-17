import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { patientId, patientName, date, timeSlot, location, locationAddr, note } = body

    if (!patientId || !date || !timeSlot || !location) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc.' }, { status: 400 })
    }

    const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL
    if (!APPS_SCRIPT_URL) {
      return NextResponse.json({ error: 'Server chưa cấu hình.' }, { status: 500 })
    }

    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientId, patientName, date, timeSlot, location, locationAddr, note }),
      redirect: 'follow',
    })

    const data = await res.json().catch(() => ({ success: true }))
    if (data.success === false) {
      return NextResponse.json({ error: data.error || 'Lỗi ghi Sheet.' }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Booking error:', err)
    return NextResponse.json({ error: err.message || 'Lỗi không xác định.' }, { status: 500 })
  }
}
