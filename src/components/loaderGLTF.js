import React, { Component } from "react";

import * as THREE from "three";
// import GLTFLoader from "three-gltf-loader";
// import data from "../models/gltf/Duck/glTF/Duck.gltf";
// import data from "../models/gltf/Duck/glTF-Binary/Duck.glb";
// import data from "./Test001.glb";
import data from "../models/gltf/Fraunhofer/Fraunhofer.glb";
// import testGltf from "./models/gltf/test/Test001.json";
import testGltf from "./models/gltf/test/Test001.gltf";
import visiJson from "./models/visibility.json";
import gltfBoundingBox from "gltf-bounding-box";
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

    // this.camera = camera;
    // console.log("cam ini pos", camera.position);

    const raycaster = new THREE.Raycaster();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });

    const light = new THREE.HemisphereLight(0xbbbbff, 0x444422);
    light.position.set(0, 1, 0);
    scene.add(light);

    // model
    var loader = new window.THREE.GLTFLoader();
    var jsonData;

    // console.log("input", data);
    // var fs = require("fs");
    // const model = JSON.parse(
    //   fs.readFileSync("./models/gltf/test/Test001.gltf"),
    //   "utf8"
    // );
    // // const model = fs.readFileSync("./models/gltf/test/Test001.gltf");
    // console.log("gltf", testGltf);
    // const model = JSON.parse(testGltf);
    // console.log("fs model", model);
    // console.log("json", visiJson);

    // const boundings = gltfBoundingBox.computeBoundings(data);
    // console.log("bbox", boundings);
    // const boundings = gltfBoundingBox.computeBoundings(model);
    // console.log("bounding", boundings);
    loader.load(data, gltf => {
      // console.log("model ", gltf.scene.children[0]);

      var names = [];
      for (var i in gltf.scene.children[0].children) {
        names.push(gltf.scene.children[0].children[i].name);
      }
      jsonData = gltf.scene.children[0].children;
      // console.log("jsonData", jsonData);
      // const boundings = gltfBoundingBox.computeBoundings(gltf);
      // console.log("bounding box", boundings);
      // console.log("gltf", names);

      // check the initial visibility
      for (var i in gltf.scene.children[0].children) {
        if (gltf.scene.children[0].children[i].uuid === visiJson.uuids[0]) {
          gltf.scene.children[0].children[i].visible = false;
          // console.log("hidden parts", gltf.scene.children[0].children[i].uuid);
        }
      }
      scene.add(gltf.scene);

      // gltf.scene.children[0].children[0].geometry.computeBoundingSphere();
      // const meshCenter =
      //   gltf.scene.children[0].children[0].geometry.boundingSphere.center;
      // console.log("ref center", meshCenter);

      // camera.position.set(meshCenter.x, meshCenter.y, meshCenter.z + 40000);
      // newCam.position.set(meshCenter.x, meshCenter.y, meshCenter.z + 40000);
      // this.controls.target.set(meshCenter.x, meshCenter.y, meshCenter.z);

      // newCam.lookAt(meshCenter.x, meshCenter.y, meshCenter.z);
      // camera.lookAt(meshCenter.x, meshCenter.y, meshCenter.z);

      var meshCenter = {
        x: 0,
        y: 0,
        z: 0
      };
      camera.position.set(meshCenter.x, meshCenter.y - 40, meshCenter.z);
      newCam.position.set(meshCenter.x, meshCenter.y - 40, meshCenter.z);
      this.controls.target.set(meshCenter.x, meshCenter.y, meshCenter.z);

      newCam.lookAt(meshCenter.x, meshCenter.y, meshCenter.z);
      camera.lookAt(meshCenter.x, meshCenter.y, meshCenter.z);

      camera.updateProjectionMatrix();
      newCam.updateProjectionMatrix();
      this.jsonData = jsonData;
    });
    // controls
    const camHelper = new THREE.CameraHelper(newCam);
    // scene.add(camHelper);

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

    this.controls = controls;
    this.controls.update();
    this.mount.appendChild(this.renderer.domElement);
    // console.log("scene", this.scene);
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
    console.log("offset left", rect.left, rect.top);
    this.mouse.x =
      ((event.clientX - rect.left) / (rect.width - rect.left)) * 2 - 1;
    this.mouse.y =
      -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

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
    let intersects = null;
    // if (this.scene.children[1] != null)
    //  console.log("intersects", this.scene.children[1]);
    if (this.scene.children[1] != null) {
      intersects = this.raycaster.intersectObjects(
        this.scene.children[1].children
      );
      // console.log("objs", this.scene.children[2].children[0]);
      // for (var i in this.scene.children[2].children[0].children) {
      //   if (Boolean(this.props.value[i])) {
      //     if (
      //       this.scene.children[2].children[0].children[i].uuid ===
      //       this.props.value[i].text
      //     ) {
      //       this.scene.children[2].children[0].children[i].visible =
      //         this.props.value[i].state > 1 ? false : true;
      //     }
      //   }
      // }
    }

    if (intersects != null && intersects.length > 0) {
      if (this.INTERSECTED != intersects[0].object) {
        if (this.INTERSECTED)
          this.INTERSECTED.material.emissive.setHex(
            this.INTERSECTED.currentHex
          );
        this.INTERSECTED = intersects[0].object;
        // console.log("obj", this.INTERSECTED);
        // console.log("id object", this.INTERSECTED.visible);
        // console.log("gltf checked", this.props.visi);
        // console.log("json", visiJson.uuids[0]);

        this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
        this.INTERSECTED.material.emissive.setHex(0x00ff00);

        this.INTERSECTED.visible = this.props.visi;
        this.props.onSelectedUUID(this.INTERSECTED.uuid);
        this.props.onSelectedName(this.INTERSECTED.name);
        this.props.onSelectedVisi(this.INTERSECTED.visible);

        // console.log("input json", this.jsonData);
        this.props.onPassJdata(this.jsonData);
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
      // console.log("input json", this.jsonData);
      this.props.onPassJdata(this.jsonData);
    }
    this.props.onSelectedMouse(this.mouse);
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    // console.log("seleced from the tree", this.props.value);
    return (
      <div
        style={{ width: window.innerWidth, height: window.innerHeight }}
        ref={mount => {
          this.mount = mount;
        }}
        onMouseMove={this.handleMouseMove}
      />
    );
  }
}

export default GltfTest;
