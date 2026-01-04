/**
 * Admin Panel JavaScript
 * Micro Engineering
 */

// API Base URL - Update this to match your domain
const API_BASE = '/api';

// Auth token
let authToken = localStorage.getItem('adminToken') || null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    setupEventListeners();
});

function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Change password form
    document.getElementById('changePasswordForm').addEventListener('submit', handleChangePassword);
    
    // Gallery form
    document.getElementById('galleryForm').addEventListener('submit', handleGallerySubmit);
    
    // Service form
    document.getElementById('serviceForm').addEventListener('submit', handleServiceSubmit);
}

// ==================== Authentication ====================

async function checkAuth() {
    if (!authToken) {
        showLogin();
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/auth.php?action=check`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('adminUsername').textContent = data.data.username;
            showDashboard();
            loadAllData();
        } else {
            localStorage.removeItem('adminToken');
            showLogin();
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        showLogin();
    }
}

async function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    try {
        const response = await fetch(`${API_BASE}/auth.php?action=login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            authToken = data.data.token;
            localStorage.setItem('adminToken', authToken);
            document.getElementById('adminUsername').textContent = data.data.username;
            showDashboard();
            loadAllData();
        } else {
            errorDiv.textContent = data.message || 'Login failed';
            errorDiv.classList.remove('hidden');
        }
    } catch (error) {
        errorDiv.textContent = 'Connection error. Please try again.';
        errorDiv.classList.remove('hidden');
    }
}

function logout() {
    localStorage.removeItem('adminToken');
    authToken = null;
    showLogin();
}

function showLogin() {
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('adminDashboard').classList.add('hidden');
}

function showDashboard() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('adminDashboard').classList.remove('hidden');
}

// ==================== Navigation ====================

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    
    // Show selected section
    document.getElementById(`section-${sectionName}`).classList.remove('hidden');
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('bg-gray-800');
        if (link.dataset.section === sectionName) {
            link.classList.add('bg-gray-800');
        }
    });
    
    // Close sidebar on mobile
    if (window.innerWidth < 1024) {
        document.getElementById('sidebar').classList.add('closed');
    }
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('closed');
}

// ==================== Load Data ====================

async function loadAllData() {
    await Promise.all([
        loadPages(),
        loadGallery(),
        loadServices(),
        loadMessages()
    ]);
    updateStats();
}

async function loadPages() {
    try {
        const response = await fetch(`${API_BASE}/pages.php`);
        const data = await response.json();
        
        if (data.success) {
            renderPages(data.data);
        }
    } catch (error) {
        console.error('Failed to load pages:', error);
    }
}

function renderPages(pages) {
    const container = document.getElementById('pagesList');
    container.innerHTML = pages.map(page => `
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
                <h4 class="font-semibold text-gray-800">${page.page_title}</h4>
                <p class="text-sm text-gray-500">/${page.page_name}</p>
            </div>
            <label class="toggle-switch">
                <input type="checkbox" ${page.is_visible == 1 ? 'checked' : ''} onchange="togglePage('${page.page_name}', this.checked)">
                <span class="toggle-slider"></span>
            </label>
        </div>
    `).join('');
}

async function togglePage(pageName, isVisible) {
    try {
        const response = await fetch(`${API_BASE}/pages.php`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ page_name: pageName, is_visible: isVisible })
        });
        
        const data = await response.json();
        
        if (!data.success) {
            alert('Failed to update page');
            loadPages();
        } else {
            updateStats();
        }
    } catch (error) {
        console.error('Toggle page error:', error);
    }
}

// ==================== Gallery ====================

async function loadGallery() {
    try {
        const response = await fetch(`${API_BASE}/gallery.php`);
        const data = await response.json();
        
        if (data.success) {
            renderGallery(data.data);
        }
    } catch (error) {
        console.error('Failed to load gallery:', error);
    }
}

