/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

// Create a custom block called 'add_text' that adds
// text to the output div on the sample app.
// This is just an example and you should replace this with your
// own custom blocks.

Blockly.Blocks['printf'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("顥示")
        .appendField(new Blockly.FieldTextInput("Hello, World!"), "TEXT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#14cccc');
  }
};


export const blocks = { printf: Blockly.Blocks['printf'] };
