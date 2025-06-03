// Import Blockly core (adjust based on your environment)
import * as Blockly from 'blockly/core';

// Create a custom C generator
export const cGenerator = new Blockly.Generator('C');

cGenerator.workspaceToCode = function(workspace) {

  const blocks = workspace.getTopBlocks(true);

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

cGenerator.forBlock['main'] = function(block, generator) {
    const type1 = block.getFieldValue('type1');
    const type2 = block.getFieldValue('type2');
    const bodyInput = block.getInput('BODY');
    const firstBlock = bodyInput.connection.targetBlock();
    let statementsBody = '';
    if (firstBlock) {
        statementsBody = generator.blockToCode(firstBlock);
    }
    const code = `\n${type1} main(${type2}) {\n${statementsBody}\n}\n`;
    return code;
};


cGenerator.forBlock['printf'] = function(block, generator) {
    const string = block.getFieldValue('TEXT');
    const escapedText = string.replace(/"/g, '\\"');
    let code = `    printf("${escapedText}\\n");\n`;
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    if (nextBlock) {
        code += generator.blockToCode(nextBlock);
    }
    return code;
};

cGenerator.forBlock['stdio'] = function(block,generator){
  const code = `#include <stdio.h>\n`;
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    if (nextBlock) {
        code += generator.blockToCode(nextBlock);
    }
  return code;
}

cGenerator.forBlock['return'] = function(block,generator){
  const value = block.getFieldValue('VALUE');
  const code = `    return ${value};`;
  return code;
}
cGenerator.forBlock['math_variable'] = function(block, generator) {
  const type = block.getFieldValue('list');
  const variableName = generator.valueToCode(block, 'VARIABLENAMES', 0) || 'default_var';
  let code = `    ${type} ${variableName};\n`; // Changed from `const` to `let`
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock) {
      code += generator.blockToCode(nextBlock);
  }
  return code;
};


cGenerator.forBlock['math_constant'] = function(block, generator) {
  const selectedConstant = block.getFieldValue('constant');
  if (block.outputConnection && block.outputConnection.targetConnection) {
  return [selectedConstant, 0];
  }
  return null;
};

cGenerator.forBlock['variable_name_input'] = function(block, generator) {
    const varName = block.getFieldValue('VAR_NAME');
    if (block.outputConnection && block.outputConnection.targetConnection) {
        return [varName, 0];
    }
    return varName;
};

cGenerator.forBlock['assignment'] = function(block, generator) {
  const varName = generator.valueToCode(block, 'VAR', 0) || 'var';
  const value = generator.valueToCode(block, 'VALUE', 0) || '0';
  const code = `    ${varName} = ${value};\n`;
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    if (nextBlock) {
        code += generator.blockToCode(nextBlock);
    }
  return code;
};

cGenerator.forBlock['literal_value'] = function(block, generator) {
  const value = block.getFieldValue('VALUE');
  if (block.outputConnection && block.outputConnection.targetConnection){
  if (isNaN(parseFloat(value)) || !isFinite(value)) {
    // Escape double quotes within the string
    const escapedValue = value.replace(/"/g, '\\"');
    return ['"' + escapedValue + '"', 0]; // Return as C string literal
  } else {
    return [value, 0]; // Return as number
  }
  }
  return null;
};
