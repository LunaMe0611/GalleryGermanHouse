// Functions for working with comments via GitHub Issues

// Add comment
async function addComment(categoryNumber, author, text) {
    try {
        const issueNumber = categoryNumber; // Issue #1 for category 1
        
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_CONFIG.REPO_OWNER}/${GITHUB_CONFIG.REPO_NAME}/issues/${issueNumber}/comments`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `token ${GITHUB_CONFIG.TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    body: `**${author}**: ${text}\n\n*Added: ${new Date().toLocaleString()}*`
                })
            }
        );
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
}

// Get category comments
async function getComments(categoryNumber) {
    try {
        const issueNumber = categoryNumber;
        
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_CONFIG.REPO_OWNER}/${GITHUB_CONFIG.REPO_NAME}/issues/${issueNumber}/comments`,
            {
                headers: {
                    'Authorization': `token ${GITHUB_CONFIG.TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const comments = await response.json();
        
        // Convert GitHub comments to our format
        return comments.map(comment => ({
            id: comment.id,
            author: extractAuthor(comment.body),
            text: extractText(comment.body),
            date: comment.created_at,
            githubUrl: comment.html_url
        }));
    } catch (error) {
        console.error('Error loading comments:', error);
        return [];
    }
}

// Helper functions for parsing
function extractAuthor(body) {
    const match = body.match(/\*\*(.*?)\*\*:/);
    return match ? match[1] : 'Anonymous';
}

function extractText(body) {
    if (!body) return '';
    const parts = body.split('**:');
    if (parts.length > 1) {
        return parts[1].split('*Added:')[0].trim();
    }
    return body;
}
