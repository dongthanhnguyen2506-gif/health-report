import { notFound } from 'next/navigation'
import Image from 'next/image'
import { patients } from '@/lib/patients'
import HealthMap from '@/components/HealthMap'
import ReportActions from '@/components/ReportActions'
import ConsultationCTA from '@/components/ConsultationCTA'
import type { Metric } from '@/lib/types'
import { getSafeMetric } from '@/lib/metric-utils'
import { SALES_MAP } from '@/lib/sales-map'
import { ORIGINAL_RESULTS } from '@/lib/original-results'

export async function generateStaticParams() {
  return patients.map(p => ({ id: p.id }))
}

export default function PatientPage({ params }: { params: { id: string } }) {
  const p = patients.find(pt => pt.id === params.id)
  if (!p) notFound()

  const safeMetrics = p.metrics.map(getSafeMetric)

  const abnormal = safeMetrics.filter((m) => m.status !== 'normal')
  const normal = safeMetrics.filter((m) => m.status === 'normal')

  const totalCount = safeMetrics.length
  const normalCount = normal.length
  const attentionCount = abnormal.length

  const ov =
    attentionCount === 0
      ? 'normal'
      : attentionCount < 5
      ? 'watch'
      : 'attention'

  const ovText =
    ov === 'normal'
      ? 'Bình thường'
      : ov === 'watch'
      ? 'Cần theo dõi'
      : 'Nên hỏi bác sĩ'

  const ovColor =
    ov === 'normal'
      ? 'var(--teal)'
      : ov === 'watch'
      ? 'var(--amber)'
      : 'var(--red)'

  const normalGroups = normal.reduce((acc: Record<string, Metric[]>, m: Metric) => {
    if (!acc[m.group]) acc[m.group] = []
    acc[m.group].push(m)
    return acc
  }, {})

const normalizeKey = (value: unknown) =>
  String(value || '')
    .trim()
    .replace(/\u200B/g, '')
    .replace(/\uFEFF/g, '')
    .replace(/\s+/g, ' ')

const patientIdKey = normalizeKey(p.id)
const patientNameKey = normalizeKey(p.name)

const salesStaff =
  SALES_MAP[patientIdKey] ||
  SALES_MAP[patientNameKey] ||
  ''

const originalUrl =
  ORIGINAL_RESULTS[patientIdKey] ||
  ORIGINAL_RESULTS[patientNameKey] ||
  ''

  const card: React.CSSProperties = {
    background: 'var(--card-bg)',
    border: 'var(--card-border)',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow-lg)',
    marginBottom: 'var(--gap)',
    overflow: 'hidden',
  }

  const eyebrow = (label: string, color = 'var(--navy-mid)') => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
      <div style={{ width: 3, height: 22, borderRadius: 2, background: color, flexShrink: 0 }} />
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.16em',
          textTransform: 'uppercase' as const,
          color: 'var(--navy-mid)',
        }}
      >
        {label}
      </span>
    </div>
  )

  const LOGOS = [
  { src: '/logo-ever.png', alt: 'Ever Việt Nam', w: 72, href: 'https://evergroup.jp/' as string | null },
  { src: '/logo-vib.png', alt: 'VIB', w: 72, href: null as string | null },
]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--page-bg)', overflowX: 'hidden' }}>
      <ReportActions patientId={p.id} patientName={p.name} originalUrl={originalUrl} />

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '1.25rem 0.75rem 3rem' }}>
        {/* ── HEADER ── */}
        <div style={{ ...card }}>
          <div className="section-pad" style={{ padding: '22px 24px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
                flexWrap: 'wrap',
                gap: 10,
              }}
            >
              <div style={{ display: 'flex', gap: 8 }}>
                {LOGOS.map(lg => (
                  <div
                    key={lg.alt}
                    style={{
                      background: 'white',
                      border: '1px solid var(--gray-200)',
                      borderRadius: 10,
                      height: 42,
                      minWidth: 90,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '5px 12px',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
                    }}
                  >
                    {lg.href
                      ? <a href={lg.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex' }}>
                          <Image src={lg.src} alt={lg.alt} width={lg.w} height={24} style={{ objectFit: 'contain' }} />
                        </a>
                      : <Image src={lg.src} alt={lg.alt} width={lg.w} height={24} style={{ objectFit: 'contain' }} />
                    }
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'right', fontSize: 12, color: 'var(--gray-500)', lineHeight: 1.7 }}>
                <div>
                  Mã phiếu:{' '}
                  <strong style={{ color: 'var(--navy)', fontFamily: 'monospace', fontSize: 12 }}>
                    {p.id}
                  </strong>
                </div>
                <div>
                  Ngày lấy mẫu: <strong style={{ color: 'var(--navy)' }}>{p.sample_date}</strong>
                </div>
              </div>
            </div>

            <div style={{ width: 44, height: 2, background: 'var(--gold)', margin: '0 auto 16px' }} />

            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: 6,
                }}
              >
                Báo cáo y tế cá nhân
              </p>

              <h1
                style={{
                  fontFamily: 'var(--ff-serif)',
                  fontSize: 'clamp(20px,5vw,28px)',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  lineHeight: 1.25,
                  marginBottom: 8,
                }}
              >
                Diễn Giải Kết Quả Xét Nghiệm
              </h1>

              <p
                style={{
                  fontSize: 'clamp(12px,3vw,14px)',
                  color: 'var(--gray-500)',
                  marginBottom: 10,
                  lineHeight: 1.6,
                }}
              >
                Hỗ trợ đọc hiểu kết quả xét nghiệm rõ ràng, dễ hiểu và trung thực với dữ liệu gốc
              </p>

              <span
                style={{
                  display: 'inline-block',
                  fontSize: 11,
                  fontStyle: 'italic',
                  color: 'var(--gray-400)',
                  background: 'var(--gray-50)',
                  border: '1px solid var(--gray-200)',
                  borderRadius: 99,
                  padding: '4px 14px',
                }}
              >
                Nội dung căn cứ kết quả thực hiện tại Trung tâm xét nghiệm Invivo Lab
              </span>
            </div>
          </div>
        </div>

        {/* ── PATIENT INFO ── */}
        <div style={{ ...card }}>
          <div style={{ background: 'var(--navy)', padding: '14px 20px' }}>
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: 3,
              }}
            >
              Thông tin khách hàng
            </p>

            <h2
              style={{
                fontFamily: 'var(--ff-serif)',
                fontSize: 'clamp(17px,4vw,22px)',
                fontWeight: 600,
                color: 'white',
              }}
            >
              {p.name}
            </h2>
          </div>

          <div className="patient-info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {[
              ['Ngày sinh', p.dob || null],
              ['Tuổi', p.age ? p.age + ' tuổi' : null],
              ['Giới tính', p.gender || null],
              ['Nghề nghiệp', null],
              ['Chiều cao', null, 'cm'],
              ['Cân nặng', null, 'kg'],
              ['Điện thoại', null],
              ['Email', null],
              ['Ngày lấy mẫu', p.sample_date || null],
              ['Ngày trả kết quả', null],
            ].map(([label, value, unit], i) => (
              <div
                key={String(label)}
                style={{
                  padding: '11px 18px',
                  borderBottom: '1px solid var(--gray-100)',
                  borderRight: i % 2 === 0 ? '1px solid var(--gray-100)' : 'none',
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    color: 'var(--gray-400)',
                    marginBottom: 3,
                  }}
                >
                  {label}
                </p>

                <p style={{ fontSize: 14, fontWeight: 500, color: value ? 'var(--black)' : 'var(--gray-200)' }}>
                  {value ? `${value}${unit ? ' ' + unit : ''}` : `.........${unit ? ' ' + unit : ''}`}
                </p>
              </div>
            ))}

            <div
              className="patient-info-full"
              style={{ padding: '11px 18px', gridColumn: '1/-1', borderTop: '1px solid var(--gray-100)' }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  color: 'var(--gray-400)',
                  marginBottom: 3,
                }}
              >
                Tiền sử sử dụng thuốc
              </p>

              <p style={{ fontSize: 14, color: 'var(--gray-200)' }}>
                ................................................................
              </p>
            </div>
          </div>
        </div>

        {/* ── SUMMARY ── */}
        <div style={{ ...card }}>
          <div className="section-pad" style={{ padding: '22px 24px', background: 'var(--navy-light)' }}>
            {eyebrow('Tổng quan kết quả', 'var(--gold)')}

            <div
              className="summary-grid-4"
              style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 12, marginBottom: 16 }}
            >
              <div className="summary-main-card" style={{ background: 'var(--navy)', borderRadius: 14, padding: '16px 18px' }}>
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.45)',
                    marginBottom: 6,
                  }}
                >
                  Kết quả tổng quan
                </p>

                <p
                  style={{
                    fontFamily: 'var(--ff-serif)',
                    fontSize: 'clamp(15px,4vw,19px)',
                    fontWeight: 700,
                    color: 'var(--gold-m)',
                    lineHeight: 1.2,
                  }}
                >
                  {ovText}
                </p>
              </div>

              {[
                { n: totalCount, label: 'Tổng chỉ số', c: 'var(--navy)' },
                { n: normalCount, label: 'Trong tham chiếu', c: 'var(--teal)' },
                { n: attentionCount, label: 'Cần chú ý', c: 'var(--red)' },
              ].map(s => (
                <div
                  key={s.label}
                  style={{
                    background: 'white',
                    borderRadius: 14,
                    padding: '14px 10px',
                    textAlign: 'center',
                    boxShadow: 'var(--shadow-sm)',
                    border: 'var(--card-border)',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--ff-serif)',
                      fontSize: 'clamp(22px,5vw,30px)',
                      fontWeight: 700,
                      color: s.c,
                      lineHeight: 1,
                      marginBottom: 4,
                    }}
                  >
                    {s.n}
                  </p>

                  <p
                    style={{
                      fontSize: 'clamp(9px,2vw,10px)',
                      fontWeight: 600,
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                      color: 'var(--gray-400)',
                      lineHeight: 1.4,
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                background: 'white',
                borderRadius: 12,
                padding: '14px 18px',
                borderLeft: `4px solid ${ovColor}`,
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <p style={{ fontSize: 'clamp(13px,3vw,14px)', lineHeight: 1.75, color: 'var(--gray-600)' }}>
                {abnormal.length > 0 ? (
                  <>
                    Phần lớn chỉ số nằm trong giới hạn tham chiếu. Có{' '}
                    <strong style={{ color: 'var(--navy)' }}>{attentionCount} chỉ số cần lưu ý</strong>:{' '}
                    {abnormal
                      .slice(0, 4)
                      .map((m: Metric) => m.name.split('(')[0].trim())
                      .join(', ')}
                    {abnormal.length > 4 ? ` và ${abnormal.length - 4} chỉ số khác` : ''}.{' '}
                    <strong style={{ color: 'var(--navy)' }}>Chưa đủ để kết luận bệnh lý</strong>, nên đánh giá thêm cùng triệu chứng và tiền sử bệnh.
                  </>
                ) : (
                  <>
                    Tất cả chỉ số <strong style={{ color: 'var(--teal)' }}>nằm trong giới hạn tham chiếu</strong>. Tiếp tục duy trì lối sống lành mạnh và khám sức khỏe định kỳ.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* ── HEALTH MAP ── */}
        <div style={{ ...card }}>
          <div className="section-pad" style={{ padding: '22px 24px' }}>
            {eyebrow('Bản đồ tổng quan sức khỏe', 'var(--teal)')}

            <div className="health-map-scroll">
              <HealthMap sm={p.system_map} />
            </div>
          </div>
        </div>

        {/* ── ABNORMAL ── */}
        {abnormal.length > 0 && (
          <div style={{ ...card }}>
            <div className="section-pad" style={{ padding: '22px 24px', background: 'var(--gray-50)' }}>
              {eyebrow('Các chỉ số cần chú ý', 'var(--red)')}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {abnormal.map((m: Metric, i: number) => {
                  const isHigh = m.status === 'high' || m.status === 'abnormal'
                  const mc = isHigh ? 'var(--red)' : 'var(--amber)'
                  const mbg = isHigh ? 'var(--red-l)' : 'var(--amber-l)'
                  const badge = m.status === 'high' ? '▲ Cao' : m.status === 'low' ? '▼ Thấp' : '● Bất thường'

                  return (
                    <div
                      key={i}
                      style={{
                        background: 'white',
                        borderRadius: 14,
                        border: '1px solid rgba(15,30,53,0.07)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'stretch' }}>
                        <div style={{ width: 5, background: mc, flexShrink: 0 }} />

                        <div
                          className="metric-header-row"
                          style={{
                            flex: 1,
                            padding: '13px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 10,
                            borderBottom: '1px solid var(--gray-100)',
                            flexWrap: 'wrap',
                          }}
                        >
                          <h3
                            style={{
                              fontFamily: 'var(--ff-serif)',
                              fontSize: 'clamp(15px,4vw,17px)',
                              fontWeight: 600,
                              color: 'var(--navy)',
                              lineHeight: 1.3,
                              flex: 1,
                            }}
                          >
                            {m.name}
                          </h3>

                          <div className="metric-values-group" style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                            <div style={{ textAlign: 'right' }}>
                              <p
                                style={{
                                  fontSize: 10,
                                  fontWeight: 700,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.06em',
                                  color: 'var(--gray-400)',
                                  marginBottom: 1,
                                }}
                              >
                                Tham chiếu
                              </p>
                              <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>{m.ref}</p>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                              <p
                                style={{
                                  fontFamily: 'var(--ff-serif)',
                                  fontSize: 'clamp(20px,5vw,24px)',
                                  fontWeight: 700,
                                  color: mc,
                                  lineHeight: 1,
                                }}
                              >
                                {m.value}
                              </p>
                              <p style={{ fontSize: 11, color: 'var(--gray-400)' }}>{m.unit}</p>
                            </div>

                            <span
                              style={{
                                padding: '5px 12px',
                                borderRadius: 99,
                                fontSize: 12,
                                fontWeight: 700,
                                background: mbg,
                                color: mc,
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {badge}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div style={{ padding: '14px 21px' }}>
                        {[
                          { l: 'Diễn giải dễ hiểu', t: m.explain },
                          { l: 'Có thể liên quan đến', t: m.relate },
                        ].map(row => (
                          <div key={row.l} style={{ marginBottom: 9 }}>
                            <p
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.12em',
                                color: 'var(--navy-soft)',
                                marginBottom: 4,
                              }}
                            >
                              {row.l}
                            </p>

                            <p style={{ fontSize: 'clamp(13px,3vw,14px)', lineHeight: 1.7, color: 'var(--gray-600)' }}>
                              {row.t}
                            </p>
                          </div>
                        ))}

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 10,
                            background: 'var(--teal-l)',
                            borderRadius: 10,
                            padding: '11px 14px',
                            marginTop: 10,
                          }}
                        >
                          <span style={{ fontSize: 16, flexShrink: 0 }}>💬</span>
                          <p style={{ fontSize: 'clamp(13px,3vw,14px)', lineHeight: 1.65, color: 'var(--teal-d)', fontWeight: 500 }}>
                            {m.suggest}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── NORMAL METRICS ── */}
        {normal.length > 0 && (
          <div style={{ ...card }}>
            <div className="section-pad" style={{ padding: '22px 24px' }}>
              {eyebrow('Các chỉ số trong giới hạn tham chiếu', 'var(--teal)')}

              {Object.entries(normalGroups).map(([group, mList]) => (
                <div key={group} style={{ marginBottom: 24 }}>
                  <h3
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--gold-dark)',
                      borderLeft: '3px solid var(--gold)',
                      paddingLeft: 10,
                      marginBottom: 10,
                    }}
                  >
                    {group}
                  </h3>

                  <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--gray-200)' }}>
                    {(mList as Metric[]).map((m, i) => (
                      <div
                        key={i}
                        className="metric-row-card"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 12,
                          padding: '12px 16px',
                          background: i % 2 === 0 ? 'white' : 'var(--gray-50)',
                          borderBottom: i < (mList as Metric[]).length - 1 ? '1px solid var(--gray-100)' : 'none',
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 'clamp(12px,3vw,13.5px)', fontWeight: 500, color: 'var(--navy)', lineHeight: 1.4 }}>
                            {m.name}
                          </p>
                          <p style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 2 }}>TK: {m.ref}</p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                          <div style={{ textAlign: 'right' }}>
                            <p style={{ fontFamily: 'var(--ff-serif)', fontSize: 16, fontWeight: 700, color: 'var(--black)', lineHeight: 1 }}>
                              {m.value}
                            </p>
                            <p style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 1 }}>{m.unit}</p>
                          </div>

                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                              fontSize: 11,
                              fontWeight: 600,
                              color: 'var(--teal-d)',
                              background: 'var(--teal-l)',
                              padding: '3px 9px',
                              borderRadius: 99,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block' }} />
                            BT
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── DISCLAIMER ── */}
        <div
          className="disclaimer-inner"
          style={{
            background: 'var(--navy)',
            borderRadius: 'var(--radius)',
            padding: '32px 28px',
            marginBottom: 'var(--gap)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: 'rgba(184,150,62,0.15)',
              border: '1.5px solid var(--gold-m)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px',
              fontSize: 22,
            }}
          >
            ⚕
          </div>

          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: 5,
            }}
          >
            Kiểm định y khoa bởi
          </p>

          <p
            style={{
              fontFamily: 'var(--ff-serif)',
              fontSize: 'clamp(16px,4vw,19px)',
              fontWeight: 600,
              color: 'var(--gold-m)',
              marginBottom: 16,
            }}
          >
            BS. Chuyên khoa II Vũ Mạnh Cường
          </p>

          <div
            style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 12,
              padding: '14px 18px',
              border: '1px solid rgba(255,255,255,0.07)',
              maxWidth: 500,
              margin: '0 auto',
            }}
          >
            <p style={{ fontSize: 'clamp(12px,3vw,13px)', lineHeight: 1.75, color: 'rgba(255,255,255,0.62)' }}>
              <strong style={{ color: 'rgba(255,255,255,0.88)' }}>Lưu ý:</strong> Thông tin này chỉ hỗ trợ đọc hiểu kết quả xét nghiệm. Không thay thế chẩn đoán y khoa trực tiếp. Kết quả cần được đánh giá cùng triệu chứng, tiền sử bệnh và thuốc đang sử dụng.
            </p>
          </div>
        </div>

        {/* ── CTA ── */}
        <ConsultationCTA
          patientId={p.id}
          patientName={p.name}
          salesStaff={salesStaff}
/>

        <div style={{ textAlign: 'center', padding: '8px 0', fontSize: 11, color: 'var(--gray-400)', lineHeight: 1.8 }}>
          <p>Ever Việt Nam x VIB · Phiếu này không phải chẩn đoán y khoa chính thức</p>
          <p>
            Mã phiếu: {p.id} · {p.sample_date}
          </p>
        </div>
      </div>
    </div>
  )
}
