class App {
    constructor() {
        this.currentPage = 'landing';
        this.baseURL = 'http://localhost:8000';
        this.user = null;
        this.sidebarOpen = true;
        this.currentlyWorkingOpen = false;
        this.documentsOpen = false;
        
        // Initialize page components
        this.landingPage = new LandingPage(this);
        this.authPages = new AuthPages(this);
        this.dashboardPage = new DashboardPage(this);
        
        // Make app globally available
        window.app = this;
        
        this.initializeRouter();
        this.render();
    }

    initializeRouter() {
        // Simple client-side routing
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });
        
        // Handle initial load
        this.handleRoute();
    }

    handleRoute() {
        const path = window.location.pathname;
        switch(path) {
            case '/':
                this.currentPage = 'landing';
                break;
            case '/login':
                this.currentPage = 'login';
                break;
            case '/register':
                this.currentPage = 'register';
                break;
            case '/research':
                this.currentPage = 'research';
                break;
            case '/dashboard':
                this.currentPage = 'dashboard';
                break;
            default:
                this.currentPage = 'landing';
        }
        this.render();
    }

    navigate(path) {
        window.history.pushState({}, '', path);
        this.handleRoute();
    }

    render() {
        const appContainer = document.getElementById('app');
        if (!appContainer) return;

        let content = '';
        
        switch(this.currentPage) {
            case 'landing':
                content = this.landingPage.render();
                break;
            case 'login':
                content = this.authPages.renderLoginPage();
                break;
            case 'register':
                content = this.authPages.renderRegisterPage();
                break;
            case 'dashboard':
                content = this.dashboardPage.render();
                break;
            case 'research':
                content = this.renderResearchPage();
                break;
            default:
                content = this.landingPage.render();
        }

        appContainer.innerHTML = content;
        this.attachEventListeners();
    }

    renderResearchPage() {
        // Show the research interface and initialize the ResearchAnalyser
        const researchInterface = document.getElementById('research-interface');
        if (researchInterface) {
            researchInterface.classList.remove('hidden');
            // Initialize the research analyser if not already done
            if (!window.researchAnalyser) {
                window.researchAnalyser = new ResearchAnalyser(this.user, this);
            }
        }
        return `
            <div class="fixed inset-0 z-50">
                <div class="flex items-center justify-center h-full bg-warm-cream p-4">
                    <div class="text-center">
                        <div class="bg-gradient-to-br from-primary-orange to-golden-yellow w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 float-animation">
                            <i class="fas fa-brain text-2xl text-white"></i>
                        </div>
                        <h3 class="text-xl mb-2 font-semibold text-deep-brown">Initializing Research Interface...</h3>
                        <p class="text-sm text-warm-brown">Please wait while we set up your research environment.</p>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Add event listeners for forms based on current page
        if (this.currentPage === 'login') {
            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.addEventListener('submit', (e) => this.handleLogin(e));
            }
        } else if (this.currentPage === 'register') {
            const registerForm = document.getElementById('registerForm');
            if (registerForm) {
                registerForm.addEventListener('submit', (e) => this.handleRegister(e));
            }
        } else if (this.currentPage === 'dashboard') {
            // Dashboard page specific event listeners are handled by DashboardPage.attachEventListeners()
            if (this.dashboardPage && typeof this.dashboardPage.attachEventListeners === 'function') {
                this.dashboardPage.attachEventListeners();
            }
        }
    }

    // Authentication API methods
    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const messageDiv = document.getElementById('loginMessage');
        
        if (!email || !password) {
            this.showMessage(messageDiv, 'Please fill in all fields', 'error');
            return;
        }
        
        try {
            this.showMessage(messageDiv, 'Signing in...', 'info');
            
            const response = await fetch(`${this.baseURL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                credentials: 'include'  // Include cookies for session authentication
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.user = data.user;
                this.showMessage(messageDiv, 'Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    this.navigate('/dashboard');
                }, 1500);
            } else {
                this.showMessage(messageDiv, data.detail || 'Login failed', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showMessage(messageDiv, 'Connection error. Please try again.', 'error');
        }
    }
    
    async handleRegister(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('registerFirstName').value;
        const lastName = document.getElementById('registerLastName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const messageDiv = document.getElementById('registerMessage');
        
        if (!firstName || !lastName || !email || !password) {
            this.showMessage(messageDiv, 'Please fill in all fields', 'error');
            return;
        }
        
        try {
            this.showMessage(messageDiv, 'Creating account...', 'info');
            
            const response = await fetch(`${this.baseURL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password
                }),
                credentials: 'include'  // Include cookies for session authentication
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.showMessage(messageDiv, 'Account created successfully! Please login.', 'success');
                setTimeout(() => {
                    this.navigate('/login');
                }, 2000);
            } else {
                this.showMessage(messageDiv, data.detail || 'Registration failed', 'error');
            }
        } catch (error) {
            console.error('Registration error:', error);
            this.showMessage(messageDiv, 'Connection error. Please try again.', 'error');
        }
    }
    
    showMessage(messageDiv, message, type) {
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        
        // Reset classes
        messageDiv.className = 'mt-4 text-center text-sm';
        
        // Add appropriate styling based on type
        if (type === 'error') {
            messageDiv.classList.add('text-red-600', 'bg-red-50', 'border', 'border-red-200', 'rounded', 'p-2');
        } else if (type === 'success') {
            messageDiv.classList.add('text-green-600', 'bg-green-50', 'border', 'border-green-200', 'rounded', 'p-2');
        } else if (type === 'info') {
            messageDiv.classList.add('text-blue-600', 'bg-blue-50', 'border', 'border-blue-200', 'rounded', 'p-2');
        }
    }

    // Dashboard functionality methods
    toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
        this.render();
    }

    startNewChat() {
        console.log('Starting new chat...');
        // Clear the question input
        const questionInput = document.getElementById('questionInput');
        if (questionInput) {
            questionInput.value = '';
        }
        // You can add more new chat functionality here
    }

    openSettings() {
        console.log('Opening settings...');
        // You can implement settings modal or navigation here
        alert('Settings functionality will be implemented here');
    }

    handleUpload() {
        const fileInput = document.getElementById('dashboardFileInput');
        if (fileInput) {
            fileInput.click();
        }
    }
    
    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        const uploadArea = document.getElementById('uploadArea');
        if (uploadArea) {
            uploadArea.classList.add('border-primary-orange', 'bg-primary-orange/5');
        }
    }
    
    handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        const uploadArea = document.getElementById('uploadArea');
        if (uploadArea && !uploadArea.contains(e.relatedTarget)) {
            uploadArea.classList.remove('border-primary-orange', 'bg-primary-orange/5');
        }
    }
    
    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        const uploadArea = document.getElementById('uploadArea');
        if (uploadArea) {
            uploadArea.classList.remove('border-primary-orange', 'bg-primary-orange/5');
        }
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const event = { target: { files: files } };
            this.handleFileUpload(event);
        }
    }
    
    async handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Check if user is logged in
        if (!this.user || !this.user.email) {
            this.showToast('Please log in to upload documents', 'error');
            return;
        }

        // Check file type
        const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        if (!allowedTypes.includes(fileExtension)) {
            this.showToast('Please upload a PDF, DOC, DOCX, or TXT file', 'error');
            return;
        }

        // Check file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            this.showToast('File size must be less than 10MB', 'error');
            return;
        }

        this.showUploadProgress(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Simulate progress
            let progress = 0;
            const progressBar = document.getElementById('progressBar');
            const progressInterval = setInterval(() => {
                progress += Math.random() * 20;
                if (progress > 90) progress = 90;
                if (progressBar) progressBar.style.width = progress + '%';
            }, 200);

            const response = await fetch(`${this.baseURL}/upload/`, {
                method: 'POST',
                body: formData,
                credentials: 'include'  // Include cookies for session authentication
            });

            clearInterval(progressInterval);
            if (progressBar) progressBar.style.width = '100%';

            const result = await response.json();

            if (response.ok && result.doc_id) {
                this.showToast(`Document "${result.filename}" uploaded successfully!`, 'success');
                await this.loadUserDocuments();
                
                // Auto-expand documents section if it's not open
                if (!this.documentsOpen) {
                    this.toggleDocuments();
                }
            } else {
                const errorMsg = result.error || result.detail || 'Upload failed. Please try again.';
                this.showToast(errorMsg, 'error');
                console.error('Upload failed:', result);
            }
        } catch (error) {
            console.error('Upload error:', error);
            this.showToast('Network error. Please check your connection.', 'error');
        } finally {
            this.showUploadProgress(false);
            // Clear the file input
            const fileInput = document.getElementById('dashboardFileInput');
            if (fileInput) fileInput.value = '';
        }
    }
    
    showUploadProgress(visible = true) {
        const uploadBtn = document.getElementById('uploadBtn');
        const uploadBtnText = document.getElementById('uploadBtnText');
        const uploadProgress = document.getElementById('uploadProgress');
        const progressBar = document.getElementById('progressBar');
        
        if (visible) {
            if (uploadProgress) uploadProgress.classList.remove('hidden');
            if (uploadBtn) uploadBtn.disabled = true;
            if (uploadBtnText) uploadBtnText.textContent = 'Uploading...';
        } else {
            if (uploadProgress) uploadProgress.classList.add('hidden');
            if (uploadBtn) uploadBtn.disabled = false;
            if (uploadBtnText) uploadBtnText.textContent = 'Choose Files';
            if (progressBar) progressBar.style.width = '0%';
        }
    }
    
    async loadUserDocuments() {
        if (!this.user || !this.user.email) {
            return;
        }
        
        try {
            const response = await fetch(`${this.baseURL}/documents/`, {
                credentials: 'include'  // Include cookies for session authentication
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: Failed to fetch documents`);
            }

            const result = await response.json();
            
            // Handle different response formats
            let documents = [];
            if (Array.isArray(result)) {
                documents = result;
            } else if (result && Array.isArray(result.documents)) {
                documents = result.documents;
            } else if (result && result.message && result.message.includes("no documents")) {
                documents = [];
            }
            
            this.renderUserDocuments(documents);
            
        } catch (error) {
            console.error('Error loading documents:', error);
            this.showToast('Failed to load documents', 'error');
        }
    }
    
    renderUserDocuments(documents = []) {
        const container = document.getElementById('documentsList');
        if (!container) return;

        if (documents.length === 0) {
            container.innerHTML = `
                <div class="text-center text-warm-brown py-8">
                    <i class="fas fa-file-alt text-3xl mb-2 opacity-60"></i>
                    <p class="text-sm">No documents uploaded yet</p>
                </div>
            `;
            return;
        }

        container.innerHTML = documents.map(doc => {
            // Determine file icon based on extension
            const fileExtension = doc.filename.split('.').pop().toLowerCase();
            let iconClass = 'fas fa-file-alt';
            let iconColor = 'from-blue-400 to-blue-500';
            
            if (fileExtension === 'pdf') {
                iconClass = 'fas fa-file-pdf';
                iconColor = 'from-red-400 to-red-500';
            } else if (['doc', 'docx'].includes(fileExtension)) {
                iconClass = 'fas fa-file-word';
                iconColor = 'from-blue-400 to-blue-500';
            } else if (['txt', 'md'].includes(fileExtension)) {
                iconClass = 'fas fa-file-alt';
                iconColor = 'from-gray-400 to-gray-500';
            }

            return `
                <div class="bg-white rounded-xl p-4 hover:bg-gradient-to-r hover:from-golden-yellow/10 hover:to-primary-orange/10 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border border-transparent hover:border-primary-orange/20 group">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-gradient-to-br ${iconColor} rounded-lg flex items-center justify-center shadow-md">
                            <i class="${iconClass} text-white"></i>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm font-medium text-deep-brown group-hover:text-primary-orange transition-colors truncate">${doc.filename}</p>
                            <p class="text-xs text-warm-brown">${new Date(doc.upload_date).toLocaleDateString()}</p>
                        </div>
                        <i class="fas fa-chevron-right text-warm-brown group-hover:text-primary-orange transition-colors"></i>
                    </div>
                </div>
            `;
        }).join('');
    }

    toggleCurrentlyWorking() {
        this.currentlyWorkingOpen = !this.currentlyWorkingOpen;
        this.render();
    }

    toggleDocuments() {
        this.documentsOpen = !this.documentsOpen;
        this.render();
    }

    handleQuestionSubmit() {
        const questionInput = document.getElementById('questionInput');
        if (questionInput && questionInput.value.trim()) {
            console.log('Question submitted:', questionInput.value);
            // You can implement question processing here
            alert(`Question: ${questionInput.value}`);
            questionInput.value = '';
        }
    }

    // Research interface methods
    showResearchInterface() {
        // Hide the main app content
        const appContainer = document.getElementById('app');
        if (appContainer) {
            appContainer.style.display = 'none';
        }

        // Show the research interface
        const researchInterface = document.getElementById('research-interface');
        if (researchInterface) {
            researchInterface.classList.remove('hidden');
            researchInterface.style.display = 'block';
            
            // Load and initialize the research script
            if (window.loadResearchScript) {
                window.loadResearchScript();
                
                // Wait for script to load and then initialize
                setTimeout(() => {
                    if (window.ResearchAnalyser && !window.researchAnalyser) {
                        window.researchAnalyser = new ResearchAnalyser(this.user, this);
                    }
                }, 500);
            }
        }
    }

    hideResearchInterface() {
        // Show the main app content
        const appContainer = document.getElementById('app');
        if (appContainer) {
            appContainer.style.display = 'block';
        }

        // Hide the research interface
        const researchInterface = document.getElementById('research-interface');
        if (researchInterface) {
            researchInterface.classList.add('hidden');
            researchInterface.style.display = 'none';
        }
    }

    // Simple toast notification system
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 text-white`;
        
        switch (type) {
            case 'success':
                toast.classList.add('bg-green-500');
                break;
            case 'error':
                toast.classList.add('bg-red-500');
                break;
            case 'warning':
                toast.classList.add('bg-yellow-500');
                break;
            default:
                toast.classList.add('bg-blue-500');
        }
        
        toast.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new App();
});
// class App {
//     constructor() {
//         this.currentPage = 'landing';
//         this.baseURL = 'http://localhost:8000';
//         this.user = null;
//         this.sidebarOpen = true;
//         this.currentlyWorkingOpen = false;
//         this.documentsOpen = false;
        
//         // Initialize page components
//         this.landingPage = new LandingPage(this);
//         this.authPages = new AuthPages(this);
//         this.dashboardPage = new DashboardPage(this);
        
//         // Make app globally available
//         window.app = this;
        
//         this.initializeRouter();
//         this.render();
//     }

//     initializeRouter() {
//         // Simple client-side routing
//         window.addEventListener('popstate', () => {
//             this.handleRoute();
//         });
        
//         // Handle initial load
//         this.handleRoute();
//     }

//     handleRoute() {
//         const path = window.location.pathname;
//         switch(path) {
//             case '/':
//                 this.currentPage = 'landing';
//                 break;
//             case '/login':
//                 this.currentPage = 'login';
//                 break;
//             case '/register':
//                 this.currentPage = 'register';
//                 break;
//             case '/research':
//                 this.currentPage = 'research';
//                 break;
//             case '/dashboard':
//                 this.currentPage = 'dashboard';
//                 break;
//             default:
//                 this.currentPage = 'landing';
//         }
//         this.render();
//     }

//     navigate(path) {
//         window.history.pushState({}, '', path);
//         this.handleRoute();
//     }

//     showPage(pageName) {
//         // Direct page navigation without changing URL
//         switch(pageName) {
//             case 'landing':
//                 this.navigate('/');
//                 break;
//             case 'login':
//                 this.navigate('/login');
//                 break;
//             case 'register':
//                 this.navigate('/register');
//                 break;
//             case 'dashboard':
//                 this.navigate('/dashboard');
//                 break;
//             case 'research':
//                 this.navigate('/research');
//                 break;
//             default:
//                 this.navigate('/');
//         }
//     }

//     render() {
//         const appContainer = document.getElementById('app');
//         if (!appContainer) return;

//         let content = '';
        
//         switch(this.currentPage) {
//             case 'landing':
//                 content = this.landingPage.render();
//                 break;
//             case 'login':
//                 content = this.authPages.renderLoginPage();
//                 break;
//             case 'register':
//                 content = this.authPages.renderRegisterPage();
//                 break;
//             case 'dashboard':
//                 content = this.dashboardPage.render();
//                 break;
//             case 'research':
//                 content = this.renderResearchPage();
//                 break;
//             default:
//                 content = this.landingPage.render();
//         }

//         appContainer.innerHTML = content;
//         this.attachEventListeners();
//     }

//     renderResearchPage() {
//         // Show the research interface and initialize the ResearchAnalyser
//         const researchInterface = document.getElementById('research-interface');
//         if (researchInterface) {
//             researchInterface.classList.remove('hidden');
//             // Initialize the research analyser if not already done
//             if (!window.researchAnalyser) {
//                 window.researchAnalyser = new ResearchAnalyser(this.user, this);
//             }
//         }
//         return `
//             <div class="fixed inset-0 z-50">
//                 <div class="flex items-center justify-center h-full bg-warm-cream p-4">
//                     <div class="text-center">
//                         <div class="bg-gradient-to-br from-primary-orange to-golden-yellow w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 float-animation">
//                             <i class="fas fa-brain text-2xl text-white"></i>
//                         </div>
//                         <h3 class="text-xl mb-2 font-semibold text-deep-brown">Initializing Research Interface...</h3>
//                         <p class="text-sm text-warm-brown">Please wait while we set up your research environment.</p>
//                     </div>
//                 </div>
//             </div>
//         `;
//     }

