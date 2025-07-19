// Minecraft skin texture mapping
// Standard Minecraft skin is 64x64 pixels
// This file contains the mapping coordinates to convert from skin to totem

export interface TextureMapping {
  // Source coordinates on the skin texture
  srcX: number;
  srcY: number;
  srcWidth: number;
  srcHeight: number;
  
  // Destination coordinates on the totem texture
  destX: number;
  destY: number;
  destWidth: number;
  destHeight: number;
}

// Mapping of different parts of the skin to totem locations
export const skinToTotemMapping: Record<string, TextureMapping> = {
  // Face (front of head)
  face: {
    srcX: 8,
    srcY: 8,
    srcWidth: 8,
    srcHeight: 8,
    destX: 4,
    destY: 0,
    destWidth: 8,
    destHeight: 8
  },
  
  // Front of body
  bodyFront: {
    srcX: 20,
    srcY: 20,
    srcWidth: 8,
    srcHeight: 12,
    destX: 4,
    destY: 8,
    destWidth: 8, 
    destHeight: 6
  },
  
  // Right arm (which appears on the left when looking at the skin)
  rightArm: {
    srcX: 44,
    srcY: 20,
    srcWidth: 4,
    srcHeight: 12,
    destX: 1,
    destY: 8,
    destWidth: 3,
    destHeight: 4
  },
  
  // Left arm (which appears on the right when looking at the skin)
  leftArm: {
    srcX: 36,
    srcY: 52, // Using the outer layer for better visibility
    srcWidth: 4,
    srcHeight: 12,
    destX: 12,
    destY: 8,
    destWidth: 3,
    destHeight: 4
  },
  
  // Optional: Add additional elements like overlay layers if needed
  faceOverlay: {
    srcX: 40, 
    srcY: 8,  // Overlay layer of the face
    srcWidth: 8,
    srcHeight: 8,
    destX: 4,
    destY: 0,
    destWidth: 8,
    destHeight: 8
  }
}; 
