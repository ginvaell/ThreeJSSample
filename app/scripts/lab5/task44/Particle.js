let stretch = (random, min, max) => {
  return random * (max - min) + min;
};

export default class Particle {
  constructor(geometry, material, scene, attractor) {
    this.geometry = geometry;
    this.material = material;
    this.attractor = attractor;
    let random = Math.random();
    this.material.color.setHSL(stretch(random, 0, 0.17), 1, 0.5);
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene = scene;
    scene.add(this.mesh);
    this.velocity = 50;
    this.lifetime = stretch(random, 100, 500);

    this.raycaster = new THREE.Raycaster();


    var geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3( 0, 0, 0 ),
      new THREE.Vector3( 0, 10, 10 )
    );

    this.line = new THREE.Line( geometry, material );
    // this.scene.add( this.line );


    this.init();
  }

  init() {
    let maxV = 100;
    this.v = new THREE.Vector3(stretch(Math.random(), -maxV, maxV), stretch(Math.random(), -maxV, maxV), stretch(Math.random(), -maxV, maxV));
    this.a = new THREE.Vector3(this.attractor.position.x, this.attractor.position.y, this.attractor.position.z).normalize();
    this.aForce = 100;
    this.age = 0;
    this.mesh.position.x = 0;
    this.mesh.position.y = 0;
    this.mesh.position.z = 0;
  }

  move(clock) {
    this.age++;

    if (this.age > this.lifetime) {
      this.init();
      return;
    }


    let centerVector = new THREE.Vector3(this.attractor.position.x - this.mesh.position.x, this.attractor.position.y - this.mesh.position.y,this.attractor.position.z - this.mesh.position.z).normalize();
    this.raycaster.set(this.mesh.position, centerVector);
    let intersection = this.raycaster.intersectObject(this.attractor)[0];
    if (!intersection) return;
    let distance = intersection.distance;
    this.a = new THREE.Vector3(intersection.point.x - this.mesh.position.x, intersection.point.y - this.mesh.position.y,intersection.point.z - this.mesh.position.z).normalize();

    let directions = [];
    directions.push(new THREE.Vector3(0, centerVector.y, centerVector.z).normalize());
    directions.push(new THREE.Vector3(centerVector.x, 0, centerVector.z).normalize());
    directions.push(new THREE.Vector3(centerVector.x, centerVector.y, 0).normalize());

    for (let direction of directions) {
      this.raycaster.set(this.mesh.position, direction);
      let intersections = this.raycaster.intersectObject(this.attractor);
      if (intersections.length) {
        let inter = intersections[0];
        this.a = new THREE.Vector3(inter.point.x - this.mesh.position.x, inter.point.y - this.mesh.position.y,inter.point.z - this.mesh.position.z).normalize();
        distance = inter.distance;
        break;
      }
    }

    if (distance < 50) return;

    this.aForce = 40000000 / (distance * distance);



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

  }
}
