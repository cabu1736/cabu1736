// DOM Elements
const gameContainer = document.getElementById("game-container");
const character = document.getElementById("character");
const scoreDisplay = document.getElementById("score");
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const gameOverScreen = document.getElementById("game-over");
const restartButton = document.getElementById("restart-button");
const finalScore = document.getElementById("final-score");

// Game Variables
let characterBottom = 150; // Starting above ground
let characterLeft = 190;
let gravity = 2;
let isJumping = false;
let platforms = [];
let score = 0;
let gameRunning = false; // Prevent game logic from running until started
let gravityInterval, platformInterval;

// Debugging Logs
console.log("Game initialized. Waiting for Start Game button...");

function log(message) {
  console.log(`[DEBUG]: ${message}`);
}

// Create Platforms
function createPlatform(bottom) {
  const platform = document.createElement("div");
  platform.classList.add("platform");
  platform.style.bottom = `${bottom}px`;
  platform.style.left = `${Math.random() * 320}px`;
  gameContainer.appendChild(platform);
  platforms.push({ element: platform, bottom });
  log(`Platform created at bottom=${bottom}`);
}

function initializePlatforms() {
  platforms = [];
  for (let i = 0; i < 5; i++) {
    createPlatform(i * 120);
  }
}

// Reset Game State
function resetGame() {
  log("Resetting game...");
  platforms.forEach((platform) => platform.element.remove());
  platforms = [];
  characterBottom = 150; // Reset character position
  characterLeft = 190;
  score = 0;
  isJumping = false;
  gameRunning = true; // Allow game logic to run
  character.style.bottom = `${characterBottom}px`;
  character.style.left = `${characterLeft}px`;
  scoreDisplay.innerText = `Score: ${score}`;
  log("Game reset complete.");
}

// Start Game
function startGame() {
  log("Starting game...");
  resetGame();
  startScreen.classList.add("hidden"); // Hide the start screen
  gameOverScreen.classList.add("hidden"); // Hide the game over screen
  initializePlatforms(); // Create platforms
  applyGravity(); // Start gravity logic
  movePlatforms(); // Start moving platforms
}

// End Game
function gameOver() {
  if (!gameRunning) return; // Prevent multiple triggers
  log(`Game Over Triggered: characterBottom=${characterBottom}`);
  gameRunning = false; // Stop the game
  clearInterval(gravityInterval); // Stop gravity
  clearInterval(platformInterval); // Stop platforms
  finalScore.innerText = score; // Show final score
  gameOverScreen.classList.remove("hidden"); // Show game over screen
}

// Apply Gravity
function applyGravity() {
  gravityInterval = setInterval(() => {
    if (!gameRunning) {
      clearInterval(gravityInterval);
      return;
    }

    characterBottom -= gravity;
    log(`Gravity applied: characterBottom=${characterBottom}`);
    character.style.bottom = `${characterBottom}px`;

    // Check if character falls below screen
    if (characterBottom <= 0) {
      gameOver();
    }
  }, 20);
}

// Move Platforms
function movePlatforms() {
  platformInterval = setInterval(() => {
    if (!gameRunning) {
      clearInterval(platformInterval);
      return;
    }

    platforms.forEach((platform) => {
      platform.bottom -= 2;
      platform.element.style.bottom = `${platform.bottom}px`;

      if (platform.bottom < 0) {
        platform.element.remove();
        platforms.shift();
        createPlatform(600);
      }
    });
  }, 30);
}

// Event Listeners
startButton.addEventListener("click", () => {
  log("Start button clicked.");
  startGame();
});

restartButton.addEventListener("click", () => {
  log("Restart button clicked.");
  startGame();
});
