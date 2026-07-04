# HTML Email Engineering

Modular system for building and sending email templates. Features live-reload development, lazy-compilation of JS-based designs, and automated delivery via Gmail OAuth2.

Design Showcase: https://buhowski.github.io/html-email-builder

## Prerequisites

Node.js 22

## Quick Start
```bash
# Install dependencies
npm install

# Dev mode (live preview at http://localhost:666)
npm run dev

# Compile production HTML
npm run build

# Send email
npm run send
```

## Structure
```bash
├── assets/               # Static assets
├── components/           # Reusable UI blocks
├── dev/                  # Development tools
├── templates/            # Email templates (.js)
├── .env                  # Credentials (NEVER COMMIT)
├── .env.example          # Credentials Template
├── index.html            # Builded HTML EMAIL
├── mailer.js             # OAuth2 transport logic
├── send.js               # CLI sender script
└── server.js             # Dev server & live reload
```
