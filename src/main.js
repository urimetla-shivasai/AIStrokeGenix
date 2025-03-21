import p5 from 'p5';

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(0, 0, 0, 0); // Transparent background to show the gradient
  };

  p.draw = () => {
    if (p.mouseIsPressed) {
      p.fill(p.random(255), p.random(255), p.random(255), 150); // Semi-transparent random colors
      p.noStroke();
      p.ellipse(p.mouseX, p.mouseY, 20, 20); // Draw circles where the mouse is pressed
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

new p5(sketch);
console.log("AIStrokeGenix: Chaos Canvas initialized!");