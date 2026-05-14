# GreenMountainFog - The Journey

An 8-bit top-down RPG built with Phaser.js.

## Story

You are an elf hero living in the peaceful village of Greenvale. When the Professor's daughter goes missing in the Dark Woods, it falls to you to find her.

## How to Play

| Key | Action |
|-----|--------|
| Arrow Keys | Move |
| Space / Enter | Interact / Advance dialogue |
| Q | Exit house |

## Objectives

1. Explore Greenvale and find the **3 hidden items**:
   - **Sword** — inside a house (approach the door and press Space)
   - **Shield** — hidden under a rock (walk up to a rock and press Space)
   - **Map** — hidden in a tree (walk up to the tree and press Space)
2. Once all items are collected, the **Professor** will approach with a quest
3. Accept the quest to see what happens next...

## Features

- Procedurally generated pixel art (no external asset dependencies)
- Top-down overworld exploration with collision
- Inventory system with item tracking
- NPC dialogue system
- Turn-based combat framework (Final Fantasy style) — scaffold ready for future encounters
- Cloudflare Pages compatible (fully static)

## Tech Stack

- [Phaser 3](https://phaser.io/) via CDN
- Vanilla JS, no build step
- Single `index.html` + `js/main.js`

## Deployment

Push to GitHub and connect to Cloudflare Pages. Build command: none. Output directory: `/` (root).

## Development

Open `index.html` in a browser with a local server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

---

*To be continued...*
