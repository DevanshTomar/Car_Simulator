const canvas = document.getElementById('myCanvas');
canvas.width = 300;
const ctx = canvas.getContext('2d');

const car = new Car(150, 100, 30, 50);
// animate();

// function animate(){
//     canvas.height = window.innerHeight;
//     car.update();

//     ctx.save();
//     ctx.translate(0, -car.y + canvas.height * 0.7);

//     road.draw(ctx);
//     car.draw(ctx);
    
//     ctx.restore();
//     requestAnimationFrame(animate);
// }

animate();

function animate(){
  canvas.height = window.innerHeight; // to remove the trail of the car
  car.update();
  car.draw(ctx);
  requestAnimationFrame(animate);
};