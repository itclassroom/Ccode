/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/*
This toolbox contains nearly every single built-in block that Blockly offers,
in addition to the custom block 'add_text' this sample app adds.
You probably don't need every single block, and should consider either rewriting
your toolbox from scratch, or carefully choosing whether you need each block
listed here.


*/

export const toolbox = {
  "kind" : "categoryToolbox", 
  "contents":[
    {
      "kind":"category",
      "name":"函式庫 Library",
      "contents": [
        {
          "kind" : "block",
          "type" : "stdio"
        },
        {
          "kind" : "block",
          "type" : "mathlib"
        },
      ]
    },             //outter blanket
    {
      "kind": "category",
      "name": "函数 function",
      "contents": [
        {
          "kind" : "block",
          "type" : "main"
        },
        {
          "kind" : "block",
          "type" : "return"
        },
      ]
    },
    {                      //start of cat
      "kind": "category",
      "name": "輸入/輸出 I/O",
      "contents": [        //tell what block to put inside
        {                  //start of the block 
          "kind" : "block", 
          "type" : "printf"  
        },                 //end of the block
        {
          "kind" : "block",
          "type" : "scanf"
        }
      ]
    },
    {
      "kind": "category",
      "name": "變數 Variables",
      "contents":[
        {
          "kind" : "block",
          "type" : "define_variable"
        },
        {
          "kind" : "block",
          "type" : "variable_name_input"
        },
        {
          "kind" : "block",
          "type" : "assignment"
        },
        {
          "kind" : "block",
          "type" : "literal_value"
        },
        {
          "kind" : "block",
          "type" : "math_constant"
        },
      ]
    }
  ]
}