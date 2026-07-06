# HTML Email Engineering

Modular system for building and sending emails. Features component template design, an integrated UI panel for instant email testing, and automated delivery via Gmail OAuth2.

- Email template that users receive: [Design Showcase](https://buhowski.github.io/html-email-builder)

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
├── dev/                  # Development tools
├── templates/            # Email templates (.js)
├── .env.example          # Credentials Template
├── index.html            # Builded HTML EMAIL
├── mailer.js             # OAuth2 transport logic
├── send.js               # CLI sender script
└── server.js             # Dev server & live reload
```
