// GreenMountainFog - The Journey
// Phaser 3 RPG Game

// ─── Palette ────────────────────────────────────────────────────────────────
const PAL = {
  black:      0x0a0a0a,
  darkGray:   0x222222,
  gray:       0x555555,
  lightGray:  0xaaaaaa,
  white:      0xffffff,
  // nature
  grass:      0x3a7a2a,
  grassLight: 0x4e9e38,
  dirt:       0x8b6914,
  dirtLight:  0xb8891c,
  sand:       0xd4b483,
  // foliage
  treeGreen:  0x1e6b0a,
  treeTop:    0x2d9e14,
  // water
  water:      0x1a5fa8,
  waterLight: 0x2d7fd4,
  // buildings
  wallGray:   0x8a8a8a,
  wallDark:   0x555555,
  roof:       0x8b1a1a,
  roofDark:   0x5c1111,
  roofLight:  0xb52020,
  wood:       0x7a4a1a,
  woodLight:  0xa06424,
  // path
  path:       0xc8a060,
  pathDark:   0xa07840,
  // player / items
  elfGreen:   0x2e8b57,
  elfSkin:    0xf0c080,
  elfHair:    0xd4a030,
  swordBlue:  0x6090d0,
  shieldBrown:0x8b4513,
  mapYellow:  0xe8d060,
  // ui
  uiBg:       0x000000,
  uiBorder:   0xffd700,
  uiText:     0xffffff,
  hpGreen:    0x00cc44,
  hpRed:      0xcc2200,
  mpBlue:     0x2266ff,
  // rock
  rock:       0x888888,
  rockDark:   0x555555,
  rockLight:  0xaaaaaa,
};

// ─── Pixel-art drawing helpers ───────────────────────────────────────────────
function drawRect(g, x, y, w, h, color, alpha = 1) {
  g.fillStyle(color, alpha);
  g.fillRect(x, y, w, h);
}

function drawPixels(g, pixels, ox, oy, scale = 1) {
  // pixels = array of [col, row, color]
  for (const [col, row, color] of pixels) {
    g.fillStyle(color, 1);
    g.fillRect(ox + col * scale, oy + row * scale, scale, scale);
  }
}

// ─── Asset generators (called in BootScene preload) ─────────────────────────

