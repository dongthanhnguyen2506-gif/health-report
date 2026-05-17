'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { patients } from '@/lib/patients'

export default function HomePage() {
  const [q, setQ] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all'|'attention'|'normal'>('all')

  const filtered = useMemo(() => {
    let list = patients
    if (q.trim()) {
      const lq = q.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(lq) || p.id.includes(lq))
    }
    if (filterStatus === 'attention') list = list.filter(p => p.n_attention > 0)
    if (filterStatus === 'normal')    list = list.filter(p => p.n_attention === 0)
    return list
  }, [q, filterStatus])

  const totalAttention = patients.filter(p => p.n_attention > 0).length
  const totalNormal    = patients.filter(p => p.n_attention === 0).length

  return (
    <div style={{ minHeight: '100vh', background: 'var(--page-bg)' }}>

      {/* ── NAV ── */}
      <div style={{ background: 'var(--navy)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{
          maxWidth: 1120, margin: '0 auto', padding: '0 1rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 56,
        }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {[
              { src: '/logo-ever.png', alt: 'Ever Việt Nam', w: 70 },
              { src: '/logo-shb.png',  alt: 'SHB',           w: 52 },
            ].map(lg => (
              <div key={lg.alt} style={{
                background: 'white', borderRadius: 9, height: 38, minWidth: 80,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '4px 10px', boxShadow: '0 3px 10px rgba(0,0,0,0.18)',
              }}>
                <Image src={lg.src} alt={lg.alt} width={lg.w} height={20} style={{ objectFit: 'contain' }} />
              </div>
            ))}
          </div>
          <span style={{ color: 'var(--gold-m)', fontWeight: 600, fontSize: 11 }}>
            Ever Việt Nam · 09/05/2026
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '1.5rem 1rem 3rem' }}>

        {/* ── HERO ── */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>
            Báo cáo y tế cá nhân
          </p>
          <h1 style={{ fontFamily: 'var(--ff-serif)', fontSize: 'clamp(24px,5vw,36px)', fontWeight: 700, color: 'var(--navy)', marginBottom: 8, lineHeight: 1.2 }}>
            Diễn Giải Kết Quả Xét Nghiệm
          </h1>
          <p style={{ fontSize: 'clamp(12px,3vw,14px)', color: 'var(--gray-500)', maxWidth: 420, margin: '0 auto 6px', lineHeight: 1.65 }}>
            Hỗ trợ đọc hiểu kết quả rõ ràng, dễ hiểu và trung thực với dữ liệu gốc
          </p>
          <p style={{ fontSize: 11, color: 'var(--gray-400)', fontStyle: 'italic' }}>
            Căn cứ kết quả thực hiện tại Trung tâm xét nghiệm Invivo Lab
          </p>
        </div>

        {/* ── STATS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 20 }}>
          {[
            { n: patients.length, label: 'Tổng bệnh nhân',        c: 'var(--navy)' },
            { n: totalAttention,  label: 'Có chỉ số cần chú ý',   c: 'var(--red)'  },
            { n: totalNormal,     label: 'Tất cả bình thường',     c: 'var(--teal)' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'var(--card-bg)', border: 'var(--card-border)',
              borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)',
              padding: 'clamp(12px,3vw,20px) clamp(10px,2vw,16px)', textAlign: 'center',
            }}>
              <p style={{ fontFamily: 'var(--ff-serif)', fontSize: 'clamp(26px,6vw,36px)', fontWeight: 700, color: s.c, lineHeight: 1, marginBottom: 4 }}>
                {s.n}
              </p>
              <p style={{ fontSize: 'clamp(9px,2vw,11px)', fontWeight: 600, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1.4 }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── SEARCH + FILTER ── */}
        <div style={{
          background: 'var(--card-bg)', border: 'var(--card-border)',
          borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)',
          padding: '14px 14px', marginBottom: 16,
        }}>
          {/* Search input */}
          <div style={{ position: 'relative', marginBottom: 10 }}>
            <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', fontSize: 15, color: 'var(--gray-400)', pointerEvents: 'none' }}>🔍</span>
            <input
              type="search"
              placeholder="Tìm theo tên hoặc mã phiếu..."
              value={q}
              onChange={e => setQ(e.target.value)}
              style={{
                width: '100%', padding: '11px 12px 11px 36px',
                borderRadius: 10, border: '1.5px solid var(--gray-200)',
                fontSize: 15, outline: 'none',
                fontFamily: 'var(--ff-sans)', color: 'var(--black)', background: 'var(--gray-50)',
              }}
            />
          </div>
          {/* Filter pills + count */}
          <div style={{ display: 'flex', gap: 7, alignItems: 'center', flexWrap: 'wrap' }}>
            {(['all', 'attention', 'normal'] as const).map(s => {
              const labels = { all: 'Tất cả', attention: 'Cần chú ý', normal: 'Bình thường' }
              const active = filterStatus === s
              return (
                <button key={s} onClick={() => setFilterStatus(s)} style={{
                  padding: '8px 14px', borderRadius: 99, fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', touchAction: 'manipulation', minHeight: 40,
                  background: active ? 'var(--navy)' : 'var(--gray-100)',
                  color: active ? 'white' : 'var(--gray-600)',
                  border: `1.5px solid ${active ? 'var(--navy)' : 'var(--gray-200)'}`,
                  transition: 'all 0.15s',
                }}>
                  {labels[s]}
                </button>
              )
            })}
            <span style={{ fontSize: 12, color: 'var(--gray-400)', marginLeft: 'auto' }}>
              {filtered.length} kết quả
            </span>
          </div>
        </div>

        {/* ── PATIENT GRID ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 10 }}>
          {filtered.map(p => {
            const ov      = p.n_attention === 0 ? 'normal' : p.n_attention < 5 ? 'watch' : 'attention'
            const sColor  = ov === 'normal' ? 'var(--teal-d)' : ov === 'watch' ? 'var(--amber)' : 'var(--red)'
            const sBg     = ov === 'normal' ? 'var(--teal-l)' : ov === 'watch' ? 'var(--amber-l)' : 'var(--red-l)'
            const sText   = ov === 'normal' ? '✓ Bình thường' : ov === 'watch' ? '● Theo dõi' : '▲ Hỏi bác sĩ'
            const words   = p.name.trim().split(' ')
            const initials = words.length >= 2
              ? words[words.length - 2][0] + words[words.length - 1][0]
              : (words[0]?.slice(0, 2) || '?')

            return (
              <Link key={p.id} href={`/patients/${p.id}`}>
                <div
                  style={{
                    background: 'var(--card-bg)', border: 'var(--card-border)',
                    borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)',
                    padding: '14px 16px', cursor: 'pointer',
                    transition: 'transform 0.18s, box-shadow 0.18s',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = 'var(--shadow-xl)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.boxShadow = 'var(--shadow-lg)' }}
                >
                  {/* Top row: avatar + name + badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: 'var(--navy-light)', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--ff-serif)', fontSize: 13, fontWeight: 700, color: 'var(--navy)',
                    }}>
                      {initials}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 600, fontSize: 13.5, color: 'var(--navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 2 }}>
                        {p.name}
                      </p>
                      <p style={{ fontSize: 11, color: 'var(--gray-400)' }}>
                        {[p.gender, p.age ? p.age + ' tuổi' : ''].filter(Boolean).join(' · ')}
                      </p>
                    </div>
                    <span style={{ padding: '4px 9px', borderRadius: 99, fontSize: 10, fontWeight: 700, background: sBg, color: sColor, whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {sText}
                    </span>
                  </div>

                  {/* Divider */}
                  <div style={{ height: 1, background: 'var(--gray-100)', marginBottom: 9 }} />

                  {/* Bottom row: chips */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', fontSize: 11 }}>
                    <span style={{ background: 'var(--gray-50)', borderRadius: 6, padding: '3px 8px', color: 'var(--gray-600)', border: '1px solid var(--gray-100)' }}>
                      📋 {p.n_total} chỉ số
                    </span>
                    {p.n_attention > 0 && (
                      <span style={{ background: 'var(--red-l)', borderRadius: 6, padding: '3px 8px', color: 'var(--red)', fontWeight: 600, border: '1px solid rgba(184,50,50,0.10)' }}>
                        ⚠ {p.n_attention} cần chú ý
                      </span>
                    )}
                    {p.sample_date && (
                      <span style={{ marginLeft: 'auto', background: 'var(--gray-50)', borderRadius: 6, padding: '3px 8px', color: 'var(--gray-400)', border: '1px solid var(--gray-100)' }}>
                        {p.sample_date}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--gray-400)' }}>
            <p style={{ fontSize: 36, marginBottom: 10 }}>🔍</p>
            <p style={{ fontSize: 15 }}>Không tìm thấy kết quả phù hợp.</p>
          </div>
        )}

        {/* ── FOOTER ── */}
        <div style={{ marginTop: 36, textAlign: 'center', fontSize: 11.5, color: 'var(--gray-400)', lineHeight: 1.8, padding: '20px 0', borderTop: '1px solid var(--gray-200)' }}>
          <p>Kiểm định y khoa: <strong style={{ color: 'var(--gray-600)' }}>BS. Chuyên khoa II Vũ Mạnh Cường</strong></p>
          <p>Không thay thế chẩn đoán y khoa trực tiếp</p>
          <p style={{ marginTop: 4 }}>
            <strong style={{ color: 'var(--navy)' }}>Mr. Phúc Đoàn: 0902 310 747</strong>
            {' · '}
            <strong style={{ color: 'var(--navy)' }}>Ms. Sương Vũ: 0785 957 488</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