//     attachEventListeners() {
//         // Add event listeners for forms based on current page
//         if (this.currentPage === 'login') {
//             const loginForm = document.getElementById('loginForm');
//             if (loginForm) {
//                 loginForm.addEventListener('submit', (e) => this.handleLogin(e));
//             }
//         } else if (this.currentPage === 'register') {
//             const registerForm = document.getElementById('registerForm');
//             if (registerForm) {
//                 registerForm.addEventListener('submit', (e) => this.handleRegister(e));
//             }
//         } else if (this.currentPage === 'dashboard') {
//             // Dashboard page specific event listeners are handled by DashboardPage.attachEventListeners()
//             if (this.dashboardPage && typeof this.dashboardPage.attachEventListeners === 'function') {
//                 this.dashboardPage.attachEventListeners();
//             }
//         }
//     }

//     // Authentication API methods
//     async handleLogin(e) {
//         e.preventDefault();
        
//         const email = document.getElementById('loginEmail').value;
//         const password = document.getElementById('loginPassword').value;
//         const messageDiv = document.getElementById('loginMessage');
        
//         if (!email || !password) {
//             this.showMessage(messageDiv, 'Please fill in all fields', 'error');
//             return;
//         }
        
//         try {
//             this.showMessage(messageDiv, 'Signing in...', 'info');
            
