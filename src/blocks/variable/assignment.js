/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import * as Blockly from 'blockly/core';

Blockly.Blocks['assignment'] = {
  init: function() {
    this.appendValueInput('VAR')
        .setCheck('String');
    this.appendDummyInput()
        .appendField('=');
    this.appendValueInput('VALUE')
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('Assign a value to a variable.');
    this.setHelpUrl('');

    // Shadow block for variable name
    const varShadow = this.workspace.newBlock('variable_name_input');
    varShadow.setShadow(true);
    this.getInput('VAR').connection.connect(varShadow.outputConnection);

    // Shadow block for literal value
    const valueShadow = this.workspace.newBlock('literal_value');
    valueShadow.setShadow(true);
    this.getInput('VALUE').connection.connect(valueShadow.outputConnection);
  }
};
export const blocks = {assignment: Blockly.Blocks[ 'assignment']};