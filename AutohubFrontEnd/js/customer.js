// Customer Service Functions

// Get customer by email
async function getCustomerByEmail(email) {
    try {
        const customer = await get(API_ENDPOINTS.CUSTOMER.GET_BY_EMAIL, { email });
        return customer;
    } catch (error) {
        console.error('Error fetching customer:', error);
        showToast('Failed to fetch customer information', 'error');
        throw error;
    }
}

// Get customer by ID
async function getCustomerById(customerId) {
    try {
        const customer = await get(API_ENDPOINTS.CUSTOMER.GET_BY_ID, { customerId });
        return customer;
    } catch (error) {
        console.error('Error fetching customer:', error);
        showToast('Failed to fetch customer details', 'error');
        throw error;
    }
}

// Display customer information
function displayCustomerInfo(customer) {
    const container = document.getElementById('customerInfoContainer');
    
    if (!customer) {
        container.innerHTML = '<p class="error-message">Customer not found</p>';
        return;
    }
    
    // Handle both single customer object and array response
    const customerData = Array.isArray(customer) ? customer[0] : customer;
    
    if (!customerData) {
        container.innerHTML = '<p class="error-message">Customer not found</p>';
        return;
    }
    
    container.innerHTML = `
        <div class="customer-info">
            <h4>Customer Details</h4>
            <div class="info-row">
                <span class="info-label">Customer ID:</span>
                <span class="info-value">${customerData.customerId || 'N/A'}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Name:</span>
                <span class="info-value">${customerData.customerName || 'N/A'}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">${customerData.email || 'N/A'}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Phone:</span>
                <span class="info-value">${customerData.phoneNumber || 'N/A'}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Address:</span>
                <span class="info-value">${customerData.address || 'N/A'}</span>
            </div>
        </div>
    `;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const customerSearchForm = document.getElementById('customerSearchForm');
    
    customerSearchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('customerEmail').value.trim();
        const container = document.getElementById('customerInfoContainer');
        
        if (!email) {
            showToast('Please enter an email address', 'warning');
            return;
        }
        
        container.innerHTML = '<p class="loading">Searching for customer...</p>';
        
        try {
            const customer = await getCustomerByEmail(email);
            displayCustomerInfo(customer);
        } catch (error) {
            container.innerHTML = '<p class="error-message">Error fetching customer information</p>';
        }
    });
});