//             const response = await fetch(`${this.baseURL}/auth/login`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email: email,
//                     password: password
//                 }),
//                 credentials: 'include'  // Include cookies for session authentication
//             });
            
//             const data = await response.json();
            
//             if (response.ok) {
//                 this.user = data.user;
//                 this.showMessage(messageDiv, 'Login successful! Redirecting...', 'success');
//                 setTimeout(() => {
//                     this.navigate('/dashboard');
//                 }, 1500);
//             } else {
//                 this.showMessage(messageDiv, data.detail || 'Login failed', 'error');
//             }
//         } catch (error) {
//             console.error('Login error:', error);
//             this.showMessage(messageDiv, 'Connection error. Please try again.', 'error');
//         }
//     }
    
//     async handleRegister(e) {
//         e.preventDefault();
        
//         const firstName = document.getElementById('registerFirstName').value;
//         const lastName = document.getElementById('registerLastName').value;
//         const email = document.getElementById('registerEmail').value;
//         const password = document.getElementById('registerPassword').value;
//         const messageDiv = document.getElementById('registerMessage');
        
//         if (!firstName || !lastName || !email || !password) {
//             this.showMessage(messageDiv, 'Please fill in all fields', 'error');
//             return;
//         }
        
//         try {
//             this.showMessage(messageDiv, 'Creating account...', 'info');
            
