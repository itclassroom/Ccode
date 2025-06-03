/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';

// Detailed logging for Blockly.icons property - Placed at the top of the module
console.log('SCANF_MODULE_LOAD: Blockly.icons object:', Blockly.icons);
if (Blockly.icons) {
    console.log('SCANF_MODULE_LOAD: Blockly.icons.Mutator property:', Blockly.icons.Mutator);
    console.log('SCANF_MODULE_LOAD: typeof Blockly.icons.Mutator:', typeof Blockly.icons.Mutator);
    console.log('SCANF_MODULE_LOAD: Blockly.icons.MutatorIcon property:', Blockly.icons.MutatorIcon); // Note: MutatorIcon is the class, Mutator is often the alias used in setMutator
    console.log('SCANF_MODULE_LOAD: typeof Blockly.icons.MutatorIcon:', typeof Blockly.icons.MutatorIcon);
}

const SCANF_HORIZONTAL_MUTATOR_MIXIN = {
  itemCount_: 0,

  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10) || 0;
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('scanf_h_container');
    containerBlock.initSvg();
    let connection = containerBlock.getInput('STACK').connection;
    for (let i = 0; i < this.itemCount_; i++) {
      const itemBlock = workspace.newBlock('scanf_h_add_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },

  compose: function(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('STACK');
    const connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_); 
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    for (let i = 0; i < this.itemCount_; i++) {
      if (this.getInput('VAR' + i)) {
        this.removeInput('VAR' + i);
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
  },

  updateShape_: function() {
    let i = 0;
    while (this.getInput('VAR' + i)) {
      this.removeInput('VAR' + i);
      i++;
    }
    for (let i = 0; i < this.itemCount_; i++) {
      this.appendValueInput('VAR' + i)
          .setCheck('VariableName')
          .setAlign(Blockly.inputs.Align.RIGHT)
          .appendField('到變數 (to variable) ' + (i + 1));
    }
  }
};

// Register the mutator using the extension system
Blockly.Extensions.registerMutator(
  'scanf_mutator_extension', // Unique name for this mutator
  SCANF_HORIZONTAL_MUTATOR_MIXIN,       // The mixin object
  undefined,                 // Optional onchange helper function for compose (not needed here)
  ['scanf_h_add_item']     // Blocks to show in the mutator flyout
);

Blockly.Blocks['scanf'] = {
  init: function() {
    console.log('SCANF_BLOCK_INIT: Initializing scanf block.');
    this.appendDummyInput()
        .appendField("scanf format:")
        .appendField(new Blockly.FieldTextInput(""), "FORMAT_STRING_FIELD");
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#14cccc');
    this.setInputsInline(true);

    // Apply the mixin directly for its methods to be available if icon tries to call them
    this.mixin(SCANF_HORIZONTAL_MUTATOR_MIXIN, true);
    // this.itemCount_ = 0; // Already in mixin

    // Temporarily bypass this.setMutator() and try to add the icon manually
    if (Blockly.icons && Blockly.icons.MutatorIcon) {
        try {
            console.log('SCANF_BLOCK_INIT: Attempting to create and add MutatorIcon manually.');
            const mutatorIconInstance = new Blockly.icons.MutatorIcon(['scanf_h_add_item'], this); // Pass this (sourceBlock)
            console.log('SCANF_BLOCK_INIT: MutatorIcon instance created:', mutatorIconInstance);
            console.log('SCANF_BLOCK_INIT: Does instance have getType?', typeof mutatorIconInstance.getType === 'function');
            if (typeof mutatorIconInstance.getType === 'function') {
                console.log('SCANF_BLOCK_INIT: getType returns:', mutatorIconInstance.getType());
            }
            this.addIcon(mutatorIconInstance);
            console.log('SCANF_BLOCK_INIT: Manually added MutatorIcon.');
        } catch (e) {
            console.error('SCANF_BLOCK_INIT: Error manually creating/adding MutatorIcon:', e);
        }
    } else {
        console.error('SCANF_BLOCK_INIT: Blockly.icons.MutatorIcon is NOT available for manual addition. Check SCANF_MODULE_LOAD logs.');
    }

    this.setTooltip('Reads data from standard input. Use the gear to add variables.');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['scanf_h_container'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('scanf variables');
    this.appendStatementInput('STACK');
    this.setColour('#14cccc');
    this.setTooltip('Add or remove variables to be read by scanf.');
    this.contextMenu = false;
  }
};

Blockly.Blocks['scanf_h_add_item'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('variable input');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#14cccc');
    this.setTooltip('Represents a variable to be read by scanf.');
    this.contextMenu = false;
  }
};

export const blocks = {
  scanf: Blockly.Blocks['scanf'],
  scanf_h_container: Blockly.Blocks['scanf_h_container'],
  scanf_h_add_item: Blockly.Blocks['scanf_h_add_item']
}; 