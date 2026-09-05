# MyTrip

MyTrip is a peer-to-peer delivery marketplace for routes within Africa and between Africa and Europe. Senders post small delivery requests; travelers post spare luggage capacity; either side can propose a match, coordinate in chat, and track the handover.

## What works in this MVP

- Sender and traveler account creation and login
- Role switching from the same account
- Seeded traveler and delivery listings for first-time users
- Route, date, item-type, and luggage-size filters
- Trip and delivery-request posting
- Match requests with accept and decline actions
- Active-delivery status tracking
- Recipient information and delivery confirmation
- Transaction-based chat with image attachments
- Browser persistence, so prototype data survives refreshes
- Production build with Vite

## Run locally

```bash
npm install
npm run dev
```

Then open the local address shown in the terminal.

## Build

```bash
npm run build
```

The static production output is written to `build/`.

## Important production boundary

This is a front-end MVP. It currently stores accounts and marketplace data in the browser so the complete workflow can be tested without a server. Do not use it for real deliveries or real personal data yet.

Before a public launch, replace browser storage with a secure backend and add server-side authentication, identity verification, payments/escrow, moderation, prohibited-item controls, audit logs, notifications, and country-specific customs and insurance rules.
