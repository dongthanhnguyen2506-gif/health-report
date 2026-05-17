import type { SystemMap } from '@/lib/types'

const SYSTEMS: { key: string; label: string; side: 'left'|'right'; y: number }[] = [
  { key:'Huyet hoc',   label:'Huyết học',               side:'left',  y:170 },
  { key:'Tim mach',    label:'Tim mạch',                side:'left',  y:202 },
  { key:'Gan Mat',     label:'Gan - Mật',               side:'left',  y:234 },
  { key:'Than',        label:'Thận - Tiết niệu',        side:'left',  y:266 },
  { key:'Duong huyet', label:'Tiêu hóa / Đường huyết',  side:'left',  y:298 },
  { key:'Tuyen giap',  label:'Tuyến giáp',              side:'left',  y:330 },
  { key:'Xuong khop',  label:'Xương khớp',              side:'left',  y:362 },
  { key:'Mach mau',    label:'Mỡ máu / Mạch máu',      side:'right', y:170 },
  { key:'Viem',        label:'Viêm / Phản ứng viêm',   side:'right', y:202 },
  { key:'Ung thu',     label:'Chỉ số ung thư',          side:'right', y:234 },
  { key:'Phoi',        label:'Phổi',                    side:'right', y:266 },
  { key:'Phu khoa',    label:'Phụ khoa',                side:'right', y:298 },
  { key:'Vu',          label:'Vú',                      side:'right', y:330 },
  { key:'Mat',         label:'Mắt',                     side:'right', y:362 },
  { key:'Tai Mui Hong',label:'Tai Mũi Họng',            side:'right', y:394 },
]

function sc(s: string) {
  if (s==='attention') return { fill:'#FAEAEA', stroke:'#E24B4A', dot:'#E24B4A', text:'#A32D2D', fw:'700' }
  if (s==='normal')    return { fill:'#E6F4F2', stroke:'#1D7A6E', dot:'#1D7A6E', text:'#0F5C52', fw:'600' }
  return { fill:'#F3F4F6', stroke:'#9CA3AF', dot:'#9CA3AF', text:'#6B7280', fw:'400' }
}