function generateTextures(scene) {
  const g = scene.add.graphics();

  // ── Grass tile 16×16
  g.clear();
  drawRect(g, 0, 0, 16, 16, PAL.grass);
  drawRect(g, 2, 3,  2,  1, PAL.grassLight);
  drawRect(g, 10, 11, 2, 1, PAL.grassLight);
  drawRect(g, 6, 7,  1,  2, PAL.grassLight);
  g.generateTexture('grass', 16, 16);

  // ── Dirt / path tile 16×16
  g.clear();
  drawRect(g, 0, 0, 16, 16, PAL.path);
  drawRect(g, 3, 5,  2,  1, PAL.pathDark);
  drawRect(g, 11, 2, 2,  1, PAL.pathDark);
  g.generateTexture('dirt', 16, 16);

  // ── Tree 24×32
  g.clear();
  // trunk
  drawRect(g, 9, 20, 6, 12, PAL.wood);
  drawRect(g, 10, 20, 4, 12, PAL.woodLight);
  // canopy layers
  drawRect(g, 4, 14, 16, 10, PAL.treeGreen);
  drawRect(g, 0, 8,  24, 10, PAL.treeGreen);
  drawRect(g, 4, 2,  16, 10, PAL.treeGreen);
  // highlights
  drawRect(g, 5, 3,  8,  3, PAL.treeTop);
  drawRect(g, 2, 9,  8,  3, PAL.treeTop);
  drawRect(g, 6, 15, 8,  3, PAL.treeTop);
  g.generateTexture('tree', 24, 32);

  // ── Rock 16×12
  g.clear();
  drawRect(g, 2, 4,  12, 8, PAL.rock);
  drawRect(g, 0, 6,  16, 4, PAL.rock);
  drawRect(g, 4, 0,  8,  6, PAL.rock);
  drawRect(g, 4, 1,  4,  2, PAL.rockLight);
  drawRect(g, 14, 7, 2,  2, PAL.rockDark);
  g.generateTexture('rock', 16, 12);

  // ── House exterior 48×48
  g.clear();
  // wall
  drawRect(g, 0, 16, 48, 32, PAL.wallGray);
  drawRect(g, 2, 18, 44, 28, PAL.wallGray);
  // wall shading
  drawRect(g, 0, 16, 3, 32, PAL.wallDark);
  drawRect(g, 45, 16, 3, 32, PAL.wallDark);
  // roof
  drawRect(g, 0, 0, 48, 18, PAL.roof);
  drawRect(g, 2, 2, 44, 14, PAL.roofDark);
  drawRect(g, 4, 2, 10, 4, PAL.roofLight);
  // door
  drawRect(g, 18, 30, 12, 18, PAL.wood);
  drawRect(g, 19, 31, 5,  16, PAL.woodLight);
  // window
  drawRect(g, 6, 22, 10, 8, PAL.waterLight);
  drawRect(g, 6, 22, 10, 1, PAL.wallDark);
  drawRect(g, 6, 22, 1,  8, PAL.wallDark);
  drawRect(g, 32, 22, 10, 8, PAL.waterLight);
  drawRect(g, 32, 22, 10, 1, PAL.wallDark);
  drawRect(g, 32, 22, 1,  8, PAL.wallDark);
  g.generateTexture('house', 48, 48);

  // ── House interior 48×48
  g.clear();
  drawRect(g, 0, 0, 48, 48, 0x4a3820); // floor
  drawRect(g, 0, 0, 48, 2, PAL.wallDark);
  drawRect(g, 0, 46, 48, 2, PAL.wallDark);
  drawRect(g, 0, 0, 2, 48, PAL.wallDark);
  drawRect(g, 46, 0, 2, 48, PAL.wallDark);
  // rug
  drawRect(g, 8, 8, 32, 24, 0x6a1a1a);
  drawRect(g, 10, 10, 28, 20, 0x8a2a2a);
  drawRect(g, 12, 12, 24, 16, 0x6a1a1a);
  g.generateTexture('houseInterior', 48, 48);

  // ── Table 20×12
  g.clear();
  drawRect(g, 0, 0, 20, 8, PAL.wood);
  drawRect(g, 1, 1, 18, 5, PAL.woodLight);
  drawRect(g, 2, 8, 3, 4, PAL.wood);
  drawRect(g, 15, 8, 3, 4, PAL.wood);
  g.generateTexture('table', 20, 12);

  // ── Chest 16×14
  g.clear();
  drawRect(g, 0, 5, 16, 9, PAL.wood);
  drawRect(g, 0, 0, 16, 6, PAL.woodLight);
  drawRect(g, 1, 1, 14, 4, PAL.dirtLight);
  drawRect(g, 6, 4, 4, 3, PAL.dirtLight); // latch
  drawRect(g, 7, 5, 2, 2, PAL.dirt);
  g.generateTexture('chest', 16, 14);

  // ── Player (elf) sprite sheet: 16×16 per frame, 4 frames (down,up,left,right)
  // We'll generate 4 separate textures for simplicity
  const elfFrames = ['playerDown', 'playerUp', 'playerLeft', 'playerRight'];
  const dirColors = [PAL.elfGreen, PAL.elfGreen, PAL.elfGreen, PAL.elfGreen];

  function drawElf(facing) {
    g.clear();
    // body - tunic
    drawRect(g, 4, 7, 8, 7, PAL.elfGreen);
    // legs
    drawRect(g, 4, 13, 3, 3, 0x2a5a40);
    drawRect(g, 9, 13, 3, 3, 0x2a5a40);
    // boots
    drawRect(g, 3, 15, 4, 1, 0x3a2a10);
    drawRect(g, 9, 15, 4, 1, 0x3a2a10);
    // head
    drawRect(g, 4, 2, 8, 7, PAL.elfSkin);
    // ears (pointed - elf!)
    if (facing === 'left' || facing === 'down' || facing === 'up') {
      drawRect(g, 2, 3, 2, 3, PAL.elfSkin);
      drawRect(g, 2, 2, 1, 1, PAL.elfSkin);
    }
    if (facing === 'right' || facing === 'down' || facing === 'up') {
      drawRect(g, 12, 3, 2, 3, PAL.elfSkin);
      drawRect(g, 13, 2, 1, 1, PAL.elfSkin);
    }
    // hair
    drawRect(g, 4, 2, 8, 2, PAL.elfHair);
    drawRect(g, 3, 3, 2, 1, PAL.elfHair);
    drawRect(g, 11, 3, 2, 1, PAL.elfHair);
    // eyes
    if (facing === 'down') {
      drawRect(g, 6, 6, 1, 1, PAL.black);
      drawRect(g, 9, 6, 1, 1, PAL.black);
    } else if (facing === 'up') {
      // back of head, hair dominates
      drawRect(g, 4, 2, 8, 7, PAL.elfHair);
      drawRect(g, 4, 7, 8, 7, PAL.elfGreen);
    } else if (facing === 'left') {
      drawRect(g, 5, 6, 1, 1, PAL.black);
    } else if (facing === 'right') {
      drawRect(g, 10, 6, 1, 1, PAL.black);
    }
    // belt
    drawRect(g, 4, 11, 8, 1, PAL.dirtLight);
    // sword if facing right
    if (facing === 'right') {
      drawRect(g, 13, 8, 1, 6, PAL.swordBlue);
      drawRect(g, 12, 10, 2, 1, PAL.lightGray);
    } else if (facing === 'left') {
      drawRect(g, 2, 8, 1, 6, PAL.swordBlue);
      drawRect(g, 2, 10, 2, 1, PAL.lightGray);
    }
  }

  drawElf('down');  g.generateTexture('playerDown',  16, 16);
  drawElf('up');    g.generateTexture('playerUp',    16, 16);
  drawElf('left');  g.generateTexture('playerLeft',  16, 16);
  drawElf('right'); g.generateTexture('playerRight', 16, 16);

  // ── Professor NPC 16×16
  g.clear();
  // robe
  drawRect(g, 3, 7, 10, 9, 0x4a3080);
  drawRect(g, 4, 15, 4, 1, 0x2a1860);
  drawRect(g, 8, 15, 4, 1, 0x2a1860);
  // head
  drawRect(g, 4, 2, 8, 7, PAL.elfSkin);
  // white beard
  drawRect(g, 4, 7, 8, 4, PAL.white);
  // white hair
  drawRect(g, 3, 2, 10, 2, PAL.lightGray);
  drawRect(g, 2, 3, 2,  2, PAL.lightGray);
  drawRect(g, 12, 3, 2, 2, PAL.lightGray);
  // glasses
  drawRect(g, 5, 5, 2, 1, PAL.darkGray);
  drawRect(g, 9, 5, 2, 1, PAL.darkGray);
  drawRect(g, 7, 5, 2, 1, PAL.darkGray);
  // staff
  drawRect(g, 14, 4, 1, 12, PAL.wood);
  drawRect(g, 13, 3, 3, 2, 0xd4a030);
  g.generateTexture('professor', 16, 16);

  // ── Sword item 12×12
  g.clear();
  drawRect(g, 5, 0, 2, 10, PAL.swordBlue);
  drawRect(g, 5, 0, 2, 2,  PAL.white);
  drawRect(g, 3, 7, 6, 1,  PAL.lightGray);
  drawRect(g, 5, 9, 2, 3,  PAL.wood);
  g.generateTexture('itemSword', 12, 12);

  // ── Shield item 12×12
  g.clear();
  drawRect(g, 2, 0, 8, 10, PAL.shieldBrown);
  drawRect(g, 3, 1, 6, 7,  0xc46020);
  drawRect(g, 5, 3, 2, 3,  PAL.dirtLight);
  drawRect(g, 4, 9, 4, 2,  PAL.shieldBrown);
  g.generateTexture('itemShield', 12, 12);

  // ── Map item 12×12
  g.clear();
  drawRect(g, 0, 0, 12, 10, PAL.mapYellow);
  drawRect(g, 1, 1, 10, 8,  0xf0e0a0);
  drawRect(g, 2, 2, 3,  2,  PAL.grass);
  drawRect(g, 7, 4, 3,  3,  PAL.waterLight);
  drawRect(g, 3, 5, 2,  1,  PAL.dirt);
  drawRect(g, 4, 7, 4,  1,  PAL.dirt);
  drawRect(g, 0, 10, 12, 2, PAL.wood);
  g.generateTexture('itemMap', 12, 12);

  // ── Enemy (forest creature) 16×16
  g.clear();
  drawRect(g, 3, 2, 10, 12, 0x1a3a10);  // body
  drawRect(g, 5, 0, 6,  4,  0x2a5a18);  // head
  drawRect(g, 3, 2, 10, 3,  0x2a5a18);
  drawRect(g, 1, 5, 3,  5,  0x1a3a10);  // left arm
  drawRect(g, 12, 5, 3, 5,  0x1a3a10); // right arm
  drawRect(g, 5, 13, 3, 3,  0x1a3a10); // legs
  drawRect(g, 8, 13, 3, 3,  0x1a3a10);
  drawRect(g, 6, 1,  1, 1,  0xff4444);  // eyes
  drawRect(g, 9, 1,  1, 1,  0xff4444);
  drawRect(g, 6, 3,  4, 1,  0xffcc00);  // teeth
  g.generateTexture('enemy', 16, 16);

  // ── Combat BG (forest) - 480×64 strip
  g.clear();
  drawRect(g, 0, 0, 480, 64, 0x0a1a06);
  for (let i = 0; i < 480; i += 30) {
    drawRect(g, i, 0,    20, 40, PAL.treeGreen);
    drawRect(g, i+4, 0, 12, 35, PAL.treeTop);
    drawRect(g, i+8, 40, 4, 24, PAL.wood);
  }
  g.generateTexture('combatBgForest', 480, 64);

  g.destroy();
}

