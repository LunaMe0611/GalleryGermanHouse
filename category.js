let currentPhotoId = null;
let currentCategoryNumber = null;

// Load category
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryNumber = urlParams.get('category');
    
    if (categoryNumber) {
        currentCategoryNumber = categoryNumber;
        loadCategory(categoryNumber);
    } else {
        document.getElementById('categoryTitle').textContent = 'Category not found';
    }
});

function loadCategory(categoryNumber) {
    // Set title
    document.getElementById('categoryTitle').textContent = `Category ${categoryNumber}`;
    
    const photosGrid = document.getElementById('photosGrid');
    photosGrid.innerHTML = '<div class="loading">Loading photos...</div>';
    
    // Load default photos first, then user photos
    loadDefaultPhotos(categoryNumber, photosGrid);
    loadUserPhotos(categoryNumber, photosGrid);
}

function loadDefaultPhotos(categoryNumber, photosGrid) {
    // Simple default photos structure
    const defaultPhotos = [
        { 
            id: `cat${categoryNumber}_photo1`,
            title: `Beautiful Landscape ${categoryNumber}`, 
            description: 'Stunning natural scenery',
            image: `images/categories/${categoryNumber}/photo1.jpg`
        },
        { 
            id: `cat${categoryNumber}_photo2`,
            title: `Artistic Shot ${categoryNumber}`, 
            description: 'Creative photography',
            image: `images/categories/${categoryNumber}/photo2.jpg`
        },
        { 
            id: `cat${categoryNumber}_photo3`,
            title: `Nature Closeup ${categoryNumber}`, 
            description: 'Detailed natural elements',
            image: `images/categories/${categoryNumber}/photo3.jpg`
        }
    ];
    
    // Display default photos
    photosGrid.innerHTML = '';
    defaultPhotos.forEach(photo => {
        const photoCard = createPhotoCard(photo, categoryNumber);
        photosGrid.appendChild(photoCard);
    });
}

function loadUserPhotos(categoryNumber, photosGrid) {
    const userPhotos = JSON.parse(localStorage.getItem('userPhotos') || '[]');
    const categoryUserPhotos = userPhotos.filter(photo => photo.category === categoryNumber);
    
    // Display user photos
    categoryUserPhotos.forEach(photo => {
        const userPhoto = {
            id: photo.id,
            title: photo.title,
            description: photo.description,
            image: photo.imageData,
            uploadedAt: photo.uploadedAt
        };
        
        const photoCard = createPhotoCard(userPhoto, categoryNumber);
        photosGrid.appendChild(photoCard);
    });
    
    // If no photos at all, show message
    if (photosGrid.children.length === 0) {
        photosGrid.innerHTML = '<div class="no-photos">No photos in this category yet</div>';
    }
}

function createPhotoCard(photo, categoryNumber) {
    const photoCard = document.createElement('div');
    photoCard.className = 'photo-card';
    photoCard.innerHTML = `
        <img src="${photo.image}" alt="${photo.title}" class="photo-image" 
             onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlBob3RvIENvbWluZyBTb29uPC90ZXh0Pjwvc3ZnPg=='">
        <div class="photo-info">
            <h3 class="photo-title">${photo.title}</h3>
            <p class="photo-description">${photo.description}</p>
            ${photo.uploadedAt ? `<small class="upload-date">Added: ${new Date(photo.uploadedAt).toLocaleDateString()}</small>` : ''}
            <button class="photo-comments-btn" onclick="openCommentsModal('${photo.id}', '${photo.title.replace(/'/g, "\\'")}')">
                💬 Comments
            </button>
        </div>
    `;
    return photoCard;
}

// Comment functions - NOW PER PHOTO
async function openCommentsModal(photoId, photoTitle) {
    currentPhotoId = photoId;
    
    document.getElementById('commentsPhotoTitle').textContent = `Comments: ${photoTitle}`;
    document.getElementById('commentsModal').style.display = 'flex';
    
    await loadComments(photoId);
}

function closeCommentsModal() {
    document.getElementById('commentsModal').style.display = 'none';
    currentPhotoId = null;
}

async function loadComments(photoId) {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = '<div class="loading">Loading comments...</div>';
    
    try {
        const comments = await getComments(photoId);
        
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
        console.error('Error loading comments:', error);
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
    
    if (!currentPhotoId) {
        alert('Error: no photo selected');
        return;
    }
    
    try {
        await addComment(currentPhotoId, author, text);
        
        // Clear form
        authorInput.value = '';
        textInput.value = '';
        
        // Refresh comments list
        await loadComments(currentPhotoId);
        
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
    window.location.href = 'index.html';
}
