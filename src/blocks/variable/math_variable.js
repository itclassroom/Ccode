/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

Blockly.Blocks['math_variable'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("數字類");

    this.appendValueInput("VARIABLENAMES")
        .appendField(new Blockly.FieldDropdown([["整數","int"], ["浮點數","float"], ["雙精度浮點數","double"]]), "list")
        .appendField(new Blockly.FieldLabel(" "), "SPACE")
        .setCheck("String");

    this.appendDummyInput()
        .appendField(";");

    this.setInputsInline(true);
    this.setColour(150);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setHelpUrl("");

    const shadowBlock = this.workspace.newBlock('text');
    shadowBlock.setShadow(true);
    shadowBlock.getField('TEXT').setValue("變數名稱");
    shadowBlock.getField('TEXT').setValidator(function(newValue) {
        if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(newValue)) {
            return newValue;
        }
        return null;
    });

    this.getInput('VARIABLENAMES').connection.connect(shadowBlock.outputConnection);
  }
};
export const blocks = { math_variable: Blockly.Blocks['math_variable'] };