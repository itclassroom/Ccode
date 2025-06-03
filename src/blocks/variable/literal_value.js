/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';

Blockly.Blocks['literal_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('0'), 'VALUE');
    this.setOutput(true, 'LITERAL'); // Changed from null to 'LITERAL'
    this.setColour(230); // A distinct color
    this.setTooltip('Enter any value (number, text, etc.). Text will be treated as a string.');
    this.setHelpUrl('');
  }
};

export const blocks = { literal_value: Blockly.Blocks['literal_value'] }; 