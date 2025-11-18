// Load saved settings
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['jiraUrl'], (result) => {
    if (result.jiraUrl) {
      document.getElementById('jiraUrl').value = result.jiraUrl;
    }
  });
});

// Save settings
document.getElementById('save').addEventListener('click', () => {
  let jiraUrl = document.getElementById('jiraUrl').value.trim();
  
  // Validate URL
  if (!jiraUrl) {
    showStatus('Please enter a JIRA URL', 'error');
    return;
  }
  
  // Ensure it ends with /browse/
  if (!jiraUrl.endsWith('/browse/')) {
    if (jiraUrl.endsWith('/browse')) {
      jiraUrl += '/';
    } else if (jiraUrl.endsWith('/')) {
      jiraUrl += 'browse/';
    } else {
      jiraUrl += '/browse/';
    }
  }
  
  // Validate it's a URL
  try {
    new URL(jiraUrl);
  } catch (e) {
    showStatus('Please enter a valid URL', 'error');
    return;
  }
  
  // Save to Chrome storage
  chrome.storage.sync.set({ jiraUrl }, () => {
    showStatus('✓ Saved! Reload GitHub to see changes.', 'success');
    document.getElementById('jiraUrl').value = jiraUrl;
    
    // Auto-close after 1.5 seconds
    setTimeout(() => {
      window.close();
    }, 1500);
  });
});

// Open options page
document.getElementById('openOptions').addEventListener('click', (e) => {
  e.preventDefault();
  chrome.runtime.openOptionsPage();
});

// Allow Enter key to save
document.getElementById('jiraUrl').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('save').click();
  }
});

function showStatus(message, type) {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = message;
  statusDiv.className = `status ${type}`;
  statusDiv.style.display = 'block';
}
