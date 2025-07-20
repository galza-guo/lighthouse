# Hong Kong Lighthouses Website

A comprehensive digital guide to Hong Kong's historic lighthouses, showcasing their maritime heritage and cultural significance.

## Features

- Interactive map of all Hong Kong lighthouses
- Detailed lighthouse profiles with historical information
- Heritage status and architectural details
- Educational essays on maritime history
- Resource browser for further research
- Responsive design for all devices

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Mapbox GL JS
- **Animations**: Framer Motion

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Add your Mapbox access token to `.env.local`

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── layout/         # Layout components
│   ├── map/            # Map-related components
│   ├── lighthouse/     # Lighthouse-specific components
│   └── resources/      # Resource browser components
├── data/               # Static data and content
├── lib/                # Utility functions and hooks
└── types/              # TypeScript type definitions
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Contributing

1. Follow the established code style (ESLint + Prettier)
2. Write meaningful commit messages
3. Test your changes thoroughly
4. Update documentation as needed