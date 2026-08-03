export type TargetBrick = {
  id: number;
  x: number;
  y: number;
  z: number;
};

// Represents the word GRANDY in a 5x5 voxel grid font
const FONT_MAP: Record<string, string[]> = {
  G: [
    " ### ",
    "#   #",
    "#    ",
    "#  ##",
    " ### "
  ],
  R: [
    "#### ",
    "#   #",
    "#### ",
    "#  # ",
    "#   #"
  ],
  A: [
    " ### ",
    "#   #",
    "#####",
    "#   #",
    "#   #"
  ],
  N: [
    "#   #",
    "##  #",
    "# # #",
    "#  ##",
    "#   #"
  ],
  D: [
    "#### ",
    "#   #",
    "#   #",
    "#   #",
    "#### "
  ],
  Y: [
    "#   #",
    " # # ",
    "  #  ",
    "  #  ",
    "  #  "
  ]
};

export const BRICK_SIZE = 1;
export const BRICK_GAP = 0.1;
export const CELL_SIZE = BRICK_SIZE + BRICK_GAP;

export function generateTargets(): { targets: TargetBrick[], bounds: { width: number, height: number } } {
  const targets: TargetBrick[] = [];
  const word = "GRANDY";
  
  let currentX = 0;
  let id = 0;
  
  for (const char of word) {
    const pattern = FONT_MAP[char];
    if (!pattern) continue;
    
    // Y runs from top to bottom in array, but we want 3D Y to run bottom to top
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (pattern[row][col] === '#') {
          const x = currentX + (col * CELL_SIZE);
          // Invert Y so index 0 (top row) is highest Y
          const y = (4 - row) * CELL_SIZE;
          const z = 0;
          targets.push({ id: id++, x, y, z });
        }
      }
    }
    
    // Add space for next character (5 columns + 1 space = 6 columns)
    currentX += 6 * CELL_SIZE;
  }
  
  // Center all bricks
  const width = currentX - CELL_SIZE; // Total width
  const height = 5 * CELL_SIZE;
  const offsetX = -width / 2;
  const offsetY = -height / 2;
  
  targets.forEach(t => {
    t.x += offsetX;
    t.y += offsetY;
  });
  
  return { targets, bounds: { width, height } };
}
