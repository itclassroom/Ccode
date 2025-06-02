/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

Blockly.Blocks['return'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("return : ")
        .appendField(new Blockly.FieldTextInput("0"), "VALUE")
        .appendField(" ;");
    this.setColour(230);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

export const blocks = { return: Blockly.Blocks[ 'return' ] };