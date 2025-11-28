let currentPhotoId = null;
let currentCategoryNumber = null;
let currentPhotos = []; // Все фото текущей категории
let currentPhotoIndex = 0; // Текущий индекс в просмотрщике

// Default photos structure
const defaultPhotos = {
    '1': [
        { 
            id: 'cat1_photo1',
            title: '', 
            
            image: 'images/categories/1/photo 1.jpg'
        },
        { 
            id: 'cat1_photo2',
            title: '', 
            
            image: 'images/categories/1/photo 2.jpg'
        },
        { 
            id: 'cat1_photo3',
            title: '', 
            
            image: 'images/categories/1/photo 3.jpg'
        },
        { 
            id: 'cat1_photo4',
            title: '', 
            
            image: 'images/categories/1/photo 4.jpg'
        },
        { 
            id: 'cat1_photo5',
            title: '', 
            
            image: 'images/categories/1/photo 5.jpg'
        },
        { 
            id: 'cat1_photo6',
            title: '', 
            
            image: 'images/categories/1/photo 6.jpg'
        }
    ],
    '2': [
        { 
            id: 'cat2_photo1',
            title: '', 
            
            image: 'images/categories/2/photo 1.jpg'
        },
        { 
            id: 'cat2_photo2',
            title: '', 
            
            image: 'images/categories/2/photo 2.jpg'
        },
        { 
            id: 'cat2_photo3',
            title: '', 
            
            image: 'images/categories/2/photo 3.jpg'
        },
        { 
            id: 'cat2_photo4',
            title: '', 
            
            image: 'images/categories/2/photo 4.jpg'
        },
        { 
            id: 'cat2_photo5',
            title: '', 
            
            image: 'images/categories/2/photo 5.jpg'
        },
        { 
            id: 'cat2_photo6',
            title: '', 
            
            image: 'images/categories/2/photo 6.jpg'
        }
    ],
    '3': [
        { 
            id: 'cat3_photo1',
            title: '', 
            
            image: 'images/categories/3/photo 1.jpg'
        },
        { 
            id: 'cat3_photo2',
            title: '', 
            
            image: 'images/categories/3/photo 2.jpg'
        },
        { 
            id: 'cat3_photo3',
            title: '', 
            
            image: 'images/categories/3/photo 3.jpg'
        },
        { 
            id: 'cat3_photo4',
            title: '', 
            
            image: 'images/categories/3/photo 4.jpg'
        },
        { 
            id: 'cat3_photo5',
            title: '', 
            
            image: 'images/categories/3/photo 5.jpg'
        },
        { 
            id: 'cat3_photo6',
            title: '', 
            
            image: 'images/categories/3/photo 6.jpg'
        },
        { 
            id: 'cat3_photo7',
            title: '', 
            
            image: 'images/categories/3/photo 7.jpg'
        },
        { 
            id: 'cat3_photo8',
            title: '', 
            
            image: 'images/categories/3/photo 8.jpg'
        }
    ],
    '4': [
        { 
            id: 'cat4_photo1',
            title: '', 
            
            image: 'images/categories/4/photo 1.jpg'
        },
        { 
            id: 'cat4_photo2',
            title: '', 
            
            image: 'images/categories/4/photo 2.jpg'
        },
        { 
            id: 'cat4_photo3',
            title: '', 
            
            image: 'images/categories/4/photo 3.jpg'
        },
        { 
            id: 'cat4_photo4',
            title: '', 
            
            image: 'images/categories/4/photo 4.jpg'
        },
        { 
            id: 'cat4_photo5',
            title: '', 
            
            image: 'images/categories/4/photo 5.jpg'
        }
    ],
    '5': [
        { 
            id: 'cat5_photo1',
            title: '', 
            
            image: 'images/categories/5/photo 1.jpg'
        },
        { 
            id: 'cat5_photo2',
            title: '', 
            
            image: 'images/categories/5/photo 2.jpg'
        },
        { 
            id: 'cat5_photo3',
            title: '', 
            
            image: 'images/categories/5/photo 3.jpg'
        },
        { 
            id: 'cat5_photo4',
            title: '', 
            
            image: 'images/categories/5/photo 4.jpg'
        },
        { 
            id: 'cat5_photo5',
            title: '', 
            
            image: 'images/categories/5/photo 5.jpg'
        },
        { 
            id: 'cat5_photo6',
            title: '', 
            
            image: 'images/categories/5/photo 6.jpg'
        }
    ],
    '6': [
        { 
            id: 'cat6_photo1',
            title: '', 
            
            image: 'images/categories/6/photo 1.jpg'
        },
        { 
            id: 'cat6_photo2',
            title: '', 
            
            image: 'images/categories/6/photo 2.jpg'
        },
        { 
            id: 'cat6_photo3',
            title: '', 
            
            image: 'images/categories/6/photo 3.jpg'
        },
        { 
            id: 'cat6_photo4',
            title: '', 
            
            image: 'images/categories/6/photo 4.jpg'
        }
    ],
    '7': [
        { 
            id: 'cat7_photo1',
            title: '', 
            
            image: 'images/categories/7/photo 1.jpg'
        },
        { 
            id: 'cat7_photo2',
            title: '', 
            
            image: 'images/categories/7/photo 2.jpg'
        },
        { 
            id: 'cat7_photo3',
            title: '', 
            
            image: 'images/categories/7/photo 3.jpg'
        },
        { 
            id: 'cat7_photo4',
            title: '', 
            
            image: 'images/categories/7/photo 4.jpg'
        },
        { 
            id: 'cat7_photo5',
            title: '', 
            
            image: 'images/categories/7/photo 5.jpg'
        }
    ],
    '8': [
        { 
            id: 'cat8_photo1',
            title: '', 
            
            image: 'images/categories/8/photo 1.jpg'
        },
        { 
            id: 'cat8_photo2',
            title: '', 
            
            image: 'images/categories/8/photo 2.jpg'
        },
        { 
            id: 'cat8_photo3',
            title: '', 
            
            image: 'images/categories/8/photo 3.jpg'
        },
        { 
            id: 'cat8_photo4',
            title: '', 
            
            image: 'images/categories/8/photo 4.jpg'
        },
        { 
            id: 'cat8_photo5',
            title: '', 
            
            image: 'images/categories/8/photo 5.jpg'
        }
    ],
    '9': [
        { 
            id: 'cat9_photo1',
            title: '', 
            
            image: 'images/categories/9/photo 1.jpg'
        },
        { 
            id: 'cat9_photo2',
            title: '', 
            
            image: 'images/categories/9/photo 2.jpg'
        },
        { 
            id: 'cat9_photo3',
            title: '', 
            
            image: 'images/categories/9/photo 3.jpg'
        },
        { 
            id: 'cat9_photo4',
            title: '', 
            
            image: 'images/categories/9/photo 4.jpg'
        },
        { 
            id: 'cat9_photo5',
            title: '', 
            
            image: 'images/categories/9/photo 5.jpg'
        },
        { 
            id: 'cat9_photo6',
            title: '', 
            
            image: 'images/categories/9/photo 6.jpg'
        }
    ],
    '10': [
        { 
            id: 'cat10_photo1',
            title: '', 
            
            image: 'images/categories/10/photo 1.jpg'
        },
        { 
            id: 'cat10_photo2',
            title: '', 
            
            image: 'images/categories/10/photo 2.jpg'
        },
        { 
            id: 'cat10_photo3',
            title: '', 
            
            image: 'images/categories/10/photo 3.jpg'
        },
        { 
            id: 'cat10_photo4',
            title: '', 
            
            image: 'images/categories/10/photo 4.jpg'
        },
        { 
            id: 'cat10_photo5',
            title: '', 
            
            image: 'images/categories/10/photo 5.jpg'
        },
        { 
            id: 'cat10_photo6',
            title: '', 
            
            image: 'images/categories/10/photo 6.jpg'
        },
        { 
            id: 'cat10_photo7',
            title: '', 
            
            image: 'images/categories/10/photo 7.jpg'
        }
    ],
    '11': [
        { 
            id: 'cat11_photo1',
            title: '', 
            
            image: 'images/categories/11/photo 1.jpg'
        },
        { 
            id: 'cat11_photo2',
            title: '', 
            
            image: 'images/categories/11/photo 2.jpg'
        },
        { 
            id: 'cat11_photo3',
            title: '', 
            
            image: 'images/categories/11/photo 3.jpg'
        },
        { 
            id: 'cat11_photo4',
            title: '', 
            
            image: 'images/categories/11/photo 4.jpg'
        },
        { 
            id: 'cat11_photo5',
            title: '', 
            
            image: 'images/categories/11/photo 5.jpg'
        },
        { 
            id: 'cat11_photo6',
            title: '', 
            
            image: 'images/categories/11/photo 6.jpg'
        }
    ],
    '12': [
        { 
            id: 'cat12_photo1',
            title: '', 
            
            image: 'images/categories/12/photo 1.jpg'
        },
        { 
            id: 'cat12_photo2',
            title: '', 
            
            image: 'images/categories/12/photo 2.jpg'
        },
        { 
            id: 'cat12_photo3',
            title: '', 
            
            image: 'images/categories/12/photo 3.jpg'
        },
        { 
            id: 'cat12_photo4',
            title: '', 
            
            image: 'images/categories/12/photo 4.jpg'
        },
        { 
            id: 'cat12_photo5',
            title: '', 
            
            image: 'images/categories/12/photo 5.jpg'
        }
    ],
    '13': [
        { 
            id: 'cat13_photo1',
            title: '', 
            
            image: 'images/categories/13/photo 1.jpg'
        },
        { 
            id: 'cat13_photo2',
            title: '', 
            
            image: 'images/categories/13/photo 2.jpg'
        },
        { 
            id: 'cat13_photo3',
            title: '', 
            
            image: 'images/categories/13/photo 3.jpg'
        },
        { 
            id: 'cat13_photo4',
            title: '', 
            
            image: 'images/categories/13/photo 4.jpg'
        },
        { 
            id: 'cat13_photo5',
            title: '', 
            
            image: 'images/categories/13/photo 5.jpg'
        },
        { 
            id: 'cat13_photo6',
            title: '', 
            
            image: 'images/categories/13/photo 6.jpg'
        }
    ],
    '14': [
        { 
            id: 'cat14_photo1',
            title: '', 
            
            image: 'images/categories/14/photo 1.jpg'
        },
        { 
            id: 'cat14_photo2',
            title: '', 
            
            image: 'images/categories/14/photo 2.jpg'
        },
        { 
            id: 'cat14_photo3',
            title: '', 
            
            image: 'images/categories/14/photo 3.jpg'
        },
        { 
            id: 'cat14_photo4',
            title: '', 
            
            image: 'images/categories/14/photo 4.jpg'
        }
    ],
    '15': [
        { 
            id: 'cat15_photo1',
            title: '', 
            
            image: 'images/categories/15/photo 1.jpg'
        },
        { 
            id: 'cat15_photo2',
            title: '', 
            
            image: 'images/categories/15/photo 2.jpg'
        },
        { 
            id: 'cat15_photo3',
            title: '', 
            
            image: 'images/categories/15/photo 3.jpg'
        },
        { 
            id: 'cat15_photo4',
            title: '', 
            
            image: 'images/categories/15/photo 4.jpg'
        },
        { 
            id: 'cat15_photo5',
            title: '', 
            
            image: 'images/categories/15/photo 5.jpg'
        }
    ],
    '16': [
        { 
            id: 'cat16_photo1',
            title: '', 
            
            image: 'images/categories/16/photo 1.jpg'
        },
        { 
            id: 'cat16_photo2',
            title: '', 
            
            image: 'images/categories/16/photo 2.jpg'
        },
        { 
            id: 'cat16_photo3',
            title: '', 
            
            image: 'images/categories/16/photo 3.jpg'
        },
        { 
            id: 'cat16_photo4',
            title: '', 
            
            image: 'images/categories/16/photo 4.jpg'
        },
        { 
            id: 'cat16_photo5',
            title: '', 
            
            image: 'images/categories/16/photo 5.jpg'
        },
        { 
            id: 'cat16_photo6',
            title: '', 
            
            image: 'images/categories/16/photo 6.jpg'
        },
        { 
            id: 'cat16_photo7',
            title: '', 
            
            image: 'images/categories/16/photo 7.jpg'
        }
    ],
    '17': [
        { 
            id: 'cat17_photo1',
            title: '', 
            
            image: 'images/categories/17/photo 1.jpg'
        },
        { 
            id: 'cat17_photo2',
            title: '', 
            
            image: 'images/categories/17/photo 2.jpg'
        },
        { 
            id: 'cat17_photo3',
            title: '', 
            
            image: 'images/categories/17/photo 3.jpg'
        },
        { 
            id: 'cat17_photo4',
            title: '', 
            
            image: 'images/categories/17/photo 4.jpg'
        },
        { 
            id: 'cat17_photo5',
            title: '', 
            
            image: 'images/categories/17/photo 5.jpg'
        }
    ],
    '18': [
        { 
            id: 'cat18_photo1',
            title: '', 
            
            image: 'images/categories/18/photo 1.jpg'
        },
        { 
            id: 'cat18_photo2',
            title: '', 
            
            image: 'images/categories/18/photo 2.jpg'
        },
        { 
            id: 'cat18_photo3',
            title: '', 
            
            image: 'images/categories/18/photo 3.jpg'
        },
        { 
            id: 'cat18_photo4',
            title: '', 
            
            image: 'images/categories/18/photo 4.jpg'
        },
        { 
            id: 'cat18_photo5',
            title: '', 
            
            image: 'images/categories/18/photo 5.jpg'
        },
        { 
            id: 'cat18_photo6',
            title: '', 
            
            image: 'images/categories/18/photo 6.jpg'
        },
        { 
            id: 'cat18_photo7',
            title: '', 
            
            image: 'images/categories/18/photo 7.jpg'
        }
    ],
    '19': [
        { 
            id: 'cat19_photo1',
            title: '', 
            
            image: 'images/categories/19/photo 1.jpg'
        },
        { 
            id: 'cat19_photo2',
            title: '', 
            
            image: 'images/categories/19/photo 2.jpg'
        },
        { 
            id: 'cat19_photo3',
            title: '', 
            
            image: 'images/categories/19/photo 3.jpg'
        }
    ],
    '20': [
        { 
            id: 'cat20_photo1',
            title: '', 
            
            image: 'images/categories/20/photo 1.jpg'
        },
        { 
            id: 'cat20_photo2',
            title: '', 
            
            image: 'images/categories/20/photo 2.jpg'
        },
        { 
            id: 'cat20_photo3',
            title: '', 
            
            image: 'images/categories/20/photo 3.jpg'
        },
        { 
            id: 'cat20_photo4',
            title: '', 
            
            image: 'images/categories/20/photo 4.jpg'
        },
        { 
            id: 'cat20_photo5',
            title: '', 
            
            image: 'images/categories/20/photo 5.jpg'
        },
        { 
            id: 'cat20_photo6',
            title: '', 
            
            image: 'images/categories/20/photo 6.jpg'
        },
        { 
            id: 'cat20_photo7',
            title: '', 
            
            image: 'images/categories/20/photo 7.jpg'
        },
        { 
            id: 'cat20_photo8',
            title: '', 
            
            image: 'images/categories/20/photo 8.jpg'
        }
    ],
    '21': [
        { 
            id: 'cat21_photo1',
            title: '', 
            
            image: 'images/categories/21/photo 1.jpg'
        },
        { 
            id: 'cat21_photo2',
            title: '', 
            
            image: 'images/categories/21/photo 2.jpg'
        },
        { 
            id: 'cat21_photo3',
            title: '', 
            
            image: 'images/categories/21/photo 3.jpg'
        },
        { 
            id: 'cat21_photo4',
            title: '', 
            
            image: 'images/categories/21/photo 4.jpg'
        },
        { 
            id: 'cat21_photo5',
            title: '', 
            
            image: 'images/categories/21/photo 5.jpg'
        }
    ],
    '22': [
        { 
            id: 'cat22_photo1',
            title: '', 
            
            image: 'images/categories/22/photo 1.jpg'
        },
        { 
            id: 'cat22_photo2',
            title: '', 
            
            image: 'images/categories/22/photo 2.jpg'
        },
        { 
            id: 'cat22_photo3',
            title: '', 
            
            image: 'images/categories/22/photo 3.jpg'
        },
        { 
            id: 'cat22_photo4',
            title: '', 
            
            image: 'images/categories/22/photo 4.jpg'
        },
        { 
            id: 'cat22_photo5',
            title: '', 
            
            image: 'images/categories/22/photo 5.jpg'
        }
    ],
    '23': [
        { 
            id: 'cat23_photo1',
            title: '', 
            
            image: 'images/categories/23/photo 1.jpg'
        },
        { 
            id: 'cat23_photo2',
            title: '', 
            
            image: 'images/categories/23/photo 2.jpg'
        },
        { 
            id: 'cat23_photo3',
            title: '', 
            
            image: 'images/categories/23/photo 3.jpg'
        },
        { 
            id: 'cat23_photo4',
            title: '', 
            
            image: 'images/categories/23/photo 4.jpg'
        },
        { 
            id: 'cat23_photo5',
            title: '', 
            
            image: 'images/categories/23/photo 5.jpg'
        },
        { 
            id: 'cat23_photo6',
            title: '', 
            
            image: 'images/categories/23/photo 6.jpg'
        },
        { 
            id: 'cat23_photo7',
            title: '', 
            
            image: 'images/categories/23/photo 7.jpg'
        },
        { 
            id: 'cat23_photo8',
            title: '', 
            
            image: 'images/categories/23/photo 8.jpg'
        },
        { 
            id: 'cat23_photo9',
            title: '', 
            
            image: 'images/categories/23/photo 9.jpg'
        }
    ],
    '24': [
        { 
            id: 'cat24_photo1',
            title: '', 
            
            image: 'images/categories/24/photo 1.jpg'
        },
        { 
            id: 'cat24_photo2',
            title: '', 
            
            image: 'images/categories/24/photo 2.jpg'
        },
        { 
            id: 'cat24_photo3',
            title: '', 
            
            image: 'images/categories/24/photo 3.jpg'
        },
        { 
            id: 'cat24_photo4',
            title: '', 
            
            image: 'images/categories/24/photo 4.jpg'
        },
        { 
            id: 'cat24_photo5',
            title: '', 
            
            image: 'images/categories/24/photo 5.jpg'
        },
        { 
            id: 'cat24_photo6',
            title: '', 
            
            image: 'images/categories/24/photo 6.jpg'
        },
        { 
            id: 'cat24_photo7',
            title: '', 
            
            image: 'images/categories/24/photo 7.jpg'
        },
        { 
            id: 'cat24_photo8',
            title: '', 
            
            image: 'images/categories/24/photo 8.jpg'
        }
    ]
};