// ─── BootScene (OoT-Inspired 8-bit Title Screen) ─────────────────────────────
class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }

  create() {
    generateTextures(this);
    const W = 480, H = 360;
    this.started = false;

    // ── Sky gradient: deep purple (top) → warm amber (horizon) ──
    const sky = this.add.graphics();
    const skyBands = [
      [0,   25, 0x05021a], [25,  25, 0x070320], [50,  25, 0x0d0728],
      [75,  20, 0x130c38], [95,  20, 0x1e1048], [115, 20, 0x2c1858],
      [135, 18, 0x401a60], [153, 15, 0x5c2068], [168, 14, 0x7a2858],
      [182, 14, 0xa03042], [196, 14, 0xcc482e], [210, 14, 0xe06828],
      [224, 13, 0xef8830], [237, 13, 0xf4a040], [250, 13, 0xf8b855],
    ];
    for (const [y, h, c] of skyBands) { sky.fillStyle(c, 1); sky.fillRect(0, y, W, h); }

    // ── Stars (deterministic positions, upper sky only) ──
    const starG = this.add.graphics().setDepth(1);
    starG.fillStyle(0xffffff, 1);
    const stars = [
      [22,8,1],[47,22,1],[82,6,2],[112,34,1],[152,10,1],[192,20,1],
      [234,4,2],[272,16,1],[312,28,1],[357,6,1],[392,18,1],[432,12,2],
      [462,33,1],[37,48,1],[102,58,1],[202,43,1],[322,53,1],[422,40,1],
      [52,78,1],[172,73,1],[292,83,1],[422,68,1],[12,98,1],[242,93,1],
      [382,98,1],[142,108,1],[342,103,1],
    ];
    for (const [sx, sy, sz] of stars) starG.fillRect(sx, sy, sz, sz);
    this.time.addEvent({ delay: 900, loop: true,
      callback: () => starG.setAlpha(0.75 + Math.random() * 0.25) });

    // ── Moon (upper right, glowing) ──
    const moon = this.add.graphics().setDepth(2);
    moon.fillStyle(0xffeeaa, 0.10); moon.fillCircle(405, 50, 24);
    moon.fillStyle(0xffeeaa, 0.18); moon.fillCircle(405, 50, 19);
    moon.fillStyle(0xfff4c0, 1);    moon.fillCircle(405, 50, 14);
    moon.fillStyle(0xe8d890, 1);    moon.fillCircle(409, 46,  5);
    moon.fillStyle(0xd4c470, 0.6);  moon.fillCircle(399, 57,  3);
    moon.fillStyle(0xd4c470, 0.5);  moon.fillCircle(411, 43,  2);

    // ── Far mountains (dark purple silhouette, slow parallax) ──
    this.farMtnG = this.add.graphics().setDepth(3);
    this._drawMountainLayer(this.farMtnG, W, 0x160c40, 0x0e0828, 225, 90);

    // ── Near mountains / rolling hills (dark green, faster parallax) ──
    this.nearMtnG = this.add.graphics().setDepth(4);
    this._drawMountainLayer(this.nearMtnG, W, 0x0f2a18, 0x071510, 260, 65);

    // ── Atmospheric fog strips across the valleys ──
    const fog = this.add.graphics().setDepth(5);
    const fogBands = [
      [215, 18, 0xb0d0f0, 0.07], [228, 20, 0xc0d8f8, 0.06],
      [244, 18, 0xd0e8ff, 0.07], [258, 16, 0xe8f4ff, 0.09],
      [270, 14, 0xf0f8ff, 0.12],
    ];
    for (const [y, h, c, a] of fogBands) { fog.fillStyle(c, a); fog.fillRect(0, y, W, h); }
    this.time.addEvent({ delay: 2600, loop: true, callback: () => {
      this.tweens.add({ targets: fog, alpha: { from: 0.8, to: 1.15 },
        duration: 1300, yoyo: true, ease: 'Sine.easeInOut' });
    }});

    // ── Ground / meadow (layered greens) ──
    const gnd = this.add.graphics().setDepth(6);
    gnd.fillStyle(0x1e4a14, 1); gnd.fillRect(0, 272, W, H - 272);
    gnd.fillStyle(0x2d6820, 1); gnd.fillRect(0, 280, W, H - 280);
    gnd.fillStyle(0x3a7a2a, 1); gnd.fillRect(0, 288, W, H - 288);
    gnd.fillStyle(0x4a9030, 1); gnd.fillRect(0, 295, W, H - 295);
    // Grass tufts along the hill line
    gnd.fillStyle(0x5ab038, 1);
    for (let gx = 0; gx < W; gx += 9) {
      const gh = 2 + (gx * 7 + 11) % 5;
      gnd.fillRect(gx,     270 - gh, 2, gh + 4);
      gnd.fillRect(gx + 4, 272 - gh, 2, gh + 2);
    }

    // ── Elf walking across the field (OoT-inspired) ──
    this.elfSprite = this.add.image(-20, 258, 'playerRight').setScale(2).setDepth(7);
    this.elfWalking = true;
    let elfFrame = 0;
    this.walkTimer = this.time.addEvent({ delay: 175, loop: true, callback: () => {
      if (!this.elfWalking) return;
      elfFrame = (elfFrame + 1) % 2;
      this.elfSprite.setTexture(elfFrame === 0 ? 'playerRight' : 'playerDown');
    }});
    this.tweens.add({
      targets: this.elfSprite, x: 158, duration: 3000, ease: 'Linear',
      onComplete: () => {
        this.elfWalking = false;
        this.elfSprite.setTexture('playerDown');
        this.time.delayedCall(500,  () => this.elfSprite.setTexture('playerLeft'));
        this.time.delayedCall(1300, () => this.elfSprite.setTexture('playerDown'));
        this.time.delayedCall(2100, () => this.elfSprite.setTexture('playerRight'));
        this.time.delayedCall(2700, () => this.elfSprite.setTexture('playerDown'));
      }
    });

    // ── Title text (fades in after 1 s) ──
    this.title1 = this.add.text(240, 46, 'GreenMountainFog', {
      fontSize: '22px', fill: '#ffd700', fontFamily: 'Courier New',
      stroke: '#7a4000', strokeThickness: 4,
    }).setOrigin(0.5).setAlpha(0).setDepth(20);
    this.title2 = this.add.text(240, 74, '— The Journey —', {
      fontSize: '13px', fill: '#aaffaa', fontFamily: 'Courier New',
      stroke: '#004400', strokeThickness: 2,
    }).setOrigin(0.5).setAlpha(0).setDepth(20);
    this.tweens.add({ targets: [this.title1, this.title2], alpha: 1,
      duration: 2000, delay: 900, ease: 'Sine.easeIn' });

    this.add.text(240, 97, 'An 8-bit Adventure', {
      fontSize: '9px', fill: '#88ccaa', fontFamily: 'Courier New',
    }).setOrigin(0.5).setAlpha(0).setDepth(20);
    this.tweens.add({ targets: this.children.list[this.children.list.length - 1],
      alpha: 0.8, duration: 1500, delay: 2000, ease: 'Sine.easeIn' });

    // ── "Press SPACE / Tap to Start" blinking prompt ──
    this.startPrompt = this.add.text(240, 330, 'PRESS SPACE  /  TAP TO START', {
      fontSize: '10px', fill: '#ffffff', fontFamily: 'Courier New',
    }).setOrigin(0.5).setAlpha(0).setDepth(20);
    this.time.delayedCall(3200, () => {
      this.tweens.add({ targets: this.startPrompt, alpha: 1, duration: 600,
        onComplete: () => {
          this.time.addEvent({ delay: 550, loop: true,
            callback: () => this.startPrompt.setVisible(!this.startPrompt.visible) });
        }
      });
    });
    this.add.text(240, 347, '[ Arrow Keys / D-Pad  |  SPACE / A to interact ]', {
      fontSize: '7px', fill: '#555555', fontFamily: 'Courier New',
    }).setOrigin(0.5).setDepth(20);

    // ── Input ──
    this.input.keyboard.once('keydown-ENTER', () => this.startGame());
    this.input.keyboard.once('keydown-SPACE', () => this.startGame());
    this.input.once('pointerdown', () => this.startGame());
  }

  _drawMountainLayer(g, W, color1, color2, baseY, maxH) {
    g.fillStyle(color1, 1);
    g.fillPoints([
      {x:0,   y:baseY}, {x:45,  y:baseY-maxH*0.42}, {x:92,  y:baseY-maxH},
      {x:142, y:baseY-maxH*0.60}, {x:178, y:baseY-maxH*0.86},
      {x:218, y:baseY-maxH*0.48}, {x:268, y:baseY-maxH*0.94},
      {x:318, y:baseY-maxH*0.66}, {x:362, y:baseY-maxH*0.97},
      {x:408, y:baseY-maxH*0.53}, {x:448, y:baseY-maxH*0.76},
      {x:480, y:baseY-maxH*0.46}, {x:480, y:baseY},
    ], true);
    g.fillStyle(color2, 1);
    g.fillPoints([
      {x:0,   y:baseY}, {x:58,  y:baseY-maxH*0.32}, {x:112, y:baseY-maxH*0.52},
      {x:164, y:baseY-maxH*0.36}, {x:214, y:baseY-maxH*0.58},
      {x:264, y:baseY-maxH*0.40}, {x:314, y:baseY-maxH*0.56},
      {x:364, y:baseY-maxH*0.30}, {x:414, y:baseY-maxH*0.50},
      {x:464, y:baseY-maxH*0.33}, {x:480, y:baseY-maxH*0.26},
      {x:480, y:baseY},
    ], true);
  }

  startGame() {
    if (this.started) return;
    this.started = true;
    this.cameras.main.fade(800, 0, 0, 0, false, (cam, progress) => {
      if (progress === 1) this.scene.start('Overworld');
    });
  }

  update() {
    const t = this.time.now / 1000;
    if (this.farMtnG)  this.farMtnG.x  = Math.sin(t * 0.11) * 4;
    if (this.nearMtnG) this.nearMtnG.x = Math.sin(t * 0.19) * 8;
  }
}

