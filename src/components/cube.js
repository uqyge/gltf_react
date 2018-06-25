import React, {
    Component
} from 'react';

import * as THREE from 'three'

class Scene extends React.Component {
    constructor(props) {
      super(props)
  
      this.start = this.start.bind(this)
      this.stop = this.stop.bind(this)
      this.animate = this.animate.bind(this)
      this.handleMouseMove = this.handleMouseMove.bind(this)
      this.mouse = new THREE.Vector2()
      this.state = {
          x:0,
          y:0,
          uuid:''
      }
    }
  
    componentDidMount() {
      const width = this.mount.clientWidth
      const height = this.mount.clientHeight
      
      // let mouse = new THREE.Vector2(), 
      let INTERSECTED;
      const scene = new THREE.Scene()
      scene.background = new THREE.Color( 0xf0f0f0 );
      const camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
      )
      const raycaster = new THREE.Raycaster();
      const renderer = new THREE.WebGLRenderer({ antialias: true })
      const geometry = new THREE.BoxGeometry(1, 1, 1)
      // const material = new THREE.MeshBasicMaterial({ color: 0xff00ff })
      // const material = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } )
      const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } )
      
      const cube = new THREE.Mesh(geometry, material)
  
      camera.position.z = 4
      scene.add(cube)
      renderer.setClearColor('#000000')
      renderer.setSize(width, height)
      // renderer.setPixelRatio( window.devicePixelRatio );
	  //renderer.setSize( window.innerWidth, window.innerHeight );

      // this.mouse = mouse
      this.INTERSECTED = INTERSECTED
      this.scene = scene
      this.camera = camera
      this.raycaster = raycaster
      this.renderer = renderer
      this.material = material
      this.cube = cube
  
      this.mount.appendChild(this.renderer.domElement)
      this.start()
    }
  
    componentWillUnmount() {
      this.stop()
      this.mount.removeChild(this.renderer.domElement)
    }
  
    start() {
      if (!this.frameId) {
        this.frameId = requestAnimationFrame(this.animate)
      }
    }
  
    stop() {
      cancelAnimationFrame(this.frameId)
    }
  
    handleMouseMove(event) {
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        // this.mouse.x = ((event.clientX - this.mount.offsetLeft + document.body.scrollLeft) / this.mount.offsetWidth) * 2 - 1;
        // this.mouse.y = -((event.clientY - this.mount.offsetTop + document.body.scrollTop) / this.mount.offsetHeight) * 2 + 1;
    
        // console.log(this.mouse);
        this.setState({
            x:this.mouse.x,
            y:this.mouse.y
        });
    }

    animate() {
      this.cube.rotation.x += 0.01
      this.cube.rotation.y += 0.01
  
      this.renderScene()
      this.frameId = window.requestAnimationFrame(this.animate)
    }
  
    renderScene() {

        this.raycaster.setFromCamera( this.mouse, this.camera );
        const intersects = this.raycaster.intersectObjects( this.scene.children );
        // console.log(this.mouse);
        // console.log(intersects.length);
        
        if ( intersects.length > 0 ) {
            if ( this.INTERSECTED != intersects[ 0 ].object ) {
                if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
                this.INTERSECTED = intersects[ 0 ].object;
                this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
                // this.INTERSECTED.material.emissive.setHex( 0xff0000 );
                this.INTERSECTED.material.emissive.setHex( 0x00ff00 );
                console.log(this.INTERSECTED.uuid);
                this.setState({
                    uuid:this.INTERSECTED.uuid
                })
            }
        } else {
            if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
            this.INTERSECTED = null;
            this.setState({
                    uuid:'None'
            })

        }


      this.renderer.render(this.scene, this.camera)
    }
  
    render() {
        console.log(this.state.uuid);
      return (
        <div
          style={{ width: '800px', height: '800px' }}
          ref={(mount) => { this.mount = mount }}
          onMouseDown={this.stop}
          onMouseMove={this.handleMouseMove}
        >
        {/* <p>mouse position ({this.state.x},{this.state.y})</p> */}
        <p>mouse position ({this.mouse.x},{this.mouse.y})</p>
        <p>object selected is {this.state.uuid}</p>
        </div>
      )
    }
  }

  export default Scene