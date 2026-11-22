export default function Logo({ size = 'default', showText = true, light = false }) {
  const isSmall = size === 'small'

  return (
    <div className={`brand-logo-group ${isSmall ? 'logo-sm' : ''} ${light ? 'logo-light' : ''}`}>
      <div className="logo-badge-wrapper">
        <svg
          className="logo-icon-svg"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="sanctuaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#234B3C" />
              <stop offset="100%" stopColor="#17382D" />
            </linearGradient>
            <linearGradient id="goldSunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D8BE93" />
              <stop offset="100%" stopColor="#C3A574" />
            </linearGradient>
          </defs>

          {/* Calming Sanctuary Lotus Icon */}
          <circle cx="32" cy="32" r="28" fill="#F7F5EF" stroke="#C3A574" strokeWidth="1.5" />
          
          {/* Subtle Sun Accent */}
          <circle cx="32" cy="22" r="6" fill="url(#goldSunGrad)" />

          {/* Lotus petal center */}
          <path
            d="M32 26C30 31 27 36 27 41C27 44 29.2 46 32 46C34.8 46 37 44 37 41C37 36 34 31 32 26Z"
            fill="url(#sanctuaryGrad)"
          />

          {/* Left Petal */}
          <path
            d="M26 33C21 34 17 38 18 42C19 45 22 46 25 44C27 42 27.5 37 26 33Z"
            fill="#234B3C"
            opacity="0.85"
          />

          {/* Right Petal */}
          <path
            d="M38 33C43 34 47 38 46 42C45 45 42 46 39 44C37 42 36.5 37 38 33Z"
            fill="#234B3C"
            opacity="0.85"
          />

          {/* Calming Ripple Arc */}
          <path
            d="M20 48C24 50 40 50 44 48"
            stroke="#C3A574"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {showText && (
        <span className="brand-title-text">
          <span className="brand-title-main">Member</span>
          <span className="brand-title-accent">Pass</span>
          <span className="brand-wellness-tag">YOGA &bull; RETREATS</span>
        </span>
      )}
    </div>
  )
}
