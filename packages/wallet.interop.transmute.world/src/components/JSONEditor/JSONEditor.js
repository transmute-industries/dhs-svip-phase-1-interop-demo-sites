import React, { Component } from "react";

import PropTypes from "prop-types";

// eslint-disable-next-line
import brace from "brace";
import AceEditor from "react-ace";

// eslint-disable-next-line
import "brace/mode/json";
// eslint-disable-next-line
import "brace/theme/github";

class JSONEditor extends Component {
  render() {
    const { jsonObject, onChange } = this.props;
    return (
      <AceEditor
        mode="json"
        theme="github"
        style={{ ...this.props.style, width: "100%" }}
        onChange={(data)=>{
          onChange(data);
        }}
        readOnly={onChange === undefined}
        wrapEnabled={true}
        name="JSONEditorEditor"
        value={JSON.stringify(jsonObject, null, 2)}
        editorProps={{ $blockScrolling: true }}
      />
    );
  }
}

JSONEditor.propTypes = {
  jsonObject: PropTypes.object.isRequired,
  style: PropTypes.object
};

export default JSONEditor;
