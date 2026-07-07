# HTML Email Engineering

Modular system for building and sending emails. Features component template design, an integrated UI panel for instant email testing, and automated delivery via Gmail OAuth2.

- Users receive: [HTML Email Design](https://buhowski.github.io/html-email-builder)

## Prerequisites

- Node.js 22
- Gmail OAuth2 Credentials (configured in `.env`)

## Quick Start
```bash
# Install dependencies
npm install

# Dev mode (live preview at http://localhost:666)
npm run dev

# Compile production HTML
npm run build

# Send email via CLI to all recipients
npm run send
```

## Structure
```bash
├── assets/               # Static assets
├── components/           # Reusable UI blocks
├── helpers/              # Dev tools
├── templates/            # Source layouts (`name.js` auto-compiles to `./name.html`)
├── index.html            # Compiled production build
├── .env.example          # Credentials Template
├── mailer.js             # OAuth2 transport logic
├── send.js               # CLI sender script
└── server.js             # Dev server & live reload
```
