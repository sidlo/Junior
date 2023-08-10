#!/bin/sh
set -e
goal="Refactor ExecuteButton by moving handleExecuteChange"
echo "Plan:"
echo "1. Create a new file in the model directory to contain the handleExecuteChange function"
echo "2. Modify ExecuteButton.jsx to import the handleExecuteChange function from the new file"

# Step 1: Create a new file for handleExecuteChange in the model directory
cat > src/frontend/model/handleExecuteChange.js << 'EOF'
import { executeChange } from '../service/executeChange';
import { setExecutionResult } from './executionResult';
import { setChange } from './change';
import { changeInput } from './changeInput';

const handleExecuteChange = async () => {
  const clipboardAvailable = !!(navigator.clipboard && navigator.clipboard.readText);
  const change = clipboardAvailable ? await navigator.clipboard.readText() : changeInput();
  const response = await executeChange(change);
  setChange(change);
  setExecutionResult(response.output);
  console.log(response.output);
};

export default handleExecuteChange;
EOF

# Step 2: Modify ExecuteButton.jsx to import handleExecuteChange from the new file
cat > src/frontend/components/ExecuteButton.jsx << 'EOF'
import handleExecuteChange from '../model/handleExecuteChange';
import { setChangeInput } from '../model/changeInput';

const ExecuteButton = () => {
  const clipboardAvailable = !!(navigator.clipboard && navigator.clipboard.readText);

  const handlePaste = async (e) => {
    const paste = (e.clipboardData || window.clipboardData).getData('text');
    setChangeInput(paste);
    handleExecuteChange();
  };

  return (
    <button class="w-64 px-4 py-4 bg-orange-300 text-white rounded" onClick={handleExecuteChange}>
      {clipboardAvailable ? (
        'Paste & Execute Change'
      ) : (
        <textarea
          rows="1"
          class="w-full px-2 py-2 bg-white text-black resize-none"
          placeholder="Paste here to execute"
          value={changeInput()}
          onPaste={handlePaste}
        />
      )}
    </button>
  );
};

export default ExecuteButton;
EOF

echo "\033[32mDone: $goal\033[0m\n"
