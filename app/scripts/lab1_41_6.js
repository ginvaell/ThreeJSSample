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

    this.tetrahedronGeomertry = new THREE.TetrahedronGeometry(40, 0);
    this.sphereGeometry = new THREE.SphereGeometry(40, 10, 10);
    this.newSphereGeometry = new THREE.SphereGeometry(40, 10, 10);

    this.redMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: '#ff0000'
    });
    this.whiteMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      morphTargets: true
    });
    this.normalMaterial = new THREE.MeshNormalMaterial();
    this.normalWiredMaterial = new THREE.MeshNormalMaterial({
      wireframe: true
    });

    this.tetrahedron = new THREE.Mesh( this.tetrahedronGeomertry, this.redMaterial);
    this.sphere = new THREE.Mesh( this.sphereGeometry, this.whiteMaterial);

    this.scene.add( this.tetrahedron );
    this.scene.add( this.sphere );

    this.camera.position.z = 100;

    for (var i = 0; i < this.newSphereGeometry.vertices.length; i++) {
      this.newSphereGeometry.vertices[i] = this.tetrahedronGeomertry.vertices[i % 4];
    }

    console.dir(this.newSphereGeometry);

    this.sphereGeometry.morphTargets.push( { name: "target", vertices: this.newSphereGeometry.vertices } );
    this.morph = 0;
  }


  render () {
    // requestAnimationFrame( () => this.render() );
    this.morph = 1;
    console.dir(this.sphere.morphTargetInfluences);
    this.sphere.morphTargetInfluences[0] = 1;
    this.renderer.render( this.scene, this.camera );
  };


}
