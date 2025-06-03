// Import Blockly core (adjust based on your environment)
import * as Blockly from 'blockly';

// Create a custom C generator
export const cGenerator = new Blockly.Generator('C');

// Define order of operations for the C generator
cGenerator.ORDER_ATOMIC = 0;         // 0 "" ...
cGenerator.ORDER_NEW = 1.1;          // new
cGenerator.ORDER_MEMBER = 1.2;       // . []
cGenerator.ORDER_FUNCTION_CALL = 2;  // ()
cGenerator.ORDER_INCREMENT = 3;      // ++
cGenerator.ORDER_DECREMENT = 3;      // --
cGenerator.ORDER_BITWISE_NOT = 4.1;  // ~
cGenerator.ORDER_UNARY_PLUS = 4.2;   // +
cGenerator.ORDER_UNARY_NEGATION = 4.3; // -
cGenerator.ORDER_LOGICAL_NOT = 4.4;  // !
cGenerator.ORDER_TYPEOF = 4.5;       // typeof (might not be relevant for C, but harmless)
cGenerator.ORDER_VOID = 4.6;         // void
cGenerator.ORDER_DELETE = 4.7;       // delete (not relevant for C, but harmless)
cGenerator.ORDER_AWAIT = 4.8;        // await (not relevant for C, but harmless)
cGenerator.ORDER_EXPONENTIATION = 5.0; // ** (C uses pow(), but precedence is for operators)
cGenerator.ORDER_MULTIPLICATION = 5.1; // *
cGenerator.ORDER_DIVISION = 5.2;     // /
cGenerator.ORDER_MODULUS = 5.3;      // %
cGenerator.ORDER_SUBTRACTION = 6.1;  // -
cGenerator.ORDER_ADDITION = 6.2;     // +
cGenerator.ORDER_BITWISE_SHIFT = 7;  // << >>
cGenerator.ORDER_RELATIONAL = 8;     // < <= > >=
cGenerator.ORDER_IN = 8;             // in (not relevant for C, but harmless)
cGenerator.ORDER_INSTANCEOF = 8;     // instanceof (not relevant for C, but harmless)
cGenerator.ORDER_EQUALITY = 9;       // == !=
cGenerator.ORDER_BITWISE_AND = 10;   // &
cGenerator.ORDER_BITWISE_XOR = 11;   // ^
cGenerator.ORDER_BITWISE_OR = 12;    // |
cGenerator.ORDER_LOGICAL_AND = 13;   // &&
cGenerator.ORDER_LOGICAL_OR = 14;    // ||
cGenerator.ORDER_CONDITIONAL = 15;   // ?:
cGenerator.ORDER_ASSIGNMENT = 16;    // = += -= *= /= %= <<= >>= &= ^= |=
cGenerator.ORDER_YIELD = 17;         // yield (not relevant for C, but harmless)
cGenerator.ORDER_COMMA = 18;         // ,
cGenerator.ORDER_NONE = 99;          // (...)

console.log("C_GENERATOR_ORDER_NONE:", cGenerator.ORDER_NONE); // Debug log
console.log("C_GENERATOR_ORDER_ATOMIC:", cGenerator.ORDER_ATOMIC); // Debug log

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

cGenerator.forBlock['mathlib'] = function(block,generator){
  const code = `#include <math.h>\n`;
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
cGenerator.forBlock['define_variable'] = function(block, generator) {
  const type = block.getFieldValue('list');
  const variableName = generator.valueToCode(block, 'VARIABLENAMES', generator.ORDER_NONE) || 'default_var';
  let code = `    ${type} ${variableName};\n`;
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock) {
      code += generator.blockToCode(nextBlock);
  }
  return code;
};


cGenerator.forBlock['math_constant'] = function(block, generator) {
  const selectedConstant = block.getFieldValue('constant');
  if (block.outputConnection && block.outputConnection.targetConnection) {
  return [selectedConstant, generator.ORDER_ATOMIC];
  }
  return null;
};

cGenerator.forBlock['variable_name_input'] = function(block, generator) {
    const varName = block.getFieldValue('VAR_NAME');
    if (block.outputConnection && block.outputConnection.targetConnection) {
        return [varName, generator.ORDER_ATOMIC];
    }
    return varName;
};

cGenerator.forBlock['assignment'] = function(block, generator) {
  const varName = generator.valueToCode(block, 'VAR', generator.ORDER_NONE) || 'var';
  const value = generator.valueToCode(block, 'VALUE', generator.ORDER_NONE) || '0';
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
    return ['"' + escapedValue + '"', generator.ORDER_ATOMIC];
  } else {
    return [value, generator.ORDER_ATOMIC];
  }
  }
  return null;
};

cGenerator.forBlock['scanf'] = function(block, generator) {
  const formatString = block.getFieldValue('FORMAT_STRING_FIELD') || "";
  // Ensure the format string is a C string literal by adding quotes if not already present
  // and escaping internal quotes and backslashes.
  let CformatString = formatString;
  if (!(/^"(.*)"$/.test(CformatString))) { // If not already quoted
    CformatString = '"' + CformatString.replace(/\\/g, '\\').replace(/"/g, '\\"') + '"';
  } else { // Already quoted, just ensure internal escapes are correct
    // This part is tricky: if it's already a C-escaped string literal, we might not need to do much.
    // For simplicity, assuming if it starts and ends with a quote, it's intended as a literal.
    // A more robust solution would parse existing escapes, but that's complex here.
  }

  const args = [];
  for (let i = 0; i < block.itemCount_; i++) {
    const varName = generator.valueToCode(block, 'VAR' + i, generator.ORDER_NONE) || '/*_undefined_variable_*/';
    const cleanVarName = varName.replace(/^"|"$/g, ''); 
    args.push('&' + cleanVarName);
  }

  let code = `    scanf(${CformatString}`;
  if (args.length > 0) {
    code += `, ${args.join(', ')}`;
  }
  code += ');\n';

  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock) {
    code += generator.blockToCode(nextBlock);
  }
  return code;
};

cGenerator.forBlock['specific_variable_name'] = function(block, generator) {
  const varName = block.getFieldValue('VAR_NAME');
  return [varName, generator.ORDER_ATOMIC]; // Return the variable name as an atomic value
};

