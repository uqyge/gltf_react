import React, { Component } from "react";

import * as THREE from "three";
import {
  Sidebar,
  Segment,
  Button,
  Menu,
  Image,
  Icon,
  Header
} from "semantic-ui-react";

class GltfCanvas extends Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = {
      x: 0,
      y: 0
    };

    this.geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    this.material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  componentDidMount() {
    this.updateCanvas();
    //  requestAnimationFrame(this.updateCanvas);
  }
  updateCanvas() {
    var camera, scene, renderer;
    var geometry, material, mesh;

    var scene3d = this.refs.canvas;
    console.log(scene3d);
    camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      10
    );
    camera.position.z = 1;

    scene = new THREE.Scene();
    //

    // geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    // material = new THREE.MeshNormalMaterial();
    // mesh = new THREE.Mesh(geometry, material);
    geometry = this.geometry;
    material = this.material;
    mesh = this.mesh;
    scene.add(mesh);
    scene.background = new THREE.Color(0xf0f0f0);

    renderer = new THREE.WebGLRenderer({
      canvas: scene3d
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render(scene, camera);
  }

  render() {
    // this.updateCanvas;

    return (
      <div onMouseMove={this.handleMouseMove}>
        <p>
          {" "}
          the current position({this.state.x}, {this.state.y}){" "}
        </p>

        <canvas id="demoCanvas" ref="canvas" width={300} height={300} />
      </div>
    );
  }
}

export default GltfCanvas;

var container, stats, controls;
var camera, scene, renderer, light;
var mouse = new THREE.Vector2(),
  INTERSECTED;
var radius = 100,
  theta = 0;

init();
animate();

function init() {
  container = document.createElement("div");
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );

  controls = new THREE.OrbitControls(camera);
  controls.target.set(0, -0.2, -0.2);
  controls.update();

  // envmap
  var path = "textures/cube/skyboxsun25deg/";
  var format = ".jpg";
  var envMap = new THREE.CubeTextureLoader().load([
    path + "px" + format,
    path + "nx" + format,
    path + "py" + format,
    path + "ny" + format,
    path + "pz" + format,
    path + "nz" + format
  ]);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);
  // scene.background = envMap;

  light = new THREE.HemisphereLight(0xbbbbff, 0x444422);
  light.position.set(0, 1, 0);
  scene.add(light);

  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(-10, 6, -10);
  scene.add(light);

  // model
  var loader = new THREE.GLTFLoader();

  loader.load("models/gltf/test/glTF/Test001.gltf", function(gltf) {
    gltf.scene.traverse(function(child) {
      // if (child.isMesh) {
      // 	child.material.envMap = envMap;
      // }
    });
    gltf.scene.scale.set(0.0004, 0.0004, 0.0004);

    //gltf.cameras['Infinite perspective camera'];

    object = gltf.scene;
    object.updateMatrixWorld();
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize().length();
    const center = box.getCenter();

    object.position.x += object.position.x - center.x;
    object.position.y += object.position.y - center.y;
    object.position.z += object.position.z - center.z;

    scene.add(gltf.scene);
    // console.log(scene.children[2].children["0"]);
    camera.position.set(10, 10, 10);
    console.log(camera.position);
    console.log(gltf.scene.position);
    // camera.position = object.position;
    // camera.Translate(0, 0, -10); // where `r` is the desired distance
    // camera.lookAt(object.position);
  });

  //				camera.lookAt(scene.position)

  //			    this.clear();

  raycaster = new THREE.Raycaster();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.gammaOutput = true;
  container.appendChild(renderer.domElement);

  document.addEventListener("mousemove", onDocumentMouseMove, false);
  document.addEventListener("mousedown", onDocumentMouseDown, false);

  window.addEventListener("resize", onWindowResize, false);

  // stats
  stats = new Stats();
  container.appendChild(stats.dom);
}

function onDocumentMouseMove(event) {
  event.preventDefault();

  // mouse.x = ( event.clientX / window.innerWidth) * 2 - 1;
  // mouse.y = ( event.clientY / window.innerHeight) * 2 + 1;
  mouse.x =
    ((event.clientX - container.offsetLeft + document.body.scrollLeft) /
      container.offsetWidth) *
      2 -
    1;
  mouse.y =
    -(
      (event.clientY - container.offsetTop + document.body.scrollTop) /
      container.offsetHeight
    ) *
      2 +
    1;
}
function onDocumentMouseDown(event) {
  event.preventDefault();

  // mouse.x = ( event.clientX / window.innerWidth) * 2 - 1;
  // mouse.y = ( event.clientY / window.innerHeight) * 2 + 1;
  // mouse.x = ((event.clientX - container.offsetLeft + document.body.scrollLeft) / container.offsetWidth) * 2 - 1;
  // mouse.y = -((event.clientY - container.offsetTop + document.body.scrollTop) / container.offsetHeight) * 2 + 1;

  if (INTERSECTED !== null) {
    // INTERSECTED.material.color.setHex(0xff0000);
    INTERSECTED.material.transparent = !INTERSECTED.material.transparent;
    // INTERSECTED.visible = false;
    console.log(INTERSECTED.visible);
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
  requestAnimationFrame(animate);

  // renderer.render(scene, camera);
  render();
  stats.update();
}

function render() {
  raycaster.setFromCamera(mouse, camera);
  if (scene.children[2] == null) {
    // console.log(scene.children[2]);
    return;
  }
  var intersects = raycaster.intersectObjects(
    scene.children[2].children[0].children
  );
  if (intersects.length > 0) {
    if (INTERSECTED != intersects[0].object) {
      if (INTERSECTED)
        INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      INTERSECTED = intersects[0].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex(0xff0000);
      console.log(INTERSECTED);
    }
  } else {
    if (INTERSECTED)
      INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
    INTERSECTED = null;
  }
  renderer.render(scene, camera);
}
