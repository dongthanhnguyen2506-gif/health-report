import type { SystemMap } from '@/lib/types'

// ── Layout ─────────────────────────────────────────────────────────────────
const VW = 900      // viewBox width
const VH = 625      // viewBox height
const BOX_W  = 172  // label box width
const BOX_H  = 44   // box height — tall enough for 2 lines
const GAP    = 52   // vertical gap between boxes
const START_Y = 162 // y of first box row
const LX     = 18   // left box x origin
const RX     = VW - 18 - BOX_W   // right box x origin = 710
const L_CONN = 312  // connector line → left body edge
const R_CONN = 590  // connector line → right body edge
const FONT   = 13.5 // label font size

const SYSTEMS_LEFT: { key: string; l1: string; l2: string }[] = [
  { key:'Huyet hoc',   l1:'Huyết học',         l2:'' },
  { key:'Tim mach',    l1:'Tim mạch',           l2:'' },
  { key:'Gan Mat',     l1:'Gan - Mật',          l2:'' },
  { key:'Than',        l1:'Thận -',             l2:'Tiết niệu' },
  { key:'Duong huyet', l1:'Tiêu hóa /',         l2:'Đường huyết' },
  { key:'Tuyen giap',  l1:'Tuyến giáp',         l2:'' },
  { key:'Xuong khop',  l1:'Xương khớp',         l2:'' },
]

const SYSTEMS_RIGHT: { key: string; l1: string; l2: string }[] = [
  { key:'Mach mau',    l1:'Mỡ máu /',           l2:'Mạch máu' },
  { key:'Viem',        l1:'Viêm /',              l2:'Phản ứng viêm' },
  { key:'Ung thu',     l1:'Chỉ số ung thư',      l2:'' },
  { key:'Phoi',        l1:'Phổi',                l2:'' },
  { key:'Phu khoa',    l1:'Phụ khoa',            l2:'' },
  { key:'Vu',          l1:'Vú',                  l2:'' },
  { key:'Mat',         l1:'Mắt',                 l2:'' },
  { key:'Tai Mui Hong',l1:'Tai Mũi Họng',        l2:'' },
]

function sc(s: string) {
  if (s==='attention') return { fill:'#FAEAEA', stroke:'#E24B4A', dot:'#E24B4A', text:'#A32D2D', fw:'700' }
  if (s==='normal')    return { fill:'#E6F4F2', stroke:'#1D7A6E', dot:'#1D7A6E', text:'#0F5C52', fw:'600' }
  return { fill:'#F3F4F6', stroke:'#C0C4CC', dot:'#9CA3AF', text:'#6B7280', fw:'400' }
}

function Box({
  x, y, l1, l2, sysKey, sm, isLeft,
}: {
  x:number; y:number; l1:string; l2:string
  sysKey:string; sm:SystemMap; isLeft:boolean
}) {
  const st  = sm[sysKey] || 'nodata'
  const c   = sc(st)
  const cy  = y + BOX_H / 2
  const dotX = x + 20
  const tx   = x + 36
  const y1 = l2 ? y + BOX_H/2 - 1      : y + BOX_H/2 + FONT * 0.36
  const y2 = y + BOX_H/2 + FONT + 2

  const lx1 = isLeft ? x + BOX_W : x
  const lx2 = isLeft ? L_CONN    : R_CONN

  return (
    <g>
      <line x1={lx1} y1={cy} x2={lx2} y2={cy}
        stroke={c.dot} strokeWidth="1.2" strokeDasharray="5,4" opacity="0.55" />
      <rect x={x} y={y} width={BOX_W} height={BOX_H} rx="9"
        fill={c.fill} stroke={c.stroke} strokeWidth="1.2" />
      <circle cx={dotX} cy={cy} r="7" fill={c.dot} />
      {st==='attention' && (
        <circle cx={dotX} cy={cy} r="11.5" fill="none" stroke={c.dot} strokeWidth="1.5" opacity="0.28" />
      )}
      <text x={tx} y={y1} fontFamily="Be Vietnam Pro,system-ui,sans-serif"
        fontSize={FONT} fontWeight={c.fw} fill={c.text}>{l1}</text>
      {l2 && (
        <text x={tx} y={y2} fontFamily="Be Vietnam Pro,system-ui,sans-serif"
          fontSize={FONT} fontWeight={c.fw} fill={c.text}>{l2}</text>
      )}
    </g>
  )
}

