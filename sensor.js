class Sensor {
  constructor(car) {
    this.car = car;
    this.numberOfRays = 5; 
    this.LengthOfRay = 150;
    this.raySpread = Math.PI / 2;

    this.rays = [];
    this.readings = [];
  }

  update(roadBorders, traffic) {
    this.#createSensorRays();
    this.readings = [];
    for(let i = 0; i < this.rays.length; i++){
      this.readings.push(this.#getReading(
        this.rays[i], 
        roadBorders,
        traffic
      ));
    }
  }

  #getReading(ray, roadBorders, traffic){
    let intersections = [];
    for(let i = 0; i < roadBorders.length; i++){
      const intersect = getIntersection(ray[0], ray[1], roadBorders[i][0], roadBorders[i][1]);
      if(intersect){
        intersections.push(intersect);
      }
    }

    for(let i = 0; i < traffic.length; i++){
      const poly = traffic[i].polygon;
      for(let j = 0; j < poly.length; j++){
        const intersect = getIntersection(ray[0], ray[1], poly[j], poly[(j + 1) % poly.length]);
        if(intersect){
          intersections.push(intersect);
        }
      }
    }

    if (intersections.length == 0) {
      return null;
    }
    else{
      const offsets = intersections.map(intersection => intersection.offset);
      const minOffset = Math.min(...offsets);
      return intersections.find(intersection => intersection.offset == minOffset);
    }
  }

  #createSensorRays(){
    this.rays = [];
    for (let i = 0; i < this.numberOfRays; i++) {
      const rayAngle =
        lerp(
          this.raySpread / 2,
          -this.raySpread / 2,
          this.numberOfRays == 1 ? 0.5 : i / (this.numberOfRays - 1)
        ) + this.car.angle;

      const start = {
        x: this.car.x,
        y: this.car.y,
      };
      const end = {
        x: this.car.x - Math.sin(rayAngle) * this.LengthOfRay,
        y: this.car.y - Math.cos(rayAngle) * this.LengthOfRay,
      };
      this.rays.push([start, end]);
    }
  }



  draw(ctx) {
    for (let i = 0; i < this.numberOfRays; i++) {
      let end = this.rays[i][1];
      if (this.readings[i]) {
        end = this.readings[i];
      }
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }
  }
}