export default function HealthMap({ sm }: { sm: SystemMap }) {
  const BOX_W = 148  // wider boxes
  const BOX_H = 28   // taller boxes
  const FONT  = 12   // larger font

  return (
    <svg viewBox="0 0 740 530" xmlns="http://www.w3.org/2000/svg"
      style={{ width:'100%', height:'auto', display:'block', minWidth:320 }}
      role="img" aria-label="Bản đồ tổng quan sức khỏe">

      {/* ── BODY ── */}
      {/* Neck */}
      <rect x="343" y="130" width="24" height="20" rx="5" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.8"/>
      {/* Torso */}
      <path d="M314,150 C297,157 290,178 291,208 C292,228 295,248 297,266 L413,266 C415,248 418,228 419,208 C420,178 413,157 396,150 Z" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.9"/>
      <ellipse cx="303" cy="162" rx="18" ry="12" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.7"/>
      <ellipse cx="407" cy="162" rx="18" ry="12" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.7"/>
      {/* Left arm */}
      <path d="M287,160 C274,166 266,183 264,203 C262,216 264,226 266,236 L278,234 C276,224 274,214 276,203 C278,184 284,168 296,162 Z" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.7"/>
      <path d="M266,236 C264,250 264,266 268,278 L280,276 C276,264 276,250 278,234 Z" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.7"/>
      <ellipse cx="273" cy="282" rx="10" ry="6" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.5"/>
      {/* Right arm */}
      <path d="M423,160 C436,166 444,183 446,203 C448,216 446,226 444,236 L432,234 C434,224 436,214 434,203 C432,184 426,168 414,162 Z" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.7"/>
      <path d="M444,236 C446,250 446,266 442,278 L430,276 C434,264 434,250 432,234 Z" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.7"/>
      <ellipse cx="437" cy="282" rx="10" ry="6" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.5"/>
      {/* Pelvis */}
      <path d="M297,266 C291,276 289,290 293,302 L417,302 C421,290 419,276 413,266 Z" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.8"/>
      {/* Legs */}
      <path d="M297,302 C291,312 289,333 291,353 C293,366 297,376 301,384 L319,382 C315,374 311,364 309,351 C307,332 307,312 313,302 Z" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.7"/>
      <path d="M301,384 C299,398 299,414 301,426 L315,424 C313,412 313,398 319,382 Z" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.7"/>
      <ellipse cx="306" cy="430" rx="13" ry="6" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.5"/>
      <path d="M413,302 C419,312 421,333 419,353 C417,366 413,376 409,384 L391,382 C395,374 399,364 401,351 C403,332 403,312 397,302 Z" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.7"/>
      <path d="M409,384 C411,398 411,414 409,426 L395,424 C397,412 397,398 391,382 Z" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.7"/>
      <ellipse cx="404" cy="430" rx="13" ry="6" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.5"/>
      {/* Head */}
      <ellipse cx="355" cy="102" rx="34" ry="40" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.9"/>
      <path d="M321,92 C320,65 332,55 355,54 C378,55 390,65 389,92 C385,77 377,69 355,69 C333,69 325,77 321,92 Z" fill="#4A3728"/>
      <ellipse cx="355" cy="102" rx="4" ry="3" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.7"/>
      <ellipse cx="322" cy="103" rx="5" ry="7" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.6"/>
      <ellipse cx="388" cy="103" rx="5" ry="7" fill="#F5CBA7" stroke="#D4956A" strokeWidth="0.6"/>
      <ellipse cx="343" cy="100" rx="5" ry="4" fill="white" stroke="#D4956A" strokeWidth="0.4"/>
      <ellipse cx="367" cy="100" rx="5" ry="4" fill="white" stroke="#D4956A" strokeWidth="0.4"/>
      <circle cx="343" cy="100" r="2.5" fill="#2C3E50"/>
      <circle cx="367" cy="100" r="2.5" fill="#2C3E50"/>
      <path d="M336,88 C338,86 348,86 350,88" stroke="#4A3728" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
      <path d="M358,88 C360,86 370,86 372,88" stroke="#4A3728" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
      <path d="M347,118 C350,121 360,121 363,118" stroke="#C8956C" strokeWidth="0.9" fill="none" strokeLinecap="round"/>

      {/* ── ORGANS ── */}
      <rect x="349" y="140" width="9" height="14" rx="3" fill="#AED6F1" stroke="#5DADE2" strokeWidth="0.6"/>
      <ellipse cx="349" cy="145" rx="4" ry="3" fill="#1D7A6E" stroke="white" strokeWidth="0.5"/>
      <ellipse cx="359" cy="145" rx="4" ry="3" fill="#1D7A6E" stroke="white" strokeWidth="0.5"/>
      {/* Lungs */}
      <path d="M316,157 C308,162 304,175 305,192 C306,205 310,215 314,221 C318,215 320,202 320,187 L320,157 Z" fill="#E8A0A0" stroke="#C97070" strokeWidth="0.6" opacity="0.85"/>
      <path d="M394,157 C402,162 406,175 405,192 C404,205 400,215 396,221 C392,215 390,202 390,187 L390,157 Z" fill="#E8A0A0" stroke="#C97070" strokeWidth="0.6" opacity="0.85"/>
      {/* Heart */}
      <path d="M347,172 C347,165 341,161 335,164 C329,167 327,175 332,183 C335,187 342,193 347,197 C352,193 359,187 362,183 C367,175 365,167 359,164 C353,161 347,165 347,172 Z"
        fill={sm['Tim mach']==='attention'?'#E74C3C':'#1D7A6E'} stroke="white" strokeWidth="0.8"/>
      {/* Liver */}
      <path d="M365,202 C371,199 383,199 389,205 C393,209 393,219 387,225 C381,231 369,231 363,225 C357,219 357,207 365,202 Z"
        fill={sm['Gan Mat']==='attention'?'#E74C3C':'#935116'} stroke="white" strokeWidth="0.7" opacity="0.9"/>
      {/* Stomach */}
      <path d="M328,207 C322,211 320,221 324,229 C328,235 338,237 346,233 C348,225 348,215 344,209 C340,203 332,204 328,207 Z" fill="#F39C12" stroke="#D68910" strokeWidth="0.6" opacity="0.85"/>
      {/* Pancreas */}
      <path d="M338,237 C346,235 356,235 362,239 C364,243 362,247 356,247 C350,247 342,245 338,241 Z"
        fill={sm['Duong huyet']==='attention'?'#E67E22':'#D35400'} stroke="white" strokeWidth="0.5" opacity="0.75"/>
      {/* Kidneys */}
      <path d="M304,229 C298,229 292,235 292,245 C292,255 298,261 306,261 C311,261 314,255 312,245 C310,237 308,229 304,229 Z"
        fill={sm['Than']==='attention'?'#E74C3C':'#1D7A6E'} stroke="white" strokeWidth="0.7"/>
      <path d="M406,229 C412,229 418,235 418,245 C418,255 412,261 404,261 C399,261 396,255 398,245 C400,237 402,229 406,229 Z"
        fill={sm['Than']==='attention'?'#E74C3C':'#1D7A6E'} stroke="white" strokeWidth="0.7"/>
      {/* Intestines */}
      <path d="M314,262 C306,265 302,277 306,287 C310,297 322,301 336,301 C350,301 362,301 370,301 C384,297 394,293 398,283 C402,273 396,263 388,261 C380,259 368,259 356,260 C344,261 324,259 314,262 Z" fill="#E8D5B7" stroke="#C8A96A" strokeWidth="0.6" opacity="0.8"/>
      {/* Vessels */}
      <line x1="356" y1="157" x2="356" y2="262" stroke="#C0392B" strokeWidth="1.8" opacity="0.5"/>
      <line x1="352" y1="159" x2="352" y2="260" stroke="#1A5276" strokeWidth="1.3" opacity="0.4"/>
      {/* Blood dot */}
      <circle cx="354" cy="192" r={sm['Huyet hoc']==='attention'?6:5}
        fill={sm['Huyet hoc']==='attention'?'#E24B4A':'#1D7A6E'} stroke="white" strokeWidth="1.3"/>
      {sm['Huyet hoc']==='attention'&&<circle cx="354" cy="192" r="10" fill="none" stroke="#E24B4A" strokeWidth="1.4" opacity="0.35"/>}
      {/* Joint dots */}
      <circle cx="300" cy="288" r="5" fill={sm['Xuong khop']==='attention'?'#E24B4A':'#1D7A6E'} stroke="white" strokeWidth="1.2"/>
      <circle cx="410" cy="288" r="5" fill={sm['Xuong khop']==='attention'?'#E24B4A':'#1D7A6E'} stroke="white" strokeWidth="1.2"/>

      {/* ── SYSTEM LABELS ── */}
      {SYSTEMS.map(sys => {
        const st = sm[sys.key] || 'nodata'
        const c  = sc(st)
        const isL = sys.side === 'left'
        const BX  = isL ? 16 : 740 - 16 - BOX_W
        const lineX1 = isL ? BX + BOX_W : BX
        const lineX2 = isL ? 292 : 418
        return (
          <g key={sys.key}>
            <line x1={lineX1} y1={sys.y + BOX_H/2} x2={lineX2} y2={sys.y + BOX_H/2}
              stroke={c.dot} strokeWidth="1" strokeDasharray="4,3" opacity="0.55"/>
            <rect x={BX} y={sys.y} width={BOX_W} height={BOX_H} rx="7"
              fill={c.fill} stroke={c.stroke} strokeWidth="1"/>
            <circle cx={BX + 16} cy={sys.y + BOX_H/2} r="5.5" fill={c.dot}/>
            {st==='attention'&&<circle cx={BX+16} cy={sys.y+BOX_H/2} r="9" fill="none" stroke={c.dot} strokeWidth="1.4" opacity="0.3"/>}
            <text x={BX + 28} y={sys.y + BOX_H/2 + FONT*0.36}
              fontFamily="Be Vietnam Pro, system-ui, sans-serif"
              fontSize={FONT} fontWeight={c.fw} fill={c.text}>{sys.label}</text>
          </g>
        )
      })}

      {/* ── LEGEND ── */}
      <rect x="100" y="462" width="548" height="44" rx="10" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="0.8"/>
      {[
        { x:122, label:'Trong giới hạn tham chiếu', fill:'#1D7A6E' },
        { x:298, label:'Cần trao đổi thêm với bác sĩ', fill:'#E24B4A' },
        { x:478, label:'Chưa đủ dữ liệu', fill:'#9CA3AF' },
      ].map(lg => (
        <g key={lg.label}>
          <circle cx={lg.x} cy={481} r="6" fill={lg.fill}/>
          <text x={lg.x + 12} y={485.5} fontFamily="Be Vietnam Pro, system-ui, sans-serif" fontSize="12" fill="#6B7280">{lg.label}</text>
        </g>
      ))}
    </svg>
  )
}