function renderGallery(images) {
    const container = document.getElementById('galleryGrid');
    
    if (images.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12 text-gray-500">
                <i class="fas fa-images text-4xl mb-4"></i>
                <p>No images yet. Click "Add Image" to get started.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = images.map(img => `
        <div class="bg-white rounded-xl shadow-sm overflow-hidden card-hover transition">
            <div class="relative h-48 bg-gray-200">
                <img src="${img.image_url}" alt="${img.title}" class="w-full h-full object-cover" onerror="this.src='https://via.placeholder.com/400x300?text=Image+Not+Found'">
                <div class="absolute top-2 right-2 flex space-x-2">
                    <span class="px-2 py-1 text-xs rounded ${img.is_visible == 1 ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}">
                        ${img.is_visible == 1 ? 'Visible' : 'Hidden'}
                    </span>
                </div>
            </div>
            <div class="p-4">
                <h4 class="font-semibold text-gray-800">${img.title}</h4>
                <p class="text-sm text-gray-500 mb-2">${img.category}</p>
                <p class="text-sm text-gray-600 truncate">${img.description || ''}</p>
                <div class="flex space-x-2 mt-4">
                    <button onclick="editGalleryImage(${img.id})" class="flex-1 text-blue-600 hover:bg-blue-50 py-2 rounded transition">
                        <i class="fas fa-edit mr-1"></i>Edit
                    </button>
                    <button onclick="toggleGalleryVisibility(${img.id}, ${img.is_visible == 1 ? 'false' : 'true'})" class="flex-1 text-yellow-600 hover:bg-yellow-50 py-2 rounded transition">
                        <i class="fas fa-eye${img.is_visible == 1 ? '-slash' : ''} mr-1"></i>${img.is_visible == 1 ? 'Hide' : 'Show'}
                    </button>
                    <button onclick="deleteGalleryImage(${img.id})" class="flex-1 text-red-600 hover:bg-red-50 py-2 rounded transition">
                        <i class="fas fa-trash mr-1"></i>Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function openGalleryModal(editData = null) {
    document.getElementById('galleryModal').classList.remove('hidden');
    document.getElementById('galleryForm').reset();
    document.getElementById('galleryEditId').value = editData ? editData.id : '';
    
    if (editData) {
        document.getElementById('galleryTitle').value = editData.title;
        document.getElementById('galleryDescription').value = editData.description || '';
        document.getElementById('galleryImageUrl').value = editData.image_url;
        document.getElementById('galleryCategory').value = editData.category;
    }
}

function closeGalleryModal() {
    document.getElementById('galleryModal').classList.add('hidden');
}

async function handleGallerySubmit(e) {
    e.preventDefault();
    
    const editId = document.getElementById('galleryEditId').value;
    const payload = {
        title: document.getElementById('galleryTitle').value,
        description: document.getElementById('galleryDescription').value,
        image_url: document.getElementById('galleryImageUrl').value,
        category: document.getElementById('galleryCategory').value,
        is_visible: true
    };
    
    if (editId) {
        payload.id = parseInt(editId);
    }
    
    try {
        const response = await fetch(`${API_BASE}/gallery.php`, {
            method: editId ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        
        if (data.success) {
            closeGalleryModal();
            loadGallery();
            updateStats();
        } else {
            alert(data.message || 'Failed to save image');
        }
    } catch (error) {
        alert('Error saving image');
    }
}

async function toggleGalleryVisibility(id, isVisible) {
    try {
        await fetch(`${API_BASE}/gallery.php`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ id, is_visible: isVisible === 'true' })
        });
        loadGallery();
    } catch (error) {
        console.error('Toggle visibility error:', error);
    }
}

async function deleteGalleryImage(id) {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
        await fetch(`${API_BASE}/gallery.php?id=${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        loadGallery();
        updateStats();
    } catch (error) {
        console.error('Delete error:', error);
    }
}

// ==================== Services ====================

async function loadServices() {
    try {
        const response = await fetch(`${API_BASE}/services.php`);
        const data = await response.json();
        
        if (data.success) {
            renderServices(data.data);
        }
    } catch (error) {
        console.error('Failed to load services:', error);
    }
}

function renderServices(services) {
    const container = document.getElementById('servicesList');
    
    if (services.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 text-gray-500 bg-white rounded-xl">
                <i class="fas fa-tools text-4xl mb-4"></i>
                <p>No services yet. Click "Add Service" to get started.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = services.map(service => `
        <div class="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between card-hover transition">
            <div class="flex items-center space-x-4">
                <div class="bg-blue-100 p-3 rounded-lg">
                    <i class="${service.icon || 'fas fa-cogs'} text-xl text-blue-600"></i>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-800">${service.title}</h4>
                    <p class="text-sm text-gray-500">${service.description || ''}</p>
                </div>
            </div>
            <div class="flex items-center space-x-4">
                <label class="toggle-switch">
                    <input type="checkbox" ${service.is_visible == 1 ? 'checked' : ''} onchange="toggleServiceVisibility(${service.id}, this.checked)">
                    <span class="toggle-slider"></span>
                </label>
                <button onclick="editService(${service.id})" class="text-blue-600 hover:bg-blue-50 p-2 rounded transition">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteService(${service.id})" class="text-red-600 hover:bg-red-50 p-2 rounded transition">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function openServiceModal(editData = null) {
    document.getElementById('serviceModal').classList.remove('hidden');
    document.getElementById('serviceForm').reset();
    document.getElementById('serviceEditId').value = editData ? editData.id : '';
    
    if (editData) {
        document.getElementById('serviceTitle').value = editData.title;
        document.getElementById('serviceDescription').value = editData.description || '';
        document.getElementById('serviceIcon').value = editData.icon || '';
    }
}

function closeServiceModal() {
    document.getElementById('serviceModal').classList.add('hidden');
}

async function handleServiceSubmit(e) {
    e.preventDefault();
    
    const editId = document.getElementById('serviceEditId').value;
    const payload = {
        title: document.getElementById('serviceTitle').value,
        description: document.getElementById('serviceDescription').value,
        icon: document.getElementById('serviceIcon').value,
        is_visible: true
    };
    
    if (editId) {
        payload.id = parseInt(editId);
    }
    
    try {
        const response = await fetch(`${API_BASE}/services.php`, {
            method: editId ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        
        if (data.success) {
            closeServiceModal();
            loadServices();
            updateStats();
        } else {
            alert(data.message || 'Failed to save service');
        }
    } catch (error) {
        alert('Error saving service');
    }
}

async function toggleServiceVisibility(id, isVisible) {
    try {
        await fetch(`${API_BASE}/services.php`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ id, is_visible: isVisible })
        });
        loadServices();
    } catch (error) {
        console.error('Toggle visibility error:', error);
    }
}

async function deleteService(id) {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    try {
        await fetch(`${API_BASE}/services.php?id=${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        loadServices();
        updateStats();
    } catch (error) {
        console.error('Delete error:', error);
    }
}

// ==================== Messages ====================

async function loadMessages() {
    try {
        const response = await fetch(`${API_BASE}/contact.php`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        const data = await response.json();
        
        if (data.success) {
            renderMessages(data.data.submissions);
            updateMessageBadge(data.data.unread_count);
        }
    } catch (error) {
        console.error('Failed to load messages:', error);
    }
}

function renderMessages(messages) {
    const container = document.getElementById('messagesList');
    
    if (messages.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 text-gray-500 bg-white rounded-xl">
                <i class="fas fa-inbox text-4xl mb-4"></i>
                <p>No messages yet.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = messages.map(msg => `
        <div class="bg-white rounded-xl shadow-sm p-4 ${msg.is_read == 0 ? 'border-l-4 border-blue-500' : ''} card-hover transition">
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-2">
                        <h4 class="font-semibold text-gray-800">${msg.name}</h4>
                        ${msg.is_read == 0 ? '<span class="bg-blue-500 text-white text-xs px-2 py-1 rounded">New</span>' : ''}
                    </div>
                    <p class="text-sm text-gray-500 mb-1">
                        <i class="fas fa-envelope mr-1"></i>${msg.email}
                        ${msg.phone ? `<span class="ml-3"><i class="fas fa-phone mr-1"></i>${msg.phone}</span>` : ''}
                    </p>
                    ${msg.company ? `<p class="text-sm text-gray-500 mb-2"><i class="fas fa-building mr-1"></i>${msg.company}</p>` : ''}
                    <p class="text-gray-700 mt-2">${msg.message}</p>
                    <p class="text-xs text-gray-400 mt-2">${new Date(msg.created_at).toLocaleString()}</p>
                </div>
                <div class="flex space-x-2 ml-4">
                    ${msg.is_read == 0 ? `
                        <button onclick="markAsRead(${msg.id})" class="text-blue-600 hover:bg-blue-50 p-2 rounded transition" title="Mark as read">
                            <i class="fas fa-check"></i>
                        </button>
                    ` : ''}
                    <button onclick="deleteMessage(${msg.id})" class="text-red-600 hover:bg-red-50 p-2 rounded transition" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function updateMessageBadge(count) {
    const badge = document.getElementById('messagesBadge');
    if (count > 0) {
        badge.textContent = count;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
    document.getElementById('statMessages').textContent = count;
}

async function markAsRead(id) {
    try {
        await fetch(`${API_BASE}/contact.php?action=mark-read`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ id })
        });
        loadMessages();
    } catch (error) {
        console.error('Mark as read error:', error);
    }
}

async function deleteMessage(id) {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
        await fetch(`${API_BASE}/contact.php?id=${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        loadMessages();
    } catch (error) {
        console.error('Delete error:', error);
    }
}

// ==================== Stats ====================

async function updateStats() {
    try {
        const [pagesRes, galleryRes, servicesRes] = await Promise.all([
            fetch(`${API_BASE}/pages.php`),
            fetch(`${API_BASE}/gallery.php`),
            fetch(`${API_BASE}/services.php`)
        ]);
        
        const [pagesData, galleryData, servicesData] = await Promise.all([
            pagesRes.json(),
            galleryRes.json(),
            servicesRes.json()
        ]);
        
        if (pagesData.success) {
            const activePages = pagesData.data.filter(p => p.is_visible == 1).length;
            document.getElementById('statActivePages').textContent = activePages;
        }
        
        if (galleryData.success) {
            document.getElementById('statGalleryImages').textContent = galleryData.data.length;
        }
        
        if (servicesData.success) {
            document.getElementById('statServices').textContent = servicesData.data.length;
        }
    } catch (error) {
        console.error('Stats update error:', error);
    }
}

// ==================== Settings ====================

async function handleChangePassword(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match');
        return;
    }
    
    if (newPassword.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/auth.php?action=change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                current_password: currentPassword,
                new_password: newPassword
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Password changed successfully');
            document.getElementById('changePasswordForm').reset();
        } else {
            alert(data.message || 'Failed to change password');
        }
    } catch (error) {
        alert('Error changing password');
    }
}
