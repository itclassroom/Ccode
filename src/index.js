import * as Blockly from 'blockly';
import { blocks as printBlocks } from './blocks/IO/printf';
import { blocks as mainBlocks } from './blocks/function/main';
import { blocks as returnBlocks } from './blocks/function/return';
import { blocks as stdioBlocks } from './blocks/library/stdio';
import { blocks as math_variableBlocks } from './blocks/variable/maths/math_variable.js';
import { blocks as math_hintBlocks } from './blocks/variable/maths/math_constant.js';
import { blocks as variable_name_inputBlocks } from './blocks/variable/variable.js'
import { blocks as assignmentBlocks } from './blocks/variable/assignment.js';
import { cGenerator } from './generators/cgenerators';
import { save, load } from './serialization';
import { toolbox } from './toolbox';
import './index.css';
import { executeCCode } from './api.js';

// Combine and register the blocks with Blockly
const blocks = {
  ...printBlocks,
  ...mainBlocks,
  ...stdioBlocks,
  ...returnBlocks,
  ...math_variableBlocks,
  ...math_hintBlocks,
  ...variable_name_inputBlocks,
  ...assignmentBlocks
};

const myTheme = Blockly.Theme.defineTheme('largeTextTheme', {
  base: Blockly.Themes.Classic,
  fontStyle: {
    size: 10,  // Default is typically around 12px; increase as needed
  },
  componentStyles:{
   workspaceBackgroundColour: '#81CFF4',
   toolboxBackgroundColour: '#4287f5'
}
});



// Set up UI elements and inject Blockly
const codeDiv = document.getElementById('generatedCode').firstChild;
const outputDiv = document.getElementById('output');
const blocklyDiv = document.getElementById('blocklyDiv');
const ws = Blockly.inject(blocklyDiv, { 
                          toolbox,
                          theme: myTheme, 
                          renderer: 'zelos'
                          });


// Function to update the code display
const runCode = () => {
  const code = cGenerator.workspaceToCode(ws);
  codeDiv.innerText = code; // Update generated code display
};

// Whenever the workspace changes, update code display
ws.addChangeListener((e) => {
  if (
    e.isUiEvent ||
    e.type == Blockly.Events.FINISHED_LOADING ||
    ws.isDragging()
  ) {
    return;
  }
  runCode();
});

ws.addChangeListener((event) => {
  if (event.type === Blockly.Events.BLOCK_CREATE) {
    const block = ws.getBlockById(event.blockId);
    if (block && block.type === 'main' && block.comment) {
      block.comment.setEditable(false);
    }
  }
});

// Add button event listener for execution
document.getElementById('runButton').addEventListener('click', executeCode);

// Get the run button element
const runButton = document.getElementById('runButton');

// Function to execute C code via the Piston API
async function executeCode() {
  console.log('Executing code...');
  runButton.disabled = true;
  const code = cGenerator.workspaceToCode(ws);
  codeDiv.innerText = code;
  outputDiv.innerText = 'Running...';

  const result = await executeCCode(code, '');
  if (result.error) {
    outputDiv.innerText = `Error: ${result.error}`;
  } else {
    outputDiv.innerHTML = result.output.replace(/\n/g, '<br>');
  }
  runButton.disabled = false;
}