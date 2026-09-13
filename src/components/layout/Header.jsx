import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/hiragana',   label: 'Hiragana',   icon: 'あ' },
  { to: '/katakana',   label: 'Katakana',   icon: 'ア' },
  { to: '/vocabulary', label: 'Vocabulary', icon: '📖' },
  { to: '/grammar',    label: 'Grammar',    icon: '✏️' },
  { to: '/quiz',       label: 'Quiz',       icon: '🎯' },
  { to: '/progress',   label: 'Progress',   icon: '⭐' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen) document.body.classList.add('scroll-lock');
    else document.body.classList.remove('scroll-lock');
  }, [drawerOpen]);

  return (
    <>
      <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
        <div className="header__inner">
          <Link to="/" className="header__logo" onClick={() => setDrawerOpen(false)}>
            <span className="header__logo-icon">☕</span>
            <span className="header__logo-text">
              Yururi Cafe
              <span className="header__logo-sub">ゆるりカフェ</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="nav" aria-label="Main navigation">
            <ul className="nav__list">
              {NAV_LINKS.map(({ to, label, icon }) => (
                <li key={to} className="nav__item">
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `nav__link${isActive ? ' nav__link--active' : ''}`
                    }
                  >
                    <span className="nav__icon" aria-hidden="true">{icon}</span>
                    <span className="nav__label">{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hamburger */}
          <button
            className={`hamburger${drawerOpen ? ' hamburger--open' : ''}`}
            onClick={() => setDrawerOpen((o) => !o)}
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={drawerOpen}
          >
            <span className="hamburger__line" />
            <span className="hamburger__line" />
            <span className="hamburger__line" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="drawer" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="drawer__overlay" onClick={() => setDrawerOpen(false)} />
          <div className="drawer__panel">
            <nav className="nav-mobile" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `nav-mobile__link${isActive ? ' nav-mobile__link--active' : ''}`
                  }
                  onClick={() => setDrawerOpen(false)}
                >
                  <span aria-hidden="true">{icon}</span>
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
