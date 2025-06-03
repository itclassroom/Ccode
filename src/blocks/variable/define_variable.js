/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';

Blockly.Blocks['define_variable'] = {
  init: function() {
    this.appendValueInput("VARIABLENAMES")
        .appendField(new Blockly.FieldDropdown([["整數","int"], ["浮點數","float"], ["雙精度浮點數","double"]]), "list")
        .appendField(new Blockly.FieldLabel(" "), "SPACE")
        .setCheck("VariableName");

    this.appendDummyInput()
        .appendField(";");

    this.setInputsInline(true);
    this.setColour(150);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setHelpUrl("");

    const shadowDom = Blockly.utils.xml.textToDom(
      '<shadow type="variable_name_input"><field name="VAR_NAME">變數名稱</field></shadow>'
    );
    this.getInput('VARIABLENAMES').connection.setShadowDom(shadowDom);
  }
};

export const blocks = {define_variable: Blockly.Blocks['define_variable'] };
