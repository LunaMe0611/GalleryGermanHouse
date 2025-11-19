// Functions for working with comments via GitHub Issues

// Add comment to specific photo
async function addComment(photoId, author, text) {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryNumber = urlParams.get('category');
        
        if (!categoryNumber) {
            throw new Error('No category selected');
        }
        
        const issueNumber = categoryNumber;
        
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
                    body: `**PHOTO_ID:** ${photoId}\n**USER:** ${author}\n**COMMENT:** ${text}\n\n*Added: ${new Date().toLocaleString('en-US')}*`
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

// Get comments for specific photo
async function getComments(photoId) {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryNumber = urlParams.get('category');
        
        if (!categoryNumber) {
            throw new Error('No category selected');
        }
        
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
        
        const allComments = await response.json();
        
        // Filter comments for this specific photo
        const photoComments = allComments.filter(comment => {
            if (!comment.body) return false;
            return comment.body.includes(`**PHOTO_ID:** ${photoId}`);
        });
        
        // Convert GitHub comments to our format
        return photoComments.map(comment => ({
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
    if (!body) return 'Anonymous';
    
    const match = body.match(/\*\*USER:\*\* (.*?)(?:\n|$)/);
    return match ? match[1].trim() : 'Anonymous';
}

function extractText(body) {
    if (!body) return 'No comment text';
    
    const match = body.match(/\*\*COMMENT:\*\* (.*?)(?:\n\n|\n\*Added:|$)/s);
    return match ? match[1].trim() : 'No comment text';
}
