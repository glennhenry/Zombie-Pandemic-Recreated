export default function LightHyperlink({
  href,
  children,
  className,
  ...props
}) {
  const addedClass = `underline text-[#316FBD] hover:text-blue-800`;
  const combinedClassName = `${addedClass} {$className || ''}`;

  return (
    <a href={href} target="_blank" className={combinedClassName} {...props}>
      {children}
    </a>
  );
}
