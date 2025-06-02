const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Endpoint to execute C code using Piston API
app.post('/execute', async (req, res) => {
    const { code, input = '' } = req.body;
    try {
        const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
            language: 'c',
            version: "10.2.0",
            files: [
                {
                    name: 'main.c',
                    content: code
                }
            ],
            stdin: input
        });
        const result = response.data;
        let output = result.run.stdout || '';
        if (result.compile && result.compile.code !== 0) {
            output += '\nCompilation error:\n' + (result.compile.stderr || 'Unknown error');
        } else if (result.run.code !== 0) {
            output += '\nRuntime error:\n' + (result.run.stderr || 'Unknown error');
        }
        res.json({
            output: output,
            error: null
        });
    } catch (error) {
        console.error('Error with Piston API:', error.message);
        res.json({
            output: null,
            error: 'Failed to execute code: ' + error.message
        });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});