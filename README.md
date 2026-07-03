# HTML Email Builder & Template Showcase

Lightweight email build system with live preview and automated Gmail OAuth2 delivery.

Live: 

## Prerequisites

Node.js >= 22

## Quick Start
```bash
# Install dependencies
npm i

# Development with live reload (localhost:666)
npm run dev

# Compile production HTML
npm run build

# Send email
npm run send
```

## Structure
```
├── assets/               # Static assets
├── .env                  # Credentials (never commit)
├── .env.example          # Environment variables template
├── email-builder.js      # Template engine & compiler
├── index.html            # Build output
├── send.js               # OAuth2 mail transport
├── server.js             # Live reload server
└── package.json          # Project dependencies & scripts
```