// ─── UIScene (inventory overlay) ─────────────────────────────────────────────
class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UI', active: false });
    this.inventory = [];
    this.messageQueue = [];
    this.messageTimer = null;
  }

  create() {
    this.invBg = this.add.rectangle(382, 12, 184, 52, PAL.uiBg, 0.85).setOrigin(0, 0);
    this.add.rectangle(382, 12, 184, 52, PAL.uiBorder, 0).setStrokeStyle(2, PAL.uiBorder).setOrigin(0, 0);
    this.invLabel = this.add.text(390, 18, 'ITEMS:', {
      fontSize: '9px', fill: '#ffd700', fontFamily: 'Courier New'
    });

    this.itemSlots = [];
    this.itemIcons = [];
    const items = ['itemSword', 'itemShield', 'itemMap'];
    const labels = ['Sword', 'Shield', 'Map'];
    for (let i = 0; i < 3; i++) {
      const sx = 390 + i * 56;
      const sy = 32;
      const slot = this.add.rectangle(sx + 12, sy + 12, 28, 28, 0x333333, 0.9).setStrokeStyle(1, 0x666666);
      this.itemSlots.push(slot);
      const icon = this.add.image(sx + 12, sy + 12, items[i]).setAlpha(0.25).setScale(1.8);
      this.itemIcons.push(icon);
      this.add.text(sx + 2, sy + 28, labels[i], {
        fontSize: '7px', fill: '#888888', fontFamily: 'Courier New'
      });
    }

    // Message box (bottom)
    this.msgBox = this.add.rectangle(8, 290, 464, 60, PAL.uiBg, 0).setOrigin(0, 0);
    this.msgText = this.add.text(16, 298, '', {
      fontSize: '10px', fill: PAL.uiText, fontFamily: 'Courier New',
      wordWrap: { width: 448 }, lineSpacing: 4
    });
    this.hideMessage();
  }

  updateInventory(inv) {
    this.inventory = inv;
    const keys = ['sword', 'shield', 'map'];
    for (let i = 0; i < 3; i++) {
      if (inv.includes(keys[i])) {
        this.itemIcons[i].setAlpha(1);
        this.itemSlots[i].setFillStyle(0x224422, 0.9).setStrokeStyle(1, PAL.uiBorder);
      }
    }
  }

  showMessage(text, duration = 3000) {
    this.msgBox.setFillStyle(PAL.uiBg, 0.92).setStrokeStyle(2, PAL.uiBorder);
    this.msgText.setText(text);
    this.msgText.setVisible(true);
    if (this.messageTimer) this.messageTimer.remove();
    if (duration > 0) {
      this.messageTimer = this.time.delayedCall(duration, () => this.hideMessage());
    }
  }

  hideMessage() {
    this.msgBox.setFillStyle(PAL.uiBg, 0);
    this.msgBox.setStrokeStyle(0, 0x000000);
    this.msgText.setVisible(false);
  }
}

// ─── OverworldScene ───────────────────────────────────────────────────────────
class OverworldScene extends Phaser.Scene {
  constructor() {
    super('Overworld');
    this.inventory = [];
    this.interactables = [];
    this.inHouse = false;
    this.questTriggered = false;
    this.questComplete = false;
    this.professorActive = false;
    this.dialogueLine = 0;
    this.inDialogue = false;
  }

  create() {
    this.scene.launch('UI');
    this.ui = this.scene.get('UI');

    this.buildVillage();
    this.createPlayer();
    this.createInteractables();
    this.createProfessor();

    this.cursors = this.input.keyboard.createCursorKeys();
    this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.enterKey    = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.scene.launch('Touch');
    this.touch = this.scene.get('Touch');

    this.cameras.main.setBounds(0, 0, 576, 576);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    this.time.delayedCall(500, () => {
      this.ui.showMessage('Welcome to Greenvale! Explore the village and find hidden items.', 3500);
    });
  }

