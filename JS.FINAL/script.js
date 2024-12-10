// Game Variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 600;

let gameRunning = false;
let score = 0;
let level = 1;
let platforms = [];
let player;

class Player {
  constructor() {
    this.width = 40;
    this.height = 40;
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height - 150; // Start higher so the player begins above a platform
    this.speed = 5;
    this.dy = 0;
    this.gravity = 0.5;
    this.jumpStrength = -10;
    this.image = new Image();
    this.image.src = 'character.jpg'; // Path to your image
    this.imageLoaded = false;

    this.image.onload = () => {
      this.imageLoaded = true;
      console.log('Image loaded successfully!');
    };
    this.image.onerror = () => {
      console.error('Failed to load image at character.jpg');
    };
  }

  draw() {
    if (this.imageLoaded) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      // Draw a placeholder if the image hasn't loaded yet
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  move() {
    if (keys.ArrowLeft && this.x > 0) {
      this.x -= this.speed;
    }
    if (keys.ArrowRight && this.x + this.width < canvas.width) {
      this.x += this.speed;
    }

    this.dy += this.gravity;
    this.y += this.dy;
  }

  jump() {
    this.dy = this.jumpStrength;
  }
}

// Platform Class
class Platform {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// Initialize Game
function initGame() {
  score = 0;
  level = 1;
  platforms = [];
  player = new Player();
  generatePlatforms();
  ensureStartingPlatform(); // Ensure a platform is beneath the player
  gameRunning = true;
  gameLoop();
}

// Generate Platforms
function generatePlatforms() {
  for (let i = 0; i < 6; i++) {
    let width = 80;
    let height = 10;
    let x = Math.random() * (canvas.width - width);
    let y = i * 100 + 50; // Platforms are spaced out vertically
    platforms.push(new Platform(x, y, width, height));
  }
}

// Ensure a Starting Platform
function ensureStartingPlatform() {
  // Add a platform directly beneath the player if none exist
  let startingPlatform = new Platform(player.x, player.y + player.height + 10, 100, 10);
  platforms.push(startingPlatform);
}

// Draw Platforms
function drawPlatforms() {
  platforms.forEach(platform => platform.draw());
}

// Check for Collisions
function checkCollisions() {
  platforms.forEach(platform => {
    if (
      player.y + player.height >= platform.y &&
      player.y <= platform.y + platform.height &&
      player.x + player.width >= platform.x &&
      player.x <= platform.x + platform.width &&
      player.dy > 0
    ) {
      player.jump();
      score++;

      // Update level based on score
      if (score >= 10) {
        level = 3;
      } else if (score >= 5) {
        level = 2;
      }
    }
  });
}

// Lose Game
function endGame() {
  gameRunning = false;
  document.getElementById('endMessage').textContent = 'Game Over!';
  document.getElementById('endScreen').classList.remove('hidden');
}

// Scroll Platforms Up
function scrollPlatforms() {
  platforms.forEach(platform => {
    platform.y += 2;
    if (platform.y > canvas.height) {
      platform.y = -10;
      platform.x = Math.random() * (canvas.width - platform.width);
    }
  });
}

// Game Loop
function gameLoop() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.move();
  player.draw();

  drawPlatforms();
  checkCollisions();
  scrollPlatforms();

  // Check if player has fallen off the bottom of the screen
  if (player.y > canvas.height) {
    endGame();
  }

  document.getElementById('level').textContent = `Level: ${level}`;

  requestAnimationFrame(gameLoop);
}

// Event Listeners
const keys = {};
window.addEventListener('keydown', e => (keys[e.key] = true));
window.addEventListener('keyup', e => (keys[e.key] = false));

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
  document.getElementById('startScreen').classList.add('hidden');
  initGame();
});

const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', () => {
  document.getElementById('endScreen').classList.add('hidden');
  initGame();
});
