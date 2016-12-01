let stretch = (random, min, max) => {
  return random * (max - min) + min;
};

export default class Particle {
  constructor(geometry, material, scene, attractor, emitterR, emitterH) {
    this.geometry = geometry;
    this.material = material;
    this.attractor = attractor;
    this.emitterR = emitterR;
    this.emitterH = emitterH;

    this.mesh = new THREE.Mesh(geometry, material);
    this.scene = scene;
    scene.add(this.mesh);
    this.velocity = 50;
    this.track = [];
    this.trackLifeTime = stretch(Math.random(), 6, 12);


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
    let minV = 30;
    let angle = stretch(Math.random(), 0, Math.PI * 2);
    let h = stretch(Math.random(), -this.emitterH /2, this.emitterH /2);
    this.mesh.position.y = h;
    this.mesh.position.x = this.emitterR * Math.cos(angle);
    this.mesh.position.z = this.emitterR * Math.sin(angle);

    this.v = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)).normalize().multiplyScalar(stretch(Math.random(), minV, maxV));

    this.a = new THREE.Vector3(this.attractor.position.x, this.attractor.position.y, this.attractor.position.z).normalize();
    this.aForce = 100;
    this.random = Math.random();
    this.lifetime = stretch(this.random, 100, 500);
    this.material.color.setHSL(0.13, 1, 0.5);
    this.age = 0;
  }

  updateTrack() {
    let clone = this.mesh.clone();
    this.track.push(clone);
    this.scene.add(clone);
    if (this.track.length > this.trackLifeTime)
      this.scene.remove(this.track.shift());
    for (let i = 1; i <= this.track.length; i++) {
      let scale = stretch(i / this.track.length, 0.6, 1);
      let point = this.track[i-1];
      point.scale.set(scale, scale, scale);
    }
  }

  updateColor() {
    let distance = this.mesh.position.distanceTo(new THREE.Vector3(0,0,0));
    let brightness = 1 - distance / 500;
    if (brightness < 0) brightness = 0;
    brightness = stretch(brightness, 0.1, 1);
    this.mesh.material.color.setHSL(0.13, 0.5, brightness);

  }

  move(clock) {
    this.age++;

    if (this.age > this.lifetime + this.trackLifeTime + 2) {
      this.init();
      return;
    }

    if (this.age > this.lifetime) {
      if (this.track.length) {
        this.scene.remove(this.track.shift());
      }
      return;
    }

    let oldPosition = this.mesh.position.clone();

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
        this.point = inter.point;
        break;
      }
    }

    if (distance < 10) {
      this.mesh.position.copy(this.point);
      return;
    }

    this.aForce = 4000000 / (distance * distance);



    this.v.x += this.a.x * this.aForce * clock;
    this.v.y += this.a.y * this.aForce * clock;
    this.v.z += this.a.z * this.aForce * clock;

    this.mesh.position.x += this.v.x * clock;
    this.mesh.position.y += this.v.y * clock;
    this.mesh.position.z += this.v.z * clock;

    this.raycaster.set(this.mesh.position, oldPosition.sub(this.mesh.position).normalize());
    let intersections = this.raycaster.intersectObject(this.attractor);
    if (intersections && intersections.length) {
      let point = intersections[0].point;
      this.mesh.position.copy(point);

      //   .add(new THREE.Vector3(
      //   Math.sign(point.x - this.attractor.position.x) * 3,
      //   Math.sign(point.y - this.attractor.position.y) * 3,
      //   Math.sign(point.z - this.attractor.position.z) * 3
      // ));
    }

    this.updateTrack();
    this.updateColor();

    this.line.geometry.vertices[0] = new THREE.Vector3(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z);
    let helpLineLength = this.aForce;
    this.line.geometry.vertices[1] = new THREE.Vector3(this.mesh.position.x + this.a.x * helpLineLength, this.mesh.position.y + this.a.y * helpLineLength, this.mesh.position.z + this.a.z * helpLineLength);
    this.line.geometry.verticesNeedUpdate = true;

  }
}
