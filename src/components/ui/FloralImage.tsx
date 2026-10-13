interface Props {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}
export function FloralImage({ name, alt, className, priority = false }: Props) {
  return (
    <img
      className={className}
      src={`/images/${name}.webp`}
      srcSet={`/images/${name}-small.webp 640w, /images/${name}.webp 1536w`}
      sizes={priority ? "100vw" : "(max-width: 600px) 100vw, 50vw"}
      width={1536}
      height={1024}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}
