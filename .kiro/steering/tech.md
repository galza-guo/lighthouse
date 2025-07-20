# Technology Stack

## Framework & Language
- **Next.js 14** with App Router architecture
- **TypeScript** for type safety and better developer experience
- **React 18** with modern hooks and patterns

## Styling & UI
- **Tailwind CSS** for utility-first styling
- **Tailwind Plugins**: Typography and Forms
- **Framer Motion** for animations and transitions
- **Custom Design System**: Lighthouse-themed color palette with heritage status colors

## Maps & Interactivity
- **Mapbox GL JS** for interactive mapping
- **clsx** and **tailwind-merge** for conditional styling

## Development Tools
- **ESLint** with TypeScript and Next.js rules
- **Prettier** for code formatting
- **TypeScript** strict mode enabled

## Common Commands

### Development
```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
```

### Code Quality
```bash
npm run lint         # Run ESLint checks
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Environment Setup
```bash
cp .env.example .env.local  # Set up environment variables
# Add MAPBOX_ACCESS_TOKEN to .env.local
```

## Code Style Rules
- No semicolons, single quotes, 80 character line width
- 2-space indentation, no tabs
- Trailing commas in ES5 contexts
- Arrow functions without parentheses for single parameters
- Strict TypeScript with no explicit `any` warnings