//             const response = await fetch(`${this.baseURL}/auth/register`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     first_name: firstName,
//                     last_name: lastName,
//                     email: email,
//                     password: password
//                 }),
//                 credentials: 'include'  // Include cookies for session authentication
//             });
            
//             const data = await response.json();
            
//             if (response.ok) {
//                 this.showMessage(messageDiv, 'Account created successfully! Please login.', 'success');
//                 setTimeout(() => {
//                     this.navigate('/login');
//                 }, 2000);
//             } else {
//                 this.showMessage(messageDiv, data.detail || 'Registration failed', 'error');
//             }
//         } catch (error) {
//             console.error('Registration error:', error);
//             this.showMessage(messageDiv, 'Connection error. Please try again.', 'error');
//         }
//     }
    
//     showMessage(messageDiv, message, type) {
//         messageDiv.textContent = message;
//         messageDiv.style.display = 'block';
        
//         // Reset classes
//         messageDiv.className = 'mt-4 text-center text-sm';
        
//         // Add appropriate styling based on type
//         if (type === 'error') {
//             messageDiv.classList.add('text-red-600', 'bg-red-50', 'border', 'border-red-200', 'rounded', 'p-2');
//         } else if (type === 'success') {
//             messageDiv.classList.add('text-green-600', 'bg-green-50', 'border', 'border-green-200', 'rounded', 'p-2');
//         } else if (type === 'info') {
//             messageDiv.classList.add('text-blue-600', 'bg-blue-50', 'border', 'border-blue-200', 'rounded', 'p-2');
//         }
//     }

