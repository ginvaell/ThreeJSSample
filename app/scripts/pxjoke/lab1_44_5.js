import Lab from './lab1_44_4';

export default class extends Lab {

  constructor() {
    super();
  }




  prepare() {
    super.prepare();
    super.render();
  }

  prepareHelper() {
    super.prepareHelper();
    this.ty = 15;
    this.tx = 0;
    this.torus.rotateX(1.0);
  }




  render() {
  };

}