// Load category when page loads
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryNumber = urlParams.get('category');
    
    if (categoryNumber) {
        currentCategoryNumber = categoryNumber;
        loadCategory(categoryNumber);
    } else {
        document.getElementById('categoryTitle').textContent = 'Category not found';
        showError('Category parameter is missing');
    }
});

// Load category photos
function loadCategory(categoryNumber) {
    // Set title
    document.getElementById('categoryTitle').textContent = `${categoryNumber}`;
    
    const photosGrid = document.getElementById('photosGrid');
    photosGrid.innerHTML = '<div class="loading">Loading photos...</div>';
    
    // Load all photos for this category
    loadAllPhotos(categoryNumber, photosGrid);
}

// Load both default and user photos
function loadAllPhotos(categoryNumber, photosGrid) {
    currentPhotos = [];
    
    // Load default photos
    const categoryDefaultPhotos = defaultPhotos[categoryNumber] || [];
    if (categoryDefaultPhotos.length > 0) {
        currentPhotos.push(...categoryDefaultPhotos);
    }
    
    // Load user photos from localStorage
    const userPhotos = JSON.parse(localStorage.getItem('userPhotos') || '[]');
    const categoryUserPhotos = userPhotos.filter(photo => photo.category === categoryNumber)
        .map(photo => ({
            id: photo.id.toString(),
            title: photo.title,
            description: photo.description,
            image: photo.imageData,
            uploadedAt: photo.uploadedAt
        }));
    
    if (categoryUserPhotos.length > 0) {
        currentPhotos.push(...categoryUserPhotos);
    }
    
    // Display all photos
    displayPhotos(currentPhotos, photosGrid);
}

