import React, {
    Component
} from 'react';

import ReactDOM from 'react-dom'
import * as THREE from 'three'
import {
    Sidebar,
    Segment,
    Button,
    Menu,
    Image,
    Icon,
    Header
} from 'semantic-ui-react'

class DemoCanvas extends Component {
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
        const scene3d = this.refs.canvas;
        //  mesh = this.mesh;
        this.updateCanvas(scene3d,this.mesh);
        window.requestAnimationFrame(this.updateCanvas);


    }
    updateCanvas(scene3d,mesh) {
        let camera, scene, renderer;
        var geometry, material;
        // let mesh;


        // let scene3d = this.refs.canvas;
        // let scene3d = ReactDOM.findDOMNode(this);
        console.log(scene3d,'canvas');
        // console.log(ReactDOM.findDOMNode(this.refs.canvas))
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
        camera.position.z = 1;

        scene = new THREE.Scene();
        //

        // geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        // material = new THREE.MeshNormalMaterial();
        // mesh = new THREE.Mesh(geometry, material);
        // geometry = this.geometry;
        // material = this.material;
        //  mesh = this.mesh;
        scene.add(mesh);
        scene.background = new THREE.Color(0xf0f0f0);

        renderer = new THREE.WebGLRenderer({
            canvas: scene3d
        });

        renderer.setSize(window.innerWidth, window.innerHeight);

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        renderer.render(scene, camera);
        // window.requestAnimationFrame(this.updateCanvas);

    }

    render() {
        // this.updateCanvas;

        return ( < div onMouseMove = {
                this.handleMouseMove
            } >
            <
            p > the current position({
                this.state.x
            }, {
                this.state.y
            }) < /p> 

            <
            canvas id = 'demoCanvas'
            ref = "canvas"
            width = {
                300
            }
            height = {
                300
            }
            />

            <
            /div>

        );
    }
}

export default DemoCanvas;