// basic game config
export default {
  // Game size and fps
  gameWidth: 300,
  gameHeight: 400,
  fps: 30,
  // Level setup - Difficulty settings
  bombRate: 0.05, // how many bombs can be dropped each second by one invader
  bombMinVelocity: 50,
  bombMaxVelocity: 50,
  invaderInitialVelocity: 25,
  invaderAcceleration: 0,
  invaderDropDistance: 20,
  rocketVelocity: 120,
  rocketMaxFireRate: 2,
  debugMode: false,
  // Number of invader rows and cols
  invaderRanks: 5,
  invaderFiles: 10,
  shipSpeed: 120,
  levelDifficultyMultiplier: 0.2,
  pointsPerInvader: 5
}
