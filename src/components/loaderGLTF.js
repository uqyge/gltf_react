import React, { Component } from "react";

import * as THREE from "three";
import GLTFLoader from "three-gltf-loader";
// import data from "../models/gltf/Duck/glTF/Duck.gltf";
// import data from "../models/gltf/Duck/glTF-Binary/Duck.glb";
// import data from "./DamagedHelmet.glb";
// import data from "./Duck.glb";
import data from "./Test001.glb";

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

    // const camera = new THREE.PerspectiveCamera(
    //   45,
    //   window.innerWidth / window.innerHeight,
    //   0.25,
    //   20
    // );
    // camera.position.set(-1.8, 0.9, 2.7);

    // const controls = new window.THREE.TrackballControls(camera);
    // controls.rotateSpeed = 1.0;
    // controls.zoomSpeed = 1.2;
    // controls.panSpeed = 0.8;
    // controls.noZoom = false;
    // controls.noPan = false;
    // controls.staticMoving = true;
    // controls.dynamicDampingFactor = 0.3;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      200000
    );

    const newCam = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      200000
    );
    const camHelper = new THREE.CameraHelper(newCam);
    scene.add(camHelper);

    // const controls = new window.THREE.OrbitControls(camera);
    // controls.target.set(0, -0.2, -0.2);
    // controls.update();

    // camera.position.set(10, 10, 10);

    const raycaster = new THREE.Raycaster();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });

    const light = new THREE.HemisphereLight(0xbbbbff, 0x444422);
    light.position.set(0, 1, 0);
    scene.add(light);
    // model
    var loader = new window.THREE.GLTFLoader();
    // var loader = new GLTFLoader();
    console.log("edison", loader);
    // const data_1 = require("json!./Druck.gltf");
    console.log(data);

    loader.load(
      //   "../models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf",
      // "../models/gltf/Duck/glTF/Duck.gltf",
      // "models/gltf/Duck/glTF-Embedded/Duck.gltf",
      // "models/gltf/Duck/glTF-Binary/Duck.glb",
      // "Duck.gltf",
      data,
      // "https://rawgit.com/mrdoob/three.js/master/examples/models/gltf/Duck/glTF-Binary/Duck.glb",
      gltf => {
        scene.add(gltf.scene);
        // camera.position.set(100, 0, 100);
        // newCam.position.set(0, 0, 0);

        // camera.lookAt(gltf.position);
        // console.log(gltf.scene.children[0].children[0]);
        gltf.scene.children[0].children[0].geometry.computeBoundingSphere();
        console.log(
          gltf.scene.children[0].children[0].geometry.boundingSphere.center
        );
        const meshCenter =
          gltf.scene.children[0].children[0].geometry.boundingSphere.center;

        camera.position.set(meshCenter.x, meshCenter.y, meshCenter.z + 30000);
        newCam.position.set(meshCenter.x, meshCenter.y, meshCenter.z + 30000);

        // camera.updateProjectionMatrix();
        // newCam.updateProjectionMatrix();
        console.log("cam pos", camera.position);
        console.log("newCam pos", newCam.position);
        console.log("world", camera.getWorldDirection());
        console.log("newCam", newCam.getWorldDirection());

        camera.lookAt(meshCenter.x, meshCenter.y, meshCenter.z);
        newCam.lookAt(meshCenter.x, meshCenter.y, meshCenter.z);

        // camera.updateProjectionMatrix();
        // newCam.updateProjectionMatrix();
        console.log("world look_at", camera.getWorldDirection());
        console.log("newCam look_at", newCam.getWorldDirection());

        console.log("newCam new pos", newCam.position);
        console.log("scene", scene.position);
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
    this.newCam = newCam;
    this.light = light;
    // this.controls = controls;
    this.raycaster = raycaster;
    this.renderer = renderer;
    this.material = material;

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

    // console.log(this.mouse);
    this.setState({
      x: this.mouse.x,
      y: this.mouse.y
    });
  }

  animate() {
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.raycaster.setFromCamera(this.mouse, this.camera);

    let intersects = this.raycaster.intersectObjects(this.scene.children);

    if (this.scene.children[2] != null) {
      // console.log(
      //   "intersect scene:",
      //   this.scene.children[2].children[0].children
      // );
      intersects = this.raycaster.intersectObjects(
        this.scene.children[2].children[0].children
      );
    }
    // console.log(this.mouse);
    // console.log("intersect:", intersects.length);
    if (this.scene.children[2 != null]) {
      if (intersects.length > 0) {
        if (this.INTERSECTED != intersects[0].object) {
          if (this.INTERSECTED)
            this.INTERSECTED.material.emissive.setHex(
              this.INTERSECTED.currentHex
            );
          this.INTERSECTED = intersects[0].object;
          console.log(this.INTERSECTED.uuid);
          // console.log(this.INTERSECTED.material.emissive);
          console.log(this.INTERSECTED.material);
          this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
          this.INTERSECTED.material.emissive.setHex(0x00ff00);
          // this.INTERSECTED.currentOp = this.INTERSECTED.material.opacity;
          // this.INTERSECTED.material.opacity = 0.1;

          // this.props.uuid = this.INTERSECTED.uuid;
          this.props.onSelectedUUID(this.INTERSECTED.uuid);
          this.setState({
            uuid: this.INTERSECTED.uuid
          });
        }
      } else {
        if (this.INTERSECTED)
          this.INTERSECTED.material.emissive.setHex(
            this.INTERSECTED.currentHex
          );
        // this.INTERSECTED.material.opacity = this.INTERSECTED.currentOp;
        this.INTERSECTED = null;
        this.setState({
          uuid: "None"
        });
      }
    }
    // this.controls.update();
    this.renderer.render(this.scene, this.camera);
    // this.camera.lookAt(
    //       this.camera.position.x,
    //       // meshCenter.y + 20000,
    //       this.camera.position.y,
    //       this.camera.position.z - 10000);
  }

  render() {
    // console.log(this.state.uuid);
    // if (this.camera != null) {
    //   console.log("camera look_at", this.camera.getWorldDirection());
    //   console.log("newCam look_at", this.newCam.getWorldDirection());
    // }

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
