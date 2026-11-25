type SectionHeadingProps = {
  children: string;
  className?: string;
};

export function SectionHeading({
  children,
  className = "",
}: SectionHeadingProps) {
  return (
    <h2
      className={`mb-8 font-heading text-3xl text-typography-primary lg:text-4xl ${className}`}
    >
      {children}
    </h2>
  );
}
