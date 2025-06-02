/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

Blockly.Blocks['constant_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
            ['intmax', 'INT_MAX'],
            ['intmin', 'INT_MIN'],
            ['floatmax', 'FLT_MAX'],
            ['floatmin', '-FLT_MAX'],
            ['doublemax', 'DBL_MAX'],
            ['doublemin', '-DBL_MAX']
        ]), 'constant');
    this.setOutput(true, 'Number');
    this.setColour(160);
    this.setTooltip('Select a constant value.');
    this.setHelpUrl('');
  }
};

export const blocks = { constant_value: Blockly.Blocks['constant_value'] };