export default function HealthMap({ sm }: { sm: SystemMap }) {
  const bx = 451

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} xmlns="http://www.w3.org/2000/svg"
      style={{ width:'100%', height:'auto', display:'block', minWidth:360 }}
      role="img" aria-label="Bản đồ tổng quan sức khỏe">

      {/* Neck */}
      <rect x="438" y="140" width="26" height="22" rx="6"
        fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.9"/>

      {/* Torso */}
      <path d="M407,162 C388,170 380,193 381,226 C382,248 385,270 387,290 L515,290 C517,270 520,248 521,226 C522,193 514,170 495,162 Z"
        fill="#F5CBA7" stroke="#D4956A" strokeWidth="1"/>
      <ellipse cx="393" cy="175" rx="21" ry="14" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.8"/>
      <ellipse cx="509" cy="175" rx="21" ry="14" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.8"/>
      <path d="M445,166 C430,168 412,174 395,177" stroke="#D4956A" strokeWidth="0.9" fill="none"/>
      <path d="M457,166 C472,168 490,174 507,177" stroke="#D4956A" strokeWidth="0.9" fill="none"/>
      <line x1="451" y1="168" x2="451" y2="235" stroke="#D4956A" strokeWidth="0.8" opacity="0.5"/>
      {[180,193,206,219].map(ry => (
        <g key={ry}>
          <path d={`M449,${ry} C436,${ry-5} 422,${ry-3} 410,${ry+5}`} stroke="#D4956A" strokeWidth="0.5" fill="none" opacity="0.6"/>
          <path d={`M453,${ry} C466,${ry-5} 480,${ry-3} 492,${ry+5}`} stroke="#D4956A" strokeWidth="0.5" fill="none" opacity="0.6"/>
        </g>
      ))}

      {/* Left arm */}
      <path d="M374,172 C360,179 351,199 349,222 C347,237 349,249 351,261 L364,259 C362,248 360,236 362,222 C364,201 371,182 383,175 Z"
        fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.8"/>
      <path d="M351,261 C349,277 349,295 353,309 L366,307 C362,294 362,277 364,259 Z"
        fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.8"/>
      <ellipse cx="358" cy="314" rx="12" ry="7" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.6"/>
      <ellipse cx="352" cy="261" rx="7" ry="5" fill="#D4956A" opacity="0.35"/>

      {/* Right arm */}
      <path d="M528,172 C542,179 551,199 553,222 C555,237 553,249 551,261 L538,259 C540,248 542,236 540,222 C538,201 531,182 519,175 Z"
        fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.8"/>
      <path d="M551,261 C553,277 553,295 549,309 L536,307 C540,294 540,277 538,259 Z"
        fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.8"/>
      <ellipse cx="544" cy="314" rx="12" ry="7" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.6"/>
      <ellipse cx="550" cy="261" rx="7" ry="5" fill="#D4956A" opacity="0.35"/>

      {/* Pelvis */}
      <path d="M387,290 C380,303 378,320 382,335 L520,335 C524,320 522,303 515,290 Z"
        fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.9"/>
      <path d="M392,295 C384,305 382,318 388,326" stroke="#D4956A" strokeWidth="0.7" fill="none" opacity="0.5"/>
      <path d="M510,295 C518,305 520,318 514,326" stroke="#D4956A" strokeWidth="0.7" fill="none" opacity="0.5"/>

      {/* Left leg */}
      <path d="M387,335 C380,348 378,372 380,395 C382,411 386,423 390,433 L410,431 C406,421 402,409 400,394 C398,372 398,348 405,335 Z"
        fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.8"/>
      <ellipse cx="399" cy="407" rx="10" ry="7" fill="#D4956A" opacity="0.35"/>
      <path d="M390,433 C388,449 388,467 390,481 L405,479 C403,466 403,449 410,431 Z"
        fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.8"/>
      <ellipse cx="396" cy="486" rx="16" ry="8" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.6"/>

      {/* Right leg */}
      <path d="M515,335 C522,348 524,372 522,395 C520,411 516,423 512,433 L492,431 C496,421 500,409 502,394 C504,372 504,348 497,335 Z"
        fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.8"/>
      <ellipse cx="503" cy="407" rx="10" ry="7" fill="#D4956A" opacity="0.35"/>
      <path d="M512,433 C514,449 514,467 512,481 L497,479 C499,466 499,449 492,431 Z"
        fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.8"/>
      <ellipse cx="506" cy="486" rx="16" ry="8" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.6"/>

      {/* Head */}
      <ellipse cx={bx} cy="108" rx="40" ry="46" fill="#F5CBA7" stroke="#D4956A" strokeWidth="1"/>
      <path d="M411,97 C410,66 425,53 451,52 C477,53 492,66 491,97 C487,79 477,70 451,70 C425,70 415,79 411,97 Z"
        fill="#4A3728"/>
      <ellipse cx="411" cy="111" rx="6" ry="9" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.7"/>
      <ellipse cx="491" cy="111" rx="6" ry="9" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.7"/>
      <ellipse cx="437" cy="108" rx="7" ry="6" fill="white" stroke="#D4956A" strokeWidth="0.5"/>
      <ellipse cx="465" cy="108" rx="7" ry="6" fill="white" stroke="#D4956A" strokeWidth="0.5"/>
      <circle cx="437" cy="108" r="3.5" fill="#2C3E50"/>
      <circle cx="465" cy="108" r="3.5" fill="#2C3E50"/>
      <circle cx="438" cy="107" r="1.3" fill="white"/>
      <circle cx="466" cy="107" r="1.3" fill="white"/>
      <path d="M428,96 C431,93 443,93 446,96" stroke="#4A3728" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M456,96 C459,93 471,93 474,96" stroke="#4A3728" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M449,114 C447,120 446,123 449,125 C452,125 455,122 453,120 C451,118 450,115 449,114 Z"
        fill="#D4956A" opacity="0.45"/>
      <path d="M441,131 C445,135 457,135 461,131" stroke="#C8956C" strokeWidth="1.1" fill="none" strokeLinecap="round"/>

      {/* Trachea */}
      <rect x="445" y="150" width="12" height="16" rx="4" fill="#AED6F1" stroke="#5DADE2" strokeWidth="0.7"/>
      {[154,159,163].map(ty => (
        <line key={ty} x1="445" y1={ty} x2="457" y2={ty} stroke="#5DADE2" strokeWidth="0.5"/>
      ))}
      <ellipse cx="444" cy="155" rx="6" ry="5" fill="#1D7A6E" stroke="white" strokeWidth="0.6"/>
      <ellipse cx="458" cy="155" rx="6" ry="5" fill="#1D7A6E" stroke="white" strokeWidth="0.6"/>

      {/* Lungs */}
      <path d="M405,170 C394,177 390,194 391,214 C392,230 396,243 401,251 C407,243 409,229 409,210 L409,170 Z"
        fill="#E8A0A0" stroke="#C97070" strokeWidth="0.7" opacity="0.85"/>
      <path d="M497,170 C508,177 512,194 511,214 C510,230 506,243 501,251 C495,243 493,229 493,210 L493,170 Z"
        fill="#E8A0A0" stroke="#C97070" strokeWidth="0.7" opacity="0.85"/>

      {/* Heart */}
      <path d="M445,184 C445,176 437,171 430,175 C423,179 421,189 427,199 C431,205 439,213 445,218 C451,213 459,205 463,199 C469,189 467,179 460,175 C453,171 445,176 445,184 Z"
        fill={sm['Tim mach']==='attention'?'#E74C3C':'#E84848'} stroke="white" strokeWidth="0.9"/>

      {/* Liver */}
      <path d="M463,220 C471,216 487,216 494,224 C499,230 499,244 491,252 C483,260 468,260 461,252 C454,244 454,228 463,220 Z"
        fill={sm['Gan Mat']==='attention'?'#E74C3C':'#935116'} stroke="white" strokeWidth="0.8" opacity="0.9"/>

      {/* Stomach */}
      <path d="M420,222 C413,228 411,241 416,251 C421,260 434,263 445,257 C447,247 447,234 441,226 C436,218 427,218 420,222 Z"
        fill="#F39C12" stroke="#D68910" strokeWidth="0.7" opacity="0.85"/>

      {/* Pancreas */}
      <path d="M433,257 C443,254 456,254 463,260 C466,265 463,271 456,271 C448,271 438,268 433,263 Z"
        fill={sm['Duong huyet']==='attention'?'#E67E22':'#D35400'} stroke="white" strokeWidth="0.6" opacity="0.75"/>

      {/* Kidneys */}
      <path d="M394,247 C386,247 379,255 379,268 C379,281 386,289 396,289 C402,289 406,282 403,268 C401,257 399,247 394,247 Z"
        fill={sm['Than']==='attention'?'#E74C3C':'#1D7A6E'} stroke="white" strokeWidth="0.8"/>
      <path d="M508,247 C516,247 523,255 523,268 C523,281 516,289 506,289 C500,289 496,282 499,268 C501,257 503,247 508,247 Z"
        fill={sm['Than']==='attention'?'#E74C3C':'#1D7A6E'} stroke="white" strokeWidth="0.8"/>

      {/* Intestines */}
      <path d="M406,284 C396,288 391,304 396,317 C401,330 416,336 433,336 C450,336 465,336 476,336 C493,330 506,325 510,311 C514,297 506,284 495,282 C484,280 470,280 456,281 C442,282 419,280 406,284 Z"
        fill="#E8D5B7" stroke="#C8A96A" strokeWidth="0.7" opacity="0.8"/>
      {[{x1:408,x2:430,y:298},{x1:432,x2:460,y:298},{x1:413,x2:440,y:314}].map((r,i)=>(
        <path key={i} d={`M${r.x1},${r.y} C${r.x1+10},${r.y+7} ${r.x2-10},${r.y+7} ${r.x2},${r.y}`}
          stroke="#C8A96A" strokeWidth="0.9" fill="none"/>
      ))}

      {/* Vessels */}
      <line x1="453" y1="170" x2="453" y2="284" stroke="#C0392B" strokeWidth="2.2" opacity="0.48"/>
      <line x1="448" y1="172" x2="448" y2="282" stroke="#1A5276" strokeWidth="1.5" opacity="0.38"/>
      <path d="M451,186 C428,183 406,181 388,187" stroke="#C0392B" strokeWidth="1.3" fill="none" opacity="0.4"/>
      <path d="M451,186 C474,183 496,181 514,187" stroke="#C0392B" strokeWidth="1.3" fill="none" opacity="0.4"/>
      <line x1="453" y1="284" x2="428" y2="306" stroke="#C0392B" strokeWidth="1.1" opacity="0.4"/>
      <line x1="453" y1="284" x2="478" y2="306" stroke="#C0392B" strokeWidth="1.1" opacity="0.4"/>

      {/* Blood dot */}
      <circle cx="451" cy="210" r={sm['Huyet hoc']==='attention'?9:7}
        fill={sm['Huyet hoc']==='attention'?'#E24B4A':'#1D7A6E'} stroke="white" strokeWidth="1.5"/>
      {sm['Huyet hoc']==='attention'&&(
        <circle cx="451" cy="210" r="14" fill="none" stroke="#E24B4A" strokeWidth="1.6" opacity="0.28"/>
      )}

      {/* Joint dots */}
      <circle cx="387" cy="322" r="8"
        fill={sm['Xuong khop']==='attention'?'#E24B4A':'#1D7A6E'} stroke="white" strokeWidth="1.3"/>
      <circle cx="515" cy="322" r="8"
        fill={sm['Xuong khop']==='attention'?'#E24B4A':'#1D7A6E'} stroke="white" strokeWidth="1.3"/>

      {/* Left labels */}
      {SYSTEMS_LEFT.map((s, i) => (
        <Box key={s.key} x={LX} y={START_Y + i * GAP}
          l1={s.l1} l2={s.l2} sysKey={s.key} sm={sm} isLeft={true}/>
      ))}

      {/* Right labels */}
      {SYSTEMS_RIGHT.map((s, i) => (
        <Box key={s.key} x={RX} y={START_Y + i * GAP}
          l1={s.l1} l2={s.l2} sysKey={s.key} sm={sm} isLeft={false}/>
      ))}

      {/* Legend */}
      <rect x="70" y="542" width="762" height="54" rx="12"
        fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1"/>
      {[
        { x:100, label:'Trong giới hạn tham chiếu', fill:'#1D7A6E' },
        { x:370, label:'Cần trao đổi với bác sĩ',   fill:'#E24B4A' },
        { x:582, label:'Chưa đủ dữ liệu',            fill:'#9CA3AF' },
      ].map(lg => (
        <g key={lg.label}>
          <circle cx={lg.x} cy={569} r="9" fill={lg.fill}/>
          <text x={lg.x + 18} y={574}
            fontFamily="Be Vietnam Pro,system-ui,sans-serif"
            fontSize="14" fill="#4B5563">{lg.label}</text>
        </g>
      ))}
    </svg>
  )
}