//     // Dashboard functionality methods
//     toggleSidebar() {
//         this.sidebarOpen = !this.sidebarOpen;
//         this.render();
//     }

//     startNewChat() {
//         console.log('Starting new chat...');
//         // Clear the question input
//         const questionInput = document.getElementById('questionInput');
//         if (questionInput) {
//             questionInput.value = '';
//         }
//         // You can add more new chat functionality here
//     }

//     openSettings() {
//         console.log('Opening settings...');
//         // You can implement settings modal or navigation here
//         alert('Settings functionality will be implemented here');
//     }

//     handleUpload() {
//         const fileInput = document.getElementById('dashboardFileInput');
//         if (fileInput) {
//             fileInput.click();
//         }
//     }
    
//     handleDragOver(e) {
//         e.preventDefault();
//         e.stopPropagation();
//         const uploadArea = document.getElementById('uploadArea');
//         if (uploadArea) {
//             uploadArea.classList.add('border-primary-orange', 'bg-primary-orange/5');
//         }
//     }
    
//     handleDragLeave(e) {
//         e.preventDefault();
//         e.stopPropagation();
//         const uploadArea = document.getElementById('uploadArea');
//         if (uploadArea && !uploadArea.contains(e.relatedTarget)) {
//             uploadArea.classList.remove('border-primary-orange', 'bg-primary-orange/5');
//         }
//     }
    
