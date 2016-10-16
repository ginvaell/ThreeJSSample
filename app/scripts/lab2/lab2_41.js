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
    this.itemCounter = 0;
    this.itemAmount = 3;
    this.loader = new THREE.TextureLoader();
    this.clock = new THREE.Clock();

    this.loadTexture('/images/map.jpg', texture => this.addCube(texture));
    this.loadTexture('/images/tet.jpg', texture => this.addTetrahedron(texture));
    this.loadTexture('/images/sp.jpg', texture => this.addSphere(texture));

    this.lights = [new THREE.PointLight( 0xff0000, 1 ), new THREE.PointLight( 0x00ff00, 1 )];

    this.lights[0].position.set( 50, 50, 0 );
    this.scene.add(this.lights[0]);
    this.lights[1].position.set( -50, 50, 0 );
    this.scene.add(this.lights[1]);

    this.lightIndex = 0;
    this.addKeysEvents();

    this.camera.position.z = 100;

  }

  loadTexture(url, onSuccess) {
    this.loader.load(url,

      onSuccess,

      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },

      (xhr) => {
        console.log('An error happened');
      });
  }

  addCube(texture) {
    var a = 40;
    this.cube = new THREE.Mesh(
      new THREE.BoxGeometry( a, a, a ),
      new THREE.MeshLambertMaterial({
        map: texture
      })
    );
    this.scene.add(this.cube);
    this.cube.rotation.x = 0.3;
    this.cube.rotation.y = 0.3;
    this.cube.position.x = 100;
    this.itemCounter++;
    this.render();
  }

  addTetrahedron(texture) {
    var a = 40;
    this.tetrahedron = new THREE.Mesh(
      new THREE.TetrahedronGeometry( a, 0 ),
      new THREE.MeshPhongMaterial({
        map: texture,
        transparent: true,
        opacity: 0.5
      })
    );
    this.scene.add(this.tetrahedron);
    this.tetrahedron.rotation.x = 0.3;
    this.tetrahedron.rotation.y = 0.3;
    this.itemCounter++;
    this.render();
  }

  addSphere(texture) {
    var a = 40;
    this.sphere = new THREE.Mesh(
      new THREE.SphereGeometry( a, 20, 20 ),
      new THREE.MeshPhongMaterial({
        map: texture,
        shading: THREE.SmoothShading,
        shininess: 128
      })
    );
    this.sphere.position.x = -100;
    this.scene.add(this.sphere);
    this.itemCounter++;
    this.render();
  }

  addKeysEvents() {
    this.keys = {
      a: {
        pressed: false,
        value: -1,
        impact: 'x'
      },
      d: {
        pressed: false,
        value: 1,
        impact: 'x'
      },
      w: {
        pressed: false,
        value: 1,
        impact: 'y'
      },
      s: {
        pressed: false,
        value: -1,
        impact: 'y'
      },
      z: {
        pressed: false,
        value: 1,
        impact: 'z'
      },
      x: {
        pressed: false,
        value: -1,
        impact: 'z'
      }
    };

    $(window).on('keydown', e => {
      if (e.key in this.keys) {
        this.keys[e.key].pressed = true;
      }
      else {
        if(e.key === '1') this.lightIndex = 0;
        if(e.key === '2') this.lightIndex = 1;
      }
    });
    $(window).on('keyup', e => {
      if (e.key in this.keys) {
        this.keys[e.key].pressed = false;
      }
    });
  }

  render () {
    if (this.itemCounter !== this.itemAmount) {
      return;
    }
    requestAnimationFrame( () => this.render() );
    this.renderer.render( this.scene, this.camera );
    this.update();
  };

  update() {
    var moveDistance = 150 * this.clock.getDelta();
    for (const key of Object.keys(this.keys)) {
      if (this.keys[key].pressed) {
        console.log(this.lights[this.lightIndex].position);
        this.lights[this.lightIndex].position[this.keys[key].impact] += this.keys[key].value * moveDistance;
      }
    }
  }


}
