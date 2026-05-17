import Image from 'next/image'
import type { SystemMap } from '@/lib/types'

function sc(s: string) {
  if (s === 'attention') return { bg:'#FAEAEA', stroke:'#E24B4A', icon:'#E24B4A', text:'#C0392B', fw:'700', dash:'none' as const, dot:true }
  if (s === 'normal')    return { bg:'#E6F4F2', stroke:'#1D7A6E', icon:'#1D7A6E', text:'#0F5C52', fw:'600', dash:'none' as const, dot:false }
  return                        { bg:'#F3F4F6', stroke:'#D1D5DB', icon:'#C8CACC', text:'#9CA3AF', fw:'400', dash:'5,3' as const, dot:false }
}

function Icon({ k, col }: { k: string; col: string }) {
  switch (k) {
    case 'Huyet hoc': return <>
      <path d="M0,-20 C0,-20 -13,-2 -13,8 A13,13 0 0,0 13,8 C13,-2 0,-20 0,-20 Z" fill={col}/>
      <ellipse cx="0" cy="8" rx="4.5" ry="2.5" fill="white" opacity="0.4"/>
    </>
    case 'Tim mach': return (
      <path d="M0,14 C0,14 -18,-3 -18,-11 C-18,-20 -10,-24 0,-15 C10,-24 18,-20 18,-11 C18,-3 0,14 0,14 Z" fill={col}/>
    )
    case 'Gan Mat': return <>
      <path d="M-17,-7 C-17,-18 -4,-23 9,-18 C19,-14 21,-4 17,7 C13,17 1,20 -10,15 C-19,10 -17,3 -17,-7 Z" fill={col}/>
      <path d="M6,15 C6,22 3,25 0,26" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </>
    case 'Than': return <>
      <path d="M-5,-14 C-13,-14 -20,-7 -20,3 C-20,13 -13,18 -5,17 C-2,17 0,13 0,3 C0,-7 -2,-14 -5,-14 Z" fill={col}/>
      <path d="M5,-14 C13,-14 20,-7 20,3 C20,13 13,18 5,17 C2,17 0,13 0,3 C0,-7 2,-14 5,-14 Z" fill={col} opacity="0.75"/>
    </>
    case 'Duong huyet': return <>
      <path d="M-12,-16 C-19,-10 -19,0 -15,9 C-11,17 -1,20 8,16 C17,10 18,0 13,-10 C8,-18 -2,-22 -9,-20 C-13,-18 -12,-16 -12,-16 Z" fill={col}/>
      <path d="M-12,-16 C-8,-20 0,-18 5,-13" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </>
    case 'Tuyen giap': return (
      <path d="M-4,-5 C-12,-11 -22,-7 -22,0 C-22,7 -12,10 -4,5 C-2,7 -2,10 0,12 C2,10 2,7 4,5 C12,10 22,7 22,0 C22,-7 12,-11 4,-5 Z" fill={col}/>
    )
    case 'Xuong khop': return <>
      <rect x="-4" y="-18" width="8" height="36" rx="3.5" fill={col}/>
      <rect x="-19" y="-21" width="38" height="7" rx="3.5" fill={col}/>
      <rect x="-19" y="14" width="38" height="7" rx="3.5" fill={col}/>
      {[-16,16].map(cx => [-17,17].map(cy => <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="5.5" fill={col}/>))}
    </>
    case 'Mach mau': return <>
      <path d="M-18,-2 C-9,-15 9,-15 18,-2" stroke={col} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M-18,-2 C-9,11 9,11 18,-2" stroke={col} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <circle cx="-6" cy="-5" r="4.5" fill={col} opacity="0.55"/>
      <circle cx="7" cy="5" r="4.5" fill={col} opacity="0.55"/>
    </>
    case 'Viem': return <>
      <circle cx="0" cy="0" r="12" fill={col}/>
      {[0,45,90,135,180,225,270,315].map(deg => {
        const a = deg*Math.PI/180
        return <line key={deg} x1={Math.cos(a)*12} y1={Math.sin(a)*12} x2={Math.cos(a)*22} y2={Math.sin(a)*22} stroke={col} strokeWidth="3" strokeLinecap="round"/>
      })}
    </>
    case 'Ung thu': return <>
      <path d="M-8,-20 C-3,-13 3,-9 8,-2" stroke={col} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M8,-20 C3,-13 -3,-9 -8,-2" stroke={col} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M-8,-2 C-3,5 3,9 8,16" stroke={col} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M8,-2 C3,5 -3,9 -8,16" stroke={col} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {[-11,1,13].map(y => <line key={y} x1="-10" y1={y} x2="10" y2={y} stroke={col} strokeWidth="1.8"/>)}
    </>
    case 'Phoi': return <>
      <path d="M-1,-20 L-1,10" stroke={col} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M-1,-6 C-7,-9 -18,-7 -20,2 C-22,11 -15,21 -7,19 C-3,19 -1,15 -1,10" fill={col} opacity="0.85"/>
      <path d="M1,-6 C7,-9 18,-7 20,2 C22,11 15,21 7,19 C3,19 1,15 1,10" fill={col} opacity="0.85"/>
    </>
    case 'Phu khoa': return <>
      <path d="M-11,5 C-14,0 -13,-9 -7,-14 C-3,-16 3,-16 7,-14 C13,-9 14,0 11,5 C9,9 5,11 0,11 C-5,11 -9,9 -11,5 Z" fill={col}/>
      <path d="M-11,5 C-17,10 -19,18 -16,22" stroke={col} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="-16" cy="22" r="3.5" fill="none" stroke={col} strokeWidth="2"/>
      <path d="M11,5 C17,10 19,18 16,22" stroke={col} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="16" cy="22" r="3.5" fill="none" stroke={col} strokeWidth="2"/>
    </>
    case 'Vu': return <>
      <path d="M-17,5 C-17,-8 -6,-17 0,-17 C6,-17 17,-8 17,5 C17,14 9,19 0,19 C-9,19 -17,14 -17,5 Z" fill={col} opacity="0.55"/>
      <circle cx="0" cy="3" r="6" fill={col}/>
    </>
    case 'Mat': return <>
      <path d="M-22,0 C-13,-14 13,-14 22,0 C13,14 -13,14 -22,0 Z" fill="none" stroke={col} strokeWidth="2.5"/>
      <circle cx="0" cy="0" r="9" fill={col}/>
      <circle cx="0" cy="0" r="4.5" fill="white" opacity="0.4"/>
      <circle cx="3.5" cy="-3" r="2" fill="white" opacity="0.6"/>
    </>
    case 'Tai Mui Hong': return <>
      <path d="M-4,-20 C6,-22 18,-13 18,0 C18,12 9,21 1,19 C-3,18 -4,13 0,10 C4,7 6,3 4,-2 C2,-7 -4,-9 -6,-5 C-8,-2 -6,4 -3,6" stroke={col} strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      <path d="M-3,6 C-5,12 -5,18 -3,21" stroke={col} strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      <path d="M0,2 C0,5 1,8 0,11" stroke={col} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.55"/>
    </>
    default: return <circle cx="0" cy="0" r="10" fill={col} opacity="0.5"/>
  }
}

