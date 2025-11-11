// Authentication Management

// Hardcoded credentials
const USERS = {
    admin: {
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        displayName: 'Admin User'
    },
    customer: {
        username: 'customer',
        password: 'customer123',
        role: 'customer',
        displayName: 'Customer User'
    }
};

// Current user session
let currentUser = null;

// Initialize authentication
function initAuth() {
    // Check if user is already logged in (session storage)
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        showMainApp();
    }
}

// Login function
function login(username, password) {
    // Find user with matching credentials
    const user = Object.values(USERS).find(
        u => u.username === username && u.password === password
    );
    
    if (user) {
        currentUser = user;
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        showToast(`Welcome ${user.displayName}!`, 'success');
        showMainApp();
        return true;
    } else {
        showToast('Invalid username or password', 'error');
        return false;
    }
}

// Logout function
function logout() {
    currentUser = null;
    sessionStorage.removeItem('currentUser');
    showToast('Logged out successfully', 'success');
    showLoginPage();
}

// Show main app after login
function showMainApp() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('mainApp').style.display = 'flex';
    
    // Update user info display
    document.getElementById('userInfo').textContent = 
        `${currentUser.displayName} (${currentUser.role.toUpperCase()})`;
    
    // Apply role-based UI
    if (currentUser.role === 'customer') {
        document.body.classList.add('customer-mode');
        // Show browse/order sections for customers
        showSection('browse');
        loadBrowseCars();
    } else {
        document.body.classList.remove('customer-mode');
        // Show dashboard for admin
        showSection('dashboard');
        loadDashboard();
    }
}

// Show login page
function showLoginPage() {
    document.getElementById('loginSection').style.display = 'flex';
    document.getElementById('mainApp').style.display = 'none';
    document.body.classList.remove('customer-mode');
}

// Check if user has admin role
function isAdmin() {
    return currentUser && currentUser.role === 'admin';
}

// Check if user is logged in
function isLoggedIn() {
    return currentUser !== null;
}

// Get current user
function getCurrentUser() {
    return currentUser;
}

// Show section based on role
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all menu links
    document.querySelectorAll('.menu-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected section
    const section = document.getElementById(sectionId);
    if (section) {
        // Check if customer is trying to access admin section
        if (!isAdmin() && section.classList.contains('admin-only')) {
            showToast('Access denied: Admin only', 'error');
            showSection('browse');
            return;
        }
        
        section.classList.add('active');
        
        // Update active menu link
        const menuLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (menuLink) {
            menuLink.classList.add('active');
        }
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize auth
    initAuth();
    
    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            login(username, password);
        });
    }
    
    // Logout button handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    // Menu navigation
    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            showSection(sectionId);
            
            // Load data based on section
            if (sectionId === 'cars' && isAdmin()) {
                loadAllCars();
            } else if (sectionId === 'browse') {
                loadBrowseCars();
            } else if (sectionId === 'dashboard' && isAdmin()) {
                loadDashboard();
            }
        });
    });
});

// Load dashboard statistics (admin only)
async function loadDashboard() {
    if (!isAdmin()) return;
    
    try {
        const cars = await getCars();
        
        const totalCars = cars.length;
        const inStock = cars.filter(car => car.availableStock > 5).length;
        const lowStock = cars.filter(car => car.availableStock > 0 && car.availableStock <= 5).length;
        const outOfStock = cars.filter(car => car.availableStock === 0).length;
        
        document.getElementById('totalCars').textContent = totalCars;
        document.getElementById('inStockCars').textContent = inStock;
        document.getElementById('lowStockCars').textContent = lowStock;
        document.getElementById('outOfStockCars').textContent = outOfStock;
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}