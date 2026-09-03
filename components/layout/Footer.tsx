import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#1A1A18',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '28px 24px',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: '0.82rem',
          color: '#9E9E8E',
          letterSpacing: '0.02em',
          lineHeight: 1.6,
        }}
      >
        &copy; 2026 Sejarah Indonesia - Zaman Pra-Aksara.{' '}
      </p>
    </footer>
  );
}