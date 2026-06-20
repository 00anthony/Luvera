import Image from 'next/image'
import { motion } from 'framer-motion'

interface Benefit {
  title: string
  desc: string
  image: string
}

interface BenefitCardsProps {
  benefits: Benefit[]
  isMobile: boolean
  /** Optional label above the title. Defaults to "Luvera Certified" */
  label?: string
  /** Optional extra className on the wrapping container */
  className?: string
}

export default function BenefitCards({
  benefits,
  isMobile,
  label = 'Luvera Certified',
  className = '',
}: BenefitCardsProps) {
  return (
    <div className={`w-full max-w-xl space-y-3.5 ${className}`}>
      {benefits.map((benefit, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="benefit-item group relative flex items-stretch overflow-hidden rounded-[28px] bg-zinc-900/95 border border-white/[0.09]"
          style={{ minHeight: isMobile ? '88px' : '110px' }}
        >
          {/* Background image */}
          <div
            className="absolute top-0 left-0 bottom-0 overflow-hidden"
            style={{ width: isMobile ? '110px' : '130px' }}
          >
            <Image
              src={benefit.image}
              alt={benefit.title}
              fill
              sizes="130px"
              className="w-full h-full object-cover object-center block"
              loading="lazy"
              decoding="async"
            />
            {/* Feather edge toward text */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, transparent 60%, #111114 100%)',
              }}
            />
          </div>

          {/* Index column */}
          <div
            className="shrink-0 flex flex-col items-center justify-end pb-3 relative z-10 border-r border-white/[0.07]"
            style={{
              width: isMobile ? '36px' : '42px',
              backdropFilter: isMobile ? 'none' : 'blur(12px)',
              WebkitBackdropFilter: isMobile ? 'none' : 'blur(12px)',
              background: isMobile ? 'rgba(17,17,20,0.9)' : 'rgba(17,17,20,0.25)',
            }}
          >
            <span
              className="text-white/35 font-serif"
              style={{
                fontSize: '11px',
                fontWeight: 300,
                letterSpacing: '0.1em',
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Text content */}
          <div className="ml-20 flex-1 flex flex-col justify-center gap-2 px-4 py-5 relative z-10">
            <p
              style={{
                fontSize: '7.5px',
                letterSpacing: '0.36em',
                color: 'rgba(255,255,255,0.25)',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </p>
            <h3
              className="m-0 font-serif italic"
              style={{
                fontSize: isMobile ? '20px' : '26px',
                fontWeight: 100,
                color: '#f0ece6',
                lineHeight: 1.05,
              }}
            >
              {benefit.title}
            </h3>
            <div
              style={{
                height: '0.5px',
                background: 'linear-gradient(to right, rgba(255,255,255,0.12), transparent)',
              }}
            />
            <p
              className="m-0 font-serif"
              style={{
                fontSize: isMobile ? '11px' : '13.5px',
                fontWeight: 300,
                color: 'rgba(240,236,230,0.5)',
                lineHeight: 1.6,
              }}
            >
              {benefit.desc}
            </p>
          </div>

          {/* Ghost number */}
          <div
            className="absolute font-serif right-4 bottom-0 pointer-events-none select-none leading-none z-10"
            style={{ fontSize: '88px', fontWeight: 300, color: 'rgba(255,255,255,0.03)' }}
          >
            {String(i + 1).padStart(2, '0')}
          </div>
        </motion.div>
      ))}
    </div>
  )
}