import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  variant = 'primary',
  size = '',
  full = false,
  to,
  href,
  onClick,
  disabled,
  type = 'button',
  className = '',
  ...rest
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    size && `btn--${size}`,
    full && 'btn--full',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return <Link to={to} className={classes} {...rest}>{children}</Link>;
  }

  if (href) {
    return <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>;
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
