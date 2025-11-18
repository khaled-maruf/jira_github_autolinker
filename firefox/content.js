// Regex for JIRA keys (e.g., PROJ-123, FRONT-404)
// Starts with 2+ uppercase letters, followed by a hyphen and numbers.
const JIRA_REGEX = /\b([A-Z][A-Z0-9]+-\d+)\b/g;

// Tags we should NOT auto-link inside
const FORBIDDEN_TAGS = ['A', 'TEXTAREA', 'INPUT', 'SCRIPT', 'STYLE', 'CODE', 'PRE'];

let jiraBaseUrl = null;

// Use browser API for Firefox compatibility
const storageAPI = typeof browser !== 'undefined' ? browser : chrome;

// Load JIRA URL from storage and initialize
storageAPI.storage.sync.get(['jiraUrl'], (result) => {
  if (result.jiraUrl) {
    jiraBaseUrl = result.jiraUrl;
    console.log('GitHub JIRA Linker: JIRA URL loaded:', jiraBaseUrl);
    init();
  } else {
    console.warn('GitHub JIRA Linker: No JIRA URL configured. Please set it in extension options.');
  }
});

// Listen for storage changes (when user updates settings)
storageAPI.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.jiraUrl) {
    jiraBaseUrl = changes.jiraUrl.newValue;
    console.log('GitHub JIRA Linker: JIRA URL updated:', jiraBaseUrl);
    // Re-run linkify on the entire page
    if (jiraBaseUrl) {
      linkify(document.body);
    }
  }
});

// 2. Main Initialization
function init() {
  // specific to GitHub PR bodies and comments
  const targetContainer = document.querySelector('body');

  // Run once immediately
  linkify(targetContainer);

  // Use MutationObserver to handle GitHub's dynamic page loads (PJAX/Turbo)
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach((node) => {
          // Only process element nodes
          if (node.nodeType === 1) {
            linkify(node);
          }
        });
      }
    });
  });

  observer.observe(targetContainer, {
    childList: true,
    subtree: true
  });
}

// 3. Recursive function to walk the DOM and replace text
function linkify(node) {
  // If this node is forbidden, stop.
  if (FORBIDDEN_TAGS.includes(node.tagName)) return;
  
  // Don't mess with editable content
  if (node.isContentEditable) return;

  // Process child nodes
  if (node.hasChildNodes()) {
    // Convert to array to avoid live collection issues during modification
    Array.from(node.childNodes).forEach(child => linkify(child));
  }

  // 4. The actual replacement logic
  if (node.nodeType === 3) { // Text node
    const text = node.textContent;
    if (!text) return;

    // Check if text contains a JIRA key
    if (JIRA_REGEX.test(text)) {
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      
      // Reset regex lastIndex because we use 'g' flag and test() above
      JIRA_REGEX.lastIndex = 0;
      
      let match;
      while ((match = JIRA_REGEX.exec(text)) !== null) {
        const matchText = match[0];
        const matchIndex = match.index;

        // Append text before the match
        if (matchIndex > lastIndex) {
          fragment.appendChild(document.createTextNode(text.substring(lastIndex, matchIndex)));
        }

        // Create the link
        const a = document.createElement('a');
        a.href = `${jiraBaseUrl}${matchText}`;
        a.textContent = matchText;
        a.title = `Open ${matchText} in JIRA`;
        a.style.color = '#0052cc'; // JIRA Blue (optional styling)
        a.target = '_blank'; // Open in new tab
        
        // Add a class so we can style it or ignore it later if needed
        a.classList.add('jira-autolink-ext');

        fragment.appendChild(a);

        lastIndex = JIRA_REGEX.lastIndex;
      }

      // Append any remaining text
      if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
      }

      // Replace the text node with our new fragment
      node.parentNode.replaceChild(fragment, node);
    }
  }
}
