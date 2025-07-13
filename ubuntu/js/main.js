// Load HTML partials
function includeHTML() {
    const includes = document.querySelectorAll('[data-include]');
    let loadedCount = 0;
    includes.forEach(el => {
        fetch(el.getAttribute('data-include'))
            .then(response => response.text())
            .then(data => {
                el.innerHTML = data;
                loadedCount++;
                if (loadedCount === includes.length) {
                    // All partials loaded, initialize stars and listeners
                    generateStars();
                    attachGlyphListeners();
                    attachCloseButtonListeners();
                    showPentagon();
                }
            })
            .catch(error => console.error('Error loading partial:', error));
    });
}

// Generate stars
function generateStars() {
    const starsContainer = document.querySelector('.stars');
    if (starsContainer) {
        starsContainer.innerHTML = ''; // Clear existing stars to prevent duplicates
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            starsContainer.appendChild(star);
        }
    }
}

// Show pentagon container
function showPentagon() {
    const pentagon = document.querySelector('.pentagon-container');
    if (pentagon) {
        pentagon.style.display = 'flex';
        pentagon.style.opacity = '1';
        pentagon.classList.remove('hidden');
    }
}

// Page navigation
function attachGlyphListeners() {
    const glyphs = document.querySelectorAll('.glyph');
    const pages = document.querySelectorAll('.page-overlay');
    const pentagon = document.querySelector('.pentagon-container');
    glyphs.forEach(glyph => {
        glyph.addEventListener('click', () => {
            const pageId = glyph.dataset.page + '-page';
            pages.forEach(page => page.style.display = 'none');
            document.getElementById(pageId).style.display = 'block';
            if (pentagon) {
                pentagon.style.opacity = '0';
                pentagon.classList.add('hidden');
            }
        });
    });
}

// Close page and return to pentagon
function attachCloseButtonListeners() {
    const closeButtons = document.querySelectorAll('.close-btn');
    const pages = document.querySelectorAll('.page-overlay');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            pages.forEach(page => page.style.display = 'none');
            showPentagon();
        });
    });
}

// Placeholder calculator functions
function calculateRisk() {
    alert('Risk calculation functionality to be implemented');
}

function calculateNutrition() {
    alert('Nutrition optimization functionality to be implemented');
}

// Initialize
document.addEventListener('DOMContentLoaded', includeHTML);