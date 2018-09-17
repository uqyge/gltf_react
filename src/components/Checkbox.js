import React, { Component } from "react";
import { Button, Checkbox } from "semantic-ui-react";

export default class CheckboxExampleRemoteControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  toggle = () => this.setState({ checked: !this.state.checked });

  render() {
    // this.props.onVisi(this.state.checked);
    return (
      // this.props.onVisi(this.state.checked);
      <div>
        <Button onClick={this.toggle}>visible</Button>
        <Checkbox
          label="Check this box"
          onChange={this.toggle}
          checked={this.state.checked}
        />
      </div>
      // this.props.onVisi(this.state.checked);
    );
  }
}
