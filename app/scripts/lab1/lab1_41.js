export default class {
  constructor() {
    this.scene = new THREE.Scene();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.zoom = 5;
    this.camera = new THREE.OrthographicCamera( this.width / - this.zoom, this.width / this.zoom, this.height / this.zoom, this.height / - this.zoom, 1, 1000 );
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );


  }

  prepare() {
    this.cubeGeometry = new THREE.BoxGeometry( 40, 40, 40 );
    this.sphereGeometry = new THREE.SphereGeometry(40*0.866, 20, 20);

    this.redMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: '#ff0000'
    });
    this.whiteMaterial = new THREE.MeshBasicMaterial({
      wireframe: true
    });
    this.normalMaterial = new THREE.MeshNormalMaterial();
    this.normalWiredMaterial = new THREE.MeshNormalMaterial({
      wireframe: true
    });

    this.t1Material = this.normalWiredMaterial;
    this.t2Material = this.normalWiredMaterial;

    this.cube = new THREE.Mesh( this.cubeGeometry, this.redMaterial );
    this.sphere = new THREE.Mesh( this.sphereGeometry, this.whiteMaterial);

    this.prepareHelper();

    this.cube.position.x = 50;
    this.cube.position.y = 50;
    this.sphere.position.x = 50;
    this.sphere.position.y = 50;

    // this.cube.rotation.x += 0.3;
    // this.cube.rotation.y += 0.3;

    this.scene.add( this.cube );
    this.scene.add( this.sphere );

    this.camera.position.z = 100;
  }

  prepareHelper() {}

  init() {
    this.prepare();
  }

  render () {
    // requestAnimationFrame( render );
    this.renderer.render( this.scene, this.camera );
  };


}
