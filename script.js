// Data for 24 categories (just numbers)
const categories = Array.from({length: 24}, (_, i) => (i + 1).toString());

// Category selection function
function selectCategory(categoryNumber) {
    window.location.href = `category.html?category=${categoryNumber}`;
}

// Functions for simple add form
function openAddForm() {
    document.getElementById('addForm').style.display = 'flex';
    loadCategoriesToSelect();
}

function closeAddForm() {
    document.getElementById('addForm').style.display = 'none';
    resetSimpleForm();
}

// Load categories to select
function loadCategoriesToSelect() {
    const select = document.getElementById('simpleCategory');
    select.innerHTML = '<option value="">Select category</option>';
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = `Category ${category}`;
        select.appendChild(option);
    });
}

// Reset form
function resetSimpleForm() {
    document.getElementById('simpleTitle').value = '';
    document.getElementById('simpleDesc').value = '';
    document.getElementById('simpleCategory').value = '';
    document.getElementById('simpleFile').value = '';
}

// Add photo
function addPhoto(event) {
    event.preventDefault();
    
    const title = document.getElementById('simpleTitle').value;
    const description = document.getElementById('simpleDesc').value;
    const category = document.getElementById('simpleCategory').value;
    const fileInput = document.getElementById('simpleFile');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a photo');
        return;
    }
    
    // Convert photo to Data URL for real saving
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageData = e.target.result;
        
        // Save photo
        savePhotoToStorage(title, description, category, imageData);
        
        alert(`Photo "${title}" successfully added to category ${category}!`);
        closeAddForm();
    };
    reader.readAsDataURL(file);
}

// Save photo to localStorage
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
    
    console.log('Photo saved:', newPhoto);
}

// Close form when clicking outside
document.getElementById('addForm').addEventListener('click', function(e) {
    if (e.target === this) {
        closeAddForm();
    }
});
