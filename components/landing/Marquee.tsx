const S = 'rgba(255,255,255,0.25)'
const F = 'rgba(255,255,255,0.13)'
const W = 'rgba(217,224,232,0.85)'
type WC = 'wf1'|'wf2'|'wf3'|'wf4'|'wf5'|'wf6'|''

function Win({x,y,w=4,h=3,c}:{x:number;y:number;w?:number;h?:number;c:WC}) {
  if (!c) return <rect x={x} y={y} width={w} height={h} fill={W} opacity={0}/>
  return <rect x={x} y={y} width={w} height={h} fill={W} className={c}/>
}

// ── Unchanged buildings ───────────────────────────────────────────────────────

function SoloSpire() {
  const fh = 66/11
  const cc:WC[] = ['wf1','','wf4','wf2','','wf3','wf5','','wf1','wf6','']
  return (
    <svg width={12} height={68} style={{display:'block'}}>
      <line x1={6} y1={0} x2={6} y2={2} stroke={S} strokeWidth={0.6}/>
      <rect x={1} y={2} width={10} height={66} fill="none" stroke={S} strokeWidth={0.7}/>
      {[...Array(10)].map((_,i) => <line key={i} x1={1} y1={2+(i+1)*fh} x2={11} y2={2+(i+1)*fh} stroke={F} strokeWidth={0.4}/>)}
      {cc.map((c,i) => <Win key={i} x={4} y={2+i*fh+1.5} w={3} h={2} c={c}/>)}
    </svg>
  )
}

function Tower1() {
  const fh = 63/8
  const lc:WC[] = ['wf1','wf3','','wf2','wf5','','wf4','wf1']
  const rc:WC[] = ['','wf2','wf4','wf1','','wf3','wf6','wf2']
  return (
    <svg width={20} height={68} style={{display:'block'}}>
      <rect x={1} y={5} width={18} height={63} fill="none" stroke={S} strokeWidth={0.7}/>
      {[...Array(7)].map((_,i) => <line key={i} x1={1} y1={5+(i+1)*fh} x2={19} y2={5+(i+1)*fh} stroke={F} strokeWidth={0.4}/>)}
      {lc.map((c,i) => <Win key={`l${i}`} x={3} y={5+i*fh+2} c={c}/>)}
      {rc.map((c,i) => <Win key={`r${i}`} x={13} y={5+i*fh+2} c={c}/>)}
    </svg>
  )
}

function Skyscraper() {
  const fh = 67/10
  const lc:WC[] = ['wf1','','wf3','wf5','wf2','','wf4','wf1','','wf6']
  const rc:WC[] = ['','wf4','wf1','','wf3','wf6','wf1','','wf2','wf5']
  return (
    <svg width={14} height={68} style={{display:'block'}}>
      <rect x={1} y={1} width={12} height={67} fill="none" stroke={S} strokeWidth={0.7}/>
      {[...Array(9)].map((_,i) => <line key={i} x1={1} y1={1+(i+1)*fh} x2={13} y2={1+(i+1)*fh} stroke={F} strokeWidth={0.4}/>)}
      {lc.map((c,i) => <Win key={`l${i}`} x={2} y={1+i*fh+1.5} w={3} h={2} c={c}/>)}
      {rc.map((c,i) => <Win key={`r${i}`} x={9} y={1+i*fh+1.5} w={3} h={2} c={c}/>)}
    </svg>
  )
}

function TwinTower() {
  const lfh = 65/8, rfh = 53/6
  const lc:WC[] = ['wf5','wf1','','wf3','wf2','','wf4','wf1']
  const rc:WC[] = ['wf2','wf4','','wf1','wf3','wf6']
  return (
    <svg width={34} height={68} style={{display:'block'}}>
      <rect x={0} y={3} width={15} height={65} fill="none" stroke={S} strokeWidth={0.7}/>
      {[...Array(7)].map((_,i) => <line key={i} x1={0} y1={3+(i+1)*lfh} x2={15} y2={3+(i+1)*lfh} stroke={F} strokeWidth={0.4}/>)}
      {lc.map((c,i) => <Win key={`l${i}`} x={5} y={3+i*lfh+2} w={4} h={3} c={c}/>)}
      <rect x={15} y={26} width={4} height={3} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={0.4}/>
      <rect x={19} y={15} width={15} height={53} fill="none" stroke={S} strokeWidth={0.7}/>
      {[...Array(5)].map((_,i) => <line key={i} x1={19} y1={15+(i+1)*rfh} x2={34} y2={15+(i+1)*rfh} stroke={F} strokeWidth={0.4}/>)}
      {rc.map((c,i) => <Win key={`r${i}`} x={24} y={15+i*rfh+2} w={4} h={3} c={c}/>)}
    </svg>
  )
}

