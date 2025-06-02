/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

Blockly.Blocks['stdio'] = {
    init:function() {
        this.appendDummyInput()
            .appendField("stdio.h");
        this.setColour('#ffe4c4');
    }
};

export const blocks = { stdio: Blockly.Blocks[ 'stdio'] };