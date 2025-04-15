import React, { createContext, useContext, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

// Create context for the card
const CardContext = createContext();

export const CardContainer = ({ children, className = "", ...props }) => {
  // Motion values for tracking mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // References for the container
  const cardRef = useRef(null);

  // Spring physics for smooth animation
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  // Handle mouse move over the card
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate rotation based on mouse position
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Update motion values
    rotateX.set(mouseY / 15);
    rotateY.set(-mouseX / 15);
    x.set(mouseX / 10);
    y.set(mouseY / 10);
  };

  // Reset card position when mouse leaves
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    x.set(0);
    y.set(0);
  };

  return (
    <CardContext.Provider value={{ x, y, rotateX, rotateY }}>
      <motion.div
        ref={cardRef}
        className={`group/card relative ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: 800,
          transformStyle: "preserve-3d",
        }}
        {...props}
      >
        {children}
      </motion.div>
    </CardContext.Provider>
  );
};

export const CardBody = ({ children, className = "", ...props }) => {
  const { rotateX, rotateY } = useContext(CardContext);

  return (
    <motion.div
      className={`${className}`}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const CardItem = ({
  children,
  className = "",
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  as: Component = "div",
  ...props
}) => {
  const { x, y } = useContext(CardContext);

  return (
    <Component className={`${className}`} {...props}>
      <motion.div
        style={{
          transform: [
            `perspective(800px)`,
            `translateX(${translateX}px)`,
            `translateY(${translateY}px)`,
            `translateZ(${translateZ}px)`,
            `rotateX(${rotateX}deg)`,
            `rotateY(${rotateY}deg)`,
            `rotateZ(${rotateZ}deg)`,
          ].join(" "),
          transformStyle: "preserve-3d",
          x,
          y,
        }}
      >
        {children}
      </motion.div>
    </Component>
  );
};
