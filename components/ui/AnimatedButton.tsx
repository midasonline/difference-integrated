"use client";

import { HoverText } from "./HoverText";

type AnimatedButtonProps = {
  children: string;
  href?: string;
  accent?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function AnimatedButton({
  children,
  href,
  accent = false,
  className = "",
  onClick,
  type = "button",
}: AnimatedButtonProps) {
  const classes = `mvp-btn text-hover ${accent ? "mvp-btn-accent" : ""} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        <span className="mvp-btn-inner">
          <HoverText>{children}</HoverText>
        </span>
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      <span className="mvp-btn-inner">
        <HoverText>{children}</HoverText>
      </span>
    </button>
  );
}
