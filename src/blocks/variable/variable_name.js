/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import * as Blockly from 'blockly';


Blockly.Blocks['variable_name_input'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("變數名稱: ")
        .appendField(new Blockly.FieldTextInput(""), "VAR_NAME");
    this.setOutput(true, "VariableName");
    this.setColour(12);
    this.setTooltip("輸入一個變數名稱");
    this.setHelpUrl("");

    this.getField('VAR_NAME').setValidator(function(newValue) {
      if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(newValue)) {
        return newValue;
      }
      return null;
    });
  }
};

export const blocks = {variable_name_input: Blockly.Blocks[ 'variable_name_input']};