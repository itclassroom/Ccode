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
      ]
    },
    {
      "kind": "category",
      "name": "變數 Variables",
      "contents":[
        {
          "kind":"category",
          "name":"數字類",
          "contents":[
            {
            "kind" : "block",
            "type" : "math_variable"
            },
            {
            "kind" : "block",
            "type" : "constant_value"
            },
          ]
        },
      ]
    }
  ]
}