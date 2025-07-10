const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box
};
let score = 0;
let direction;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "#000";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Move snake
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "UP") headY -= box;
  if (direction === "DOWN") headY += box;

  if (headX === food.x && headY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box
    };
  } else {
    snake.pop();
  }

  const newHead = { x: headX, y: headY };

  // Game over conditions
  if (
    headX < 0 || headX >= canvas.width || headY < 0 || headY >= canvas.height ||
    snake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)
  ) {
    clearInterval(game);
    alert("Game Over! Score: " + score);
  }

  snake.unshift(newHead);
}

let game = setInterval(draw, 100);