  buildVillage() {
    const W = 36, H = 36; // tiles
    this.tileW = 16; this.tileH = 16;
    this.mapWidth  = W * this.tileW;
    this.mapHeight = H * this.tileH;

    // Ground layer
    for (let row = 0; row < H; row++) {
      for (let col = 0; col < W; col++) {
        this.add.image(col * 16 + 8, row * 16 + 8, 'grass').setDepth(0);
      }
    }

    // Paths (horizontal + vertical cross through center)
    // Vertical path col 16-19
    for (let row = 0; row < H; row++) {
      for (let pc = 16; pc <= 19; pc++) {
        this.add.image(pc * 16 + 8, row * 16 + 8, 'dirt').setDepth(1);
      }
    }
    // Horizontal path row 16-19
    for (let col = 0; col < W; col++) {
      for (let pr = 16; pr <= 19; pr++) {
        this.add.image(col * 16 + 8, pr * 16 + 8, 'dirt').setDepth(1);
      }
    }

    // Collision walls (invisible, static physics)
    this.walls = this.physics.add.staticGroup();

    // Border walls
    this.addWallRect(0, 0, W * 16, 16);
    this.addWallRect(0, (H - 1) * 16, W * 16, 16);
    this.addWallRect(0, 0, 16, H * 16);
    this.addWallRect((W - 1) * 16, 0, 16, H * 16);

    // ── Houses ──
    // House 1: top-left area (col 4, row 4)
    this.placeHouse(64, 64, 'House 1');
    // House 2: top-right area
    this.placeHouse(400, 64, 'House 2');
    // House 3: bottom-left
    this.placeHouse(64, 400, 'House 3');
    // House 4 (Professor's house): bottom-right
    this.placeHouse(400, 400, "Professor's House");

    // ── Trees ── (scatter around edges)
    const treePositions = [
      [32, 160],[32, 200],[32, 240],[32, 288],[32, 320],
      [544, 160],[544, 200],[544, 240],[544, 288],[544, 320],
      [160, 32],[200, 32],[240, 32],[288, 32],[320, 32],[360, 32],
      [160, 544],[200, 544],[240, 544],[288, 544],[320, 544],[360, 544],
      [120, 120],[136, 96],[96, 136],
      [420, 120],[436, 96],[456, 136],
      [120, 420],[136, 450],[96, 440],
      [456, 420],[436, 450],[480, 440],
    ];
    this.trees = [];
    for (const [tx, ty] of treePositions) {
      const t = this.add.image(tx, ty, 'tree').setOrigin(0.5, 1).setDepth(3);
      this.trees.push(t);
      // Collision body at trunk
      const w = this.walls.create(tx, ty - 4, null).setVisible(false);
      w.setSize(10, 8).refreshBody();
    }

    // ── Rocks ──
    const rockPositions = [
      [200, 200],[340, 200],[200, 340],[340, 340],
      [160, 260],[380, 260],
    ];
    this.rocks = [];
    for (const [rx, ry] of rockPositions) {
      const r = this.add.image(rx, ry, 'rock').setDepth(2);
      this.rocks.push({ sprite: r, x: rx, y: ry });
      const w = this.walls.create(rx, ry, null).setVisible(false);
      w.setSize(14, 10).refreshBody();
    }

    // ── Village sign ──
    const sg = this.add.graphics();
    drawRect(sg, 0, 0, 40, 20, PAL.wood);
    drawRect(sg, 1, 1, 38, 18, PAL.woodLight);
    drawRect(sg, 18, 20, 4, 12, PAL.wood);
    sg.generateTexture('sign', 40, 32);
    this.add.image(288, 310, 'sign').setDepth(2);
    this.add.text(270, 303, 'Greenvale', {
      fontSize: '7px', fill: '#3a1a00', fontFamily: 'Courier New'
    }).setDepth(3);

    // ── Well ──
    const wg = this.add.graphics();
    drawRect(wg, 2, 6, 20, 16, PAL.gray);
    drawRect(wg, 0, 4, 24, 4, PAL.darkGray);
    drawRect(wg, 8, 0, 2, 8, PAL.wood);
    drawRect(wg, 14, 0, 2, 8, PAL.wood);
    drawRect(wg, 7, 0, 10, 2, PAL.wood);
    drawRect(wg, 6, 8, 12, 2, PAL.waterLight);
    wg.generateTexture('well', 24, 22);
    this.add.image(288, 288, 'well').setDepth(2);
    const wellWall = this.walls.create(288, 288, null).setVisible(false);
    wellWall.setSize(24, 22).refreshBody();
    sg.destroy();
    wg.destroy();
  }

  placeHouse(x, y, label) {
    this.add.image(x + 24, y + 24, 'house').setDepth(2);
    // Wall collider for house
    const hw = this.walls.create(x + 24, y + 40, null).setVisible(false);
    hw.setSize(48, 16).refreshBody();
    const hwTop = this.walls.create(x + 24, y, null).setVisible(false);
    hwTop.setSize(48, 16).refreshBody();
    const hwL = this.walls.create(x, y + 24, null).setVisible(false);
    hwL.setSize(16, 48).refreshBody();
    const hwR = this.walls.create(x + 48, y + 24, null).setVisible(false);
    hwR.setSize(16, 48).refreshBody();
  }

  addWallRect(x, y, w, h) {
    const wall = this.walls.create(x + w / 2, y + h / 2, null).setVisible(false);
    wall.setSize(w, h).refreshBody();
  }

  createPlayer() {
    this.player = this.physics.add.sprite(288, 288, 'playerDown');
    this.player.setDepth(5);
    this.player.setCollideWorldBounds(true);
    this.player.setSize(10, 8).setOffset(3, 8);
    this.physics.add.collider(this.player, this.walls);
    this.facing = 'down';
    this.moveSpeed = 90;
    this.lastInteract = 0;
  }

  createInteractables() {
    // ── Rock (shield) — rock at 340, 200
    this.rockInteract = {
      x: 340, y: 200, radius: 22,
      item: 'shield', itemKey: 'itemShield',
      collected: false,
      onInteract: () => this.collectItem('shield', 'You found a SHIELD hidden under the rock!'),
    };

    // ── Tree (map) — tree at 136, 96 area; use the one at 240,32
    this.treeInteract = {
      x: 240, y: 32, radius: 24,
      item: 'map', itemKey: 'itemMap',
      collected: false,
      onInteract: () => this.collectItem('map', 'You found a MAP hidden in the branches of the tree!'),
    };

    // ── House door (sword) — House 1 at 64,64; door is around 64+18=82, 64+42=106
    this.houseDoor = {
      x: 88, y: 110, radius: 18,
      label: 'Enter House',
      onInteract: () => this.enterHouse(),
    };

    this.interactables = [this.rockInteract, this.treeInteract, this.houseDoor];
  }

