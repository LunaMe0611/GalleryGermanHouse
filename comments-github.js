// Gist-based comments system
const GIST_FILENAME = 'comments.json';

// Add comment to Gist
async function addComment(photoId, author, text) {
    try {
        // 1. Get current Gist
        const gist = await getGist();
        let comments = gist.files[GIST_FILENAME].content ? 
            JSON.parse(gist.files[GIST_FILENAME].content) : {};
        
        // 2. Add new comment
        const newComment = {
            id: Date.now(),
            author: author,
            text: text,
            date: new Date().toISOString()
        };
        
        if (!comments[photoId]) {
            comments[photoId] = [];
        }
        comments[photoId].push(newComment);
        
        // 3. Update Gist
        await updateGist(comments);
        
        return newComment;
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
}

// Get comments from Gist
async function getComments(photoId) {
    try {
        const gist = await getGist();
        const comments = gist.files[GIST_FILENAME].content ? 
            JSON.parse(gist.files[GIST_FILENAME].content) : {};
        
        return comments[photoId] || [];
    } catch (error) {
        console.error('Error loading comments:', error);
        return [];
    }
}

// Get Gist data
async function getGist() {
    const response = await fetch(`https://api.github.com/gists/${GITHUB_CONFIG.GIST_ID}`, {
        headers: {
            'Authorization': `token ${GITHUB_CONFIG.TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });
    
    if (!response.ok) {
        throw new Error(`Gist error: ${response.status}`);
    }
    
    return await response.json();
}

// Update Gist with new comments
async function updateGist(comments) {
    const response = await fetch(`https://api.github.com/gists/${GITHUB_CONFIG.GIST_ID}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `token ${GITHUB_CONFIG.TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            files: {
                [GIST_FILENAME]: {
                    content: JSON.stringify(comments, null, 2)
                }
            }
        })
    });
    
    if (!response.ok) {
        throw new Error(`Gist update error: ${response.status}`);
    }
    
    return await response.json();
}

// Test function
async function testGistConnection() {
    try {
        const gist = await getGist();
        console.log('✅ Gist connection OK');
        console.log('Gist URL:', gist.html_url);
        return true;
    } catch (error) {
        console.log('❌ Gist connection failed:', error);
        return false;
    }
}
