// Initialization script to handle page loading and prevent conflicts
(function() {
    'use strict';
    
    // Prevent any auto-initialization from other scripts
    window.preventAutoInit = true;
    
    // Hide research interface by default
    document.addEventListener('DOMContentLoaded', function() {
        const researchInterface = document.getElementById('research-interface');
        if (researchInterface) {
            researchInterface.style.display = 'none';
            researchInterface.classList.add('hidden');
        }
        
        // Ensure app container is visible
        const appContainer = document.getElementById('app');
        if (appContainer) {
            appContainer.style.display = 'block';
        }
        
        // Initialize the main app
        if (window.App) {
            window.app = new App();
        } else {
            // Wait for App class to load
            setTimeout(function() {
                if (window.App) {
                    window.app = new App();
                }
            }, 100);
        }
    });
    
    // Debug logging
    console.log('Frontend initialized - Landing page should be visible');
    console.log('App class available:', !!window.App);
    console.log('Current page:', window.location.pathname);
})();