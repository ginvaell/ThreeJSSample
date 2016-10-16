import Lab from './lab1_44_3';

export default class extends Lab {

  constructor() {
    super();
  }

  init() {
    this.loader = new THREE.TextureLoader();
    this.loader.load('/images/oblaka_minimalizm_luchi_tekstury_2560x1600.jpg',

      (texture) => this.onLoad(texture),

      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },

      (xhr) => {
        console.log('An error happened');
      });
  }

  onLoad(texture) {
    this.texture = texture;
    console.dir(texture);
    this.prepare();
  }

  prepare() {
    super.prepare();
    super.render();
  }

  prepareHelper() {
    this.material = new THREE.MeshBasicMaterial({
      map: this.texture
    });

    this.teapotMaterial = this.material;
    this.tetrahedronMaterial  = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.5,
      map: this.texture
    });
    this.sphere = new THREE.Mesh(this.sphereGeometry, this.material);
    this.cylinder = new THREE.Mesh(this.cylinderGeometry, this.material);
    this.torus = new THREE.Mesh(this.torusGeometry, this.material);
    this.tetrahedron = new THREE.Mesh(this.tetrahedronGeomertry, this.material);

  }


  render() {
  };

}
