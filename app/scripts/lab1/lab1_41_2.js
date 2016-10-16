import Lab from './lab1_41';

export default class extends Lab{

  constructor() {
    super();
  }

  prepare() {
    super.prepare();
    this.rotateAroundWorldAxis(this.cube, new THREE.Vector3(0,0,1), Math.PI/4);
    this.rotateAroundWorldAxis(this.sphere, new THREE.Vector3(0,0,1), Math.PI/4);
  }

  rotateAroundWorldAxis(object, axis, radians) {
    console.log('rotate');
    var rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);

    var currentPos = new THREE.Vector4(object.position.x, object.position.y, object.position.z, 1);
    var newPos = currentPos.applyMatrix4(rotWorldMatrix);

    rotWorldMatrix.multiply(object.matrix);
    object.matrix = rotWorldMatrix;
    object.rotation.setFromRotationMatrix(object.matrix);

    object.position.x = newPos.x;
    object.position.y = newPos.y;
    object.position.z = newPos.z;
  };

  render() {
    super.render();
  };

}
