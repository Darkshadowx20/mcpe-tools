# Manual OG Image Creation Guide

This guide explains how to manually create Open Graph (OG) images for your website. These images appear when your site is shared on social media platforms like Facebook, Twitter, and LinkedIn.

## Requirements

- Image editing software (Photoshop, GIMP, Figma, Canva, etc.)
- Basic design skills
- Understanding of image formats and sizes

## OG Image Specifications

For optimal display across most social media platforms:

- **Dimensions**: 1200 × 630 pixels
- **Format**: PNG or JPG (PNG recommended for graphics with text)
- **File size**: Under 1MB (ideally under 500KB)
- **Color space**: sRGB
- **Text**: Keep important text within the center 80% of the image

## Step-by-Step Guide

### 1. Create a Base Template

1. Open your preferred image editing software
2. Create a new document with dimensions 1200 × 630 pixels
3. Set up a background:
   - Use your brand color (#0a0b10 dark blue for MCPE Tools)
   - Add a subtle gradient overlay (from #4d5bce to #7963d2 with low opacity)
   - Consider adding a subtle texture or pattern

### 2. Add Your Branding Elements

1. Add your logo (120 × 120 pixels) centered near the top
2. Include your website name ("MCPE Tools")
3. Add a tagline or description
4. Include your website URL (tools.notnicto.com)

### 3. Customize for Each Page

For each main page of your website:

1. Duplicate your base template
2. Modify the title and description to match the page content
3. Consider adding a visual element specific to that page
4. Save with a descriptive filename (e.g., `home-og.png`, `skin-to-totem-og.png`)

### 4. Export and Optimize

1. Export as PNG or JPG
2. Use an image optimization tool to reduce file size:
   - [TinyPNG](https://tinypng.com/)
   - [Squoosh](https://squoosh.app/)
   - [ImageOptim](https://imageoptim.com/)

### 5. Place in Your Project

1. Save all OG images in the `/public` directory
2. Reference them in your metadata:

```tsx
// For the home page (in app/page.tsx)
export const metadata = {
  openGraph: {
    images: [
      {
        url: '/home-og.png',
        width: 1200,
        height: 630,
        alt: 'MCPE Tools',
      },
    ],
  },
  // ...other metadata
};

// For the skin-to-totem page (in app/skintototem/page.tsx)
export const metadata = {
  openGraph: {
    images: [
      {
        url: '/skin-to-totem-og.png',
        width: 1200,
        height: 630,
        alt: 'Minecraft Skin to Totem Converter',
      },
    ],
  },
  // ...other metadata
};
```

## Design Tips

1. **Keep it simple**: Don't overcrowd the image with too much text or elements
2. **High contrast**: Ensure text is easily readable against the background
3. **Brand consistency**: Use your brand colors, fonts, and visual style
4. **Visual hierarchy**: Make the most important information largest and most prominent
5. **Test on different platforms**: Check how your image appears on various social media sites

## Example Design for MCPE Tools

For the MCPE Tools website, consider this design structure:

1. **Background**: Dark blue (#0a0b10) with a subtle gradient overlay
2. **Logo**: Centered at the top, 120 × 120 pixels
3. **Title**: Large, bold text in the center (e.g., "MCPE Tools" or "Skin to Totem Converter")
4. **Subtitle**: Smaller text below the title (e.g., "Minecraft Pocket Edition Utilities")
5. **URL**: Small text at the bottom (tools.notnicto.com)
6. **Visual elements**: Consider adding Minecraft-themed decorative elements like blocks or characters

## Testing Your OG Images

1. Use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. Use the [Twitter Card Validator](https://cards-dev.twitter.com/validator)
3. Use the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

These tools will show you how your OG images will appear when shared on their respective platforms.

## Recommended OG Images for Your Site

Create the following OG images for your site:

1. **Home page**: `public/og-image.png`
2. **Skin to Totem page**: `public/skin-to-totem-og.png`

Remember to update the metadata in your code to reference these image paths. 