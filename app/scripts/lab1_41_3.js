import Lab from './lab1_41_2';

export default class extends Lab{

  constructor() {
    super();
  }

  prepare() {
    super.prepare();
    this.smallRadius = 30;
    this.bigRadius = 60;
    this.smallTetrahedronGeomertry = new THREE.TetrahedronGeometry(this.smallRadius, 0);
    this.bigTetrahedronGeomertry = new THREE.TetrahedronGeometry(this.bigRadius, 0);

    this.smallTetrahedron = new THREE.Mesh( this.smallTetrahedronGeomertry, this.normalWiredMaterial);
    this.bigTetrahedron = new THREE.Mesh( this.bigTetrahedronGeomertry, this.normalWiredMaterial);

    this.scene.add( this.smallTetrahedron );
    this.smallTetrahedron.rotation.x = Math.PI/4 ;
    this.smallTetrahedron.rotation.y = - Math.PI/4;
    this.smallTetrahedron.position.x = -150;


    this.smallTetrahedron.position.y += -0.408*this.bigRadius/4;

    this.scene.add( this.bigTetrahedron );
    this.bigTetrahedron.rotation.x = Math.PI/4 ;
    this.bigTetrahedron.rotation.y = - Math.PI/4;
    this.bigTetrahedron.position.x = -150;
  }

  render() {
    console.dir(this);
    super.render();
  };

}
