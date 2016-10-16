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

  init() {
    this.tetrahedronGeomertry = new THREE.TetrahedronGeometry(40, 0);
    this.sphereGeometry = new THREE.SphereGeometry(40, 10, 10);
    this.newSphereGeometry = new THREE.SphereGeometry(40, 10, 10);

    for (var i = 0; i < this.newSphereGeometry.vertices.length; i++) {
      var min = Infinity;
      var minJ = 0;
      for (var j = 0; j < 4; j++) {
        if (this.newSphereGeometry.vertices[i].distanceTo(this.tetrahedronGeomertry.vertices[j]) < min) {
          min = this.newSphereGeometry.vertices[i].distanceTo(this.tetrahedronGeomertry.vertices[j]);
          minJ = j;
        }
      }

      this.newSphereGeometry.vertices[i] = this.tetrahedronGeomertry.vertices[minJ];
    }

    this.sphereGeometry.morphTargets.push({name: "target", vertices: this.newSphereGeometry.vertices});

    this.redMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: '#ff0000 '
    });
    this.whiteMaterial = new THREE.MeshNormalMaterial({
      wireframe: true,
      morphTargets: true
    });
    this.normalMaterial = new THREE.MeshNormalMaterial();
    this.normalWiredMaterial = new THREE.MeshNormalMaterial({
      wireframe: true
    });

    this.tetrahedron = new THREE.Mesh(this.tetrahedronGeomertry, this.redMaterial);
    this.sphere = new THREE.Mesh(this.sphereGeometry, this.whiteMaterial);

    // this.scene.add( this.tetrahedron );
    this.scene.add(this.sphere);

    this.camera.position.z = 100;
    this.camera.position.x = 150;
    this.camera.position.y = 100;
    this.camera.rotation.x = -Math.PI / 4;
    this.camera.rotation.y = +Math.PI / 4;

    this.morph = 0;
  }


  render() {
    requestAnimationFrame(() => this.render());
    this.morph += 0.001;
    if (this.morph >= 1) this.morph = 1;
    this.sphere.morphTargetInfluences[0] = this.morph;
    // this.camera.lookAt ( new THREE.Vector3(0, -50, 0) );
    this.renderer.render(this.scene, this.camera);
  };


}
