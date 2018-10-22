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
      console.log(selectedItem);

      saveText(JSON.stringify(selectedItem), "filename.json");
      // saveText(JSON.stringify(this.props.value), "filename.json");
      // api.removeItem(selectedItem.id);
    } else {
      alert("You have to select a item to remove it");
    }
  }

  render() {
    // let jPass = JSON.parse(this.props.value);
    console.log("pass", this.props.value.substring(0, 5));
    // console.log("test", jPass);
    // console.log("countries", cbcs);
    return (
      <div>
        <button onClick={this.addItemAndSubItem.bind(this)}>
          Click to remove the select item
        </button>
        <TreeView
          ref="treeview"
          // json="https://denifakedata.herokuapp.com/tree/countries"
          items={cbcs}
          // items={this.props.value}
          showCheckbox={true}
        />
      </div>
    );
  }
}

export default Example;
