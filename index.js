class Boid {
  static boids = [];
  static startingVelocityFactor = 2;
  
  constructor() {
    this.element = document.createElement("div");
    this.position = [Math.floor(Math.random()*(screenWidth)+1), Math.floor(Math.random()*(screenHeight)+1)];
    this.velocity = [Math.random()*2-1,Math.random()*2-1];

    const velocityMagnitude = Math.hypot(this.velocity[0], this.velocity[1]);
    this.velocity = [startingVelocityFactor*this.velocity[0]/velocityMagnitude,
                     startingVelocityFactor*this.velocity[1]/velocityMagnitude];
    this.positionParity();

    const velocityPositionUpdateInterval = setInterval(() => {this.velocityPositionUpdate(); this.borderCheck();}, 1000/30);

    document.body.appendChild(this.element);
  }
  boidsWithinRadius(radius) {
    inBoids = [];
    for (Boid iBoid : boids) {
      if ((this.position[0]-iBoid.position[0])*(this.position[0]-iBoid.position[0]) +
          (this.position[1]-iBoid.position[1])*(this.position[1]-iBoid.position[1]) 
          < radius*radius) {
            inBoids.push(iBoid);
          }
    }
    return inBoids;
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

const numBoids = 20;

let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

window.addEventListener('resize',updateScreenSize);

for (let i = 0; i < numBoids; i++) {
  const iBoid = new Boid();
  Boid.boids.push(iBoid);
}

function updateScreenSize() {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
}
