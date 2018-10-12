import React from "react";
import TreeView from "deni-react-treeview";
import { Button, Checkbox } from "semantic-ui-react";

import cbcs from "./data/cbcs.json";
class Example extends React.Component {
  render() {
    return <TreeView items={cbcs} />;
    // return <TreeView url="https://denifakedata.herokuapp.com/tree/countries" />;
    // return <TreeView cbcs />;
    // return <Button />;
  }
}

export default Example;
