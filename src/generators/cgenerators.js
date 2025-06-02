// Import Blockly core (adjust based on your environment)
import * as Blockly from 'blockly/core';

// Create a custom C generator
export const cGenerator = new Blockly.Generator('C');

// Override workspaceToCode to sort blocks by y-coordinate
cGenerator.workspaceToCode = function(workspace) {
  // Get all top-level blocks
  const blocks = workspace.getTopBlocks(true);
  //console.log('All top blocks:', workspace.getTopBlocks(true).map(b => b.type));
  // Sort blocks by y-coordinate (ascending), then x-coordinate for ties
  blocks.sort((a, b) => {
    const posA = a.getRelativeToSurfaceXY();
    const posB = b.getRelativeToSurfaceXY();
    if (posA.y !== posB.y) {
      return posA.y - posB.y; // Smaller y first (higher on screen)
    } else {
      return posA.x - posB.x; // Smaller x first (left to right)
    }
  });
  
  // Generate code for each sorted block
  let code = '';
  for (const block of blocks) {
    code += this.blockToCode(block) || '';
  }
  return code;
};

// Generator for the 'main' block
// In cgenerators.js, modify the 'main' block generator
cGenerator.forBlock['main'] = function(block, generator) {
 const type1 = block.getFieldValue('type1');
 const type2 = block.getFieldValue('type2');
 const bodyInput = block.getInput('BODY');
  let nextBlock = bodyInput.connection.targetBlock();
 let statementsBody = '';
  while (nextBlock) {
    const blockCode = generator.blockToCode(nextBlock);
    statementsBody += blockCode || '';
    nextBlock = nextBlock.getNextBlock();
  }
  const code = `\n${type1} main(${type2}) {\n${statementsBody}   \n}\n`;
  return code;
};


cGenerator.forBlock['printf'] = function(block, generator){
    try{const string = block.getFieldValue('TEXT');
    const escapedText = string.replace(/"/g, '\\"');
    const code = `    printf("${escapedText}\\n");\n`;
    return code;
    }catch(e){
        console.error('Error in printf generator:', e);
        return '// Error in printf block\n';
    } 
};

cGenerator.forBlock['stdio'] = function(block,generator){
  const code = `#include <stdio.h>\n`;
  return code;
}

cGenerator.forBlock['return'] = function(block,generator){
  const value = block.getFieldValue('VALUE');
  const code = `    return ${value};`;
  return code;
}

cGenerator.forBlock['math_variable'] = function(block, generator) {
  const type = block.getFieldValue('list');
  const connectedBlock = block.getInputTargetBlock('VARIABLENAMES');
  const variableName = connectedBlock.getFieldValue('TEXT');
  const code = `    ${type} ${variableName};\n`;
  return code;
};

cGenerator.forBlock['constant_value'] = function(block, generator) {
  const selectedConstant = block.getFieldValue('constant');
  const code = `${selectedConstant}`;
  return code;
};