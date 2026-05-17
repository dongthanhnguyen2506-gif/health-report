'use client'
import { useState } from 'react'

type Props = {
  patientId: string
  patientName: string
}

export default function ReportActions({ patientId, patientName }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
    } catch {
      const el = document.createElement('input')
      el.value = window.location.href
      document.body.appendChild(el); el.select()
      document.execCommand('copy'); document.body.removeChild(el)
    }
    setCopied(true); setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="no-print" style={{ background:'var(--navy)', position:'sticky', top:0, zIndex:200 }}>
      <div style={{ maxWidth:860, margin:'0 auto', padding:'0 1rem', display:'flex', alignItems:'center', justifyContent:'space-between', height:52, gap:8 }}>
        {/* Patient name only — NO back button */}
        <span style={{ color:'white', fontSize:14, fontWeight:600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flex:1, minWidth:0 }}>{patientName}</span>

        {/* Action buttons */}
        <div style={{ display:'flex', gap:8, flexShrink:0 }}>
          <button onClick={handleCopy}
            style={{ display:'flex', alignItems:'center', gap:5, padding:'7px 12px', borderRadius:99, fontSize:12, fontWeight:600, background:copied?'rgba(29,122,110,0.3)':'rgba(255,255,255,0.1)', color:copied?'#5DCAA5':'rgba(255,255,255,0.8)', border:'none', cursor:'pointer', whiteSpace:'nowrap' }}>
            {copied ? '✓ Đã sao chép' : '🔗 Sao chép link'}
          </button>
          <button onClick={() => window.print()}
            style={{ display:'flex', alignItems:'center', gap:5, padding:'7px 14px', borderRadius:99, fontSize:12, fontWeight:700, background:'var(--gold-m)', color:'var(--navy)', border:'none', cursor:'pointer', whiteSpace:'nowrap' }}>
            🖨 In / PDF
          </button>
        </div>
      </div>
    </div>
  )
}