function Item({ sysKey, l1, l2, sm, cx, cy, R = 32 }: {
  sysKey: string; l1: string; l2?: string
  sm: SystemMap; cx: number; cy: number; R?: number
}) {
  const st = sm[sysKey] || 'nodata'
  const c  = sc(st)
  const FF = "'Be Vietnam Pro',system-ui,sans-serif"
  const ty1 = cy + R + 15
  const ty2 = ty1 + 13

  return (
    <g>
      {c.dot && <>
        <circle cx={cx + R*0.68} cy={cy - R*0.68} r="7" fill={c.icon} stroke="white" strokeWidth="1.5"/>
        <circle cx={cx + R*0.68} cy={cy - R*0.68} r="11" fill="none" stroke={c.icon} strokeWidth="1.2" opacity="0.28"/>
      </>}
      <circle cx={cx} cy={cy} r={R} fill={c.bg} stroke={c.stroke} strokeWidth="2"
        strokeDasharray={c.dash === 'none' ? undefined : c.dash}/>
      <g transform={`translate(${cx},${cy})`}>
        <Icon k={sysKey} col={c.icon}/>
      </g>
      <text x={cx} y={ty1} fontFamily={FF} fontSize="11" textAnchor="middle" fill={c.text} fontWeight={c.fw}>{l1}</text>
      {l2 && <text x={cx} y={ty2} fontFamily={FF} fontSize="11" textAnchor="middle" fill={c.text} fontWeight={c.fw}>{l2}</text>}
    </g>
  )
}