//     handleDrop(e) {
//         e.preventDefault();
//         e.stopPropagation();
//         const uploadArea = document.getElementById('uploadArea');
//         if (uploadArea) {
//             uploadArea.classList.remove('border-primary-orange', 'bg-primary-orange/5');
//         }
        
//         const files = e.dataTransfer.files;
//         if (files.length > 0) {
//             const event = { target: { files: files } };
//             this.handleFileUpload(event);
//         }
//     }
    
//     async handleFileUpload(event) {
//         const file = event.target.files[0];
//         if (!file) return;

//         // Check if user is logged in
//         if (!this.user || !this.user.email) {
//             this.showToast('Please log in to upload documents', 'error');
//             return;
//         }

//         // Check file type
//         const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
//         const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
//         if (!allowedTypes.includes(fileExtension)) {
//             this.showToast('Please upload a PDF, DOC, DOCX, or TXT file', 'error');
//             return;
//         }

//         // Check file size (max 10MB)
//         const maxSize = 10 * 1024 * 1024; // 10MB
//         if (file.size > maxSize) {
//             this.showToast('File size must be less than 10MB', 'error');
//             return;
//         }

//         this.showUploadProgress(true);

//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             // Simulate progress
//             let progress = 0;
//             const progressBar = document.getElementById('progressBar');
//             const progressInterval = setInterval(() => {
//                 progress += Math.random() * 20;
//                 if (progress > 90) progress = 90;
//                 if (progressBar) progressBar.style.width = progress + '%';
//             }, 200);

