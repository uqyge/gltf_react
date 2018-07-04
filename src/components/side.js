import React, { Component } from "react";
import {
  Sidebar,
  Segment,
  Button,
  Menu,
  Image,
  Icon,
  Header
} from "semantic-ui-react";
// import Tutorial from "./Tutorial";
// import DemoCanvas from './DemoCanvas';
import Scene from "./cube";
import GltfTest from "./loaderGLTF";

// import {init,animate} from './box.js'
// import './box.js'

class SidebarRightOverlay extends Component {
  constructor(props) {
    super(props);
    this.showUUID = this.showUUID.bind(this);
    this.state = {
      visible: false,
      uuid_up: "None"
    };
  }

  toggleVisibility = () =>
    this.setState({
      visible: !this.state.visible
    });

  showUUID(uuid) {
    this.setState({
      uuid_up: uuid
    });
  }

  render() {
    const { visible } = this.state;
    console.log("up", this.state.uuid_up);
    return (
      <div>
        <Button onClick={this.toggleVisibility}> Object detail View </Button>{" "}
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="overlay"
            width="thin"
            direction="right"
            visible={visible}
            icon="labeled"
            vertical
            inverted
          >
            <Menu.Item name="home">
              <Icon name="home" />
              Home edison {this.state.uuid_up}
            </Menu.Item>
            <Menu.Item name="gamepad">
              <Icon name="gamepad" />
              Games{" "}
            </Menu.Item>{" "}
            <Menu.Item name="camera">
              <Icon name="camera" />
              Channels{" "}
            </Menu.Item>{" "}
          </Sidebar>{" "}
          <Sidebar.Pusher>
            <Segment basic>
              {" "}
              {/* <Tutorial/> */}
              {/* <DemoCanvas/> */}
              {/* <Scene onSelectedUUID={this.showUUID} /> */}
              <GltfTest onSelectedUUID={this.showUUID} />
            </Segment>{" "}
          </Sidebar.Pusher>{" "}
        </Sidebar.Pushable>{" "}
      </div>
    );
  }
}

export default SidebarRightOverlay;
