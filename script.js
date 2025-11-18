// Данные для 24 категорий (просто номера)
const categories = Array.from({length: 24}, (_, i) => (i + 1).toString());

// Функция выбора категории
function selectCategory(categoryNumber) {
    window.location.href = `category.html?category=${categoryNumber}`;
}

// Функции для простой формы добавления
function openAddForm() {
    document.getElementById('addForm').style.display = 'flex';
    loadCategoriesToSelect();
}

function closeAddForm() {
    document.getElementById('addForm').style.display = 'none';
    resetSimpleForm();
}

// Загружаем категории в select
function loadCategoriesToSelect() {
    const select = document.getElementById('simpleCategory');
    select.innerHTML = '<option value="">Выберите категорию</option>';
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = `Категория ${category}`;
        select.appendChild(option);
    });
}

// Сброс формы
function resetSimpleForm() {
    document.getElementById('simpleTitle').value = '';
    document.getElementById('simpleDesc').value = '';
    document.getElementById('simpleCategory').value = '';
    document.getElementById('simpleFile').value = '';
}

// Добавление фото
function addPhoto(event) {
    event.preventDefault();
    
    const title = document.getElementById('simpleTitle').value;
    const description = document.getElementById('simpleDesc').value;
    const category = document.getElementById('simpleCategory').value;
    const fileInput = document.getElementById('simpleFile');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Пожалуйста, выберите фото');
        return;
    }
    
    // Преобразуем фото в Data URL для реального сохранения
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageData = e.target.result;
        
        // Сохраняем фото
        savePhotoToStorage(title, description, category, imageData);
        
        alert(`Фото "${title}" успешно добавлено в категорию ${category}!`);
        closeAddForm();
    };
    reader.readAsDataURL(file);
}

// Сохраняем фото в localStorage
function savePhotoToStorage(title, description, category, imageData) {
    const newPhoto = {
        id: Date.now(),
        title: title,
        description: description,
        category: category,
        imageData: imageData,
        uploadedAt: new Date().toISOString()
    };
    
    let userPhotos = JSON.parse(localStorage.getItem('userPhotos') || '[]');
    userPhotos.push(newPhoto);
    localStorage.setItem('userPhotos', JSON.stringify(userPhotos));
    
    console.log('Фото сохранено:', newPhoto);
}

// Закрытие формы при клике вне её
document.getElementById('addForm').addEventListener('click', function(e) {
    if (e.target === this) {
        closeAddForm();
    }
});