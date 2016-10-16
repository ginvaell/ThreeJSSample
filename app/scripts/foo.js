export default function(){
  var container, camera, scene, renderer;

  var geometry, objects;


  var mesh;
  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  init();
  animate();

  function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 15000 );
    camera.position.z = 500;
    camera.position.y = 500;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x000000, 1, 15000 );

    var light = new THREE.PointLight( 0xCCFFFF );
    light.position.set( 300, 600, 700 );
    scene.add( light );

    var light = new THREE.AmbientLight( 0x111111 );
    scene.add( light );


    var geometry = new THREE.CubeGeometry( 100, 10, 100 ,1,1,1);
      var sphere = new THREE.CubeGeometry( 150, 15, 150 ,1,1,1);
    //
    // var ver = sphere.vertices[0].copy();
    // ver.x += 50;
    // console.log(ver);
    // sphere.vertices.push(ver);
    var material = new THREE.MeshLambertMaterial( { color: 0xCCFFFF, morphTargets: true } );
    var smaterial = new THREE.MeshLambertMaterial( { color: 0xCCFFFF } );

    // construct 8 blend shapes
    console.dir(geometry);
    var vertices = [];
    for ( var i = 0; i < geometry.vertices.length; i ++ ) {
      vertices.push(geometry.vertices[i].clone());
      vertices[i].y *= 4;
    }
    geometry.morphTargets.push( { name: "target", vertices: vertices } );

    vertices = [];
    for ( var i = 0; i < geometry.vertices.length; i ++ ) {
      vertices.push(geometry.vertices[i].clone());
      vertices[i].x *= 4;
    }
    geometry.morphTargets.push( { name: "target1", vertices: vertices } );
    // sphere.name='target3';
    geometry.morphTargets.push( sphere );

    mesh = new THREE.Mesh( geometry, material );
    var sm = new THREE.Mesh(sphere, smaterial);
    mesh.position.y = -100;
    // scene.add( mesh );
    scene.add( sm );
    console.dir(mesh);
    console.dir(sm);

    renderer = new THREE.WebGLRenderer( { clearColor: 0x222222, clearAlpha: 1 } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    //renderer.sortObjects = false;
    container.appendChild( renderer.domElement );
  }

  function animate() {

    requestAnimationFrame( animate );
    render();

  }

  var m = 0;

  function render() {

    m += 0.01;

    //Create morph values based on rotation for a bouncing effect
    var morph = Math.abs(Math.sin(m))*15;

    //Updating the morphs with new values. We only want to influence one side of the cube
    // mesh.morphTargetInfluences[0] = morph;
    // mesh.morphTargetInfluences[1] = 1;
    mesh.morphTargetInfluences[2] = morph;
    // mesh.morphTargetInfluences[4] = morph;
    // mesh.morphTargetInfluences[5] = morph;

    camera.lookAt( scene.position );
    renderer.render( scene, camera );

  }
}
