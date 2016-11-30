let random = (min, max) => {
  return Math.random() * (max - min) + min;
};

export default class Particle {
  constructor(geometry, material, scene, attractor) {
    this.geometry = geometry;
    this.material = material;
    this.attractor = attractor;
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene = scene;
    scene.add(this.mesh);
    this.velocity = 50;
    this.lifetime = random(100, 500);

    this.raycaster = new THREE.Raycaster();


    var geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3( 0, 0, 0 ),
      new THREE.Vector3( 0, 10, 10 )
    );

    this.line = new THREE.Line( geometry, material );
    this.scene.add( this.line );


    this.init();
  }

  init() {
    let maxV = 100;
    this.v = new THREE.Vector3(random(-maxV, maxV), random(-maxV, maxV), random(-maxV, maxV));
    this.a = new THREE.Vector3(this.attractor.position.x, this.attractor.position.y, this.attractor.position.z).normalize();
    this.aForce = 100;
    this.age = 0;
    this.mesh.position.x = 0;
    this.mesh.position.y = 0;
    this.mesh.position.z = 0;
  }

  move(clock) {
    if (this.age > this.lifetime) {
      this.init();
      return;
    }


    this.a = new THREE.Vector3(this.attractor.position.x - this.mesh.position.x, this.attractor.position.y - this.mesh.position.y,this.attractor.position.z - this.mesh.position.z).normalize();
    let distance = this.mesh.position.distanceTo(this.attractor.position);
    this.aForce = 20000 / distance;

    this.v.x += this.a.x * this.aForce * clock;
    this.v.y += this.a.y * this.aForce * clock;
    this.v.z += this.a.z * this.aForce * clock;

    this.mesh.position.x += this.v.x * clock;
    this.mesh.position.y += this.v.y * clock;
    this.mesh.position.z += this.v.z * clock;

    this.line.geometry.vertices[0] = new THREE.Vector3(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z);
    let helpLineLength = this.aForce;
    this.line.geometry.vertices[1] = new THREE.Vector3(this.mesh.position.x + this.a.x * helpLineLength, this.mesh.position.y + this.a.y * helpLineLength, this.mesh.position.z + this.a.z * helpLineLength);
    this.line.geometry.verticesNeedUpdate = true;

    this.age++;
  }
}