function CondoTower() {
  const ufh = 16/2, mfh = 44/4
  const uc:WC[] = ['wf3','wf1']
  const lc:WC[] = ['wf2','wf5','','wf4']
  const rc:WC[] = ['','wf1','wf3','wf6']
  return (
    <svg width={24} height={68} style={{display:'block'}}>
      <rect x={4} y={8} width={16} height={16} fill="none" stroke={S} strokeWidth={0.7}/>
      <line x1={4} y1={8+ufh} x2={20} y2={8+ufh} stroke={F} strokeWidth={0.4}/>
      {uc.map((c,i) => <Win key={`u${i}`} x={9} y={8+i*ufh+2} w={5} h={4} c={c}/>)}
      <rect x={0} y={24} width={24} height={44} fill="none" stroke={S} strokeWidth={0.7}/>
      {[...Array(3)].map((_,i) => <line key={i} x1={0} y1={24+(i+1)*mfh} x2={24} y2={24+(i+1)*mfh} stroke={F} strokeWidth={0.4}/>)}
      {lc.map((c,i) => <Win key={`l${i}`} x={2} y={24+i*mfh+2} w={4} h={4} c={c}/>)}
      {rc.map((c,i) => <Win key={`r${i}`} x={18} y={24+i*mfh+2} w={4} h={4} c={c}/>)}
    </svg>
  )
}

function SteppedBlock() {
  const lfh = 58/6, rfh = 42/4
  const lc:WC[] = ['wf3','wf1','','wf4','wf2','wf6']
  const rc1:WC[] = ['wf1','wf4','','wf2']
  const rc2:WC[] = ['wf4','','wf2','wf5']
  return (
    <svg width={38} height={68} style={{display:'block'}}>
      <rect x={0} y={10} width={18} height={58} fill="none" stroke={S} strokeWidth={0.7}/>
      {[...Array(5)].map((_,i) => <line key={i} x1={0} y1={10+(i+1)*lfh} x2={18} y2={10+(i+1)*lfh} stroke={F} strokeWidth={0.4}/>)}
      {lc.map((c,i) => <Win key={`l${i}`} x={6} y={10+i*lfh+2} w={4} h={3} c={c}/>)}
      <rect x={18} y={26} width={20} height={42} fill="none" stroke={S} strokeWidth={0.7}/>
      {[...Array(3)].map((_,i) => <line key={i} x1={18} y1={26+(i+1)*rfh} x2={38} y2={26+(i+1)*rfh} stroke={F} strokeWidth={0.4}/>)}
      {rc1.map((c,i) => <Win key={`r1${i}`} x={21} y={26+i*rfh+2} w={4} h={3} c={c}/>)}
      {rc2.map((c,i) => <Win key={`r2${i}`} x={30} y={26+i*rfh+2} w={4} h={3} c={c}/>)}
    </svg>
  )
}

function LargeComplex() {
  const fh = 56/5
  const p:WC[][] = [
    ['wf3','','wf1','wf4','wf6'],
    ['wf1','wf5','','wf2','wf4'],
    ['','wf2','wf4','','wf1'],
    ['wf4','wf1','wf6','wf3',''],
  ]
  return (
    <svg width={42} height={68} style={{display:'block'}}>
      <rect x={1} y={12} width={40} height={56} fill="none" stroke={S} strokeWidth={0.7}/>
      {[...Array(4)].map((_,i) => <line key={i} x1={1} y1={12+(i+1)*fh} x2={41} y2={12+(i+1)*fh} stroke={F} strokeWidth={0.4}/>)}
      {[4,13,22,31].map((cx,ci) => p[ci].map((c,ri) => (
        <Win key={`${ci}-${ri}`} x={cx} y={12+ri*fh+2} w={5} h={4} c={c}/>
      )))}
    </svg>
  )
}

