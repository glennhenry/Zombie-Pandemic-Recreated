import { useEffect } from "react";

export function useDragScroll(ref?: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref || !ref.current) return;
    const el = ref.current;

    let isDown = false;
    let startX: number, scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      el.classList.add("cursor-grabbing");
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5; // scroll speed
      el.scrollLeft = scrollLeft - walk;
    };

    const stopScroll = () => {
      isDown = false;
      el.classList.remove("cursor-grabbing");
    };

    el.addEventListener("mousedown", handleMouseDown);
    el.addEventListener("mouseleave", stopScroll);
    el.addEventListener("mouseup", stopScroll);
    el.addEventListener("mousemove", handleMouseMove);

    return () => {
      el.removeEventListener("mousedown", handleMouseDown);
      el.removeEventListener("mouseleave", stopScroll);
      el.removeEventListener("mouseup", stopScroll);
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [ref]);
}
