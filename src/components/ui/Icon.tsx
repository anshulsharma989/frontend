interface IconProps {
  name: string;
  className?: string;
}

/** Renders a Material Symbols Outlined glyph by name. */
export function Icon({ name, className = "" }: IconProps) {
  return <span className={`material-symbols-outlined ${className}`}>{name}</span>;
}
