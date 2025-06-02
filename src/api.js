export async function executeCCode(code, input = '') {
  const timeout = 10000; // 10 seconds
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        language: 'c',
        version: '10.2.0',
        files: [
          {
            name: 'main.c',
            content: code
          }
        ],
        stdin: input
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    let output = result.run.stdout || '';
    if (result.compile && result.compile.code !== 0) {
      output += '\nCompilation error:\n' + (result.compile.stderr || 'Unknown error');
    } else if (result.run.code !== 0) {
      output += '\nRuntime error:\n' + (result.run.stderr || 'Unknown error');
    }

    return {
      output: output,
      error: null
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      return {
        output: null,
        error: 'Request timed out'
      };
    }
    return {
      output: null,
      error: 'Failed to execute code: ' + error.message
    };
  }
}