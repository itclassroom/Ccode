/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import * as Blockly from 'blockly';

Blockly.Blocks['assignment'] = {
  init: function() {
    this.appendValueInput('VAR')
        .setCheck('VariableName');
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
    const varShadowDom = Blockly.utils.xml.textToDom(
      '<shadow type="variable_name_input"><field name="VAR_NAME"></field></shadow>'
    );
    this.getInput('VAR').connection.setShadowDom(varShadowDom);

    // Shadow block for literal value
    const valueShadowDom = Blockly.utils.xml.textToDom(
      '<shadow type="literal_value"><field name="VALUE">0</field></shadow>'
    );
    this.getInput('VALUE').connection.setShadowDom(valueShadowDom);
  }
};
export const blocks = {assignment: Blockly.Blocks[ 'assignment']};