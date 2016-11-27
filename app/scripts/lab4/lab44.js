export default class {
  constructor() {

    this.scene = new THREE.Scene();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.zoom = 2;
    // this.camera = new THREE.OrthographicCamera( this.width / - this.zoom, this.width / this.zoom, this.height / this.zoom, this.height / - this.zoom, 1, 1000 );
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 5000);
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
    this.itemCounter = 0;
    this.itemAmount = 2;
    this.loader = new THREE.TextureLoader();

    this.clock = new THREE.Clock();

    this.loadTexture('/images/tree.jpg', bMap => {
      this.bumpMap = bMap;
      // this.loadTexture('/images/tet.jpg', texture => this.addCube(texture));
      this.loadTexture('/images/tree.jpg', texture => this.addTorus(texture));
      this.loadTexture('/images/sp.jpg', texture => this.addSphere(texture));
    });



    this.lights = [new THREE.DirectionalLight( 0xff0000, 3 ), new THREE.PointLight( 0x00ff00, 5 )];

    this.lights[0].position.set( 100, 100, 100 );

    this.scene.add(this.lights[0]);
    this.lights[1].position.set( -50, 50, 0 );
    // this.lights[1].target.position = 40;
    // this.scene.add(this.lights[1]);

    this.lightIndex = 0;

    this.camera.position.z = 500;
    this.camera.rotation.x -0.3;
    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
    // this.addLightSphere();

    var ambientLight = new THREE.AmbientLight( 0xffffff ); // soft white light
    this.scene.add( ambientLight );
    this.helper = new THREE.DirectionalLightHelper(this.lights[0], 1);
    this.scene.add(this.helper);

    this.cameraHelper = new THREE.CameraHelper( this.lights[0].shadow.camera );
    // this.scene.add(this.cameraHelper);

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

  addCube(texture) {
    var a = 40;
    this.cube = new THREE.Mesh(
      new THREE.BoxGeometry( a, a, a ),
      new THREE.MeshLambertMaterial({
        map: texture
      })
    );
    this.scene.add(this.cube);
    this.cube.rotation.x = 0.3;
    this.cube.rotation.y = 0.3;
    this.cube.position.x = -100;
    this.cube.position.z = -80;
    this.cube.castShadow = true;
    this.cube.receiveShadow = true;
    this.itemCounter++;
    this.render();
  }

  addTorus(texture) {
    var a = 40;
    this.a = a;
    this.smallA = a / 5;
    this.angle = 0;
    this.torus = new THREE.Mesh(
      new THREE.TorusGeometry( a, this.smallA, 30, 30 ),
      new THREE.MeshPhongMaterial({
        map: texture,
        bumpMap: this.bumpMap,
        shading: THREE.SmoothShading,
        shininess: 10
      })
    );
    this.scene.add(this.torus);
    this.torus.rotation.x = Math.PI / 2;
    this.torus.rotation.y = 0;
    this.torus.position.x = a;
    this.itemCounter++;
    this.render();
  }

  addSphere(texture) {
    var a = 15;
    this.sphere = new THREE.Mesh(
      new THREE.SphereGeometry( a * Math.sqrt(3) / 2 , 20, 20 ),
      new THREE.MeshPhongMaterial({
        map: texture
      })
    );
    this.sphere.position.x = 0;
    this.sphere.position.z = 0;
    // this.scene.add(this.sphere);
    this.itemCounter++;
    this.render();
  }

  render () {
    if (this.itemCounter !== this.itemAmount) {
      return;
    }
    requestAnimationFrame( () => this.render() );
    this.controls.update();
    this.helper.update();
    this.renderer.render( this.scene, this.camera );
    this.update();
  };

  update() {
    var moveDistance = this.clock.getDelta();
    let r = this.a - this.smallA;
    let velocity = 1;
    this.angle += velocity * moveDistance;
    console.log(this.angle);
    this.torus.position.x = r * Math.cos(this.angle);
    this.torus.position.z = r * Math.sin(this.angle);
    this.torus.rotation.z = this.angle;

  }


}
