import Lab from './lab1_44';

export default class extends Lab {

  constructor() {
    super();
  }

  prepare() {
    super.prepare();
    this.tetrahedronRadius = 15;

    this.tetrahedronGeomertry = new THREE.TetrahedronGeometry(this.tetrahedronRadius, 0);


    this.tetrahedron = new THREE.Mesh(this.tetrahedronGeomertry, this.tetrahedronMaterial);

    this.scene.add(this.tetrahedron);
    this.tetrahedron.rotation.x = Math.PI / 4;
    this.tetrahedron.rotation.y = -Math.PI / 4;
    // this.tetrahedron.position.x = -150;


    this.tetrahedron.position.y = -30;

    this.teapotGeometry = new THREE.TeapotBufferGeometry(10);

    this.teapot = new THREE.Mesh(this.teapotGeometry, this.teapotMaterial);
    this.teapot.position.y = this.ty;
    this.teapot.position.x = this.tx;


    this.scene.add(this.teapot);
    this.scene.add(this.tetrahedron);

  }

  render() {
    super.render();
  };

}