  collectItem(itemName, message) {
    if (this.inventory.includes(itemName)) return;
    this.inventory.push(itemName);
    this.ui.updateInventory(this.inventory);
    this.ui.showMessage(message, 3000);

    // Flash effect
    this.cameras.main.flash(200, 255, 255, 255);

    // Check quest trigger
    if (this.inventory.length === 3 && !this.questTriggered) {
      this.time.delayedCall(3500, () => this.triggerProfessor());
    }
  }

  enterHouse() {
    if (this.inHouse) return;
    this.inHouse = true;
    this.cameras.main.fade(300, 0, 0, 0, false, (cam, progress) => {
      if (progress === 1) this.showHouseInterior();
    });
  }

  showHouseInterior() {
    // Show interior overlay
    this.houseOverlay = this.add.container(0, 0).setDepth(20);
    const bg = this.add.rectangle(288, 200, 240, 200, 0x000000, 0.95);
    const interior = this.add.image(288, 190, 'houseInterior').setScale(4);
    const table    = this.add.image(270, 175, 'table').setScale(2);
    const chest    = this.add.image(340, 155, 'chest').setScale(2.5);
    const exitText = this.add.text(210, 270, '[SPACE] Take item / [Q] Exit', {
      fontSize: '9px', fill: '#aaaaaa', fontFamily: 'Courier New'
    });
    const titleText = this.add.text(215, 105, '~ Inside the House ~', {
      fontSize: '10px', fill: '#ffd700', fontFamily: 'Courier New'
    });
    this.houseOverlay.add([bg, interior, table, chest, exitText, titleText]);

    let swordTaken = this.inventory.includes('sword');
    let swordIcon;
    if (!swordTaken) {
      swordIcon = this.add.image(340, 155, 'itemSword').setScale(2).setDepth(21);
      this.add.text(312, 170, 'Sword!', { fontSize: '8px', fill: '#6090d0', fontFamily: 'Courier New' }).setDepth(21);
      this.houseOverlay.add(swordIcon);
    } else {
      this.add.text(308, 155, '(empty)', { fontSize: '8px', fill: '#555555', fontFamily: 'Courier New' }).setDepth(21);
      this.houseOverlay.add(this.children.list[this.children.list.length - 1]);
    }

    this.cameras.main.fadeIn(300);

    // Interact to take sword
    const takeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    const qKey    = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

    const takeOnce = takeKey.once('down', () => {
      if (!this.inventory.includes('sword')) {
        this.collectItem('sword', 'You found a SWORD inside the chest!');
      }
      this.exitHouse();
      qKey.off('down', exitOnce);
    });

    const exitOnce = qKey.once('down', () => {
      this.exitHouse();
      takeKey.off('down', takeOnce);
    });
  }

  exitHouse() {
    this.cameras.main.fade(300, 0, 0, 0, false, (cam, progress) => {
      if (progress === 1) {
        this.houseOverlay.destroy();
        this.inHouse = false;
        this.cameras.main.fadeIn(300);
        this.ui.showMessage('You left the house.', 1500);
      }
    });
  }

  createProfessor() {
    this.professor = this.physics.add.sprite(320, 288, 'professor');
    this.professor.setDepth(5).setAlpha(0);
    this.professor.setImmovable(true);
    this.professorVisible = false;

    this.professorDialogue = [
      "Ah, there you are! I've been looking for you.",
      "My daughter, Elara, traveled through the Dark Woods to visit\nan old family friend in Maplehollow.",
      "The friend had written a letter saying a troublemaker\nhad come to their village causing problems.",
      "Elara went to help, but I've heard nothing since.\nI fear for her safety.",
      "You are the bravest soul in Greenvale.\nWill you venture through the Dark Woods and find her?",
      "Take the map — it will guide your way.\nThe path into the woods lies to the east. Good luck!",
      "[ To be continued... ]",
    ];
  }

  triggerProfessor() {
    if (this.questTriggered) return;
    this.questTriggered = true;
    this.professor.setAlpha(1);
    this.professorVisible = true;

    this.ui.showMessage('A figure approaches from the village...', 2000);

    // Walk professor toward player
    this.physics.moveTo(this.professor, 288, 272, 40);
    this.time.delayedCall(2500, () => {
      this.professor.setVelocity(0, 0);
      this.startDialogue();
    });
  }

  startDialogue() {
    this.inDialogue = true;
    this.dialogueLine = 0;
    this.showDialogueLine();
  }

  showDialogueLine() {
    const line = this.professorDialogue[this.dialogueLine];
    const isLast = this.dialogueLine === this.professorDialogue.length - 1;
    const prefix = isLast ? '' : 'Professor: ';

    if (isLast) {
      this.ui.showMessage(line, 0); // persist
      this.inDialogue = false;
      this.questComplete = true;
      this.time.delayedCall(4000, () => {
        this.ui.showMessage('Thank you for playing GreenMountainFog - The Journey!\n(More content coming soon...)', 0);
      });
    } else {
      this.ui.showMessage(prefix + line + '\n\n[SPACE to continue]', 0);
    }
  }

  advanceDialogue() {
    this.dialogueLine++;
    if (this.dialogueLine < this.professorDialogue.length) {
      this.showDialogueLine();
    }
  }

  update(time, delta) {
    if (this.inHouse) return;

    const speed = this.moveSpeed;
    let vx = 0, vy = 0;

    const td = this.touch ? this.touch.dpad : {};
    if (!this.inDialogue && !this.questComplete) {
      if (this.cursors.left.isDown  || td.left)  { vx = -speed; this.facing = 'left';  this.player.setTexture('playerLeft'); }
      if (this.cursors.right.isDown || td.right) { vx =  speed; this.facing = 'right'; this.player.setTexture('playerRight'); }
      if (this.cursors.up.isDown    || td.up)    { vy = -speed; this.facing = 'up';    this.player.setTexture('playerUp'); }
      if (this.cursors.down.isDown  || td.down)  { vy =  speed; this.facing = 'down';  this.player.setTexture('playerDown'); }
    } else if (this.questComplete) {
      if (this.cursors.left.isDown  || td.left)  { vx = -speed; this.facing = 'left';  this.player.setTexture('playerLeft'); }
      if (this.cursors.right.isDown || td.right) { vx =  speed; this.facing = 'right'; this.player.setTexture('playerRight'); }
      if (this.cursors.up.isDown    || td.up)    { vy = -speed; this.facing = 'up';    this.player.setTexture('playerUp'); }
      if (this.cursors.down.isDown  || td.down)  { vy =  speed; this.facing = 'down';  this.player.setTexture('playerDown'); }
    }

    this.player.setVelocity(vx, vy);

    // Depth sort player vs trees
    this.player.setDepth(5 + this.player.y / 1000);

    // Interact
    const interactPressed = Phaser.Input.Keyboard.JustDown(this.interactKey) ||
                            Phaser.Input.Keyboard.JustDown(this.enterKey) ||
                            (this.touch && this.touch.actionJustPressed);

    if (interactPressed) {
      if (this.inDialogue) {
        this.advanceDialogue();
        return;
      }
      this.checkInteract();
    }
  }