// Taller start for more height contrast
function NarrowTower() {
  const fh = 62/6
  const cc:WC[] = ['wf2','wf4','','wf1','wf5','wf3']
  return (
    <svg width={14} height={68} style={{display:'block'}}>
      <rect x={1} y={6} width={12} height={62} fill="none" stroke={S} strokeWidth={0.7}/>
      {[...Array(5)].map((_,i) => <line key={i} x1={1} y1={6+(i+1)*fh} x2={13} y2={6+(i+1)*fh} stroke={F} strokeWidth={0.4}/>)}
      {cc.map((c,i) => <Win key={i} x={5} y={6+i*fh+2} w={3} h={3} c={c}/>)}
    </svg>
  )
}

function FlatTop() {
  const fh = 41/4
  const lc:WC[] = ['wf2','wf4','','wf1']
  const rc:WC[] = ['','wf3','wf5','wf2']
  return (
    <svg width={28} height={68} style={{display:'block'}}>
      <rect x={2} y={23} width={24} height={4} fill="none" stroke={S} strokeWidth={0.7}/>
      <rect x={0} y={27} width={28} height={41} fill="none" stroke={S} strokeWidth={0.7}/>
      {[...Array(3)].map((_,i) => <line key={i} x1={0} y1={27+(i+1)*fh} x2={28} y2={27+(i+1)*fh} stroke={F} strokeWidth={0.4}/>)}
      {lc.map((c,i) => <Win key={`l${i}`} x={4} y={27+i*fh+2} w={5} h={4} c={c}/>)}
      {rc.map((c,i) => <Win key={`r${i}`} x={19} y={27+i*fh+2} w={5} h={4} c={c}/>)}
    </svg>
  )
}

function ClubHouse() {
  const fh = 26/2
  return (
    <svg width={50} height={68} style={{display:'block'}}>
      <rect x={0} y={38} width={50} height={4} fill="none" stroke={S} strokeWidth={0.7}/>
      <rect x={0} y={42} width={50} height={26} fill="none" stroke={S} strokeWidth={0.7}/>
      <line x1={0} y1={42+fh} x2={50} y2={42+fh} stroke={F} strokeWidth={0.4}/>
      {[5,20,35].map((cx,ci) => {
        const cs:WC[] = [['wf3','wf1'],['wf5','wf2'],['wf1','wf4']][ci] as WC[]
        return cs.map((c,ri) => <Win key={`${ci}-${ri}`} x={cx} y={42+ri*fh+3} w={10} h={8} c={c}/>)
      })}
    </svg>
  )
}

// Shorter body for stronger height contrast
function LowRise() {
  const fh = 24/3
  const p:WC[][] = [
    ['wf3','wf1','wf5'],
    ['','wf4','wf2'],
    ['wf2','','wf4'],
    ['wf5','wf3',''],
  ]
  return (
    <svg width={46} height={68} style={{display:'block'}}>
      <rect x={6} y={40} width={5} height={4} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={0.5}/>
      <rect x={20} y={39} width={8} height={5} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={0.5}/>
      <rect x={34} y={40} width={5} height={4} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={0.5}/>
      <rect x={1} y={44} width={44} height={24} fill="none" stroke={S} strokeWidth={0.7}/>
      {[...Array(2)].map((_,i) => <line key={i} x1={1} y1={44+(i+1)*fh} x2={45} y2={44+(i+1)*fh} stroke={F} strokeWidth={0.4}/>)}
      {[5,16,27,38].map((cx,ci) => p[ci].map((c,ri) => (
        <Win key={`${ci}-${ri}`} x={cx} y={44+ri*fh+2} w={5} h={4} c={c}/>
      )))}
    </svg>
  )
}