// Display photos in grid
function displayPhotos(photos, photosGrid) {
    if (photos.length === 0) {
        photosGrid.innerHTML = '<div class="no-photos">No photos in this category yet</div>';
        return;
    }
    
    photosGrid.innerHTML = '';
    
    photos.forEach((photo, index) => {
        const photoCard = createPhotoCard(photo, index);
        photosGrid.appendChild(photoCard);
    });
}

// Create photo card element
function createPhotoCard(photo, index) {
    const photoCard = document.createElement('div');
    photoCard.className = 'photo-card';
    
    let infoContent = '';
    
    // Добавляем заголовок если есть
    if (photo.title && photo.title.trim() !== '') {
        infoContent += `<h3 class="photo-title">${photo.title}</h3>`;
    }
    
    // Добавляем описание если есть и оно не "No desc"
    if (photo.description && photo.description.trim() !== '' && photo.description !== 'No desc') {
        infoContent += `<p class="photo-description">${photo.description}</p>`;
    }
    
    // Добавляем дату если есть
    if (photo.uploadedAt) {
        infoContent += `<small class="upload-date">Added: ${formatDate(photo.uploadedAt)}</small>`;
    }
    
    // Всегда добавляем кнопки действий
    infoContent += `
        <div class="photo-actions">
            <button class="photo-view-btn" onclick="openFullSizeModal(${index})">
                👁️ Vollbild
            </button>
            <button class="photo-comments-btn" onclick="openFullSizeModal(${index})">
                💬 dein Humor
            </button>
        </div>
    `;
    
    photoCard.innerHTML = `
        <img src="${photo.image}" alt="${photo.title || 'Photo'}" class="photo-image" 
             onclick="openFullSizeModal(${index})"
             onerror="handleImageError(this)">
        <div class="photo-info">
            ${infoContent}
        </div>
    `;
    return photoCard;
}