  checkInteract() {
    const px = this.player.x, py = this.player.y;

    for (const ia of this.interactables) {
      if (ia.collected) continue;
      const dist = Phaser.Math.Distance.Between(px, py, ia.x, ia.y);
      if (dist < ia.radius) {
        ia.collected = true;
        ia.onInteract();
        return;
      }
    }

    // Professor interaction
    if (this.professorVisible && !this.inDialogue && !this.questComplete) {
      const dist = Phaser.Math.Distance.Between(px, py, this.professor.x, this.professor.y);
      if (dist < 40) {
        this.startDialogue();
      }
    }
  }
}

// ─── CombatScene (Final Fantasy-style framework) ──────────────────────────────
class CombatScene extends Phaser.Scene {
  constructor() {
    super('Combat');
    this.playerHP = 100; this.playerMaxHP = 100;
    this.playerMP = 40;  this.playerMaxMP = 40;
    this.enemyHP  = 60;  this.enemyMaxHP  = 60;
    this.turn = 'player'; // 'player' | 'enemy'
    this.menuIndex = 0;
    this.menuOptions = ['Attack', 'Defend', 'Item'];
    this.defending = false;
    this.battleLog = [];
    this.busy = false;
  }

  create() {
    const W = 480, H = 360;

    // Background - forest
    this.add.image(240, 40, 'combatBgForest').setOrigin(0.5, 0).setScale(1, 1);
    this.add.rectangle(240, 180, W, H, 0x0a0e0a);
    this.add.image(240, 40, 'combatBgForest').setOrigin(0.5, 0).setScale(1, 1).setAlpha(0.9);

    // Ground line
    this.add.rectangle(240, 160, W, 4, 0x1a3a10);

    // Enemy sprite
    this.enemySprite = this.add.image(340, 130, 'enemy').setScale(4).setFlipX(true);

    // Player sprite (combat pose)
    this.playerSprite = this.add.image(120, 140, 'playerRight').setScale(4);

    // ── HP/MP bars ──
    // Player panel
    this.add.rectangle(100, 195, 180, 50, PAL.uiBg, 0.9).setStrokeStyle(2, PAL.uiBorder);
    this.add.text(16, 180, 'HERO', { fontSize: '9px', fill: '#ffd700', fontFamily: 'Courier New' });
    this.add.text(16, 192, 'HP', { fontSize: '9px', fill: '#aaffaa', fontFamily: 'Courier New' });
    this.playerHPBar = this.drawBar(40, 190, 130, 10, PAL.hpGreen);
    this.add.text(16, 206, 'MP', { fontSize: '9px', fill: '#aaaaff', fontFamily: 'Courier New' });
    this.playerMPBar = this.drawBar(40, 204, 130, 10, PAL.mpBlue);
    this.playerHPText = this.add.text(176, 190, `${this.playerHP}`, { fontSize: '8px', fill: '#ffffff', fontFamily: 'Courier New' });
    this.playerMPText = this.add.text(176, 204, `${this.playerMP}`, { fontSize: '8px', fill: '#ffffff', fontFamily: 'Courier New' });

    // Enemy panel
    this.add.rectangle(360, 195, 180, 30, PAL.uiBg, 0.9).setStrokeStyle(2, PAL.uiBorder);
    this.add.text(276, 182, 'CREATURE', { fontSize: '9px', fill: '#ff8888', fontFamily: 'Courier New' });
    this.add.text(276, 194, 'HP', { fontSize: '9px', fill: '#aaffaa', fontFamily: 'Courier New' });
    this.enemyHPBar = this.drawBar(300, 192, 130, 10, PAL.hpGreen);
    this.enemyHPText = this.add.text(436, 192, `${this.enemyHP}`, { fontSize: '8px', fill: '#ffffff', fontFamily: 'Courier New' });

    // ── Menu panel ──
    this.menuPanel = this.add.rectangle(100, 295, 180, 90, PAL.uiBg, 0.92).setStrokeStyle(2, PAL.uiBorder);
    this.menuTitle = this.add.text(18, 258, 'COMMAND', { fontSize: '9px', fill: '#ffd700', fontFamily: 'Courier New' });
    this.menuTexts = this.menuOptions.map((opt, i) =>
      this.add.text(28, 272 + i * 14, opt, { fontSize: '10px', fill: '#ffffff', fontFamily: 'Courier New' })
    );
    this.menuCursor = this.add.text(18, 272, '>', { fontSize: '10px', fill: '#ffd700', fontFamily: 'Courier New' });

    // ── Battle log ──
    this.logPanel = this.add.rectangle(330, 295, 290, 90, PAL.uiBg, 0.92).setStrokeStyle(2, PAL.uiBorder);
    this.logTexts = [];
    for (let i = 0; i < 4; i++) {
      this.logTexts.push(this.add.text(192, 262 + i * 14, '', { fontSize: '9px', fill: '#dddddd', fontFamily: 'Courier New' }));
    }

    // ── Input ──
    this.cursors = this.input.keyboard.createCursorKeys();
    this.confirmKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.enterKey   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.addLog('A wild creature appears!');
    this.addLog('What will you do?');
    this.updateMenuCursor();
    this.updateBars();
  }

  drawBar(x, y, w, h, color) {
    const bg = this.add.rectangle(x + w / 2, y + h / 2, w, h, 0x333333);
    const bar = this.add.rectangle(x + w / 2, y + h / 2, w, h, color);
    return { bg, bar, maxW: w, x, y, h };
  }

  setBar(barObj, current, max) {
    const pct = Phaser.Math.Clamp(current / max, 0, 1);
    const newW = Math.max(1, barObj.maxW * pct);
    barObj.bar.setSize(newW, barObj.h);
    barObj.bar.setX(barObj.x + newW / 2);
    // color shift
    const color = pct > 0.5 ? PAL.hpGreen : pct > 0.25 ? 0xffcc00 : PAL.hpRed;
    barObj.bar.setFillStyle(color);
  }

  updateBars() {
    this.setBar(this.playerHPBar, this.playerHP, this.playerMaxHP);
    this.setBar(this.playerMPBar, this.playerMP, this.playerMaxMP);
    this.setBar(this.enemyHPBar,  this.enemyHP,  this.enemyMaxHP);
    this.playerHPText.setText(`${this.playerHP}`);
    this.playerMPText.setText(`${this.playerMP}`);
    this.enemyHPText.setText(`${this.enemyHP}`);
  }

  addLog(text) {
    this.battleLog.push(text);
    const recent = this.battleLog.slice(-4);
    for (let i = 0; i < 4; i++) {
      this.logTexts[i].setText(recent[i] || '');
    }
  }

  updateMenuCursor() {
    this.menuCursor.setY(272 + this.menuIndex * 14);
  }

  update() {
    if (this.busy || this.turn !== 'player') return;

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      this.menuIndex = (this.menuIndex - 1 + 3) % 3;
      this.updateMenuCursor();
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      this.menuIndex = (this.menuIndex + 1) % 3;
      this.updateMenuCursor();
    }