function Villa() {
  return (
    <svg width={40} height={68} style={{display:'block'}}>
      <polyline points="20,33 0,46 40,46" fill="none" stroke={S} strokeWidth={0.8}/>
      <rect x={3} y={46} width={34} height={22} fill="none" stroke={S} strokeWidth={0.7}/>
      <rect x={15} y={57} width={10} height={11} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={0.6}/>
      <Win x={6} y={50} w={8} h={6} c="wf3"/>
      <Win x={26} y={50} w={8} h={6} c="wf1"/>
    </svg>
  )
}

// ── 4 new distinctive buildings ───────────────────────────────────────────────

// Stepped pyramid / ziggurat — wide base tapers to narrow top with antenna
function TaperedTower() {
  return (
    <svg width={40} height={68} style={{display:'block'}}>
      {/* Antenna */}
      <line x1={20} y1={3} x2={20} y2={10} stroke={S} strokeWidth={0.6}/>
      {/* Top tier: x=12..28, y=10..24 */}
      <rect x={12} y={10} width={16} height={14} fill="none" stroke={S} strokeWidth={0.7}/>
      <line x1={12} y1={17} x2={28} y2={17} stroke={F} strokeWidth={0.4}/>
      <Win x={14} y={12} w={4} h={3} c="wf2"/>
      <Win x={22} y={12} w={4} h={3} c="wf5"/>
      <Win x={14} y={19} w={4} h={3} c="wf1"/>
      <Win x={22} y={19} w={4} h={3} c=""/>
      {/* Mid tier: x=6..34, y=24..44 */}
      <rect x={6} y={24} width={28} height={20} fill="none" stroke={S} strokeWidth={0.7}/>
      <line x1={6} y1={34} x2={34} y2={34} stroke={F} strokeWidth={0.4}/>
      <Win x={9} y={27} w={5} h={4} c="wf3"/>
      <Win x={17} y={27} w={5} h={4} c="wf6"/>
      <Win x={25} y={27} w={5} h={4} c="wf1"/>
      <Win x={9} y={37} w={5} h={4} c=""/>
      <Win x={17} y={37} w={5} h={4} c="wf4"/>
      <Win x={25} y={37} w={5} h={4} c="wf2"/>
      {/* Base tier: x=0..40, y=44..68 */}
      <rect x={0} y={44} width={40} height={24} fill="none" stroke={S} strokeWidth={0.7}/>
      <line x1={0} y1={56} x2={40} y2={56} stroke={F} strokeWidth={0.4}/>
      <Win x={4} y={47} w={5} h={4} c="wf5"/>
      <Win x={16} y={47} w={5} h={4} c="wf1"/>
      <Win x={28} y={47} w={5} h={4} c="wf3"/>
      <Win x={4} y={59} w={5} h={4} c="wf2"/>
      <Win x={16} y={59} w={5} h={4} c=""/>
      <Win x={28} y={59} w={5} h={4} c="wf4"/>
    </svg>
  )
}

// Dome-crowned building — semicircular arch top over a rectangular body
function DomeCrown() {
  const fh = 32/3
  const lc:WC[] = ['wf1','wf3','wf5']
  const rc:WC[] = ['wf4','','wf2']
  return (
    <svg width={38} height={68} style={{display:'block'}}>
      {/* Dome arch: sweeps upward from (1,36) to (37,36), peak at (19,14) */}
      <path d="M 1,36 A 18,22 0 0 1 37,36" fill="none" stroke={S} strokeWidth={0.8}/>
      {/* Centre rib from dome peak down to body */}
      <line x1={19} y1={14} x2={19} y2={36} stroke={F} strokeWidth={0.5}/>
      {/* Dome windows */}
      <Win x={5} y={24} w={6} h={5} c="wf2"/>
      <Win x={27} y={24} w={6} h={5} c="wf5"/>
      {/* Building body */}
      <rect x={1} y={36} width={36} height={32} fill="none" stroke={S} strokeWidth={0.7}/>
      {[...Array(2)].map((_,i) => <line key={i} x1={1} y1={36+(i+1)*fh} x2={37} y2={36+(i+1)*fh} stroke={F} strokeWidth={0.4}/>)}
      {lc.map((c,i) => <Win key={`l${i}`} x={4} y={38+i*fh} w={5} h={4} c={c}/>)}
      {rc.map((c,i) => <Win key={`r${i}`} x={29} y={38+i*fh} w={5} h={4} c={c}/>)}
    </svg>
  )
}