// Handle image loading errors
function handleImageError(img) {
    console.warn('Image failed to load:', img.src);
    img.onerror = null;
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlBob3RvIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Show error message
function showError(message) {
    console.error('Gallery Error:', message);
    const photosGrid = document.getElementById('photosGrid');
    if (photosGrid) {
        photosGrid.innerHTML = `<div class="error">${message}</div>`;
    }
}

// FULL SIZE PHOTO VIEWER WITH COMMENTS
function openFullSizeModal(photoIndex) {
    // Validate photo index
    if (photoIndex < 0 || photoIndex >= currentPhotos.length) {
        showError('Invalid photo index');
        return;
    }
    
    currentPhotoIndex = photoIndex;
    const photo = currentPhotos[photoIndex];
    
    if (!photo) {
        showError('Photo not found');
        return;
    }
    
    // Set photo data
    document.getElementById('fullSizeImage').src = photo.image;
    document.getElementById('fullSizeTitle').textContent = photo.title;
    document.getElementById('fullSizeDesc').textContent = photo.description;
    
    // Show modal
    document.getElementById('fullSizeModal').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Load comments for this photo
    loadUtterances(photo.id);
    
    // Update navigation
    updateNavigation();
    
    console.log('Opened full size viewer for:', photo.title);
}

// Close full size modal
function closeFullSizeModal() {
    document.getElementById('fullSizeModal').style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
    
    // Clear Utterances
    const utterancesContainer = document.getElementById('utterances-comments');
    if (utterancesContainer) {
        utterancesContainer.innerHTML = '';
    }
    
    currentPhotoIndex = 0;
    console.log('Closed full size viewer');
}

// Navigate between photos
function navigatePhoto(direction) {
    const newIndex = currentPhotoIndex + direction;
    
    // Check boundaries
    if (newIndex >= 0 && newIndex < currentPhotos.length) {
        currentPhotoIndex = newIndex;
        const photo = currentPhotos[currentPhotoIndex];
        
        // Update photo and info
        document.getElementById('fullSizeImage').src = photo.image;
        document.getElementById('fullSizeTitle').textContent = photo.title;
        document.getElementById('fullSizeDesc').textContent = photo.description;
        
        // Reload comments for new photo
        loadUtterances(photo.id);
        
        // Update navigation
        updateNavigation();
        
        console.log('Navigated to photo:', photo.title);
    }
}

// Update navigation arrows visibility
function updateNavigation() {
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');
    
    if (prevBtn && nextBtn) {
        prevBtn.style.visibility = currentPhotoIndex > 0 ? 'visible' : 'hidden';
        nextBtn.style.visibility = currentPhotoIndex < currentPhotos.length - 1 ? 'visible' : 'hidden';
        
        // Update aria labels for accessibility
        prevBtn.setAttribute('aria-label', 'Previous photo');
        nextBtn.setAttribute('aria-label', 'Next photo');
    }
    
    // Update photo counter (optional)
    updatePhotoCounter();
}

// Update photo counter display
function updatePhotoCounter() {
    // You can add a photo counter element in HTML if needed
    const counterElement = document.getElementById('photoCounter');
    if (counterElement) {
        counterElement.textContent = `${currentPhotoIndex + 1} / ${currentPhotos.length}`;
    }
}

// Load Utterances comments
function loadUtterances(photoId) {
    const utterancesContainer = document.getElementById('utterances-comments');
    
    if (!utterancesContainer) {
        console.error('Utterances container not found');
        return;
    }
    
    // Clear previous comments and show loading
    utterancesContainer.innerHTML = '<div class="loading">Loading comments...</div>';
    
    // Remove any existing Utterances script
    const existingScript = document.querySelector('script[src="https://utteranc.es/client.js"]');
    if (existingScript) {
        existingScript.remove();
    }
    
    // Create new Utterances script
    const script = document.createElement('script');
    script.src = "https://utteranc.es/client.js";
    
    // CONFIGURE THESE SETTINGS FOR YOUR REPOSITORY:
    script.setAttribute('repo', "YOUR_USERNAME/YOUR_REPO"); // REPLACE with your repository
    script.setAttribute('issue-term', `photo-gallery-${photoId}`);
    script.setAttribute('theme', "github-dark");
    script.setAttribute('crossorigin', "anonymous");
    script.setAttribute('label', "comments");
    script.async = true;
    
    // Функция для проверки загрузки Utterances
    function checkUtterancesLoaded() {
        const utterancesFrame = utterancesContainer.querySelector('iframe');
        if (utterancesFrame) {
            // Utterances загрузился, удаляем loading
            const loadingElement = utterancesContainer.querySelector('.loading');
            if (loadingElement) {
                loadingElement.remove();
            }
        } else {
            // Продолжаем проверять каждые 500ms
            setTimeout(checkUtterancesLoaded, 500);
        }
    }
    
    script.onload = function() {
        // Начинаем проверку загрузки
        setTimeout(checkUtterancesLoaded, 1000);
    };
    
    // Также запускаем проверку на случай если onload не сработает
    setTimeout(checkUtterancesLoaded, 3000);
    
    script.onerror = function() {
        console.error('Failed to load Utterances');
        utterancesContainer.innerHTML = '<div class="error">Failed to load comments. Please check your repository settings.</div>';
    };
    
    utterancesContainer.appendChild(script);
}

// EVENT LISTENERS

// Close modal when clicking outside content
document.getElementById('fullSizeModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeFullSizeModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('fullSizeModal');
    if (!modal || modal.style.display !== 'flex') return;
    
    switch(e.key) {
        case 'Escape':
            closeFullSizeModal();
            break;
        case 'ArrowLeft':
            navigatePhoto(-1);
            break;
        case 'ArrowRight':
            navigatePhoto(1);
            break;
        case ' ':
            e.preventDefault(); // Prevent space from scrolling
            break;
    }
});

// Touch gestures for mobile (swipe)
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('fullSizeModal')?.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('fullSizeModal')?.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next photo
            navigatePhoto(1);
        } else {
            // Swipe right - previous photo
            navigatePhoto(-1);
        }
    }
}

// Preload next and previous images for smoother navigation
function preloadAdjacentImages() {
    if (currentPhotoIndex > 0) {
        const prevImg = new Image();
        prevImg.src = currentPhotos[currentPhotoIndex - 1].image;
    }
    
    if (currentPhotoIndex < currentPhotos.length - 1) {
        const nextImg = new Image();
        nextImg.src = currentPhotos[currentPhotoIndex + 1].image;
    }
}

// Utility function to get current photo
function getCurrentPhoto() {
    return currentPhotos[currentPhotoIndex];
}

// Utility function to get total photos count
function getTotalPhotos() {
    return currentPhotos.length;
}

// Go back to main page
function goBack() {
    window.location.href = 'index.html';
}

// Export functions for global access (if needed)
window.openFullSizeModal = openFullSizeModal;
window.closeFullSizeModal = closeFullSizeModal;
window.navigatePhoto = navigatePhoto;
window.goBack = goBack;
window.handleImageError = handleImageError;

console.log('Category gallery initialized');