//             const response = await fetch(`${this.baseURL}/upload/`, {
//                 method: 'POST',
//                 body: formData,
//                 credentials: 'include'  // Include cookies for session authentication
//             });

//             clearInterval(progressInterval);
//             if (progressBar) progressBar.style.width = '100%';

//             const result = await response.json();

//             if (response.ok && result.doc_id) {
//                 this.showToast(`Document "${result.filename}" uploaded successfully!`, 'success');
//                 await this.loadUserDocuments();
                
//                 // Auto-expand documents section if it's not open
//                 if (!this.documentsOpen) {
//                     this.toggleDocuments();
//                 }
//             } else {
//                 const errorMsg = result.error || result.detail || 'Upload failed. Please try again.';
//                 this.showToast(errorMsg, 'error');
//                 console.error('Upload failed:', result);
//             }
//         } catch (error) {
//             console.error('Upload error:', error);
//             this.showToast('Network error. Please check your connection.', 'error');
//         } finally {
//             this.showUploadProgress(false);
//             // Clear the file input
//             const fileInput = document.getElementById('dashboardFileInput');
//             if (fileInput) fileInput.value = '';
//         }
//     }
    
//     showUploadProgress(visible = true) {
//         const uploadBtn = document.getElementById('uploadBtn');
//         const uploadBtnText = document.getElementById('uploadBtnText');
//         const uploadProgress = document.getElementById('uploadProgress');
//         const progressBar = document.getElementById('progressBar');
        
//         if (visible) {
//             if (uploadProgress) uploadProgress.classList.remove('hidden');
//             if (uploadBtn) uploadBtn.disabled = true;
//             if (uploadBtnText) uploadBtnText.textContent = 'Uploading...';
//         } else {
//             if (uploadProgress) uploadProgress.classList.add('hidden');
//             if (uploadBtn) uploadBtn.disabled = false;
//             if (uploadBtnText) uploadBtnText.textContent = 'Choose Files';
//             if (progressBar) progressBar.style.width = '0%';
//         }
//     }
    
//     async loadUserDocuments() {
//         if (!this.user || !this.user.email) {
//             return;
//         }
        
//         try {
//             const response = await fetch(`${this.baseURL}/documents/`, {
//                 credentials: 'include'  // Include cookies for session authentication
//             });
            
//             if (!response.ok) {
//                 throw new Error(`HTTP ${response.status}: Failed to fetch documents`);
//             }

//             const result = await response.json();
            
//             // Handle different response formats
//             let documents = [];
//             if (Array.isArray(result)) {
//                 documents = result;
//             } else if (result && Array.isArray(result.documents)) {
//                 documents = result.documents;
//             } else if (result && result.message && result.message.includes("no documents")) {
//                 documents = [];
//             }
            
//             this.renderUserDocuments(documents);
            
//         } catch (error) {
//             console.error('Error loading documents:', error);
//             this.showToast('Failed to load documents', 'error');
//         }
//     }
    
//     renderUserDocuments(documents = []) {
//         const container = document.getElementById('documentsList');
//         if (!container) return;

//         if (documents.length === 0) {
//             container.innerHTML = `
//                 <div class="text-center text-warm-brown py-8">
//                     <i class="fas fa-file-alt text-3xl mb-2 opacity-60"></i>
//                     <p class="text-sm">No documents uploaded yet</p>
//                 </div>
//             `;
//             return;
//         }

//         container.innerHTML = documents.map(doc => {
//             // Determine file icon based on extension
//             const fileExtension = doc.filename.split('.').pop().toLowerCase();
//             let iconClass = 'fas fa-file-alt';
//             let iconColor = 'from-blue-400 to-blue-500';
            
//             if (fileExtension === 'pdf') {
//                 iconClass = 'fas fa-file-pdf';
//                 iconColor = 'from-red-400 to-red-500';
//             } else if (['doc', 'docx'].includes(fileExtension)) {
//                 iconClass = 'fas fa-file-word';
//                 iconColor = 'from-blue-400 to-blue-500';
//             } else if (['txt', 'md'].includes(fileExtension)) {
//                 iconClass = 'fas fa-file-alt';
//                 iconColor = 'from-gray-400 to-gray-500';
//             }

