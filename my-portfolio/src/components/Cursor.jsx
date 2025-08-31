import React, { useEffect, useState } from "react";
import "../css/Cursor.css";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const addHover = () => setHover(true);
    const removeHover = () => setHover(false);

    document.addEventListener("mousemove", moveCursor);
    document.querySelectorAll("a, button, .btn").forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.querySelectorAll("a, button, .btn").forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${hover ? "hovered" : ""}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
};

export default Cursor;
