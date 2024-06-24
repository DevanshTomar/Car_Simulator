class Road {
  constructor(x, width, laneCount = 3) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    this.left = x - width / 2;
    this.right = x + width / 2;

    const infinity = 1000000;
    this.top = -infinity;
    this.bottom = infinity;

    this.borders = this.createBorders();
  }

  // Method to create road borders
  createBorders() {
    return [
      {
        start: { x: this.left, y: this.top },
        end: { x: this.left, y: this.bottom },
      },
      {
        start: { x: this.right, y: this.top },
        end: { x: this.right, y: this.bottom },
      },
    ];
  }

  // Method to calculate the center of a lane given the lane index
  getLaneCenter(laneIndex) {
    if (laneIndex < 0 || laneIndex >= this.laneCount) {
      throw new Error("Invalid lane index");
    }
    const laneWidth = this.width / this.laneCount;
    return this.left + laneWidth / 2 + laneIndex * laneWidth;
  }

  // Method to draw the road on the canvas
  draw(ctx) {
    this.drawLaneLines(ctx);
    this.drawBorders(ctx);
  }

  // Method to draw lane lines
  drawLaneLines(ctx) {
    const laneDashPattern = [20, 20];
    const borderWidth = 5;
    const borderColor = "white";

    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = borderColor;
    ctx.setLineDash(laneDashPattern);

    for (let i = 1; i < this.laneCount; i++) {
      const x = lerp(this.left, this.right, i / this.laneCount);
      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
    }
  }

  // Method to draw road borders
  drawBorders(ctx) {
    const borderWidth = 5;
    const borderColor = "white";

    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = borderColor;
    ctx.setLineDash([]);

    this.borders.forEach(({ start, end }) => {
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    });
  }
}
