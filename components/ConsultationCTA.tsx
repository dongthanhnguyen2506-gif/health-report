'use client'

import { useState } from 'react'
import ConsultationBookingModal from './ConsultationBookingModal'

type Contact = {
  fullName: string
  phone: string
}

type Contact = {
  fullName: string
  phone: string
}

type Props = {
  patientId?: string
  patientName?: string
  salesStaff?: string | Contact[]
}

const DEFAULT_CONTACTS: Contact[] = [
  { fullName: 'Mr. Phúc Đoàn', phone: '0902 310 747' },
  { fullName: 'Ms. Sương Vũ', phone: '0785 957 488' },
]

function parseSalesStaff(input?: string | Contact[]): Contact[] {
  if (!input) return []

  if (Array.isArray(input)) {
    return input.filter((x) => x.fullName || x.phone)
  }

  const raw = String(input).trim()
  if (!raw) return []

  return raw
    .split('/')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const pieces = part.split(' - ')
      const fullName = pieces[0]?.trim() || part
      const phone = pieces[1]?.trim() || ''

      return {
        fullName,
        phone,
      }
    })
    .filter((x) => x.fullName)
}

export default function ConsultationCTA({ patientId, patientName, salesStaff }: Props) {
  const [modalOpen, setModalOpen] = useState(false)

  const mappedContacts = parseSalesStaff(salesStaff)
const contacts = mappedContacts.length > 0 ? mappedContacts : DEFAULT_CONTACTS
  function parseSalesStaff(input?: string | Contact[]): Contact[] {
  if (!input) return []

  if (Array.isArray(input)) {
    return input.filter((x) => x.fullName || x.phone)
  }

  const raw = String(input).trim()
  if (!raw) return []

  return raw
    .split('/')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const pieces = part.split(' - ')
      const fullName = pieces[0]?.trim() || part
      const phone = pieces[1]?.trim() || ''

      return {
        fullName,
        phone,
      }
    })
    .filter((x) => x.fullName)
}

  return (
    <>
      <div
        style={{
          background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-soft) 100%)',
          borderRadius: 'var(--radius)',
          padding: '40px 36px',
          marginBottom: 'var(--gap)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'rgba(184,150,62,0.08)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: -30,
            left: -30,
            width: 130,
            height: 130,
            borderRadius: '50%',
            background: 'rgba(184,150,62,0.05)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, minWidth: 260 }}>
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--gold-m)',
                marginBottom: 8,
              }}
            >
              Tư vấn chuyên sâu
            </p>

            <h2
              style={{
                fontFamily: 'var(--ff-serif)',
                fontSize: 24,
                fontWeight: 600,
                color: 'white',
                lineHeight: 1.3,
                marginBottom: 14,
              }}
            >
              Đặt lịch tư vấn cùng bác sĩ
            </h2>

            <p
              style={{
                fontSize: 14,
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.70)',
                marginBottom: 24,
                maxWidth: 480,
              }}
            >
              Kết quả xét nghiệm cần được đánh giá cùng triệu chứng, tiền sử bệnh,
              thuốc đang sử dụng và các xét nghiệm liên quan. Nếu Quý khách cần
              được giải thích kỹ hơn, vui lòng chọn thời gian mong muốn để được
              hỗ trợ tư vấn chuyên sâu cùng bác sĩ.
            </p>

            {/* Contact cards */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
              {contacts.map((ct, i) => {
                const cleanPhone = ct.phone ? ct.phone.replace(/\s/g, '') : ''
                const phoneHref = cleanPhone ? `tel:${cleanPhone}` : undefined

                const cardContent = (
                  <>
                    <p
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: '0.10em',
                        textTransform: 'uppercase',
                        color: 'var(--gold-m)',
                        marginBottom: 3,
                      }}
                    >
                      📞 {i === 0 ? 'NVKD phụ trách' : 'Liên hệ ' + (i + 1)}
                    </p>

                    <p
                      style={{
                        fontSize: 13.5,
                        fontWeight: 600,
                        color: 'white',
                        marginBottom: 4,
                      }}
                    >
                      {ct.fullName}
                    </p>

                    {ct.phone && (
                      <p
                        style={{
                          fontFamily: 'var(--ff-serif)',
                          fontSize: 17,
                          fontWeight: 700,
                          color: 'var(--gold-m)',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {ct.phone}
                      </p>
                    )}
                  </>
                )

                const baseStyle: React.CSSProperties = {
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 12,
                  padding: '14px 18px',
                  minWidth: 180,
                  transition: 'background 0.15s',
                  display: 'block',
                  textDecoration: 'none',
                }

                if (!phoneHref) {
                  return (
                    <div key={i} style={baseStyle}>
                      {cardContent}
                    </div>
                  )
                }

                return (
                  <a
                    key={i}
                    href={phoneHref}
                    style={baseStyle}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        'rgba(255,255,255,0.14)')
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        'rgba(255,255,255,0.08)')
                    }
                  >
                    {cardContent}
                  </a>
                )
              })}
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="no-print"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '13px 28px',
                borderRadius: 99,
                background: 'var(--gold-m)',
                color: 'var(--navy)',
                fontSize: 14,
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 28px rgba(212,175,90,0.35)',
                transition: 'all 0.18s',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow =
                  '0 16px 36px rgba(212,175,90,0.45)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.transform = 'none'
                ;(e.currentTarget as HTMLElement).style.boxShadow =
                  '0 10px 28px rgba(212,175,90,0.35)'
              }}
            >
              <span>🗓</span>
              Đặt lịch tư vấn cùng bác sĩ
            </button>
          </div>

          {/* Right decoration */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              padding: '20px 24px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <span style={{ fontSize: 36 }}>⚕</span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
                textAlign: 'center',
                lineHeight: 1.5,
              }}
            >
              Trực tiếp
              <br />· Online
            </span>
          </div>
        </div>
      </div>

      <ConsultationBookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        patientId={patientId}
        patientName={patientName}
      />
    </>
  )
}