// Clock tower — spire + pyramidal crown + belfry with pointed arch + narrow body
function ClockTower() {
  const fh = 48/6
  const cc:WC[] = ['wf1','','wf3','wf5','wf2','wf4']
  return (
    <svg width={18} height={68} style={{display:'block'}}>
      {/* Spire */}
      <line x1={9} y1={0} x2={9} y2={5} stroke={S} strokeWidth={0.7}/>
      {/* Pyramidal crown */}
      <polyline points="4,9 9,4 14,9" fill="none" stroke={S} strokeWidth={0.7}/>
      {/* Belfry */}
      <rect x={3} y={9} width={12} height={11} fill="none" stroke={S} strokeWidth={0.7}/>
      {/* Gothic pointed arch opening in belfry */}
      <polyline points="5,20 5,15 9,11 13,15 13,20" fill="none" stroke={F} strokeWidth={0.5}/>
      {/* Tower body — narrower than belfry */}
      <rect x={5} y={20} width={8} height={48} fill="none" stroke={S} strokeWidth={0.7}/>
      {[...Array(5)].map((_,i) => <line key={i} x1={5} y1={20+(i+1)*fh} x2={13} y2={20+(i+1)*fh} stroke={F} strokeWidth={0.4}/>)}
      {cc.map((c,i) => <Win key={i} x={7} y={22+i*fh} w={3} h={3} c={c}/>)}
    </svg>
  )
}

// Archway building — classical block with a vaulted entrance gate at ground level
function ArchwayBlock() {
  const fh = 47/5
  const lc:WC[] = ['wf4','wf2','','wf3','wf6']
  const rc:WC[] = ['wf1','','wf5','wf2','wf3']
  return (
    <svg width={30} height={68} style={{display:'block'}}>
      {/* Subtle cornice cap */}
      <rect x={0} y={5} width={30} height={3} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth={0.5}/>
      {/* Building body — three sides, open bottom for arch transition */}
      <path d="M 1,55 L 1,8 L 29,8 L 29,55" fill="none" stroke={S} strokeWidth={0.7}/>
      {/* Floor lines */}
      {[...Array(4)].map((_,i) => (
        <line key={i} x1={1} y1={8+(i+1)*fh} x2={29} y2={8+(i+1)*fh} stroke={F} strokeWidth={0.4}/>
      ))}
      {/* Windows */}
      {lc.map((c,i) => <Win key={`l${i}`} x={3} y={10+i*fh} w={4} h={4} c={c}/>)}
      {rc.map((c,i) => <Win key={`r${i}`} x={23} y={10+i*fh} w={4} h={4} c={c}/>)}
      {/* Vaulted arch — sweeps upward from pier tops into building */}
      <path d="M 8,55 A 7,8 0 0 1 22,55" fill="none" stroke={S} strokeWidth={0.7}/>
      {/* Left ground pier */}
      <path d="M 1,55 L 1,68 L 8,68 L 8,55" fill="none" stroke={S} strokeWidth={0.7}/>
      {/* Right ground pier */}
      <path d="M 22,55 L 22,68 L 29,68 L 29,55" fill="none" stroke={S} strokeWidth={0.7}/>
    </svg>
  )
}

// ── Building order: alternates tall/short/wide for interesting silhouette ─────
const BUILDINGS = [
  SoloSpire, Tower1, TaperedTower, LowRise, TwinTower, DomeCrown,
  CondoTower, SteppedBlock, LargeComplex, NarrowTower,
  Skyscraper, ClockTower, ArchwayBlock, FlatTop, ClubHouse, Villa,
]

export default function Marquee() {
  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {[...Array(5)].flatMap((_, si) =>
          BUILDINGS.map((Building, bi) => (
            <span key={`${si}-${bi}`} style={{display:'flex',alignItems:'flex-end',paddingRight:28,flexShrink:0}}>
              <Building/>
            </span>
          ))
        )}
      </div>
    </div>
  )
}
