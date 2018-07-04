import React, { Component } from "react";

import * as THREE from "three";

class GltfTest extends React.Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.mouse = new THREE.Vector2();
    this.state = {
      x: 0,
      y: 0
      // uuid: ""
    };
  }

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    // let mouse = new THREE.Vector2(),
    let INTERSECTED;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    // const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    // camera.position.z = 4;
    // camera.position.z = 1000;
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.25,
      20
    );
    camera.position.set(-1.8, 0.9, 2.7);

    const controls = new window.THREE.TrackballControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    const raycaster = new THREE.Raycaster();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // let objects = [];
    // var geometry = new THREE.BoxBufferGeometry(40, 40, 40);
    // for (var i = 0; i < 2; i++) {
    //   var object = new THREE.Mesh(
    //     geometry,
    //     new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
    //   );
    //   object.position.x = Math.random() * 1000 - 500;
    //   object.position.y = Math.random() * 600 - 300;
    //   object.position.z = Math.random() * 800 - 400;
    //   object.rotation.x = Math.random() * 2 * Math.PI;
    //   object.rotation.y = Math.random() * 2 * Math.PI;
    //   object.rotation.z = Math.random() * 2 * Math.PI;
    //   object.scale.x = Math.random() * 2 + 1;
    //   object.scale.y = Math.random() * 2 + 1;
    //   object.scale.z = Math.random() * 2 + 1;
    //   object.castShadow = true;
    //   object.receiveShadow = true;
    //   scene.add(object);
    //   objects.push(object);
    // }

    const light = new THREE.HemisphereLight(0xbbbbff, 0x444422);
    light.position.set(0, 1, 0);
    scene.add(light);
    // model
    var loader = new window.THREE.GLTFLoader();
    console.log(loader);
    loader.load(
      //   "../models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf",
      "../models/gltf/Duck/glTF/Duck.gltf",
      function(gltf) {
        // gltf.scene.traverse(function(child) {
        //   if (child.isMesh) {
        //     child.material.envMap = envMap;
        //   }
        // });
        scene.add(gltf.scene);
        // console.log(gltf.scene);
      }
    );

    renderer.setClearColor("#000000");
    renderer.setSize(width, height);
    // console.log(scene);
    // renderer.setPixelRatio( window.devicePixelRatio );
    //renderer.setSize( window.innerWidth, window.innerHeight );

    // this.mouse = mouse
    this.INTERSECTED = INTERSECTED;
    this.scene = scene;
    this.camera = camera;
    this.light = light;
    this.controls = controls;
    this.raycaster = raycaster;
    this.renderer = renderer;
    // this.material = material;
    // this.cube = cube;

    this.mount.appendChild(this.renderer.domElement);

    // var dragControls = new window.THREE.DragControls(
    //   objects,
    //   camera,
    //   this.renderer.domElement
    // );
    // dragControls.addEventListener("dragstart", function(event) {
    //   controls.enabled = false;
    // });
    // dragControls.addEventListener("dragend", function(event) {
    //   controls.enabled = true;
    // });
    // this.dragControls = dragControls;
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  handleMouseMove(event) {
    // this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    // this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    var rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x =
      ((event.clientX - rect.left) / (rect.width - rect.left)) * 2 - 1;
    this.mouse.y =
      -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
    // this.mouse.x = ((event.clientX - this.mount.offsetLeft + document.body.scrollLeft) / this.mount.offsetWidth) * 2 - 1;
    // this.mouse.y = -((event.clientY - this.mount.offsetTop + document.body.scrollTop) / this.mount.offsetHeight) * 2 + 1;

    // console.log(this.mouse);
    this.setState({
      x: this.mouse.x,
      y: this.mouse.y
    });
  }

  animate() {
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children);
    // console.log(this.mouse);
    // console.log(intersects.length);

    if (intersects.length > 0) {
      if (this.INTERSECTED != intersects[0].object) {
        if (this.INTERSECTED)
          this.INTERSECTED.material.emissive.setHex(
            this.INTERSECTED.currentHex
          );
        this.INTERSECTED = intersects[0].object;
        this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
        // this.INTERSECTED.material.emissive.setHex( 0xff0000 );
        this.INTERSECTED.material.emissive.setHex(0x00ff00);
        // console.log(this.INTERSECTED.uuid);
        // this.props.uuid = this.INTERSECTED.uuid;
        this.props.onSelectedUUID(this.INTERSECTED.uuid);
        this.setState({
          uuid: this.INTERSECTED.uuid
        });
      }
    } else {
      if (this.INTERSECTED)
        this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
      this.INTERSECTED = null;
      this.setState({
        uuid: "None"
      });
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    // console.log(this.state.uuid);
    return (
      <div
        // style={{ width: "800px", height: "800px" }}
        style={{ width: window.innerWidth, height: window.innerHeight }}
        ref={mount => {
          this.mount = mount;
        }}
        // onMouseDown={this.stop}
        onMouseMove={this.handleMouseMove}
      >
        {/* <p>
          mouse position ({this.state.x},{this.state.y})
        </p> */}
        {/* <p>object selected is {this.state.uuid}</p> */}
      </div>
    );
  }
}

export default GltfTest;
