class Boid {
  static boids = [];
  static startingSpeed = 2;
  static maxSpeed = 5;

  static separationRadius = 30;
  static separationFactor = 1;

  static alignmentRadius = 200;
  static alignmentFactor = 0.4;

  static cohesionRadius = 250;
  static cohesionFactor = 0.0002;

  
  constructor() {
    this.element = document.createElement("div");
    this.position = [Math.floor(Math.random()*(screenWidth)+1), Math.floor(Math.random()*(screenHeight)+1)];
    this.velocity = [Math.random()*2-1,Math.random()*2-1];

    const speed = Math.hypot(this.velocity[0], this.velocity[1]);
    this.velocity = [Boid.startingSpeed*this.velocity[0]/speed,
                     Boid.startingSpeed*this.velocity[1]/speed];
    this.positionParity();
  }
  boidsWithinRadius(radius) {
    const inBoids = [];
    for (const iBoid of Boid.boids) {
      if (iBoid === this) continue;
      
      const dx = this.position[0]-iBoid.position[0];
      const dy = this.position[1]-iBoid.position[1];
      if (dx*dx+dy*dy <= radius*radius) {
            inBoids.push(iBoid);
      }
    }
    return inBoids;
  }
  separation(){
    for (const iBoid of this.boidsWithinRadius(Boid.separationRadius)){
      this.velocity[0] += 1/(iBoid.position[0]-this.position[0])*Boid.separationFactor;
      this.velocity[1] += 1/(iBoid.position[1]-this.position[1])*Boid.separationFactor;
    }
  }
  cohesion(){
    for (const iBoid of this.boidsWithinRadius(Boid.cohesionRadius)){
      this.velocity[0] += (iBoid.position[0]-this.position[0])*Boid.cohesionFactor;
      this.velocity[1] += (iBoid.position[1]-this.position[1])*Boid.cohesionFactor;
    }
  }
  alignment() {
      const boidsInRadius = this.boidsWithinRadius(Boid.alignmentRadius);
      if (boidsInRadius.length === 0){
        return;
      }
      let averageX = 0;
      let averageY = 0;
      for (const iBoid of boidsInRadius) {
        averageX += iBoid.velocity[0];
        averageY += iBoid.velocity[1];
      }
      averageX /= boidsInRadius.length;
      averageY /= boidsInRadius.length;
      this.velocity[0] += (averageX - this.velocity[0])*Boid.alignmentFactor;
      this.velocity[1] += (averageY - this.velocity[1])*Boid.alignmentFactor;
  }
  rotation() {
    const angle = Math.atan2(this.velocity[1], this.velocity[0]);
    this.element.style.transform = "rotate("+(Math.PI/2-angle)+"rad)";
  }
  maxSpeedCheck() {
    const speed = Math.hypot(this.velocity[0], this.velocity[1]);
    if (speed > Boid.maxSpeed) {
      this.velocity = [Boid.maxSpeed*this.velocity[0]/speed,
                     Boid.maxSpeed*this.velocity[1]/speed];
    }
  }
  borderCheck() {
    if (this.position[0] < 0) {
      this.velocity[0] = -this.velocity[0];
      this.position[0] = 0;
    }
    else if (this.position[0] > screenWidth) {
      this.velocity[0] = -this.velocity[0];
      this.position[0] = screenWidth;
    }
    if (this.position[1] < 0) {
      this.velocity[1] = -this.velocity[1];
      this.position[1] = 0;
    }
    else if (this.position[1] > screenHeight) {
      this.velocity[1] = -this.velocity[1];
      this.position[1] = screenHeight;
    }
  }
  positionParity() {
    this.element.style.left = this.position[0]+'px';
    this.element.style.bottom = this.position[1]+'px';
  }
  velocityPositionUpdate() {
    this.position = [this.position[0]+this.velocity[0],this.position[1]+this.velocity[1]];
    this.positionParity();
  }
}

const numBoids = 40;

const updateIntervals = [];

let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

window.addEventListener('resize',updateScreenSize);

for (let i = 0; i < numBoids; i++) {
  const iBoid = new Boid();
  Boid.boids.push(iBoid);
  updateIntervals.push(setInterval(() => {
      iBoid.separation(); iBoid.cohesion(); iBoid.alignment(); iBoid.borderCheck(); iBoid.maxSpeedCheck(); iBoid.velocityPositionUpdate(); iBoid.rotation();
    }, 1000/30)
  );
  document.body.appendChild(iBoid.element);
}

function updateScreenSize() {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
}
