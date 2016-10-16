import Lab from './lab1_41_3';

export default class extends Lab {

  constructor() {
    super();

  }

  init() {
    this.loader = new THREE.TextureLoader();
    this.mapTexture = this.loader.load('/images/map.jpg',

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
    console.dir(this.texture);
    console.dir(this);
    this.material = new THREE.MeshBasicMaterial({
      map: this.texture
    });
    console.dir(this.texture);
    this.sphere = new THREE.Mesh(this.sphereGeometry, this.material);

  }


  render() {
  };

}
