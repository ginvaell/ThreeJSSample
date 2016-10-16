export default class {
  constructor() {
    this.scene = new THREE.Scene();
    this.canvas = document.getElementById('glcanvas');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.zoom = 15;
    // this.camera = new THREE.OrthographicCamera(this.width / -this.zoom, this.width / this.zoom, this.height / this.zoom, this.height / -this.zoom, -1000, 1000);
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 5000);

    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, antialiasing:true});
    this.renderer.setSize(this.width, this.height);


  }

  prepare() {
    this.tx = -25;
    this.ty = 35;
    this.torusGeometry = new THREE.TorusGeometry(15, 3, 16, 100);
    this.sphereGeometry = new THREE.SphereGeometry(20, 50, 50);
    this.cylinderGeometry = new THREE.CylinderGeometry(5, 5, 20, 32);

    this.normalWiredMaterial = new THREE.MeshNormalMaterial({
      wireframe: true
    });

    this.basicWiredMaterial = new THREE.MeshBasicMaterial({
      wireframe: true
    });

    this.cylinderMaterial = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
      wireframe: true
    });


    this.sphereMaterial = new THREE.MeshBasicMaterial({
      wireframe: true
    });

    this.torusMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: '#cc33cc'
    });

    this.teapotMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: '#cc33cc'
    });

    this.tetrahedronMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: '#cc33cc'
    });
    this.sphere = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
    this.torus = new THREE.Mesh(this.torusGeometry, this.torusMaterial);
    this.cylinder = new THREE.Mesh(this.cylinderGeometry, this.cylinderMaterial);

    this.prepareHelper();

    this.torus.position.z = -30;
    this.torus.rotateX(0.8);

    this.cylinder.rotateX(0.8);
    this.sphere.position.x = -40;
    this.cylinder.position.x = 30;
    this.scene.add(this.cylinder);
    this.scene.add(this.torus);
    this.scene.add(this.sphere);

    this.camera.position.set(0, 0, 130);
  }

  prepareHelper() {
  }

  init() {
    this.prepare();
  }

  render() {
    // requestAnimationFrame( render );
    this.renderer.render(this.scene, this.camera);
  };


}
