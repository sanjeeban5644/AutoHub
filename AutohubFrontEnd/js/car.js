// Car Service Functions

// Get all cars or search by brand and model
async function getCars(brand = '', model = '') {
    try {
        // Always include parameters, even if empty (backend expects them)
        const params = {
            brand: brand || '',
            model: model || ''
        };
        
        const cars = await get(API_ENDPOINTS.CAR.GET_BY_BRAND_MODEL, params);
        return cars;
    } catch (error) {
        console.error('Error fetching cars:', error);
        showToast('Failed to fetch cars', 'error');
        throw error;
    }
}

// Save a new car
async function saveCar(carData) {
    try {
        const response = await post(API_ENDPOINTS.CAR.SAVE, carData);
        showToast('Car added successfully!', 'success');
        return response;
    } catch (error) {
        console.error('Error saving car:', error);
        showToast('Failed to add car', 'error');
        throw error;
    }
}

// Check stock for a car
async function checkStock(carId) {
    try {
        const stock = await get(API_ENDPOINTS.CAR.CHECK_STOCK, { carId });
        return stock;
    } catch (error) {
        console.error('Error checking stock:', error);
        showToast('Failed to check stock', 'error');
        throw error;
    }
}

// Get car by ID
async function getCarById(carId) {
    try {
        const car = await get(API_ENDPOINTS.CAR.GET_BY_ID, { carId });
        return car;
    } catch (error) {
        console.error('Error fetching car:', error);
        showToast('Failed to fetch car details', 'error');
        throw error;
    }
}

// Update car stock
async function updateCarStock(carId, quantity) {
    try {
        const response = await put(API_ENDPOINTS.CAR.UPDATE, { carId, quantity });
        showToast('Car stock updated successfully!', 'success');
        return response;
    } catch (error) {
        console.error('Error updating car:', error);
        showToast('Failed to update car stock', 'error');
        throw error;
    }
}

// Display cars in the UI
function displayCars(cars) {
    const container = document.getElementById('carsContainer');
    
    if (!cars || cars.length === 0) {
        container.innerHTML = '<p class="error-message">No cars found</p>';
        return;
    }
    
    container.innerHTML = cars.map(car => `
        <div class="car-card">
            <h4>${car.brand || 'Unknown Brand'} ${car.model || 'Unknown Model'}</h4>
            <div class="car-details">
                <div class="car-detail">
                    <span class="car-detail-label">Car ID:</span>
                    <span class="car-detail-value">${car.carId || 'N/A'}</span>
                </div>
                <div class="car-detail">
                    <span class="car-detail-label">Price:</span>
                    <span class="car-detail-value">$${car.price ? car.price.toLocaleString() : 'N/A'}</span>
                </div>
                <div class="car-detail">
                    <span class="car-detail-label">Stock:</span>
                    <span class="car-detail-value">
                        <span class="stock-badge ${getStockClass(car.availableStock)}">
                            ${car.availableStock || 0}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

// Get stock badge class based on availability
function getStockClass(stock) {
    if (stock === 0) return 'stock-out';
    if (stock <= 5) return 'stock-low';
    return 'stock-in';
}

// Display browse cars (for customer view)
function displayBrowseCars(cars) {
    const container = document.getElementById('browseCarsContainer');
    
    if (!cars || cars.length === 0) {
        container.innerHTML = '<p class="error-message">No cars available</p>';
        return;
    }
    
    // Filter only in-stock cars for customers
    const availableCars = cars.filter(car => car.availableStock > 0);
    
    if (availableCars.length === 0) {
        container.innerHTML = '<p class="error-message">No cars currently available</p>';
        return;
    }
    
    container.innerHTML = availableCars.map(car => `
        <div class="car-card">
            <h4>${car.brand || 'Unknown'} ${car.model || 'Unknown'}</h4>
            <div class="car-details">
                <div class="car-detail">
                    <span class="car-detail-label">Car ID:</span>
                    <span class="car-detail-value">${car.carId || 'N/A'}</span>
                </div>
                <div class="car-detail">
                    <span class="car-detail-label">Price:</span>
                    <span class="car-detail-value">${car.price ? car.price.toLocaleString() : 'N/A'}</span>
                </div>
                <div class="car-detail">
                    <span class="car-detail-label">Availability:</span>
                    <span class="car-detail-value">
                        <span class="stock-badge ${getStockClass(car.availableStock)}">
                            ${car.availableStock} Available
                        </span>
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

// Load browse cars
async function loadBrowseCars() {
    const container = document.getElementById('browseCarsContainer');
    container.innerHTML = '<p class="loading">Loading available cars...</p>';
    
    try {
        const cars = await getCars();
        displayBrowseCars(cars);
    } catch (error) {
        container.innerHTML = '<p class="error-message">Error loading cars</p>';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Admin search form
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const brand = document.getElementById('brand').value.trim();
            const model = document.getElementById('model').value.trim();
            
            const container = document.getElementById('carsContainer');
            container.innerHTML = '<p class="loading">Searching...</p>';
            
            try {
                const cars = await getCars(brand, model);
                displayCars(cars);
            } catch (error) {
                container.innerHTML = '<p class="error-message">Error loading cars</p>';
            }
        });
    }
    
    // View all cars button (admin)
    const viewAllBtn = document.getElementById('viewAllCars');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', loadAllCars);
    }
    
    // Browse search form (customer)
    const browseSearchForm = document.getElementById('browseSearchForm');
    if (browseSearchForm) {
        browseSearchForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const brand = document.getElementById('browseBrand').value.trim();
            const model = document.getElementById('browseModel').value.trim();
            
            const container = document.getElementById('browseCarsContainer');
            container.innerHTML = '<p class="loading">Searching...</p>';
            
            try {
                const cars = await getCars(brand, model);
                displayBrowseCars(cars);
            } catch (error) {
                container.innerHTML = '<p class="error-message">Error loading cars</p>';
            }
        });
    }
    
    // View all browse cars button (customer)
    const viewAllBrowseBtn = document.getElementById('viewAllBrowseCars');
    if (viewAllBrowseBtn) {
        viewAllBrowseBtn.addEventListener('click', loadBrowseCars);
    }
    
    // Add car form (admin only)
    const addCarForm = document.getElementById('addCarForm');
    if (addCarForm) {
        addCarForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!isAdmin()) {
                showToast('Access denied: Admin only', 'error');
                return;
            }
            
            const carData = {
                brand: document.getElementById('newBrand').value.trim(),
                model: document.getElementById('newModel').value.trim(),
                price: parseFloat(document.getElementById('newPrice').value),
                availableStock: parseInt(document.getElementById('newStock').value)
            };
            
            try {
                await saveCar(carData);
                addCarForm.reset();
                loadAllCars();
                loadDashboard(); // Update dashboard stats
            } catch (error) {
                console.error('Failed to add car');
            }
        });
    }
});

// Load all cars (admin view)
async function loadAllCars() {
    const container = document.getElementById('carsContainer');
    container.innerHTML = '<p class="loading">Loading cars...</p>';
    
    try {
        const cars = await getCars();
        displayCars(cars);
    } catch (error) {
        container.innerHTML = '<p class="error-message">Error loading cars</p>';
    }
}