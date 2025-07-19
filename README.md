# Minecraft Totem Skin Converter

This web application allows users to convert their Minecraft character skins into custom totem of undying textures.

## Features

- Upload a Minecraft skin file (.png) or enter a Minecraft username
- Automatic fetching of skins from Mojang API using usernames
- Real-time conversion of skin to totem texture
- Download the generated totem texture for use in resource packs

## How to Use

1. Visit the website and either upload your Minecraft skin file or enter your Minecraft username
2. Click "Convert to Totem Skin" to generate your custom totem texture
3. Preview the result directly in the browser
4. Download the totem texture by clicking the "Download Totem Skin" button

## Using Your Custom Totem Texture in Minecraft

1. Create a resource pack folder structure in your Minecraft directory:
   ```
   assets/minecraft/textures/item/
   ```
2. Place your downloaded totem texture in this directory as `totem_of_undying.png`
3. Create a `pack.mcmeta` file in the root directory with the appropriate format
4. Activate your resource pack in Minecraft's settings

## Development

This project is built with:
- Next.js
- TypeScript
- Tailwind CSS
- Edge Runtime API

### Running Locally

1. Clone this repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server:
```bash
pnpm dev
```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## License

This project is licensed under the MIT License.

## Acknowledgments

- Minecraft is a registered trademark of Mojang Studios
- This tool uses the Mojang API to fetch player skins
