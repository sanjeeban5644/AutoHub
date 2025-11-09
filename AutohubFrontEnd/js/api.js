// API Configuration
const API_BASE_URL = 'http://localhost:8080'; // Change this to your API Gateway URL

// API Endpoints
const API_ENDPOINTS = {
    // Car Service
    CAR: {
        SAVE: '/car/saveCar',
        GET_BY_BRAND_MODEL: '/car/getCarsWithBrandAndModel',
        CHECK_STOCK: '/car/checkStock',
        GET_BY_ID: '/car/getCarById',
        UPDATE: '/car/updateCar'
    },
    // Customer Service
    CUSTOMER: {
        GET_BY_EMAIL: '/customer/getCustomersByEmail',
        GET_BY_ID: '/customer/getCustomerById'
    },
    // Order Service
    ORDER: {
        CREATE: '/customer_order/orderCar'
    }
};

// Utility function to show toast notifications
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Generic API call function
async function apiCall(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    const config = { ...defaultOptions, ...options };
    
    try {
        const response = await fetch(url, config);
        
        // Check if response is ok
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error: ${response.status} - ${errorText}`);
        }
        
        // Try to parse JSON response
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            return await response.text();
        }
    } catch (error) {
        console.error('API Call Error:', error);
        throw error;
    }
}

// GET request
async function get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return apiCall(url, {
        method: 'GET'
    });
}

// POST request
async function post(endpoint, data) {
    return apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}

// PUT request
async function put(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return apiCall(url, {
        method: 'PUT'
    });
}

// DELETE request
async function del(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return apiCall(url, {
        method: 'DELETE'
    });
}