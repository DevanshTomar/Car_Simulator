class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 3;
    this.friction = 0.05;
    this.angle = 0;
    this.damaged = false;

    this.sensor = new Sensor(this);
    this.controls = new Controls();
  }

  update(roadBorders) {
    if (!this.damaged) {
      this.#moveCar();
      this.polygon = this.#createPolygon();
      this.damaged = this.#checkForDamage(roadBorders);
    }
    this.sensor.update(roadBorders);
  }

  // method to check if the car is inside the road and to change the color of the car to red if it is not.
  #checkForDamage(roadBorders) {
    for (let i = 0; i < roadBorders.length; i++) {
      if (polysIntersect(this.polygon, roadBorders[i])) {
        return true;
      }
    }
    return false;
  }

  // This method creates a polygon that represents the car. so we can check if the car is inside the road or not.
  #createPolygon() {
    const points = [];
    const radius = Math.hypot(this.width, this.height) / 2;
    const centerAngle = Math.atan2(this.width, this.height);
    points.push({
      x: this.x - Math.sin(this.angle - centerAngle) * radius,
      y: this.y - Math.cos(this.angle - centerAngle) * radius,
    });
    points.push({
      x: this.x - Math.sin(this.angle + centerAngle) * radius,
      y: this.y - Math.cos(this.angle + centerAngle) * radius,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - centerAngle) * radius,
      y: this.y - Math.cos(Math.PI + this.angle - centerAngle) * radius,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + centerAngle) * radius,
      y: this.y - Math.cos(Math.PI + this.angle + centerAngle) * radius,
    });
    return points;
  }

  #moveCar() {
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }
    if (this.controls.backward) {
      this.speed -= this.acceleration;
    }
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }
    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }
    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;
      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }
    }
    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  draw(ctx) {
    if (this.damaged) {
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = "black";
    }
    ctx.beginPath();
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    for (let i = 1; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }
    ctx.fill();
    this.sensor.draw(ctx);
  }
}
