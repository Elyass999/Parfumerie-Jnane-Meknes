// src/hooks/useDragScroll.ts
import { useRef, useEffect, RefObject, useState } from "react";

export function useDragScroll(ref: RefObject<HTMLElement>) {
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // --- Mouse Handlers ---
    const handleMouseDown = (e: MouseEvent) => {
      // Only handle left clicks
      if (e.button !== 0) return; 
      
      e.preventDefault(); // Prevents default browser drag behavior
      setIsDragging(true);
      startX.current = e.pageX - container.offsetLeft;
      scrollLeft.current = container.scrollLeft;
      
      // Visual feedback and selection prevention
      container.style.cursor = "grabbing";
      container.style.userSelect = "none"; 
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      container.style.cursor = "grab";
      container.style.userSelect = "auto";
    };
    
    // Using window listeners ensures dragging works even if the mouse leaves the container
    const handleMouseLeaveOrUp = () => {
        if (isDragging) {
            handleMouseUp();
        }
    };


    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault(); 

      const x = e.pageX - container.offsetLeft;
      // Multiplier (1.5) for a slightly faster/smoother drag effect
      const walk = (x - startX.current) * 1.5; 
      container.scrollLeft = scrollLeft.current - walk;
    };
    
    // --- Touch Handlers (Essential for setting isDragging state) ---
    // Note: On most mobile browsers, native touch scrolling (with `overflow-x-auto`) 
    // handles the scroll movement, but these handlers ensure the `isDragging` 
    // state is correctly managed for UI feedback.
    const handleTouchStart = () => setIsDragging(true);
    const handleTouchEnd = () => setIsDragging(false);

    // --- Event Listeners ---
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    // Bind global listeners to stop drag when mouse is released anywhere
    window.addEventListener("mouseup", handleMouseLeaveOrUp);
    window.addEventListener("mouseleave", handleMouseLeaveOrUp); 

    // Add touch listeners
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchend", handleTouchEnd);


    // --- Cleanup ---
    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseLeaveOrUp);
      window.removeEventListener("mouseleave", handleMouseLeaveOrUp);
      
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [ref, isDragging]); // isDragging must be included here

  return { isDragging };
}