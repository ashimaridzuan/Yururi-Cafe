import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div className="footer__brand">☕ Yururi Cafe ゆるりカフェ</div>
          <div className="footer__tagline">A cozy place to learn Japanese — one cup at a time.</div>
        </div>
        <div className="footer__credits">
          Made with ♡ by Snoopy Nova &nbsp;•&nbsp; {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
