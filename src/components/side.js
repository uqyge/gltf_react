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
import GltfTest from "./loaderGLTF";

import Example from "./Tree.js";

import ItemList from "./itemList.js";

import modelInfo from "../models/gltf/Fraunhofer/Fraunhofer.json";

import SpliterLayout from "react-splitter-layout";
import TableDemo from "./Tables.js";
// import {init,animate} from './box.js'
// import './box.js'
const PRODUCTS = [
  {
    id: 1,
    name: "Bag of suck",
    price: 100,
    details: "You don't want to own this!"
  },
  {
    id: 2,
    name: "Bag of luck",
    price: 200,
    details: "You might want to own this!"
  },
  {
    id: 3,
    name: "Bag of fuck",
    price: 300,
    details: "You really want to own this!"
  }
];

class SidebarRightOverlay extends Component {
  constructor(props) {
    super(props);
    this.showUUID = this.showUUID.bind(this);
    this.showName = this.showName.bind(this);
    this.showMouse = this.showMouse.bind(this);
    this.showVisible = this.showVisible.bind(this);
    this.showChecked = this.showChecked.bind(this);
    this.passJson = this.passJson.bind(this);
    this.passSelected = this.passSelected.bind(this);
    this.onSecondaryPaneSizeChange = this.onSecondaryPaneSizeChange.bind(this);
    this.state = {
      secondaryPaneSize: -1,
      mX: -1,
      mY: -1,
      visible: false,
      uuid_up: "None",
      name_up: "None",
      jsonData: [],
      selectedObj: [],
      visi_up: true,
      checked_up: true,
      modelInfo: modelInfo
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
  showMouse(mouse) {
    this.setState({
      mX: mouse.x,
      mY: mouse.y
    });
  }
  onSecondaryPaneSizeChange(secondaryPaneSize) {
    this.setState({ secondaryPaneSize: secondaryPaneSize });
  }

  render() {
    const { visible } = this.state;
    // console.log("up", this.state.uuid_up);
    // console.log("visi", this.state.visi_up);
    // console.log("json", this.state.jsonData[0]);
    // console.log("checked", this.state.checked_up);
    // console.log("seleced", this.state.selectedObj);
    // console.log($(".ui.checkbox").checkbox());
    let vi = "visible";
    // if (!this.state.visi_up) {
    if (!this.state.checked_up) {
      vi = "hide";
    }

    let objTree = null;
    // console.log(this.state.jsonData);
    // console.log(this.selectedObj);
    // console.log("model json", modelInfo.Entities.Childs[0].Childs[0]);
    // if (this.state.jsonData.size > 0) {
    // if (Boolean(this.state.jsonData)) {
    if (Boolean(this.state.jsonData)) {
      // console.log("jdata", this.state.jsonData.length);
      objTree = (
        <Example
          // value={this.state.jsonData}
          value={this.state.modelInfo}
          onPassSelected={this.passSelected}
        />
      );
    }

    let itemProp = null;
    // console.log("name select", this.state.name_up);
    for (let i in modelInfo.Entities.Childs[0].Childs) {
      // console.log("name", modelInfo.Entities.Childs[0].Childs[i]);
      for (let j in modelInfo.Entities.Childs[0].Childs[i].Childs) {
        if (
          modelInfo.Entities.Childs[0].Childs[i].Childs[j].GUID ===
          this.state.name_up
        ) {
          console.log(
            "name",
            modelInfo.Entities.Childs[0].Childs[i].Childs[j].GUID
          );
          itemProp =
            modelInfo.Entities.Childs[0].Childs[i].Childs[j].Attributes;
        }
      }
    }
    let propItems = null;
    if (itemProp != null) {
      console.log("table input", itemProp);
      // propItems = itemProp.map(d => <li key={d.Name}>{d.Name}</li>);
      propItems = (
        <TableDemo
          // value={this.state.jsonData}
          value={itemProp}
          // onPassSelected={this.passSelected}
        />
      );
    }

    return (
      <div>
        <Button onClick={this.toggleVisibility}> Object detail View </Button>{" "}
        <SpliterLayout
          secondaryInitialSize={15}
          percentage={true}
          onSecondaryPaneSizeChange={this.onSecondaryPaneSizeChange}
        >
          <div>
            <Sidebar.Pushable as={Segment}>
              <Sidebar
                as={Menu}
                animation="overlay"
                width="wide"
                direction="left"
                visible={visible}
                icon="labeled"
                vertical
                inverted
              >
                {/* <Menu.Item name="home">
                  <Icon name="home" />
                  <p />
                  UUID: {this.state.uuid_up}
                </Menu.Item>
                <Menu.Item name="gamepad">
                  <Icon name="gamepad" />
                  {vi}
                  <Button onClick={this.toggleCheck}> {vi}</Button>
                </Menu.Item> */}
                <Menu.Item name="properties">
                  {/*json tree*/}
                  Name: {this.state.name_up}
                  <p />
                  X: {this.state.mX}
                  <p />
                  Y: {this.state.mY}
                  {propItems}
                  {/* <div>{itemProp.map(station => <div> {station} </div>)}</div> */}
                  {/* {modelInfo.Entities.Childs[0].Childs[0].Name} */}
                </Menu.Item>{" "}
              </Sidebar>{" "}
              <Sidebar.Pusher>
                <Segment basic>
                  <GltfTest
                    onSelectedUUID={this.showUUID}
                    onSelectedName={this.showName}
                    onSelectedMouse={this.showMouse}
                    onSelectedVisi={this.showVisible}
                    onPassJdata={this.passJson}
                    visi={this.state.checked_up}
                    value={this.state.selectedObj}
                  />
                </Segment>{" "}
              </Sidebar.Pusher>{" "}
            </Sidebar.Pushable>{" "}
          </div>
          <div>
            tree window
            {objTree}
            <p />
            some thing
            {/* <TableDemo /> */}
            {propItems}
            <p />
            <p>
              Size of the 2nd pane:
              <span
                className="volatile"
                ref={e => {
                  this.sizeEl1 = e;
                }}
              >
                {this.state.secondaryPaneSize}
              </span>
            </p>
            {/* {propItems} */}
            {/* {objTree} */}
          </div>
        </SpliterLayout>
      </div>
    );
  }
}

export default SidebarRightOverlay;