const COLS = [
  [
    { key:'Huyet hoc',   l1:'Huyết học',       l2:undefined },
    { key:'Tim mach',    l1:'Tim mạch',         l2:undefined },
    { key:'Gan Mat',     l1:'Gan - Mật',        l2:undefined },
    { key:'Xuong khop',  l1:'Xương khớp',       l2:undefined },
  ],
  [
    { key:'Than',        l1:'Thận -',           l2:'Tiết niệu' },
    { key:'Duong huyet', l1:'Tiêu hóa /',       l2:'Đường huyết' },
    { key:'Tuyen giap',  l1:'Tuyến giáp',       l2:undefined },
    { key:'Mach mau',    l1:'Mỡ máu /',         l2:'Mạch máu' },
  ],
  [
    { key:'Viem',        l1:'Viêm /',           l2:'Phản ứng viêm' },
    { key:'Ung thu',     l1:'Chỉ số ung thư',   l2:undefined },
    { key:'Phoi',        l1:'Phổi',             l2:undefined },
    { key:'Phu khoa',    l1:'Phụ khoa',         l2:undefined },
  ],
  [
    { key:'Vu',          l1:'Vú',               l2:undefined },
    { key:'Mat',         l1:'Mắt',              l2:undefined },
    { key:'Tai Mui Hong',l1:'Tai Mũi',          l2:'Họng' },
  ],
]

const COL_X = [70, 185, 300, 415]
const ROW_Y = [58, 168, 278, 388]

export default function HealthMap({ sm }: { sm: SystemMap }) {
  const FF = "'Be Vietnam Pro',system-ui,sans-serif"

  return (
    <div style={{ position:'relative', width:'100%' }}>
      <svg viewBox="0 0 860 490" xmlns="http://www.w3.org/2000/svg"
        style={{ width:'100%', height:'auto', display:'block' }}
        role="img" aria-label="Bản đồ tổng quan sức khỏe">

        {COLS.map((col, ci) =>
          col.map((item, ri) => (
            <Item key={item.key} sysKey={item.key} l1={item.l1} l2={item.l2}
              sm={sm} cx={COL_X[ci]} cy={ROW_Y[ri]}/>
          ))
        )}

        <rect x="510" y="0" width="340" height="460" fill="transparent"/>

        <rect x="20" y="450" width="480" height="36" rx="9" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1"/>
        {[
          { x:44,  label:'Trong giới hạn tham chiếu', fill:'#1D7A6E', ring:false },
          { x:222, label:'Cần trao đổi với bác sĩ',   fill:'#E24B4A', ring:true  },
          { x:382, label:'Chưa đủ dữ liệu',            fill:'#C8CACC', ring:false },
        ].map(lg => (
          <g key={lg.label}>
            <circle cx={lg.x} cy={468} r="7" fill={lg.fill}/>
            {lg.ring && <circle cx={lg.x} cy={468} r="11" fill="none" stroke={lg.fill} strokeWidth="1.3" opacity="0.3"/>}
            <text x={lg.x+13} y={468} fontFamily={FF} fontSize="11.5" dominantBaseline="middle" fill="#4B5563">{lg.label}</text>
          </g>
        ))}
      </svg>

      <div style={{
        position:'absolute', top:0, right:0,
        width:'40%', height:'92%',
        display:'flex', alignItems:'center', justifyContent:'center',
        pointerEvents:'none',
      }}>
        <Image src="/anatomy-body.png" alt="Hình minh họa cơ thể người"
          width={220} height={420}
          style={{ objectFit:'contain', width:'100%', height:'100%' }}
          priority/>
      </div>
    </div>
  )
}