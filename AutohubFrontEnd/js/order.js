// Order Service Functions

// Place a new order
async function placeOrder(orderData) {
    try {
        const response = await post(API_ENDPOINTS.ORDER.CREATE, orderData);
        showToast('Order placed successfully!', 'success');
        return response;
    } catch (error) {
        console.error('Error placing order:', error);
        showToast('Failed to place order', 'error');
        throw error;
    }
}

// Display order result
function displayOrderResult(orderStatus) {
    const container = document.getElementById('orderResultContainer');
    
    if (!orderStatus) {
        container.innerHTML = '<p class="error-message">Failed to place order</p>';
        return;
    }
    
    const statusClass = orderStatus.status === 'SUCCESS' ? 'success' : 
                       orderStatus.status === 'FAILED' ? 'error' : 'warning';
    
    container.innerHTML = `
        <div class="order-result card">
            <h4>Order Status</h4>
            <div class="info-message ${statusClass}">
                <p><strong>Status:</strong> ${orderStatus.status || 'N/A'}</p>
                <p><strong>Message:</strong> ${orderStatus.message || 'N/A'}</p>
            </div>
            <div class="info-row">
                <span class="info-label">Order ID:</span>
                <span class="info-value">${orderStatus.orderId || 'N/A'}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Customer ID:</span>
                <span class="info-value">${orderStatus.customerId || 'N/A'}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Car ID:</span>
                <span class="info-value">${orderStatus.carId || 'N/A'}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Quantity:</span>
                <span class="info-value">${orderStatus.quantity || 'N/A'}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Total Amount:</span>
                <span class="info-value">$${orderStatus.totalAmount ? orderStatus.totalAmount.toLocaleString() : 'N/A'}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Order Date:</span>
                <span class="info-value">${orderStatus.orderDate ? new Date(orderStatus.orderDate).toLocaleString() : 'N/A'}</span>
            </div>
        </div>
    `;
}

// Display stock information
function displayStockInfo(stock, carId) {
    const container = document.getElementById('stockInfo');
    
    if (stock === null || stock === undefined) {
        container.innerHTML = '<div class="info-message error">Failed to check stock</div>';
        return;
    }
    
    let stockClass = 'success';
    let message = `Available stock for Car ID ${carId}: ${stock} units`;
    
    if (stock === 0) {
        stockClass = 'error';
        message = `Car ID ${carId} is out of stock`;
    } else if (stock <= 5) {
        stockClass = 'warning';
        message = `Low stock for Car ID ${carId}: Only ${stock} units available`;
    }
    
    container.innerHTML = `<div class="info-message ${stockClass}">${message}</div>`;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('orderForm');
    const checkStockBtn = document.getElementById('checkStockBtn');
    
    // Check stock button
    checkStockBtn.addEventListener('click', async () => {
        const carId = document.getElementById('orderCarId').value.trim();
        const stockInfoContainer = document.getElementById('stockInfo');
        
        if (!carId) {
            showToast('Please enter a Car ID', 'warning');
            return;
        }
        
        stockInfoContainer.innerHTML = '<p class="loading">Checking stock...</p>';
        
        try {
            const stock = await checkStock(parseInt(carId));
            displayStockInfo(stock, carId);
        } catch (error) {
            stockInfoContainer.innerHTML = '<div class="info-message error">Error checking stock</div>';
        }
    });
    
    // Place order form
    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const customerId = document.getElementById('orderCustomerId').value.trim();
        const carId = document.getElementById('orderCarId').value.trim();
        const quantity = document.getElementById('orderQuantity').value.trim();
        
        if (!customerId || !carId || !quantity) {
            showToast('Please fill in all fields', 'warning');
            return;
        }
        
        const orderData = {
            customerId: parseInt(customerId),
            carId: parseInt(carId),
            quantity: parseInt(quantity)
        };
        
        const resultContainer = document.getElementById('orderResultContainer');
        resultContainer.innerHTML = '<p class="loading">Placing order...</p>';
        
        try {
            const orderStatus = await placeOrder(orderData);
            displayOrderResult(orderStatus);
            
            // Clear form on success
            if (orderStatus.status === 'SUCCESS') {
                orderForm.reset();
                document.getElementById('stockInfo').innerHTML = '';
            }
        } catch (error) {
            resultContainer.innerHTML = '<p class="error-message">Error placing order</p>';
        }
    });
});