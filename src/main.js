import p5 from 'p5';

const sketch = (p) => {
  let circles = []; // Array to store circle objects

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(0, 0, 0, 0); // Transparent background
  };

  p.draw = () => {
    // Add new circles when mouse is pressed
    if (p.mouseIsPressed) {
      let newCircle = {
        x: p.mouseX,
        y: p.mouseY,
        size: 20,
        r: p.random(255),
        g: p.random(255),
        b: p.random(255),
        alpha: 150,
        growth: p.random(-1, 1), // Random growth/shrink factor
        life: 255 // Lifespan for fading out
      };
      circles.push(newCircle);
    }

    // Update and draw all circles
    for (let i = circles.length - 1; i >= 0; i--) {
      let c = circles[i];

      // Draw the circle
      p.fill(c.r, c.g, c.b, c.alpha);
      p.noStroke();
      p.ellipse(c.x, c.y, c.size, c.size);

      // "AI" evolution: Grow/shrink and fade
      c.size += c.growth;
      c.life -= 1;
      c.alpha = p.map(c.life, 0, 255, 0, 150);

      // Transform into a different shape if size gets too big
      if (c.size > 50) {
        p.push();
        p.translate(c.x, c.y);
        p.rotate(p.frameCount * 0.05);
        p.fill(c.r, c.g, c.b, c.alpha);
        p.star(0, 0, c.size / 2, c.size / 4, 5); // Draw a star
        p.pop();
      }

      // Remove circle if it’s faded out
      if (c.life <= 0) {
        circles.splice(i, 1);
      }
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  // Helper function to draw a star shape
  p.star = (x, y, radius1, radius2, npoints) => {
    let angle = p.TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    p.beginShape();
    for (let a = 0; a < p.TWO_PI; a += angle) {
      let sx = x + p.cos(a) * radius1;
      let sy = y + p.sin(a) * radius1;
      p.vertex(sx, sy);
      sx = x + p.cos(a + halfAngle) * radius2;
      sy = y + p.sin(a + halfAngle) * radius2;
      p.vertex(sx, sy);
    }
    p.endShape(p.CLOSE);
  };
};

new p5(sketch);
console.log("AIStrokeGenix: Chaos Canvas initialized!");