export default class {
  constructor() {
    this.metrics = {
      a: 0,
      b: 0,
      color: 0x550000
    };

    this.colors = {
      '1': 0xff0000,
      '2': 0x00ff00,
      '3': 0x0000ff,
      '4': 0xffffff
    };

    this.scene = new THREE.Scene();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.zoom = 2;
    // this.camera = new THREE.OrthographicCamera( this.width / - this.zoom, this.width / this.zoom, this.height / this.zoom, this.height / - this.zoom, 1, 1000 );
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 5000);
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.shadowMap.soft = true;
    this.renderer.shadowCameraNear = 3;
    this.renderer.shadowCameraFar = this.camera.far;
    this.renderer.shadowCameraFov = 50;
    this.renderer.shadowMapBias = 0.0039;
    this.renderer.shadowMapDarkness = 0.2;
    this.renderer.shadowMapWidth = 1024;
    this.renderer.shadowMapHeight = 1024;
    document.body.appendChild( this.renderer.domElement );
    this.itemCounter = 0;
    this.itemAmount = 3;
    this.loader = new THREE.TextureLoader();

    this.clock = new THREE.Clock();
    var end = new THREE.Mesh(new THREE.PlaneGeometry( 400, 200 ), new THREE.MeshLambertMaterial(   {color: 0xc0c0a0, side: THREE.DoubleSide} ));
    var left = new THREE.Mesh(new THREE.PlaneGeometry( 400, 200 ), new THREE.MeshLambertMaterial(  {color: 0xc0c0a0, side: THREE.DoubleSide} ));
    var right = new THREE.Mesh(new THREE.PlaneGeometry( 400, 200 ), new THREE.MeshLambertMaterial( {color: 0xc0c0a0, side: THREE.DoubleSide} ));
    var floor = new THREE.Mesh(new THREE.PlaneGeometry( 400, 400 ), new THREE.MeshLambertMaterial( {color: 0xc0c0a0, side: THREE.DoubleSide} ));
    var roof = new THREE.Mesh(new THREE.PlaneGeometry( 400, 400 ), new THREE.MeshLambertMaterial(  {color: 0xc0c0a0, side: THREE.DoubleSide} ));
    end.position.z = -200;
    left.position.set(-200, 0, 0);
    left.rotation.y = Math.PI / 2;
    right.position.set(200, 0, 0);
    right.rotation.y = Math.PI / 2;
    floor.rotation.x = 3 * Math.PI / 2;
    floor.position.set(0, -100, 0);
    roof.rotation.x = 3 * Math.PI / 2;
    roof.position.set(0, 100, 0);
    end.receiveShadow = true;
    floor.receiveShadow = true;
    left.receiveShadow = true;
    right.receiveShadow = true;
    roof.receiveShadow = true;
    this.scene.add(end);
    this.scene.add(left);
    this.scene.add(right);
    this.scene.add(floor);
    this.scene.add(roof);

    this.loadTexture('/images/some.jpg', bMap => {
      this.bumpMap = bMap;
      this.loadTexture('/images/some.jpg', texture => this.addCube(texture));
      this.loadTexture('/images/glass.jpg', texture => this.addTetrahedron(texture));
      this.loadTexture('/images/dots.jpg', texture => this.addSphere(texture));
    });



    this.lights = [new THREE.DirectionalLight( 0x550000, 100 ), new THREE.PointLight( 0x00ff00, 5 )];

    this.lights[0].position.set( 0, 0, 0.5 );
    this.lights[0].castShadow = true;
    this.lights[0].shadowCameraVisible = true;
    this.lights[0].shadowCameraVisible = true;
    this.lights[0].shadow.camera.near = 50;
    this.lights[0].shadow.camera.far = 700;
    this.lights[0].shadowCameraLeft = -300; // CHANGED
    this.lights[0].shadowCameraRight = 300; // CHANGED
    this.lights[0].shadowCameraTop = 300; // CHANGED
    this.lights[0].shadowCameraBottom = -300; // CHANGED
    // this.lights[0].target.position.y = 40; // CHANGED
    this.scene.add(this.lights[0]);
    this.lights[1].position.set( -50, 50, 0 );
    // this.lights[1].target.position = 40;
    // this.scene.add(this.lights[1]);

