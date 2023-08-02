#!/bin/sh
set -e
goal="Monitor change signal and set commit message"
echo "Plan:"
echo "1. Create a new service function to monitor the change signal"
echo "2. Parse the content of the change signal, which is a shell script, to find the goal"
echo "3. If the goal is found, set the commit message to the value of this goal variable"

# Step 1: Create a new service function to monitor the change signal
cat << 'EOF' > src/frontend/service/monitorChangeSignal.js
import { createEffect } from 'solid-js';
import { change } from '../stores/change';
import { setCommitMessage } from '../stores/commitMessage';

const monitorChangeSignal = () => {
  createEffect(() => {
    const newChangeContent = change();
    // Check if the new content has the goal variable
    const goalLineMatch = newChangeContent.match(/goal="(.+?)"/);
    
    if (goalLineMatch) {
      const goalValue = goalLineMatch[1];
      
      // Set the commit message to the value of the goal variable
      setCommitMessage(goalValue);
    }
  });
};

export default monitorChangeSignal;
EOF

echo "\033[32mDone: $goal\033[0m\n"
