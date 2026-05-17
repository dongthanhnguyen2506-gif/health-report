'use client'
import { useState } from 'react'
import { BOOKING_CONFIG, getMinDate, getMaxDate, isDateAllowed } from '@/lib/booking-config'

type Props = {
  patientId?: string
  patientName?: string
  open: boolean
  onClose: () => void
}

const LOCATIONS = [
  { group: 'Ever Việt Nam', items: [
    { label: 'Tư vấn tại Ever Việt Nam', address: '155 Trần Huy Liệu, Phường 8, Quận Phú Nhuận, TP. HCM' },
  ]},
  { group: 'Chi nhánh SHB', items: [
    { label: 'CN Phú Nhuận', address: 'Số 127 Trần Huy Liệu, Phường 12, Quận Phú Nhuận' },
    { label: 'PGD Gò Vấp', address: 'Số 277 Quang Trung, Phường 10, Quận Gò Vấp' },
    { label: 'CN Sài Gòn', address: 'Lô H3, số 384 Hoàng Diệu, Phường 6, Quận 4' },
    { label: 'PGD Bình Thạnh', address: 'Số 181 Xô Viết Nghệ Tĩnh, Phường 17, Quận Bình Thạnh' },
    { label: 'PGD Tân Bình', address: 'Số 852 Trường Chinh, Phường 15, Quận Tân Bình' },
    { label: 'PGD Chợ Lớn', address: 'Số 18 Châu Văn Liêm, Phường 10, Quận 5' },
    { label: 'PGD CMT8', address: 'Số 457 Lê Văn Sỹ, Phường 12, Quận 3' },
    { label: 'PGD Trường Chinh', address: 'Số 852 Trường Chinh, Phường 15, Quận Tân Bình' },
    { label: 'PGD Nguyễn Thị Định', address: 'Số 204B-204C Nguyễn Thị Định, Phường An Phú' },
    { label: 'PGD Nguyễn Thị Thập', address: 'Số 378 Nguyễn Thị Thập, Phường Tân Quy, Quận 7' },
    { label: 'PGD Quận 11', address: 'Số 517-519 Đường Minh Phụng, Phường 10, Quận 11' },
    { label: 'CN Hồ Chí Minh', address: '24 Trương Định, Phường Xuân Hòa, Quận 1' },
    { label: 'PGD Thủ Đức', address: 'Số 185-187 Võ Văn Ngân, Phường Thủ Đức' },
    { label: 'PGD Bình Điền', address: 'TTTM Bình Điền, Đại lộ Nguyễn Văn Linh, Khu phố 6, Phường 7, Quận 8' },
    { label: 'PGD Phan Văn Trị', address: 'Số 749 Phan Văn Trị, Phường 7, Quận Gò Vấp' },
    { label: 'PGD Cộng Hòa', address: 'Số 402 và 406/2 Đường Cộng Hòa, Phường 13, Quận Tân Bình' },
    { label: 'PGD Nguyễn Văn Linh', address: 'Số 25 (D1-11) Đường Nguyễn Văn Linh, Phường Tân Phong, Quận 7' },
    { label: 'PGD Nguyễn Thiện Thuật', address: 'Số 123-125 Nguyễn Thiện Thuật, Phường 2, Quận 3' },
  ]},
  { group: 'Hình thức khác', items: [
    { label: 'Tư vấn Online (Zalo / Zoom)', address: '' },
  ]},
]