    this.lightIndex = 0;
    this.addKeysEvents();

    this.camera.position.z = 500;
    this.camera.rotation.x -0.3;
    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
    // this.addLightSphere();

    var ambientLight = new THREE.AmbientLight( 0xffffff ); // soft white light
    this.scene.add( ambientLight );
    this.helper = new THREE.DirectionalLightHelper(this.lights[0], 1);
    this.scene.add(this.helper);

    this.cameraHelper = new THREE.CameraHelper( this.lights[0].shadow.camera );
    // this.scene.add(this.cameraHelper);

  }

  loadTexture(url, onSuccess) {
    this.loader.load(url,

      onSuccess,

      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded ('+url+')');
      },

      (xhr) => {
        console.log('An error happened');
      });
  }

  addCube(texture) {
    var a = 40;
    this.cube = new THREE.Mesh(
      new THREE.DodecahedronGeometry(a, 0 ),
      new THREE.MeshLambertMaterial({
        map: texture,
        bumpMap: this.bumpMap
      })
    );
    this.scene.add(this.cube);
    this.cube.position.x = 100;
    this.cube.position.z = -80;
    this.cube.castShadow = true;
    this.cube.receiveShadow = true;
    this.itemCounter++;
    this.render();
  }

  addTetrahedron(texture) {
    var a = 40;
    this.tetrahedron = new THREE.Mesh(
      new THREE.CylinderGeometry( a/2, a/2, a, 80 ),
      new THREE.MeshPhongMaterial({
        map: texture,
        transparent: true,
        opacity: 0.6
      })
    );
    this.scene.add(this.tetrahedron);
    this.tetrahedron.position.z = -80;
    this.tetrahedron.castShadow = true;
    this.tetrahedron.receiveShadow = true;
    this.itemCounter++;
    this.render();
  }

  addSphere(texture) {
    var a = 40;
    this.sphere = new THREE.Mesh(
      new THREE.SphereGeometry( a * Math.sqrt(3) / 2 , 20, 20 ),
      new THREE.MeshPhongMaterial({
        map: texture,
        shading: THREE.SmoothShading,
        shininess: 10
      })
    );
    this.sphere.position.x = -100;
    this.sphere.position.z = -80;
    this.sphere.castShadow = true;
    this.sphere.receiveShadow = true;
    this.scene.add(this.sphere);
    this.itemCounter++;
    this.render();
  }

  addKeysEvents() {
    this.keys = {
      a: {
        pressed: false,
        value: -1,
        impact: 'a'
      },
      d: {
        pressed: false,
        value: 1,
        impact: 'a'
      },
      w: {
        pressed: false,
        value: 1,
        impact: 'b'
      },
      s: {
        pressed: false,
        value: -1,
        impact: 'b'
      },
      z: {
        pressed: false,
        value: 0x0000ff,
        impact: 'color'
      },
      x: {
        pressed: false,
        value: -0x0000ff,
        impact: 'color'
      }
    };

    $(window).on('keydown', e => {
      if (e.key in this.keys) {
        this.keys[e.key].pressed = true;
      }
      else {
        this.metrics.color = this.colors[e.key];
        this.lights[0].color.setHex( this.metrics.color);
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
    this.controls.update();
    this.helper.update();
    this.renderer.render( this.scene, this.camera );
    this.update();
  };

  update() {
    var moveDistance = this.clock.getDelta();
    let r = 350;
    for (const key of Object.keys(this.keys)) {
      if (this.keys[key].pressed) {
        this.metrics[this.keys[key].impact] += this.keys[key].value * moveDistance;
        this.lights[0].position.x = r*Math.sin(this.metrics.a)*Math.cos(this.metrics.b);
        this.lights[0].position.y = r*Math.sin(this.metrics.a)*Math.sin(this.metrics.b);
        this.lights[0].position.z = r*Math.cos(this.metrics.a);
      }
    }
  }


}
