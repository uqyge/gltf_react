import React, {
  Component
} from 'react'
import {
  Sidebar,
  Segment,
  Button,
  Menu,
  Image,
  Icon,
  Header
} from 'semantic-ui-react'
import Tutorial from './Tutorial';
// import DemoCanvas from './DemoCanvas';  
import Scene from './cube'

// import {init,animate} from './box.js'
// import './box.js'

class SidebarRightOverlay extends Component {
  state = {
    visible: false
  }

  toggleVisibility = () => this.setState({
    visible: !this.state.visible
  })

  render() {
    const {
      visible
    } = this.state
    // console.log(this.props);
    return ( <
      div >
      <
      Button onClick = {
        this.toggleVisibility
      } > Object detail View < /Button> <
      Sidebar.Pushable as = {
        Segment
      } >
      <
      Sidebar as = {
        Menu
      }
      animation = 'overlay'
      width = 'thin'
      direction = 'right'
      visible = {
        visible
      }
      icon = 'labeled'
      vertical inverted >
      <
      Menu.Item name = 'home' >
      <
      Icon name = 'home' / >
      Home edison <
      /Menu.Item> 
//      console.log(this.props);
      <
      Menu.Item name = 'gamepad' >
      <
      Icon name = 'gamepad' / >
      Games <
      /Menu.Item> <
      Menu.Item name = 'camera' >
      <
      Icon name = 'camera' / >
      Channels <
      /Menu.Item> <
      /Sidebar> <
      Sidebar.Pusher >
      <
      Segment basic > { /* <Tutorial/> */ } { /* <DemoCanvas/> */ } <
      Scene / >
      <
      /Segment> <
      /Sidebar.Pusher> <
      /Sidebar.Pushable> <
      /div>
    )
  }
}

export default SidebarRightOverlay