    const confirm = Phaser.Input.Keyboard.JustDown(this.confirmKey) ||
                    Phaser.Input.Keyboard.JustDown(this.enterKey);
    if (confirm) {
      this.executePlayerAction(this.menuOptions[this.menuIndex]);
    }
  }

  executePlayerAction(action) {
    this.busy = true;
    this.defending = false;

    if (action === 'Attack') {
      const dmg = Phaser.Math.Between(12, 22);
      this.enemyHP = Math.max(0, this.enemyHP - dmg);
      this.addLog(`Hero attacks for ${dmg} damage!`);
      this.tweens.add({ targets: this.playerSprite, x: '+=40', duration: 80, yoyo: true });

      if (this.enemyHP === 0) {
        this.updateBars();
        this.time.delayedCall(400, () => {
          this.addLog('Enemy defeated! Victory!');
          this.busy = false;
        });
        return;
      }
    } else if (action === 'Defend') {
      this.defending = true;
      this.addLog('Hero takes a defensive stance!');
    } else if (action === 'Item') {
      const heal = 20;
      this.playerHP = Math.min(this.playerMaxHP, this.playerHP + heal);
      this.addLog(`Used Potion! Restored ${heal} HP.`);
    }

    this.updateBars();
    this.time.delayedCall(600, () => this.enemyTurn());
  }

  enemyTurn() {
    this.turn = 'enemy';
    const baseDmg = Phaser.Math.Between(8, 16);
    const dmg = this.defending ? Math.floor(baseDmg / 2) : baseDmg;
    this.playerHP = Math.max(0, this.playerHP - dmg);
    const suffix = this.defending ? ' (blocked half!)' : '';
    this.addLog(`Creature attacks for ${dmg} dmg!${suffix}`);
    this.tweens.add({ targets: this.enemySprite, x: '-=30', duration: 80, yoyo: true });
    this.updateBars();

    if (this.playerHP === 0) {
      this.time.delayedCall(400, () => {
        this.addLog('Hero has fallen... Game Over.');
        this.busy = false;
        this.turn = 'player'; // allow restart
      });
      return;
    }

    this.time.delayedCall(600, () => {
      this.turn = 'player';
      this.busy = false;
      this.addLog('Your turn. Choose an action.');
    });
  }
}

// ─── TouchScene (virtual D-pad + action button for mobile) ───────────────────
class TouchScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Touch', active: false });
    this.dpad = { left: false, right: false, up: false, down: false };
    this.actionJustPressed = false;
    this._prevActionDown = false;
  }

  create() {
    const W = 480, H = 360;
    this.padCX = 52;
    this.padCY = H - 50;
    this.actCX = W - 52;
    this.actCY = H - 50;

    this.input.addPointer(1); // enable 2-finger multi-touch

    // ── D-pad background & cross ──
    const dg = this.add.graphics().setScrollFactor(0).setDepth(50);
    dg.fillStyle(0x000000, 0.35); dg.fillCircle(this.padCX, this.padCY, 44);
    dg.lineStyle(1, 0xffffff, 0.20); dg.strokeCircle(this.padCX, this.padCY, 44);
    dg.fillStyle(0xffffff, 0.15);
    dg.fillRect(this.padCX - 44, this.padCY - 13, 88, 26);
    dg.fillRect(this.padCX - 13, this.padCY - 44, 26, 88);
    // Arrow triangles
    const cx = this.padCX, cy = this.padCY;
    dg.fillStyle(0xffffff, 0.55);
    dg.fillTriangle(cx, cy-30, cx-9, cy-19, cx+9, cy-19); // up
    dg.fillTriangle(cx, cy+30, cx-9, cy+19, cx+9, cy+19); // down
    dg.fillTriangle(cx-30, cy, cx-19, cy-9, cx-19, cy+9); // left
    dg.fillTriangle(cx+30, cy, cx+19, cy-9, cx+19, cy+9); // right
    dg.fillStyle(0xffffff, 0.18); dg.fillCircle(cx, cy, 11);

    // ── Action button (A) ──
    const ag = this.add.graphics().setScrollFactor(0).setDepth(50);
    ag.fillStyle(0x00aa44, 0.45); ag.fillCircle(this.actCX, this.actCY, 28);
    ag.lineStyle(2, 0x00ff66, 0.35); ag.strokeCircle(this.actCX, this.actCY, 28);
    this.add.text(this.actCX, this.actCY, 'A', {
      fontSize: '18px', fill: '#ffffff', fontFamily: 'Courier New',
      stroke: '#003322', strokeThickness: 2,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(51);

    // Highlight overlays (updated each frame based on active touches)
    this.dpadHL   = this.add.graphics().setScrollFactor(0).setDepth(52);
    this.actionHL = this.add.graphics().setScrollFactor(0).setDepth(52);

    // On non-touch desktop show controls at very low opacity as a hint
    const isTouch = this.sys.game.device.input.touch;
    if (!isTouch) {
      dg.setAlpha(0.18);
      ag.setAlpha(0.18);
      this.children.list
        .filter(c => c !== dg && c !== ag && c !== this.dpadHL && c !== this.actionHL)
        .forEach(c => { if (c.setAlpha) c.setAlpha(0.18); });
    }
  }

  update() {
    const pointers = this.input.manager.pointers;
    let dl = false, dr = false, du = false, dd = false, act = false;

    for (const p of pointers) {
      if (!p.active || !p.isDown) continue;
      const px = p.x, py = p.y;

      // D-pad zone (within 50px of center)
      const dpx = px - this.padCX, dpy = py - this.padCY;
      const pdist = Math.sqrt(dpx * dpx + dpy * dpy);
      if (pdist < 50 && pdist > 6) {
        if (Math.abs(dpx) > Math.abs(dpy)) {
          if (dpx < 0) dl = true; else dr = true;
        } else {
          if (dpy < 0) du = true; else dd = true;
        }
      }

      // Action button zone (within 36px of center)
      const ax = px - this.actCX, ay = py - this.actCY;
      if (Math.sqrt(ax * ax + ay * ay) < 36) act = true;
    }

    this.dpad.left  = dl; this.dpad.right = dr;
    this.dpad.up    = du; this.dpad.down  = dd;
    this.actionJustPressed = act && !this._prevActionDown;
    this._prevActionDown = act;

    // Visual feedback highlights
    this.dpadHL.clear();
    this.actionHL.clear();
    if (dl || dr || du || dd) {
      this.dpadHL.fillStyle(0xffffff, 0.10);
      this.dpadHL.fillCircle(this.padCX, this.padCY, 44);
    }
    if (act) {
      this.actionHL.fillStyle(0x00ff88, 0.22);
      this.actionHL.fillCircle(this.actCX, this.actCY, 28);
    }
  }
}

// ─── Game Config ─────────────────────────────────────────────────────────────
const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 360,
  parent: 'game-container',
  backgroundColor: '#0a0a0a',
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: [BootScene, OverworldScene, UIScene, CombatScene, TouchScene],
};

const game = new Phaser.Game(config);
