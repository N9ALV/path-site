# Path Site - Cloudflare Pages/OpenNext Project

## Setup & Authentication

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Cloudflare Authentication
Create a `.env.local` file in the project root with your Cloudflare credentials:

**Authentication Types:**
- **OAuth (Strongly Recommended - December 2025)**: Run `npx wrangler login` for interactive authentication. No token management required and most reliable for deployment.
- **Scoped API Tokens (Available)**: Use for zone-specific operations. Requires Zone Rulesets: Edit, Zone Cache Rules: Edit scopes.
- **Global API Key**: Use for account-wide operations. Set both email and key.

```env
# Recommended for development (OAuth preferred)
# Run: npx wrangler login

# Alternative: Scoped API Tokens
CLOUDFLARE_API_TOKEN=your-scoped-api-token

# Alternative (legacy)
CLOUDFLARE_EMAIL=your-email@example.com
CLOUDFLARE_API_KEY=your-global-api-key
```

**Token Scope Requirements:**
- Zone Rulesets: Edit (for Pages deployment)
- Zone Cache Rules: Edit
- Account Rules Lists: Edit (if using IP lists)

### 3. Verify Authentication
```bash
# Check authentication status
npx wrangler whoami

# Should show your account ID and email
```

### 4. Generate Type Definitions
```bash
# Generate Cloudflare environment types
npm run cf-typegen
```

## Development

### Local Development
```bash
# Start Next.js dev server
npm run dev

# Or run with Cloudflare Pages simulation
npx wrangler pages dev . --compatibility-flag nodejs_compat
```

### Build Commands
```bash
# Standard Next.js build (required before any deployment)
npm run build

# OpenNext + Cloudflare Pages preview
npm run preview

# Deploy to Cloudflare Pages (static export method - recommended)
pnpm next build && npx wrangler pages deploy out --project-name pathgdn

# Alternative: Using npm scripts (ensure they use static export)
npm run deploy
```

**Important Deployment Notes:**
- This project uses static export (`output: 'export'` in `next.config.mjs`)
- Always run `npm run build` first to generate the `out/` directory
- Use `wrangler pages deploy out` for Pages deployment, not `wrangler deploy`
- Do not mix with OpenNext Workers workflow - choose one deployment method

## Project Structure

- `.open-next/` - OpenNext build artifacts
- `wrangler.jsonc` - Cloudflare Pages configuration
- `.dev.vars` - Development environment variables
- Cloudflare compatibility flags enabled:
  - `nodejs_compat`
  - `global_fetch_strictly_public`

## Dependencies

- Next.js 15.4.7
- React 19
- OpenNext.js for Cloudflare Pages deployment
- TailwindCSS for styling
- Radix UI components
- Three.js/React Three Fiber for 3D graphics

⚠️ **Note**: Some dependencies may have React 19 compatibility issues. Check `handover.md` for details and potential resolutions.

## Operations Protocol

Follow the Cloudflare operations protocol in the parent directory:
- CLI-first approach with Wrangler
- No UI dashboard modifications without documentation
- Run `wrangler pages deploy out --dry-run` before commits (not `wrangler deploy --dry-run`)
- Use static export workflow: `pnpm next build && wrangler pages deploy out --project-name pathgdn`
- For multi-project workspaces, ensure separate `wrangler.toml` files and unique project names
- Keep Windows-compatible lockfiles (`pnpm-lock.yaml`) and avoid cross-platform `node_modules` copying

## Troubleshooting

**Common Issues:**
- **"No deployments showing in dashboard"**: Ensure you're using `wrangler pages deploy` with actual built files, not empty directories
- **Authentication errors**: Check token scopes include Zone Rulesets: Edit for Pages deployment
- **Build failures**: Confirm `output: 'export'` is set in `next.config.mjs` and Turbopack warnings are resolved
- **Mixed tooling confusion**: Choose either OpenNext Workers OR native Pages - don't use both workflows
