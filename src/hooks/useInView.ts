import { useEffect, useState } from "react";

/**
 * Becomes true once the element has come near the viewport, then stays true.
 * Returns a callback ref so it also works for elements mounted later.
 */
export function useInView<T extends Element>(rootMargin = "200px") {
  const [element, setElement] = useState<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!element || inView) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [element, rootMargin, inView]);

  return [setElement, inView] as const;
}
