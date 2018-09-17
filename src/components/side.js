import React, { Component } from "react";
import {
  Sidebar,
  Segment,
  Button,
  Menu,
  Checkbox,
  Image,
  Icon,
  Header
} from "semantic-ui-react";
// import Tutorial from "./Tutorial";
// import DemoCanvas from './DemoCanvas';
import Cube from "./cube";
import GltfTest from "./loaderGLTF";
// import CheckboxExampleCheckbox from "./Checkbox.js";
import CheckboxExampleRemoteControl from "./Checkbox.js";

// import {init,animate} from './box.js'
// import './box.js'

class SidebarRightOverlay extends Component {
  constructor(props) {
    super(props);
    this.showUUID = this.showUUID.bind(this);
    this.showVisible = this.showVisible.bind(this);
    this.showChecked = this.showChecked.bind(this);
    this.state = {
      visible: false,
      uuid_up: "None",
      visi_up: true,
      checked_up: true
    };
  }

  toggleVisibility = () =>
    this.setState({
      visible: !this.state.visible
    });
  toggleCheck = () =>
    this.setState({
      checked_up: !this.state.checked_up
    });
  showUUID(uuid) {
    this.setState({
      uuid_up: uuid
    });
  }
  showVisible(visi) {
    this.setState({
      visi_up: visi
    });
  }
  showChecked(checked) {
    this.setState({
      checked_up: checked
    });
  }

  render() {
    const { visible } = this.state;
    console.log("up", this.state.uuid_up);
    console.log("visi", this.state.visi_up);
    console.log("checked", this.state.checked_up);
    // console.log($(".ui.checkbox").checkbox());
    let vi = "visible";
    // if (!this.state.visi_up) {
    if (!this.state.checked_up) {
      vi = "hide";
    }

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
              {vi}
              {/* <CheckboxExampleRemoteControl onClick={this.toggleCheck} /> */}
              <Button onClick={this.toggleCheck}> {vi}</Button>
            </Menu.Item>
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
              {/* <Cube onSelectedUUID={this.showUUID} /> */}
              <GltfTest
                onSelectedUUID={this.showUUID}
                onSelectedVisi={this.showVisible}
                visi={this.state.checked_up}
              />
            </Segment>{" "}
          </Sidebar.Pusher>{" "}
        </Sidebar.Pushable>{" "}
      </div>
    );
  }
}

export default SidebarRightOverlay;
