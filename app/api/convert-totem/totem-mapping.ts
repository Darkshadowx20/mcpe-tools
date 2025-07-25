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
  faceOverlay: {
    srcX: 40, 
    srcY: 8,
    srcWidth: 8,
    srcHeight: 8,
    destX: 4,
    destY: 0,
    destWidth: 8,
    destHeight: 8
  },
  body: {
    srcX: 20,
    srcY: 20,
    srcWidth: 8,
    srcHeight: 12,
    destX: 4,
    destY: 8,
    destWidth: 8, 
    destHeight: 5
  },
  bodyOverlay: {
    srcX: 20,
    srcY: 36,
    srcWidth: 8,
    srcHeight: 12,
    destX: 4,
    destY: 8,
    destWidth: 8, 
    destHeight: 5
  },
  rightArm: {
    srcX: 44,
    srcY: 20,
    srcWidth: 4,
    srcHeight: 9,
    destX: 1,
    destY: 7,
    destWidth: 3,
    destHeight: 3
  },
   rightArmOverlay: {
    srcX: 44,
    srcY: 36,
    srcWidth: 4,
    srcHeight: 9,
    destX: 1,
    destY: 7,
    destWidth: 3,
    destHeight: 3
  },
  rightPalm: {
    srcX: 44,
    srcY: 29,
    srcWidth: 4,
    srcHeight: 3,
    destX: 2,
    destY: 10,
    destWidth: 2,
    destHeight: 1
  },
  rightPalmOverlay: {
    srcX: 44,
    srcY: 45,
    srcWidth: 4,
    srcHeight: 3,
    destX: 2,
    destY: 10,
    destWidth: 2,
    destHeight: 1
  },
  leftArm: {
    srcX: 36,
    srcY: 52,
    srcWidth: 4,
    srcHeight: 9,
    destX: 12,
    destY: 7,
    destWidth: 3,
    destHeight: 3
  },
  leftArmOverlay: {
    srcX: 52,
    srcY: 52,
    srcWidth: 4,
    srcHeight: 9,
    destX: 12,
    destY: 7,
    destWidth: 3,
    destHeight: 3
  },
  leftPalm: {
    srcX: 36,
    srcY: 61,
    srcWidth: 4,
    srcHeight: 3,
    destX: 12,
    destY: 10,
    destWidth: 2,
    destHeight: 1
  },
  leftPalmOverlay: {
    srcX: 52,
    srcY: 61,
    srcWidth: 4,
    srcHeight: 3,
    destX: 12,
    destY: 10,
    destWidth: 2,
    destHeight: 1
  },
  rightLegTop: {
    srcX: 4,
    srcY: 20,
    srcWidth: 4,
    srcHeight: 4,
    destX: 5,
    destY: 13,
    destWidth: 3,
    destHeight: 1
  },
   rightLegTopOverlay: {
    srcX: 4,
    srcY: 36,
    srcWidth: 4,
    srcHeight: 4,
    destX: 5,
    destY: 13,
    destWidth: 3,
    destHeight: 1
  },
  rightLegMiddle: {
    srcX: 4,
    srcY: 24,
    srcWidth: 4,
    srcHeight: 4,
    destX: 6,
    destY: 14,
    destWidth: 2,
    destHeight: 1
  },
  rightLegMiddleOverlay: {
    srcX: 4,
    srcY: 40,
    srcWidth: 4,
    srcHeight: 4,
    destX: 6,
    destY: 14,
    destWidth: 2,
    destHeight: 1
  },
  rightLegBottom: {
    srcX: 4,
    srcY: 28,
    srcWidth: 4,
    srcHeight: 4,
    destX: 7,
    destY: 15,
    destWidth: 1,
    destHeight: 1
  },
   rightLegBottomOverlay: {
    srcX: 4,
    srcY: 44,
    srcWidth: 4,
    srcHeight: 4,
    destX: 7,
    destY: 15,
    destWidth: 1,
    destHeight: 1
  },
  leftLegTop: {
    srcX: 20,
    srcY: 52,
    srcWidth: 4,
    srcHeight: 4,
    destX: 8,
    destY: 13,
    destWidth: 3,
    destHeight: 1
  },
  leftLegTopOverlay: {
    srcX: 4,
    srcY: 52,
    srcWidth: 4,
    srcHeight: 4,
    destX: 8,
    destY: 13,
    destWidth: 3,
    destHeight: 1
  },
  leftLegMiddle: {
    srcX: 20,
    srcY: 56,
    srcWidth: 4,
    srcHeight: 4,
    destX: 8,
    destY: 14,
    destWidth: 2,
    destHeight: 1
  },
  leftLegMiddleOverlay: {
    srcX: 4,
    srcY: 56,
    srcWidth: 4,
    srcHeight: 4,
    destX: 8,
    destY: 14,
    destWidth: 2,
    destHeight: 1
  },
  leftLegBottom: {
    srcX: 20,
    srcY: 60,
    srcWidth: 4,
    srcHeight: 4,
    destX: 8,
    destY: 15,
    destWidth: 1,
    destHeight: 1
  },
  leftLegBottomOverlay: {
    srcX: 4,
    srcY: 60,
    srcWidth: 4,
    srcHeight: 4,
    destX: 8,
    destY: 15,
    destWidth: 1,
    destHeight: 1
  }
}; 