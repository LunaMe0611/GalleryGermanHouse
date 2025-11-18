let currentCategoryNumber = null;

// Load category
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryNumber = urlParams.get('category');
    
    if (categoryNumber) {
        loadCategory(categoryNumber);
    } else {
        document.getElementById('categoryTitle').textContent = 'Category not found';
    }
});

function loadCategory(categoryNumber) {
    // Set title with comments button
    const categoryTitle = document.getElementById('categoryTitle');
    categoryTitle.innerHTML = `
        Category ${categoryNumber}
        <button class="comments-btn" onclick="openCommentsModal(${categoryNumber})">
            💬 Comments
        </button>
    `;
    
    const photosGrid = document.getElementById('photosGrid');
    photosGrid.innerHTML = '<div class="loading">Loading photos...</div>';
    
    loadUserPhotos(categoryNumber, photosGrid);
}

function loadUserPhotos(categoryNumber, photosGrid) {
    const userPhotos = JSON.parse(localStorage.getItem('userPhotos') || '[]');
    const categoryUserPhotos = userPhotos.filter(photo => photo.category === categoryNumber);
    
    photosGrid.innerHTML = '';
    
    if (categoryUserPhotos.length === 0) {
        photosGrid.innerHTML = '<div class="no-photos">No photos in this category yet</div>';
        return;
    }
    
    // Display photos
    categoryUserPhotos.forEach(photo => {
        const userPhoto = {
            title: photo.title,
            description: photo.description,
            image: photo.imageData,
            uploadedAt: photo.uploadedAt
        };
        
        const photoCard = createPhotoCard(userPhoto);
        photosGrid.appendChild(photoCard);
    });
}

function createPhotoCard(photo) {
    const photoCard = document.createElement('div');
    photoCard.className = 'photo-card';
    photoCard.innerHTML = `
        <img src="${photo.image}" alt="${photo.title}" class="photo-image">
        <div class="photo-info">
            <h3 class="photo-title">${photo.title}</h3>
            <p class="photo-description">${photo.description}</p>
            ${photo.uploadedAt ? `<small class="upload-date">Added: ${new Date(photo.uploadedAt).toLocaleDateString()}</small>` : ''}
        </div>
    `;
    return photoCard;
}

// Comment functions
async function openCommentsModal(categoryNumber) {
    currentCategoryNumber = categoryNumber;
    
    document.getElementById('commentsCategoryTitle').textContent = `Comments: Category ${categoryNumber}`;
    document.getElementById('commentsModal').style.display = 'flex';
    
    await loadComments(categoryNumber);
}

function closeCommentsModal() {
    document.getElementById('commentsModal').style.display = 'none';
    currentCategoryNumber = null;
}

async function loadComments(categoryNumber) {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = '<div class="loading">Loading comments...</div>';
    
    try {
        const comments = await getComments(categoryNumber);
        
        if (comments.length === 0) {
            commentsList.innerHTML = '<div class="no-comments">No comments yet. Be the first!</div>';
            return;
        }
        
        // Sort by date (newest first)
        comments.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        commentsList.innerHTML = '';
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment-item';
            commentElement.innerHTML = `
                <div class="comment-author">${comment.author}</div>
                <div class="comment-text">${comment.text}</div>
                <div class="comment-date">${new Date(comment.date).toLocaleString()}</div>
            `;
            commentsList.appendChild(commentElement);
        });
    } catch (error) {
        commentsList.innerHTML = '<div class="error">Error loading comments</div>';
    }
}

async function addNewComment() {
    const authorInput = document.getElementById('commentAuthor');
    const textInput = document.getElementById('commentText');
    
    const author = authorInput.value.trim();
    const text = textInput.value.trim();
    
    if (!author || !text) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!currentCategoryNumber) {
        alert('Error: no category selected');
        return;
    }
    
    try {
        await addComment(currentCategoryNumber, author, text);
        
        // Clear form
        authorInput.value = '';
        textInput.value = '';
        
        // Refresh comments list
        await loadComments(currentCategoryNumber);
        
    } catch (error) {
        alert('Error adding comment. Please try again.');
    }
}

// Close modal when clicking outside
document.getElementById('commentsModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeCommentsModal();
    }
});

// Close with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('commentsModal').style.display === 'flex') {
        closeCommentsModal();
    }
});

function goBack() {
    window.history.back();
}
