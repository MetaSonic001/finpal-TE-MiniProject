import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { ReactNode } from "react";

export const HorizontalScrollCarousel = ({ children }: { children: ReactNode }) => {
  const containerRef = useRef(null);
  const { scrollX } = useScroll({
    container: containerRef
  });

  return (
    <div
      ref={containerRef}
      className="flex overflow-x-scroll space-x-8 pb-8 hide-scrollbar"
    >
      {children}
    </div>
  );
};

