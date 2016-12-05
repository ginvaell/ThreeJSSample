import Particle from'./Particle';
export default class {
  constructor() {

    this.scene = new THREE.Scene();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.zoom = 2;
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 5000);
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.itemCounter = 0;
    this.itemAmount = 2;

    this.loader = new THREE.TextureLoader();

    this.clock = new THREE.Clock();

    this.loadTexture('/images/metal.jpg', texture => this.addCylinder(texture));


    this.lights = [new THREE.DirectionalLight(0xffffff, 3), new THREE.PointLight(0x00ff00, 5)];

    this.lights[0].position.set(100, 100, 100);

    this.scene.add(this.lights[0]);

    this.lightIndex = 0;

    this.camera.position.z = 500;
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

    var ambientLight = new THREE.AmbientLight(0xffffff); // soft white light
    this.scene.add(ambientLight);
    this.helper = new THREE.DirectionalLightHelper(this.lights[0], 1);
    // this.scene.add(this.helper);

    this.cameraHelper = new THREE.CameraHelper(this.lights[0].shadow.camera);

  }

  loadTexture(url, onSuccess) {
    this.loader.load(url,

      onSuccess,

      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },

      (xhr) => {
        console.log('An error happened');
      });
  }

  addCylinder(texture) {
    var a = 100;
    this.a = a;
    this.smallA = a / 5;
    this.angle = 0;
    this.attractor = new THREE.Mesh(
      new THREE.CylinderGeometry(a / 2, a / 2, a, 30),
      new THREE.MeshPhongMaterial({
        map: texture,
        shading: THREE.SmoothShading,
        shininess: 10
      })
    );

    this.scene.add(this.attractor);

    this.attractor.position.y = 200;
    this.attractor.position.z = -400;
    this.attractor.position.x = -400;
    this.itemCounter++;
    this.loadTexture('/images/sp.jpg', texture => this.addParticleSystem(texture));
    this.render();
  }

  addParticleSystem(texture) {
    this.count = 1000;
    let a = 5;
    let geometry = new THREE.SphereGeometry(a, 20, 20);

    this.particles = [];

    for (let i = 0; i < this.count; i++) {
      this.particles.push(new Particle(
        geometry,
        new THREE.MeshPhongMaterial({
          map: texture,
          color: 0xffffff
        }),
        this.scene,
        this.attractor));
    }

    this.itemCounter++;
    this.render();
  }

  render() {
    if (this.itemCounter !== this.itemAmount) {
      return;
    }
    requestAnimationFrame(() => this.render());
    this.controls.update();
    this.helper.update();
    this.renderer.render(this.scene, this.camera);
    this.update();
  };

  update() {
    var moveDistance = this.clock.getDelta();
    for (let particle of this.particles) {
      particle.move(moveDistance);
    }
  }


}
