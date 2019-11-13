let sketch = function (p) {
  let particles = [];
  let toRelease = 150;

  p.windowResized = () => {
    p.setup();
  }

  p.setup = function () {
    particles = [];

    p.createCanvas(300, 300);

    for (let i = 0; i < toRelease; i++) {
      particles.push(new Particle());
    }
  }


  p.draw = function () {
    p.colorMode(p.HSB, 360, 100, 100);
    p.background(215, 90, 15);
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      particle.move();
      particle.display();
    }
  }

  class Particle {
    constructor() {
      this.x = p.random(p.width);
      this.y = p.random(p.height);
      this.radius = p.random(2, 4.5);
      this.color = p.random(0, )
      this.sX = p.random(0.5, 1.1);
      this.sY = p.random(0.5, 1.1);
      this.oS = p.random(1, 2);
      this.opacity = p.random(50, 100);

      if (this.sX > .9) {
        this.sX *= -1;
        this.sY *= -1;
      }
    }
    move() {
      this.x += this.sX;
      this.y += this.sY;
      this.opacity += this.oS;
      this.checkBounds();
      this.checkTwinkle();
    }

    checkTwinkle() {
      if (this.opacity >= 100 || this.opacity <= 50) {
        this.oS *= -1;
      }
    }

    checkBounds() {
      if (this.x > p.width || this.x < 0) {
        this.sX *= -1;
      }

      if (this.y > p.height || this.y < 0) {
        this.sY *= -1;
      }

      if (p.dist(p.mouseX, p.mouseY, this.x, this.y) < 80) {
        if (p.mouseX > this.x && Math.sign(this.sX) === 1) {
          this.sX *= -1.2;
          this.opacity = 50;
        } else if (p.mouseX < this.x && Math.sign(this.sX) === -1) {
          this.sX *= -1.2;
          this.opacity = 50;
        }

        if (p.mouseY > this.y && Math.sign(this.sY) === 1) {
          this.sY *= -1.2;
          this.opacity = 50;
        } else if (p.mouseY < this.y && Math.sign(this.sY) === -1) {
          this.sY *= -1.2;
          this.opacity = 50;
        }
      }
    }

    display() {
      //p.push();
      //p.angleMode(p.DEGREES);
      //p.stroke(this.x, 0, this.opacity);
      //p.strokeWeight(.2);
      //p.line(this.x, this.y, this.x + (60 * (p.height - this.y)/this.y), 0);
      //p.rotate(25.0);
      //p.pop();

      p.colorMode(p.HSB, p.width, 100, 100);
      p.noStroke();
      p.fill(p.constrain(this.x, p.width * (3 / 7), p.width * (5 / 7)), p.width, this.opacity);
      p.ellipse(this.x, this.y, this.radius, this.radius);

      p.stroke(this.x, 0, 50);
      p.strokeWeight(10);
      p.noFill();
      p.ellipse(p.mouseX, p.mouseY, 80, 80);
    }
  }
}

new p5(sketch, 'container');