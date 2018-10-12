import React, { Component } from "react";

import * as THREE from "three";
import GLTFLoader from "three-gltf-loader";
// import data from "../models/gltf/Duck/glTF/Duck.gltf";
// import data from "../models/gltf/Duck/glTF-Binary/Duck.glb";
// import data from "./DamagedHelmet.glb";
// import data from "./Duck.glb";
import data from "./Test001.glb";
import visiJson from "./models/visibility.json";

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
      30,
      window.innerWidth / window.innerHeight,
      1,
      200000
    );

    const newCam = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      1,
      200000
    );
    const camHelper = new THREE.CameraHelper(newCam);
    scene.add(camHelper);
    // this.camera = camera;
    console.log("cam ini pos", camera.position);

    console.log("cam ini 2 pos", camera.position);
    const raycaster = new THREE.Raycaster();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });

    const light = new THREE.HemisphereLight(0xbbbbff, 0x444422);
    light.position.set(0, 1, 0);
    scene.add(light);
    // model
    var loader = new window.THREE.GLTFLoader();

    // console.log("edison", loader);
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
        // scene.add(gltf.scene);

        gltf.scene.children[0].children[0].geometry.computeBoundingSphere();
        console.log(
          gltf.scene.children[0].children[0].geometry.boundingSphere.center
        );
        // console.log(gltf.scene.children[0].children[0].uuid);
        for (var parts in gltf.scene.children[0].children) {
          console.log("parts", gltf.scene.children[0].children[parts].uuid);
          console.log("json parts", visiJson.uuids[0]);
          if (
            gltf.scene.children[0].children[parts].uuid == visiJson.uuids[0]
          ) {
            gltf.scene.children[0].children[parts].visible = false;
            console.log(
              "hidden parts",
              gltf.scene.children[0].children[parts].uuid
            );
          }
        }
        scene.add(gltf.scene);
        const meshCenter =
          gltf.scene.children[0].children[0].geometry.boundingSphere.center;

        camera.position.set(meshCenter.x, meshCenter.y, meshCenter.z + 10000);
        newCam.position.set(meshCenter.x, meshCenter.y, meshCenter.z + 10000);
        this.controls.target.set(meshCenter.x, meshCenter.y, meshCenter.z);
        // camera.updateProjectionMatrix();
        // newCam.updateProjectionMatrix();
        console.log("cam pos", camera.position);
        console.log("newCam pos", newCam.position);
        console.log("cam world", camera.getWorldDirection());
        console.log("newCam world", newCam.getWorldDirection());

        newCam.lookAt(meshCenter.x, meshCenter.y, meshCenter.z);
        camera.lookAt(meshCenter.x, meshCenter.y, meshCenter.z);

        // camera.updateProjectionMatrix();
        // newCam.updateProjectionMatrix();
        console.log("cam look_at", camera.getWorldDirection());
        console.log("newCam look_at", newCam.getWorldDirection());

        console.log("cam new pos", camera.position);
        console.log("newCam new pos", newCam.position);
        console.log("scene", scene.position);
      }
    );
    // controls

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

    this.raycaster = raycaster;
    this.renderer = renderer;
    this.material = material;

    const controls = new window.THREE.OrbitControls(
      this.camera
      // this.renderer.domElement
    );
    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
    // controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    // controls.dampingFactor = 0.25;
    // controls.screenSpacePanning = false;
    // controls.minDistance = 100;
    // controls.maxDistance = 500;
    // controls.maxPolarAngle = Math.PI / 2;

    this.controls = controls;
    this.controls.update();
    this.mount.appendChild(this.renderer.domElement);

    this.start();
  }

  componentWillUnmount() {
    this.controls.dispose();
    delete this.controls;
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
    // this.controls.update();
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    // console.log("camPos", this.camera.position);
    // console.log("all", this.scene.children[2].children[0].children);
    let intersects = null;
    if (this.scene.children[2] != null) {
      intersects = this.raycaster.intersectObjects(
        this.scene.children[2].children[0].children
      );
    }

    if (intersects != null && intersects.length > 0) {
      if (this.INTERSECTED != intersects[0].object) {
        if (this.INTERSECTED)
          this.INTERSECTED.material.emissive.setHex(
            this.INTERSECTED.currentHex
          );
        this.INTERSECTED = intersects[0].object;
        console.log("obj", this.INTERSECTED);
        console.log("id object", this.INTERSECTED.visible);
        console.log("gltf checked", this.props.visi);
        console.log("json", visiJson.uuids[0]);
        console.log(this.INTERSECTED.material);
        this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
        this.INTERSECTED.material.emissive.setHex(0x00ff00);
        // this.INTERSECTED.currentOp = this.INTERSECTED.material.opacity;
        // this.INTERSECTED.material.opacity = 0.1;
        this.INTERSECTED.visible = this.props.visi;
        // this.props.uuid = this.INTERSECTED.uuid;
        this.props.onSelectedUUID(this.INTERSECTED.uuid);
        this.props.onSelectedName(this.INTERSECTED.name);
        this.props.onSelectedVisi(this.INTERSECTED.visible);
        this.setState({
          uuid: this.INTERSECTED.uuid
        });
      }
    } else {
      if (this.INTERSECTED)
        this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
      // this.INTERSECTED.material.opacity = this.INTERSECTED.currentOp;
      this.INTERSECTED = null;
      this.setState({
        uuid: "None"
      });
    }
    // this.controls.target.set(-0.041, 1.9, -1.21);
    // this.camera.position.set(158212.078125, 1502.5037841796875, 32895);
    // this.camera.lookAt(158212.078125, 1502.5037841796875, 2895);
    // this.controls.update();
    this.renderer.render(this.scene, this.camera);
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
