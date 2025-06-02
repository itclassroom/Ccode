/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';




// Define the main block
Blockly.Blocks['main'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput(""), "type1")
        .appendField("main (")
        .appendField(new Blockly.FieldTextInput(""), "type2")
        .appendField(") {");
    this.appendStatementInput("BODY")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("}");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
 this.getSvgRoot().classList.add('blocklyMainBlock');
}
};


export const blocks = { main: Blockly.Blocks['main'] };
