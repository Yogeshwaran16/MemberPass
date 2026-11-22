import React from 'react';
import { QrCode, Wifi, ShieldCheck, Sparkles } from 'lucide-react';

export default function DigitalPassCard() {
  return (
    <div className="digital-pass-card-container" style={{ position: 'relative', width: '100%', maxWidth: '420px', margin: '0 auto' }}>

      {/* Ambient background glow */}
      <div style={{
        position: 'absolute', inset: '-8px',
        background: 'linear-gradient(135deg, #244B3C, #C5A878, #18382D)',
        borderRadius: '28px',
        filter: 'blur(22px)',
        opacity: 0.28,
        pointerEvents: 'none',
      }} />

      {/* Card body */}
      <div style={{
        position: 'relative',
        borderRadius: '24px',
        background: 'linear-gradient(145deg, #18382D 0%, #0F261E 55%, #18382D 100%)',
        color: '#F7F6F2',
        padding: '28px 28px 24px',
        border: '1px solid rgba(197,168,120,0.38)',
        overflow: 'hidden',
        boxShadow: '0 32px 64px -16px rgba(24,56,45,0.5), 0 8px 24px rgba(36,75,60,0.18)',
      }}>

        {/* Decorative background geometry */}
        <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '160px', height: '160px', borderRadius: '50%', border: '1px solid rgba(197,168,120,0.18)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20px', right: '20px', width: '100px', height: '100px', borderRadius: '50%', border: '1px solid rgba(36,75,60,0.25)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: '20%', width: '260px', height: '100px', background: 'linear-gradient(to top, rgba(36,75,60,0.2), transparent)', pointerEvents: 'none' }} />

        {/* Top row: Brand + NFC badge */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 1, marginBottom: '22px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#C5A878', display: 'inline-block' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', color: '#C5A878', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                MemberPass
              </span>
            </div>
            <p style={{ fontSize: '10px', color: 'rgba(247,246,242,0.7)', marginTop: '3px', letterSpacing: '0.15em', fontWeight: 400, fontFamily: 'Inter, sans-serif' }}>
              DIGITAL IDENTITY PASS
            </p>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            padding: '4px 10px', borderRadius: '20px',
            background: 'rgba(247,246,242,0.08)',
            border: '1px solid rgba(197,168,120,0.3)',
            color: '#C5A878',
          }}>
            <Wifi size={12} style={{ transform: 'rotate(90deg)' }} />
            <span style={{ fontSize: '9px', fontFamily: 'monospace', letterSpacing: '0.15em' }}>NFC</span>
          </div>
        </div>

        {/* Chip + VIP badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1, marginBottom: '20px' }}>
          {/* EMV Microchip */}
          <div style={{
            width: '48px', height: '36px',
            background: 'linear-gradient(135deg, #D8BE93 0%, #F7F6F2 50%, #C5A878 100%)',
            borderRadius: '6px',
            border: '1px solid rgba(24,56,45,0.3)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            padding: '5px',
            gap: '2px',
          }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ borderRadius: '1px', border: '0.5px solid rgba(24,56,45,0.25)', background: 'rgba(36,75,60,0.15)' }} />
            ))}
          </div>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            padding: '4px 12px', borderRadius: '20px',
            background: 'rgba(36,75,60,0.45)',
            border: '1px solid rgba(197,168,120,0.4)',
          }}>
            <Sparkles size={11} color="#C5A878" />
            <span style={{ fontSize: '10px', fontWeight: 600, color: '#F7F6F2', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>
              VERIFIED TIER
            </span>
          </div>
        </div>

        {/* Cardholder name */}
        <div style={{ position: 'relative', zIndex: 1, marginBottom: '22px' }}>
          <div style={{ fontSize: '9px', color: '#C5A878', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '4px' }}>
            MEMBER NAME
          </div>
          <div style={{ fontSize: '20px', fontFamily: 'DM Serif Display, Playfair Display, serif', fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.02em' }}>
            Alexander Vance
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(247,246,242,0.7)', marginTop: '3px', fontWeight: 400, fontFamily: 'Inter, sans-serif' }}>
            Standard Membership · 25 Sessions Active
          </div>
        </div>

        {/* Bottom: ID, expiry, QR */}
        <div style={{
          position: 'relative', zIndex: 1,
          paddingTop: '18px',
          borderTop: '1px solid rgba(247,246,242,0.15)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: '9px', color: 'rgba(197,168,120,0.9)', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '4px' }}>
              PASS ID &amp; VALIDITY
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '13px', letterSpacing: '0.12em', color: '#F7F6F2', marginBottom: '4px' }}>
              MP-8849-2026
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'rgba(247,246,242,0.75)' }}>
              <ShieldCheck size={13} color="#C5A878" />
              <span style={{ fontFamily: 'monospace', letterSpacing: '0.08em' }}>EXPIRES: 12 / 2026</span>
            </div>
          </div>

          {/* QR Code area */}
          <div style={{
            padding: '8px', borderRadius: '12px',
            background: '#F7F6F2',
            border: '2px solid #C5A878',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            boxShadow: '0 6px 16px rgba(24,56,45,0.25)',
          }}>
            <QrCode size={42} color="#18382D" strokeWidth={1.5} />
            <span style={{ fontSize: '8px', fontFamily: 'monospace', color: '#244B3C', fontWeight: 700, letterSpacing: '0.15em', marginTop: '3px' }}>
              SCAN PASS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
