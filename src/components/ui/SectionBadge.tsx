type SectionBadgeProps = {
  children: string;
};

export function SectionBadge({ children }: SectionBadgeProps) {
  return <span className="section-badge">{children}</span>;
}
