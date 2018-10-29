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
  addItemAndSubItem() {
    let api = this.refs.treeview.api;

    let selectedItem = api.getSelectedItem();

    if (selectedItem) {
      // saveText(JSON.stringify(selectedItem), "filename.json");
      this.props.onPassSelected(selectedItem);
      console.log("selected item", selectedItem);
      // api.removeItem(selectedItem.id);
    } else {
      alert("You have to select a item to remove it");
    }
  }

  render() {
    var jPass = [];
    for (var i in this.props.value) {
      // jPass[i] = this.props.value[i].name;
      jPass.push({
        id: i,
        text: this.props.value[i].uuid,
        isLeaf: true
      });
    }
    // console.log("test", jPass);

    return (
      <div>
        <button onClick={this.addItemAndSubItem.bind(this)}>
          Click to hide the select item
        </button>
        <TreeView
          ref="treeview"
          // json="https://denifakedata.herokuapp.com/tree/countries"
          // items={cbcs}
          items={jPass}
          showCheckbox={true}
        />
      </div>
    );
  }
}

export default Example;