export default function ConsultationBookingModal({ patientId, patientName, open, onClose }: Props) {
  const [date, setDate]           = useState('')
  const [timeSlot, setTimeSlot]   = useState('')
  const [location, setLocation]   = useState('')
  const [locationAddr, setLocationAddr] = useState('')
  const [note, setNote]           = useState('')
  const [error, setError]         = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)

  if (!open) return null

  const handleLocationSelect = (label: string, addr: string) => {
    setLocation(label); setLocationAddr(addr); setError('')
  }

  const handleDateChange = (val: string) => {
    setDate(val)
    if (val && !isDateAllowed(val)) setError('Ngày này không nhận lịch. Vui lòng chọn ngày khác.')
    else setError('')
  }

  const handleSubmit = async () => {
    if (!location)               { setError('Vui lòng chọn địa điểm tư vấn.'); return }
    if (!date)                   { setError('Vui lòng chọn ngày mong muốn.'); return }
    if (!isDateAllowed(date))    { setError('Ngày này không nhận lịch. Vui lòng chọn ngày khác.'); return }
    if (!timeSlot)               { setError('Vui lòng chọn khung giờ mong muốn.'); return }
    setError(''); setLoading(true)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId, patientName, date, timeSlot, location, locationAddr, note }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Lỗi không xác định.')
      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra. Vui lòng thử lại.')
    } finally { setLoading(false) }
  }

  const handleClose = () => {
    setDate(''); setTimeSlot(''); setLocation(''); setLocationAddr('')
    setNote(''); setError(''); setSubmitted(false); setLoading(false)
    onClose()
  }

  return (
    <div onClick={e => { if (e.target === e.currentTarget) handleClose() }}
      style={{ position:'fixed', inset:0, zIndex:9000, background:'rgba(10,20,40,0.65)', backdropFilter:'blur(6px)', display:'flex', alignItems:'flex-end', justifyContent:'center' }}>
      <div style={{ background:'white', borderRadius:'24px 24px 0 0', width:'100%', maxWidth:560, maxHeight:'94dvh', overflowY:'auto', boxShadow:'0 -8px 48px rgba(10,20,40,0.22)', animation:'slideUp 0.26s cubic-bezier(0.34,1.1,0.64,1)' }}>
        <style>{`@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>

        {/* Drag handle */}
        <div style={{ display:'flex', justifyContent:'center', padding:'14px 0 0' }}>
          <div style={{ width:40, height:4, borderRadius:2, background:'#e5e7eb' }} />
        </div>

        {/* Header */}
        <div style={{ padding:'16px 24px 14px', display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
          <div>
            <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--gold)', marginBottom:4 }}>Tư vấn chuyên sâu</p>
            <h2 style={{ fontFamily:'var(--ff-serif)', fontSize:24, fontWeight:600, color:'var(--navy)', lineHeight:1.25 }}>
              {submitted ? 'Đã ghi nhận yêu cầu ✓' : 'Chọn thời gian & địa điểm'}
            </h2>
          </div>
          <button onClick={handleClose} style={{ background:'#f3f4f6', border:'none', borderRadius:'50%', width:38, height:38, display:'flex', alignItems:'center', justifyContent:'center', color:'#6b7280', fontSize:20, cursor:'pointer', flexShrink:0, marginTop:2 }}>×</button>
        </div>
        <div style={{ height:1, background:'#f3f4f6', marginBottom:4 }} />

        <div style={{ padding:'18px 24px 36px' }}>
          {submitted ? (
            /* SUCCESS */
            <div style={{ textAlign:'center' }}>
              <div style={{ width:72, height:72, borderRadius:'50%', background:'var(--teal-l)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', fontSize:32 }}>✓</div>
              <h3 style={{ fontFamily:'var(--ff-serif)', fontSize:22, fontWeight:600, color:'var(--navy)', marginBottom:10 }}>Chúng tôi đã ghi nhận thông tin</h3>
              <p style={{ fontSize:15, lineHeight:1.7, color:'var(--gray-600)', marginBottom:8 }}>Chúng tôi sẽ liên hệ Quý khách trong thời gian sớm nhất.</p>
              <p style={{ fontSize:14, lineHeight:1.65, color:'var(--gray-400)', marginBottom:28 }}>Đội ngũ tư vấn sẽ xác nhận lịch hẹn dựa trên thông tin Quý khách đã chọn.</p>
              <div style={{ background:'#f9fafb', borderRadius:14, padding:'16px 18px', marginBottom:24, textAlign:'left', border:'1px solid #e5e7eb' }}>
                <p style={{ fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.10em', color:'#9ca3af', marginBottom:12 }}>Chi tiết đã gửi</p>
                {[
                  ['👤 Khách hàng', patientName],
                  ['📍 Địa điểm', location + (locationAddr ? ` — ${locationAddr}` : '')],
                  ['📅 Ngày', date],
                  ['🕐 Khung giờ', timeSlot],
                  note && ['📝 Ghi chú', note],
                ].filter(Boolean).map(([k,v]) => (
                  <div key={String(k)} style={{ display:'flex', gap:8, marginBottom:7 }}>
                    <span style={{ fontSize:14, color:'var(--navy)', fontWeight:500, minWidth:120 }}>{k}</span>
                    <span style={{ fontSize:14, color:'var(--gray-600)' }}>{v}</span>
                  </div>
                ))}
              </div>
              <button onClick={handleClose} style={{ width:'100%', padding:'16px', borderRadius:99, background:'var(--navy)', color:'white', fontSize:16, fontWeight:600, border:'none', cursor:'pointer' }}>Đóng</button>
            </div>
          ) : (
            <>
              {/* Patient chip */}
              {patientName && (
                <div style={{ background:'var(--navy-light)', borderRadius:12, padding:'12px 16px', marginBottom:22, fontSize:15, color:'var(--navy-mid)', display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ fontSize:18 }}>👤</span>
                  <span>Đặt lịch cho: <strong style={{ color:'var(--navy)' }}>{patientName}</strong></span>
                </div>
              )}

              {/* LOCATION */}
              <div style={{ marginBottom:22 }}>
                <label style={{ display:'block', fontSize:13, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.10em', color:'var(--gray-600)', marginBottom:10 }}>
                  Địa điểm tư vấn <span style={{ color:'var(--red)' }}>*</span>
                </label>
                {LOCATIONS.map(group => (
                  <div key={group.group} style={{ marginBottom:14 }}>
                    <p style={{ fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--gold)', marginBottom:8, paddingLeft:2 }}>{group.group}</p>
                    <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                      {group.items.map(loc => {
                        const active = location === loc.label
                        return (
                          <button key={loc.label} onClick={() => handleLocationSelect(loc.label, loc.address)}
                            style={{ padding:'14px 16px', borderRadius:12, border:`2px solid ${active ? 'var(--navy)' : '#e5e7eb'}`, background:active ? 'var(--navy)' : 'white', cursor:'pointer', textAlign:'left', transition:'all 0.15s', touchAction:'manipulation' }}>
                            <p style={{ fontSize:15, fontWeight:600, color:active ? 'white' : 'var(--navy)', marginBottom: loc.address ? 3 : 0 }}>{loc.label}</p>
                            {loc.address && <p style={{ fontSize:13, color:active ? 'rgba(255,255,255,0.7)' : 'var(--gray-500)', lineHeight:1.4 }}>{loc.address}</p>}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* DATE */}
              <div style={{ marginBottom:20 }}>
                <label style={{ display:'block', fontSize:13, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.10em', color:'var(--gray-600)', marginBottom:10 }}>
                  Ngày mong muốn <span style={{ color:'var(--red)' }}>*</span>
                </label>
                <input type="date" min={getMinDate()} max={getMaxDate()} value={date}
                  onChange={e => handleDateChange(e.target.value)}
                  style={{ width:'100%', padding:'15px 16px', borderRadius:12, border:`2px solid ${error && !date ? 'var(--red)' : '#e5e7eb'}`, fontSize:16, color:'var(--black)', background:'#f9fafb', outline:'none', WebkitAppearance:'none' }} />
                <p style={{ fontSize:12, color:'var(--gray-400)', marginTop:6 }}>
                  Đặt lịch trong vòng {BOOKING_CONFIG.maxDaysFromToday} ngày tới · Không nhận lịch: Chủ nhật
                </p>
              </div>

              {/* TIME SLOTS */}
              <div style={{ marginBottom:20 }}>
                <label style={{ display:'block', fontSize:13, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.10em', color:'var(--gray-600)', marginBottom:10 }}>
                  Khung giờ <span style={{ color:'var(--red)' }}>*</span>
                </label>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  {BOOKING_CONFIG.timeSlots.map(slot => (
                    <button key={slot} onClick={() => { setTimeSlot(slot); setError('') }}
                      style={{ padding:'14px 12px', borderRadius:12, border:`2px solid ${timeSlot===slot ? 'var(--navy)' : '#e5e7eb'}`, background:timeSlot===slot ? 'var(--navy)' : 'white', color:timeSlot===slot ? 'white' : 'var(--gray-700)', fontSize:15, fontWeight:timeSlot===slot?700:400, cursor:'pointer', transition:'all 0.15s', textAlign:'center', touchAction:'manipulation', minHeight:52 }}>
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* NOTE */}
              <div style={{ marginBottom: error ? 14 : 22 }}>
                <label style={{ display:'block', fontSize:13, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.10em', color:'var(--gray-600)', marginBottom:10 }}>
                  Ghi chú <span style={{ fontSize:12, color:'var(--gray-400)', fontWeight:400, textTransform:'none' }}>(nếu có)</span>
                </label>
                <textarea placeholder="Ví dụ: muốn hỏi thêm về chỉ số GGT và Acid Uric..." value={note}
                  onChange={e => setNote(e.target.value)} rows={3}
                  style={{ width:'100%', padding:'14px 16px', borderRadius:12, border:'2px solid #e5e7eb', fontSize:15, color:'var(--black)', background:'#f9fafb', resize:'none', outline:'none', lineHeight:1.6 }} />
              </div>

              {error && (
                <div style={{ padding:'13px 16px', borderRadius:12, background:'var(--red-l)', color:'var(--red)', fontSize:14, marginBottom:18, display:'flex', gap:8 }}>
                  <span>⚠</span><span>{error}</span>
                </div>
              )}

              <div style={{ display:'flex', gap:12 }}>
                <button onClick={handleClose} style={{ flex:1, padding:'16px', borderRadius:99, background:'#f3f4f6', color:'#4b5563', fontSize:15, fontWeight:600, border:'none', cursor:'pointer', touchAction:'manipulation' }}>Hủy</button>
                <button onClick={handleSubmit} disabled={loading}
                  style={{ flex:2, padding:'16px', borderRadius:99, background:loading?'#d1d5db':'var(--navy)', color:'white', fontSize:16, fontWeight:700, border:'none', cursor:loading?'not-allowed':'pointer', boxShadow:loading?'none':'0 8px 24px rgba(15,30,53,0.22)', transition:'all 0.15s', touchAction:'manipulation' }}>
                  {loading ? '⏳ Đang gửi...' : 'Gửi yêu cầu đặt lịch'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
