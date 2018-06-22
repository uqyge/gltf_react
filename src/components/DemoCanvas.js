import React, {
    Component
} from 'react';

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
        this.updateCanvas();
        //  requestAnimationFrame(this.updateCanvas);
        
    }
    updateCanvas() {
        var camera, scene, renderer;
        var geometry, material, mesh;
        

        var scene3d = this.refs.canvas;
        console.log(scene3d);
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
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
        
        return ( <
            div onMouseMove = {
                this.handleMouseMove
            } 
            
            >
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
            //  onMouseMove={this.updateCanvas}

            /*             <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
                        <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
                        </div>    
             */
        );
    }
}

export default DemoCanvas;