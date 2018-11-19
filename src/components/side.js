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
import Cube from "./cube";
import GltfTest from "./loaderGLTF";
import WorldCupExample from "./Tree.js";
import Extensions from "./Checkbox.js";
import Example from "./Tree.js";

// import {init,animate} from './box.js'
// import './box.js'

class SidebarRightOverlay extends Component {
  constructor(props) {
    super(props);
    this.showUUID = this.showUUID.bind(this);
    this.showName = this.showName.bind(this);
    this.showVisible = this.showVisible.bind(this);
    this.showChecked = this.showChecked.bind(this);
    this.passJson = this.passJson.bind(this);
    this.passSelected = this.passSelected.bind(this);
    this.state = {
      visible: false,
      uuid_up: "None",
      name_up: "None",
      jsonData: [],
      selectedObj: [],
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
  showName(name) {
    this.setState({
      name_up: name
    });
  }
  passJson(jdata) {
    this.setState({
      jsonData: jdata
    });
  }
  passSelected(jdata) {
    this.setState({
      selectedObj: jdata
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
    // console.log("up", this.state.uuid_up);
    // console.log("visi", this.state.visi_up);
    // console.log("json", this.state.jsonData[0]);
    // console.log("checked", this.state.checked_up);
    console.log("seleced", this.state.selectedObj);
    // console.log($(".ui.checkbox").checkbox());
    let vi = "visible";
    // if (!this.state.visi_up) {
    if (!this.state.checked_up) {
      vi = "hide";
    }

    let objTree = null;
    // console.log(this.state.jsonData);
    console.log(this.selectedObj);
    // if (this.state.jsonData.size > 0) {
    // if (Boolean(this.state.jsonData)) {
    if (Boolean(this.state.jsonData)) {
      console.log("jdata", this.state.jsonData.length);
      objTree = (
        <Example
          value={this.state.jsonData}
          onPassSelected={this.passSelected}
        />
      );
    }
    return (
      <div>
        <Button onClick={this.toggleVisibility}> Object detail View </Button>{" "}
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="overlay"
            width="wide"
            direction="right"
            visible={visible}
            icon="labeled"
            vertical
            inverted
          >
            <Menu.Item name="home">
              <Icon name="home" />
              Name: {this.state.name_up}
              <p />
              UUID: {this.state.uuid_up}
            </Menu.Item>
            <Menu.Item name="gamepad">
              <Icon name="gamepad" />
              {vi}
              <Button onClick={this.toggleCheck}> {vi}</Button>
            </Menu.Item>
            <Menu.Item name="camera">
              <Icon name="camera" />
              {/*json tree*/}
              {objTree}
            </Menu.Item>{" "}
          </Sidebar>{" "}
          <Sidebar.Pusher>
            <Segment basic>
              {/* <Cube onSelectedUUID={this.showUUID} /> */}
              <GltfTest
                onSelectedUUID={this.showUUID}
                onSelectedName={this.showName}
                onSelectedVisi={this.showVisible}
                onPassJdata={this.passJson}
                visi={this.state.checked_up}
                value={this.state.selectedObj}
              />
            </Segment>{" "}
          </Sidebar.Pusher>{" "}
        </Sidebar.Pushable>{" "}
      </div>
    );
  }
}

export default SidebarRightOverlay;
