# Project Structure

## Root Directory Organization
```
hk-lighthouses-website/
├── src/                    # Source code
├── public/                 # Static assets
├── .kiro/                  # Kiro configuration and specs
├── .vscode/                # VS Code settings
└── [config files]          # Next.js, TypeScript, ESLint, etc.
```

## Source Code Structure (`src/`)
```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── ui/                 # Reusable UI components
│   ├── layout/             # Layout components
│   ├── map/                # Map-related components
│   ├── lighthouse/         # Lighthouse-specific components
│   └── resources/          # Resource browser components
├── data/                   # Static data and content
│   ├── lighthouses/        # Lighthouse data files
│   ├── essay-content.json  # Essay content
│   ├── resources.json      # Resource links
│   └── DATA_MODELS.md      # Data structure documentation
├── lib/                    # Utility functions and hooks
│   ├── __tests__/          # Unit tests
│   ├── data-loader.ts      # Data loading utilities
│   ├── validation.ts       # Data validation
│   └── utils.ts            # General utilities
├── scripts/                # Build and maintenance scripts
├── types/                  # TypeScript type definitions
│   └── index.ts            # Centralized type exports
```

## File Naming Conventions
- **Components**: PascalCase (e.g., `LighthouseCard.tsx`)
- **Pages**: lowercase with hyphens (e.g., `lighthouse-detail`)
- **Utilities**: camelCase (e.g., `dataLoader.ts`)
- **Types**: PascalCase interfaces/types (e.g., `LighthouseData`)
- **Data files**: kebab-case JSON (e.g., `cape-collinson.json`)

## Import Path Aliases
- Use `@/` for absolute imports from `src/` directory
- Example: `import { LighthouseCard } from '@/components/lighthouse/LighthouseCard'`

## Component Organization
- Group related components in feature-based folders
- Include a `README.md` in component directories for documentation
- Separate UI components from business logic components
- Use barrel exports (`index.ts`) for cleaner imports

## Data Management
- Static lighthouse data stored in JSON files under `src/data/lighthouses/`
- Centralized data loading through `src/lib/data-loader.ts`
- Type definitions in `src/types/index.ts`
- Data validation utilities in `src/lib/validation.ts`