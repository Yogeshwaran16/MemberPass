import React from 'react'
import {
  Zap,
  ShieldCheck,
  Server,
  Smartphone,
  Key,
  QrCode,
  TrendingUp,
  Gem,
  Brain,
  Sliders,
  Bot,
  Users,
  Compass,
  Layers,
  Flower2,
  Mail,
  MapPin,
  Clock,
  Send,
  Info,
  LogIn,
  CheckCircle,
  RefreshCw,
  Gauge,
  Home,
  Sparkles,
  ChevronRight,
  Check,
  Copy,
  Loader2,
  CreditCard,
  CalendarCheck,
  Hourglass,
  PauseCircle
} from 'lucide-react'

// Icon lookup dictionary mapping FontAwesome class names directly to Lucide SVG components
const iconMap = {
  // Navigation & Actions
  'fa-house': Home,
  'fa-arrow-right-to-bracket': LogIn,
  'fa-gauge-high': Gauge,
  'fa-rotate-right': RefreshCw,
  'fa-arrows-rotate': RefreshCw,
  'fa-chevron-right': ChevronRight,
  'fa-paper-plane': Send,
  'fa-copy': Copy,
  'fa-check': Check,
  'fa-circle-check': CheckCircle,
  'fa-circle-info': Info,
  'fa-spinner': Loader2,

  // Architecture & Technology
  'fa-bolt': Zap,
  'fa-shield-halved': ShieldCheck,
  'fa-server': Server,
  'fa-mobile-screen': Smartphone,
  'fa-key': Key,
  'fa-qrcode': QrCode,
  'fa-chart-line': TrendingUp,
  'fa-gem': Gem,
  'fa-brain': Brain,
  'fa-sliders': Sliders,
  'fa-robot': Bot,
  'fa-address-book': Users,

  // Wellness Journey
  'fa-compass': Compass,
  'fa-layer-group': Layers,
  'fa-spa': Flower2,

  // Contact Meta
  'fa-envelope': Mail,
  'fa-location-dot': MapPin,
  'fa-clock': Clock,

  // AI Assistant Suggested Prompts
  'fa-id-card-clip': CreditCard,
  'fa-calendar-check': CalendarCheck,
  'fa-hourglass-half': Hourglass,
  'fa-circle-pause': PauseCircle,
  'fa-wand-magic-sparkles': Sparkles
}

/**
 * Universal Icon Component
 * Drop-in, zero-network replacement for Font Awesome <i> tags.
 * Preserves exact icon layout, colors, and spinning animations.
 */
export default function Icon({ name, className = '', size = 16, style = {} }) {
  // Normalize input string: extract the specific icon identifier (e.g., 'fa-solid fa-gem' -> 'fa-gem')
  const matchedKey = Object.keys(iconMap).find((key) => className.includes(key) || name === key)
  const Component = matchedKey ? iconMap[matchedKey] : null

  if (!Component) {
    return <span className={className} style={style} />
  }

  const isSpinning = className.includes('fa-spin') || className.includes('spin')
  const iconStyle = {
    display: 'inline-block',
    verticalAlign: 'middle',
    animation: isSpinning ? 'rotateSlow 1s linear infinite' : undefined,
    ...style
  }

  return <Component size={size} className={className} style={iconStyle} strokeWidth={2} />
}
