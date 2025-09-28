// Configuration
const config = 
{
    backendURL: 'http://localhost:8080/api/materials',
    retryDelay: 3000,
    maxRetries: 3
};

//DOM's Elements
const elements = 
{
    loading: document.getElementById('loading'),
    productsContainer: document.getElementById('products-container'),
    productsList: document.getElementById('products-list'),
    errorContainer: document.getElementById('error-container'),
    errorMessage: document.getElementById('error-message')
};

//Function load
async function loadProducts(retryCount = 0) {
    try {
        showLoading();

        console.log(`Fetching data from: ${config.backendURL}`);
        const response = await fetch(config.backendURL);

        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error loading data: ', error);

        if (retryCount < config.maxRetries)
        {
            console.log(`Retrying...(${retryCount + 1}/${config.maxRetries})`);
            setTimeout(() => loadProducts(retryCount + 1), config.retryDelay);
        }
        else 
            showError('Failed to load Genres');
    }
}

function displayProducts(products)
{
    hideAllSections();

    if (products && products.length > 0)
    {
        elements.productsList.innerHTML = products.map(product => 
            `<li class="product-item">* ${product}</li>`
        ).join('');

        elements.productsContainer.style.display = 'block';
    }
    else
        showError('No Genres found');
}

function showError(message) {
    hideAllSections();
    elements.errorMessage.textContent = message;
    elements.errorContainer.style.display = 'block';
}


function showLoading()
{
    hideAllSections();
    elements.loading.style.display = 'block';
}

function hideAllSections()
{
    elements.loading.style.display = 'none';
    elements.productsContainer.style.display = 'none';
    elements.errorContainer.style.display = 'none';
}

function refreshProducts() {
    loadProducts();
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Frontend initialized');
    loadProducts();
    
    const refreshBtn = document.createElement('button');
    refreshBtn.textContent = '🔄 Refresh';
    refreshBtn.className = 'refresh-btn';
    refreshBtn.onclick = refreshProducts;
    
    document.querySelector('header').appendChild(refreshBtn);
});

window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});
