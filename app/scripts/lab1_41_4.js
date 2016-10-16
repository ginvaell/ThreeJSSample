import Lab from './lab1_41_3';

export default class extends Lab{

  constructor() {
    super();
    this.smallTetrahedron.position.y += 0.408*this.bigRadius*3;

  }

  render() {
    super.render();
  };

}
