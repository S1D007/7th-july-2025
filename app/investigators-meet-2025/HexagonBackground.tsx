import React, { ReactNode } from "react";

// Helper: returns points for a regular hexagon centered at (cx, cy) with radius r and optional rotation
function hexPoints(cx: number, cy: number, r: number, rotateDeg: number = 0) {
  const rotateRad = (rotateDeg * Math.PI) / 180;
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = Math.PI / 3 * i - Math.PI / 6 + rotateRad;
    return [
      (cx + r * Math.cos(angle)).toFixed(2),
      (cy + r * Math.sin(angle)).toFixed(2),
    ].join(",");
  });
  return points.join(" ");
}

const hexLeft = (
  <svg
    className="absolute left-0 bottom-0 md:top-1/4 z-0"
    width="500"
    height="900"
    viewBox="0 0 640 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ pointerEvents: 'none' }}
  >
    {/* Honeycomb pattern: staggered rows, mix of solid and outlined hexagons, now much larger */}
    {/* Row 1 */}
    <polygon points={hexPoints(60, 60, 100)} fill="#000" opacity="0.32" />
    <polygon points={hexPoints(200, 60, 100)} fill="none" stroke="#d8dce5" strokeWidth="5" opacity="0.15" />
    <polygon points={hexPoints(340, 60, 100)} fill="#6fa8dc" opacity="0.18" />
    <polygon points={hexPoints(480, 60, 100)} fill="none" stroke="#6fa8dc" strokeWidth="3.5" opacity="0.09" />
    {/* Row 2 (offset) */}
    <polygon points={hexPoints(130, 170, 100)} fill="#3b5998" opacity="0.45" />
    <polygon points={hexPoints(270, 170, 100)} fill="none" stroke="#d8dce5" strokeWidth="5" opacity="0.18" />
    <polygon points={hexPoints(410, 170, 100)} fill="#6fa8dc" opacity="0.22" />
    <polygon points={hexPoints(550, 170, 100)} fill="none" stroke="#fff" strokeWidth="3.5" opacity="0.09" />
    {/* Row 3 */}
    <polygon points={hexPoints(60, 280, 100)} fill="#d8dce5" opacity="0.13" />
    <polygon points={hexPoints(200, 280, 100)} fill="none" stroke="#6fa8dc" strokeWidth="4" opacity="0.13" />
    <polygon points={hexPoints(340, 280, 100)} fill="#1a2a5c" opacity="0.32" />
    <polygon points={hexPoints(480, 280, 100)} fill="none" stroke="#fff" strokeWidth="3.5" opacity="0.09" />
    {/* Row 4 (offset) */}
    <polygon points={hexPoints(130, 390, 100)} fill="#d8dce5" opacity="0.18" />
    <polygon points={hexPoints(270, 390, 100)} fill="none" stroke="#3b5998" strokeWidth="4" opacity="0.13" />
    <polygon points={hexPoints(410, 390, 100)} fill="#6fa8dc" opacity="0.22" />
    <polygon points={hexPoints(550, 390, 100)} fill="none" stroke="#6fa8dc" strokeWidth="3.5" opacity="0.09" />
    {/* Row 5 */}
    <polygon points={hexPoints(60, 500, 100)} fill="#3b5998" opacity="0.18" />
    <polygon points={hexPoints(200, 500, 100)} fill="none" stroke="#d8dce5" strokeWidth="3.5" opacity="0.09" />
    <polygon points={hexPoints(340, 500, 100)} fill="#3b5998" opacity="0.22" />
    <polygon points={hexPoints(480, 500, 100)} fill="none" stroke="#6fa8dc" strokeWidth="3.5" opacity="0.11" />
  </svg>
);

const hexRight = (
  <svg
    className="absolute right-0 top-0 md:bottom-10 z-0"
    width="500"
    height="500"
    viewBox="0 0 600 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ pointerEvents: 'none' }}
  >
    {/* Honeycomb pattern: staggered rows, mix of solid and outlined hexagons, now much larger */}
    {/* Row 1 */}
    <polygon points={hexPoints(100, 60, 100)} fill="#3b5998" opacity="0.22" />
    <polygon points={hexPoints(250, 60, 100)} fill="none" stroke="#d8dce5" strokeWidth="4" opacity="0.11" />
    <polygon points={hexPoints(400, 60, 100)} fill="#6fa8dc" opacity="0.13" />
    <polygon points={hexPoints(550, 60, 100)} fill="none" stroke="#6fa8dc" strokeWidth="3" opacity="0.07" />
    {/* Row 2 (offset) */}
    <polygon points={hexPoints(175, 180, 100)} fill="#3b5998" opacity="0.28" />
    <polygon points={hexPoints(325, 180, 100)} fill="none" stroke="#d8dce5" strokeWidth="4" opacity="0.13" />
    <polygon points={hexPoints(475, 180, 100)} fill="#6fa8dc" opacity="0.16" />
    {/* Row 3 */}
    <polygon points={hexPoints(100, 300, 100)} fill="#d8dce5" opacity="0.13" />
    <polygon points={hexPoints(250, 300, 100)} fill="none" stroke="#6fa8dc" strokeWidth="3" opacity="0.09" />
    <polygon points={hexPoints(400, 300, 100)} fill="#1a2a5c" opacity="0.18" />
    <polygon points={hexPoints(550, 300, 100)} fill="none" stroke="#fff" strokeWidth="3" opacity="0.06" />
    {/* Row 4 (offset) */}
    <polygon points={hexPoints(175, 420, 100)} fill="#d8dce5" opacity="0.13" />
    <polygon points={hexPoints(325, 420, 100)} fill="none" stroke="#3b5998" strokeWidth="3" opacity="0.09" />
    <polygon points={hexPoints(475, 420, 100)} fill="#6fa8dc" opacity="0.13" />
  </svg>
);

const HexagonBackground = ({ children }: { children: ReactNode }) => (
  <div
    className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    style={{
      background: "linear-gradient(to bottom, #0b1b3f 5%, #3b5998 40%, #c7c7c7 100%)",
    }}
  >
    {hexLeft}
    {hexRight}
    <div className="relative z-10 w-full flex items-center justify-center min-h-screen">
      {children}
    </div>
  </div>
);

export default HexagonBackground;
