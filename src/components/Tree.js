import React from "react";
import TreeView from "deni-react-treeview";
import { Button, Checkbox } from "semantic-ui-react";

import cbcs from "./data/cbcs.json";
function saveText(text, filename) {
  var a = document.createElement("a");
  a.setAttribute(
    "href",
    "data:text/plain;charset=utf-u," + encodeURIComponent(text)
  );
  a.setAttribute("download", filename);
  a.click();
}

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.jPass = null;
  }

  componentDidMount() {
    var jPass = [];
    // if (Boolean(this.props.value.size > 0)) {
    console.log("tree input", this.props.value);
    if (this.props.value.length > 0) {
      for (var i in this.props.value[0].children) {
        // jPass[i] = this.props.value[i].name;
        console.log("id ", this.props.value[0].children[i]);
        var jSub = [];
        for (var j in this.props.value[0].children[i].children) {
          console.log("id ", this.props.value[0].children[i].children[j]);
          jSub.push({
            id: i * 1000 + j,
            text: this.props.value[0].children[i].children[j].uuid,
            isLeaf: true,
            state: 1,
            visible: this.props.value[0].children[i].children[j].visible
          });
        }
        jPass.push({
          children: jSub,
          id: i,
          text: this.props.value[0].children[i].uuid
        });
      }
    }
    this.jPass = jPass;
    console.log("jpass", this.jPass);
    // }
  }

  addItemAndSubItem() {
    let api = this.refs.treeview.api;

    // let selectedItem = api.getSelectedItem();
    let selectedItem = api.getItems();

    if (selectedItem) {
      if (selectedItem.state === 1) {
        selectedItem.visible = true;
      } else if (selectedItem.state === 2) {
        selectedItem.visible = false;
      }
      // saveText(JSON.stringify(selectedItem), "filename.json");
      this.props.onPassSelected(selectedItem);
      // console.log("selected item", selectedItem);
      // api.removeItem(selectedItem.id);
    } else {
      alert("You have to select a item to remove it");
    }
  }

  render() {
    let treeData = cbcs;
    if (Boolean(this.jPass)) {
      // console.log("test", this.jPass);
      treeData = this.jPass;
    }
    return (
      <div>
        <button onClick={this.addItemAndSubItem.bind(this)}>
          Click to hide the select item
        </button>
        <TreeView
          ref="treeview"
          // items={cbcs}
          items={treeData}
          // items={this.jPass}
          showCheckbox={true}
        />
      </div>
    );
  }
}

export default Example;
