import * as THREE from "three";

var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {
  // var scene3d = document.getElementById('scene3d');
  var scene3d = document.getElementById("scene3d");
  // var scene3d = document.getElementById('demoCanvas');
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );
  camera.position.z = 1;

  scene = new THREE.Scene();
  //

  geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  scene.background = new THREE.Color(0xf0f0f0);

  renderer = new THREE.WebGLRenderer({ canvas: scene3d });
  // renderer = new THREE.WebGLRenderer( {canvas: demoCanvas} );

  // renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild( renderer.domElement );
}

function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  renderer.render(scene, camera);
}
