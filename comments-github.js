// Global variable to track current photo and category
let currentPhotoId = null;
let currentCategoryNumber = null;

// Functions for working with comments via GitHub Issues
// Comments are now per photo, not per category

// Add comment to specific photo
async function addComment(photoId, author, text) {
    try {
        if (!currentCategoryNumber) {
            throw new Error('No category selected');
        }
        
        const issueNumber = currentCategoryNumber;
        
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
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`GitHub API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
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
        if (!currentCategoryNumber) {
            throw new Error('No category selected');
        }
        
        const issueNumber = currentCategoryNumber;
        
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
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`GitHub API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
        }
        
        const allComments = await response.json();
        
        // Filter comments for this specific photo
        const photoComments = allComments.filter(comment => {
            if (!comment.body) return false;
            return comment.body.includes(`**PHOTO_ID:** ${photoId}`);
        });
        
        console.log(`Found ${photoComments.length} comments for photo ${photoId}`);
        
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
    if (match) {
        return match[1].trim();
    }
    
    // Fallback: try to extract any text after COMMENT:
    const fallbackMatch = body.match(/\*\*COMMENT:\*\*([\s\S]*?)(?:\n\n|$)/);
    return fallbackMatch ? fallbackMatch[1].trim() : 'No comment text';
}

// Function to set current category (called from category.js)
function setCurrentCategory(categoryNumber) {
    currentCategoryNumber = categoryNumber;
}

// Function to set current photo (called from category.js)
function setCurrentPhoto(photoId) {
    currentPhotoId = photoId;
}

// Debug function to check GitHub connection
async function testGitHubConnection() {
    try {
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_CONFIG.REPO_OWNER}/${GITHUB_CONFIG.REPO_NAME}/issues/1`,
            {
                headers: {
                    'Authorization': `token ${GITHUB_CONFIG.TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );
        
        if (response.ok) {
            console.log('GitHub connection: OK');
            return true;
        } else {
            console.log('GitHub connection: FAILED', response.status);
            return false;
        }
    } catch (error) {
        console.log('GitHub connection: ERROR', error);
        return false;
    }
}

// Initialize connection test on load
document.addEventListener('DOMContentLoaded', function() {
    // Test connection after a short delay
    setTimeout(() => {
        testGitHubConnection();
    }, 1000);
});