//             return `
//                 <div class="bg-white rounded-xl p-4 hover:bg-gradient-to-r hover:from-golden-yellow/10 hover:to-primary-orange/10 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border border-transparent hover:border-primary-orange/20 group">
//                     <div class="flex items-center space-x-3">
//                         <div class="w-10 h-10 bg-gradient-to-br ${iconColor} rounded-lg flex items-center justify-center shadow-md">
//                             <i class="${iconClass} text-white"></i>
//                         </div>
//                         <div class="flex-1">
//                             <p class="text-sm font-medium text-deep-brown group-hover:text-primary-orange transition-colors truncate">${doc.filename}</p>
//                             <p class="text-xs text-warm-brown">${new Date(doc.upload_date).toLocaleDateString()}</p>
//                         </div>
//                         <i class="fas fa-chevron-right text-warm-brown group-hover:text-primary-orange transition-colors"></i>
//                     </div>
//                 </div>
//             `;
//         }).join('');
//     }

//     toggleCurrentlyWorking() {
//         this.currentlyWorkingOpen = !this.currentlyWorkingOpen;
//         this.render();
//     }

//     toggleDocuments() {
//         this.documentsOpen = !this.documentsOpen;
//         this.render();
//     }

//     handleQuestionSubmit() {
//         const questionInput = document.getElementById('questionInput');
//         if (questionInput && questionInput.value.trim()) {
//             console.log('Question submitted:', questionInput.value);
//             // You can implement question processing here
//             alert(`Question: ${questionInput.value}`);
//             questionInput.value = '';
//         }
//     }

//     // Research interface methods
//     showResearchInterface() {
//         // Hide the main app content
//         const appContainer = document.getElementById('app');
//         if (appContainer) {
//             appContainer.style.display = 'none';
//         }

//         // Show the research interface
//         const researchInterface = document.getElementById('research-interface');
//         if (researchInterface) {
//             researchInterface.classList.remove('hidden');
//             researchInterface.style.display = 'block';
            
//             // Load and initialize the research script
//             if (window.loadResearchScript) {
//                 window.loadResearchScript();
                
//                 // Wait for script to load and then initialize
//                 setTimeout(() => {
//                     if (window.ResearchAnalyser && !window.researchAnalyser) {
//                         window.researchAnalyser = new ResearchAnalyser(this.user, this);
//                     }
//                 }, 500);
//             }
//         }
//     }

//     hideResearchInterface() {
//         // Show the main app content
//         const appContainer = document.getElementById('app');
//         if (appContainer) {
//             appContainer.style.display = 'block';
//         }

//         // Hide the research interface
//         const researchInterface = document.getElementById('research-interface');
//         if (researchInterface) {
//             researchInterface.classList.add('hidden');
//             researchInterface.style.display = 'none';
//         }
//     }

//     // Simple toast notification system
//     showToast(message, type = 'info') {
//         const toast = document.createElement('div');
//         toast.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 text-white`;
        
//         switch (type) {
//             case 'success':
//                 toast.classList.add('bg-green-500');
//                 break;
//             case 'error':
//                 toast.classList.add('bg-red-500');
//                 break;
//             case 'warning':
//                 toast.classList.add('bg-yellow-500');
//                 break;
//             default:
//                 toast.classList.add('bg-blue-500');
//         }
        
//         toast.innerHTML = `
//             <div class="flex items-center space-x-2">
//                 <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
//                 <span>${message}</span>
//             </div>
//         `;
        
//         document.body.appendChild(toast);
        
//         // Show toast
//         setTimeout(() => {
//             toast.style.transform = 'translateX(0)';
//         }, 100);
        
//         // Hide toast after 3 seconds
//         setTimeout(() => {
//             toast.style.transform = 'translateX(100%)';
//             setTimeout(() => {
//                 if (toast.parentNode) {
//                     toast.parentNode.removeChild(toast);
//                 }
//             }, 300);
//         }, 3000);
//     }
// }

// // Initialize app when DOM is loaded
// let app;
// document.addEventListener('DOMContentLoaded', () => {
//     app = new App();
// });