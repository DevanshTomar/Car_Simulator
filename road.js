class Road {
  constructor(centerX, width, numberOfLanes = 3) {
    this.centerX = centerX;
    this.width = width;
    this.numberOfLanes = numberOfLanes;

    // The road is an infinite rectangle, so we need to define its boundaries
    // in order to know when to draw it.
    // We will use these boundaries to draw the road and to check if the car is
    // inside the road.
    const infinity = 100000000;
    this.left = centerX - width / 2;
    this.right = centerX + width / 2;
    this.top = -infinity;
    this.bottom = infinity;

    // using these boundaries to check if the car is inside the road.
    const topLeft = { x: this.left, y: this.top };
    const topRight = { x: this.right, y: this.top };
    const bottomLeft = { x: this.left, y: this.bottom };
    const bottomRight = { x: this.right, y: this.bottom };
    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight],
    ];
  }

  // This method returns the center of a lane given its index.
  getLaneCenter(laneIndex) {
    const laneWidth = this.width / this.numberOfLanes;
    return (
      this.left +
      laneWidth / 2 +
      Math.min(laneIndex, this.numberOfLanes - 1) * laneWidth
    );
  }

  draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";

    // Draw lanes
    for (let i = 1; i <= this.numberOfLanes - 1; i++) {
      const x = lerp(this.left, this.right, i / this.numberOfLanes);
      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
    }

    ctx.setLineDash([]); // Solid line
    this.borders.forEach((border) => {
      ctx.beginPath();
      ctx.moveTo(border[0].x, border[0].y);
      ctx.lineTo(border[1].x, border[1].y);
      ctx.stroke();
    });
  }
}
