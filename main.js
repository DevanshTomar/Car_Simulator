const carCanvas = document.getElementById('carCanvas');
carCanvas.width = 300;

const visualCanvas = document.getElementById("visualCanvas");
visualCanvas.width = 400;

const carCtx = carCanvas.getContext("2d");
const visualCtx = visualCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

const N = 10;
const cars = generateCars(N);
const traffic = [
  new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2),
];


animate();

function generateCars(N){
  const cars = [];
  for(let i = 0; i < N; i++){
    cars.push(new Car(road.getLaneCenter(1), 100 , 30, 50, "AI"));
  }
  return cars;
}


function animate(time){
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }

  carCanvas.height = window.innerHeight;
  visualCanvas.height = window.innerHeight; // to remove the trail of the car
  // to remove the trail of the car
  for(let i = 0; i < cars.length; i++){
    cars[i].update(road.borders, traffic);
  }

  const bestCar = cars.find(c => c.y == Math.min(...cars.map(c => c.y)));
  
  carCtx.save();
  carCtx.translate(0, -cars[0].y + carCanvas.height * 0.7);
  road.draw(carCtx);
  // Drawing traffic
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx, "green");
  }
  for (let i = 0; i < cars.length; i++) {
    cars[i].update(road.borders, traffic);
  }

  carCtx.globalAlpha = 0.2;
  for (let i = 0; i < cars.length; i++) {
    cars[i].draw(carCtx, "blue");
  }
  carCtx.globalAlpha = 1;
  cars[0].draw(carCtx, "blue", true);
  carCtx.restore();

  // Drawing the visual canvas
  visualCtx.lineDashOffset = - time / 50;
  Visualizer.drawNetwork(visualCtx, cars[0].brain);
  requestAnimationFrame(animate);
};