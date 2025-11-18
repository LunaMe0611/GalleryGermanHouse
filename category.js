// Загружаем фото категории
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryNumber = urlParams.get('category');
    
    if (categoryNumber) {
        loadCategory(categoryNumber);
    } else {
        document.getElementById('categoryTitle').textContent = 'Категория не найдена';
    }
});

function loadCategory(categoryNumber) {
    // Устанавливаем заголовок
    document.getElementById('categoryTitle').textContent = `Категория ${categoryNumber}`;
    
    const photosGrid = document.getElementById('photosGrid');
    photosGrid.innerHTML = '<div class="loading">Загрузка фото...</div>';
    
    // Загружаем пользовательские фото
    loadUserPhotos(categoryNumber, photosGrid);
}

function loadUserPhotos(categoryNumber, photosGrid) {
    const userPhotos = JSON.parse(localStorage.getItem('userPhotos') || '[]');
    const categoryUserPhotos = userPhotos.filter(photo => photo.category === categoryNumber);
    
    photosGrid.innerHTML = '';
    
    if (categoryUserPhotos.length === 0) {
        photosGrid.innerHTML = '<div class="no-photos">В этой категории пока нет фото</div>';
        return;
    }
    
    // Отображаем фото
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
            <small class="upload-date">Добавлено: ${new Date(photo.uploadedAt).toLocaleDateString()}</small>
        </div>
    `;
    return photoCard;
}

function goBack() {
    window.history.back();
}