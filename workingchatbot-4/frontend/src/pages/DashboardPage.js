class DashboardPage {
    constructor(app) {
        this.app = app;
    }

    render() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-warm-cream to-soft-cream relative">
                <!-- Mobile/Collapsed Sidebar Toggle Button -->
                ${!this.app.sidebarOpen ? `
                    <button id="openSidebarBtn" class="fixed top-4 left-4 z-50 p-3 bg-gradient-to-br from-primary-orange to-hover-orange text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group">
                        <i class="fas fa-bars text-lg"></i>
                        <div class="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Open Menu
                        </div>
                    </button>
                ` : ''}
                
                <div class="flex h-screen">
                    <!-- Sidebar -->
                    <div id="sidebar" class="${this.app.sidebarOpen ? 'w-72' : 'w-0'} bg-gradient-to-b from-white to-soft-cream border-r border-border-brown flex flex-col transition-all duration-500 ease-in-out overflow-hidden shadow-2xl relative">
                        <!-- Animated Background Decoration -->
                        <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-orange/10 to-golden-yellow/10 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
                        <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-hover-orange/10 to-primary-orange/10 rounded-full translate-y-12 -translate-x-12 animate-pulse" style="animation-delay: 1s;"></div>
                        
                        <!-- Top Navigation Icons -->
                        <div class="flex items-center justify-between p-6 border-b border-border-brown/50 bg-gradient-to-r from-primary-orange/5 to-golden-yellow/5 backdrop-blur-sm relative z-10">
                            <div class="flex items-center space-x-3">
                                <!-- Close Sidebar Button -->
                                <button id="closeSidebarBtn" class="p-3 hover:bg-primary-orange/10 rounded-xl transition-all duration-200 group relative transform hover:scale-110" title="Close Sidebar">
                                    <i class="fas fa-times text-warm-brown group-hover:text-primary-orange transition-colors"></i>
                                    <div class="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        Close Menu
                                    </div>
                                </button>
                            
                                <!-- New Chat Button -->
                                <button id="newChatBtn" class="p-3 hover:bg-gradient-to-br hover:from-golden-yellow/20 hover:to-primary-orange/20 rounded-xl transition-all duration-200 group relative transform hover:scale-110" title="New Chat">
                                    <i class="fas fa-plus text-warm-brown group-hover:text-primary-orange transition-colors"></i>
                                    <div class="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        New Chat
                                    </div>
                                </button>
                            </div>
                            
                            <!-- Settings Button with Dropdown -->
                            <div class="relative">
                                <button id="settingsBtn" class="p-3 hover:bg-gradient-to-br hover:from-golden-yellow/20 hover:to-primary-orange/20 rounded-xl transition-all duration-200 group relative transform hover:scale-110" title="Settings">
                                    <i class="fas fa-cog text-warm-brown group-hover:text-primary-orange transition-colors transform group-hover:rotate-90 duration-300"></i>
                                    <div class="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        Settings
                                    </div>
                                </button>
                                <!-- Settings Dropdown -->
                                <div id="settingsDropdown" class="hidden absolute right-0 top-full mt-2 w-48 bg-white border border-border-brown rounded-xl shadow-xl z-50 overflow-hidden">
                                    <div class="py-2">
                                        <button id="profileBtn" class="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-golden-yellow/10 hover:to-primary-orange/10 transition-all duration-200 flex items-center gap-3 group">
                                            <i class="fas fa-user text-primary-orange group-hover:scale-110 transition-transform"></i>
                                            <span class="text-deep-brown font-medium">Profile</span>
                                        </button>
                                        <button id="logoutBtn" class="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-200 flex items-center gap-3 group">
                                            <i class="fas fa-sign-out-alt text-red-500 group-hover:scale-110 transition-transform"></i>
                                            <span class="text-deep-brown font-medium">Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    <!-- Compact Upload Section -->
                    <div class="p-4 border-b border-border-brown/50 relative z-10">
                        <div class="bg-gradient-to-br from-white to-soft-cream border-2 border-dashed border-primary-orange/30 rounded-xl p-4 hover:border-primary-orange/60 transition-all duration-300 hover:shadow-lg group cursor-pointer" id="uploadArea">
                            <div class="text-center">
                                <div class="w-12 h-12 bg-gradient-to-br from-primary-orange to-golden-yellow rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                    <i class="fas fa-file-pdf text-lg text-white"></i>
                                </div>
                                <h3 class="font-medium text-deep-brown mb-1 group-hover:text-primary-orange transition-colors text-sm">Upload Document</h3>
                                <p class="text-xs text-warm-brown mb-3">Drag & drop or click to browse</p>
                                <input type="file" id="dashboardFileInput" accept=".pdf,.doc,.docx,.txt" class="hidden">
                                <button id="uploadBtn" class="px-4 py-2 bg-gradient-to-r from-primary-orange to-hover-orange text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm">
                                    <i class="fas fa-cloud-upload-alt mr-2"></i>
                                    <span id="uploadBtnText">Choose Files</span>
                                </button>
                                <div id="uploadProgress" class="hidden mt-3">
                                    <div class="w-full bg-border-brown bg-opacity-40 rounded-full h-2">
                                        <div id="progressBar" class="bg-primary-orange h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Currently Working On Section -->
                    <div class="border-b border-border-brown/50 relative z-10">
                        <button id="currentlyWorkingToggle" class="w-full flex items-center justify-between p-5 hover:bg-gradient-to-r hover:from-primary-orange/5 hover:to-golden-yellow/5 transition-all duration-300 group rounded-lg mx-2">
                            <div class="flex items-center space-x-3">
                                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span class="font-semibold text-deep-brown group-hover:text-primary-orange transition-colors">Currently working on</span>
                            </div>
                            <i class="fas fa-chevron-${this.app.currentlyWorkingOpen ? 'up' : 'down'} text-warm-brown group-hover:text-primary-orange transition-all duration-300 transform ${this.app.currentlyWorkingOpen ? 'rotate-180' : ''}"></i>
                        </button>
                        <div id="currentlyWorkingContent" class="transition-all duration-500 ease-in-out overflow-hidden ${this.app.currentlyWorkingOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}">
                            <div class="px-6 pb-5">
                                <div class="bg-gradient-to-r from-golden-yellow/10 to-primary-orange/10 rounded-xl p-4 border border-golden-yellow/20">
                                    <div class="flex items-center space-x-3">
                                        <i class="fas fa-clock text-golden-yellow"></i>
                                        <p class="text-sm text-warm-brown">No active documents</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Documents Section -->
                    <div class="flex-1 relative z-10 flex flex-col min-h-0">
                        <button id="documentsToggle" class="w-full flex items-center justify-between p-5 hover:bg-gradient-to-r hover:from-primary-orange/5 hover:to-golden-yellow/5 transition-all duration-300 group rounded-lg mx-2 flex-shrink-0">
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-gradient-to-br from-primary-orange/20 to-golden-yellow/20 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-folder text-primary-orange text-sm"></i>
                                </div>
                                <span class="font-semibold text-deep-brown group-hover:text-primary-orange transition-colors">Documents</span>
                            </div>
                            <i class="fas fa-chevron-${this.app.documentsOpen ? 'up' : 'down'} text-warm-brown group-hover:text-primary-orange transition-all duration-300 transform ${this.app.documentsOpen ? 'rotate-180' : ''}"></i>
                        </button>
                        <div id="documentsContent" class="transition-all duration-500 ease-in-out overflow-hidden ${this.app.documentsOpen ? 'flex-1 opacity-100' : 'max-h-0 opacity-0'} flex flex-col min-h-0">
                            <div class="px-6 pb-5 space-y-3 flex-shrink-0">
                                <div class="text-xs text-warm-brown mb-3 font-medium flex items-center space-x-2">
                                    <i class="fas fa-clock text-golden-yellow"></i>
                                    <span>Recent</span>
                                </div>
                            </div>
                            <!-- Scrollable documents list -->
                            <div class="px-4 flex-1 overflow-y-auto space-y-2" style="max-height: calc(100vh - 350px);">
                                <div id="documentsList">
                                    <div class="text-center text-warm-brown py-6">
                                        <i class="fas fa-file-alt text-2xl mb-2 opacity-60"></i>
                                        <p class="text-xs">No documents uploaded yet</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Main Content Area -->
                <div class="flex-1 flex flex-col">
                    <!-- Header -->
                    <div class="bg-gradient-to-r from-white to-soft-cream border-b border-border-brown/50 p-4 relative z-10 flex-shrink-0">
                        <div class="flex items-center justify-between">
                            <div>
                                <h1 class="text-xl font-bold bg-gradient-to-r from-primary-orange to-hover-orange bg-clip-text text-transparent">Research Assistant</h1>
                                <p class="text-warm-brown text-sm mt-1">Ask questions about your uploaded documents</p>
                            </div>
                            <div class="flex items-center space-x-3">
                                <div class="flex items-center space-x-2 text-sm text-green-600">
                                    <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span>AI Ready</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Main Chat/Content Area with Scroll -->
                    <div class="flex-1 flex flex-col overflow-hidden">
                        <!-- Welcome Message - Scrollable -->
                        <div class="flex-1 overflow-y-auto p-6">
                            <div class="text-center max-w-4xl mx-auto">
                                <div class="w-16 h-16 bg-gradient-to-br from-primary-orange to-golden-yellow rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <i class="fas fa-comments text-2xl text-white"></i>
                                </div>
                                <h2 class="text-xl font-semibold text-deep-brown mb-3">Welcome to Research Assistant</h2>
                                <p class="text-warm-brown mb-6 text-sm">Upload your documents and start asking questions to get intelligent insights and answers.</p>
                                
                                <div class="bg-gradient-to-br from-soft-cream to-warm-cream rounded-xl p-6 shadow-sm border border-border-brown/20 mb-6">
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div class="text-center group hover:bg-white/50 rounded-lg p-3 transition-all duration-300">
                                            <div class="w-10 h-10 bg-gradient-to-br from-primary-orange/20 to-golden-yellow/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                                <i class="fas fa-upload text-primary-orange"></i>
                                            </div>
                                            <h3 class="font-semibold text-deep-brown mb-1 text-sm">Upload Documents</h3>
                                            <p class="text-xs text-warm-brown">PDF, DOC, DOCX, TXT</p>
                                        </div>
                                        
                                        <div class="text-center group hover:bg-white/50 rounded-lg p-3 transition-all duration-300">
                                            <div class="w-10 h-10 bg-gradient-to-br from-primary-orange/20 to-golden-yellow/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                                <i class="fas fa-brain text-primary-orange"></i>
                                            </div>
                                            <h3 class="font-semibold text-deep-brown mb-1 text-sm">Ask Questions</h3>
                                            <p class="text-xs text-warm-brown">Get intelligent answers</p>
                                        </div>
                                        
                                        <div class="text-center group hover:bg-white/50 rounded-lg p-3 transition-all duration-300">
                                            <div class="w-10 h-10 bg-gradient-to-br from-primary-orange/20 to-golden-yellow/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                                <i class="fas fa-history text-primary-orange"></i>
                                            </div>
                                            <h3 class="font-semibold text-deep-brown mb-1 text-sm">Chat History</h3>
                                            <p class="text-xs text-warm-brown">Access past conversations</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Additional content sections -->
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    <div class="bg-white rounded-lg p-4 shadow-sm border border-border-brown/20 text-left">
                                        <h3 class="text-sm font-semibold text-deep-brown mb-2">Getting Started</h3>
                                        <p class="text-xs text-warm-brown">Upload your research documents using the sidebar, then click on any document to start a conversation.</p>
                                    </div>
                                    <div class="bg-white rounded-lg p-4 shadow-sm border border-border-brown/20 text-left">
                                        <h3 class="text-sm font-semibold text-deep-brown mb-2">Features</h3>
                                        <p class="text-xs text-warm-brown">• Document chat with AI responses<br>• Chat history management<br>• Document renaming and deletion<br>• Export conversations</p>
                                    </div>
                                    <div class="bg-white rounded-lg p-4 shadow-sm border border-border-brown/20 text-left">
                                        <h3 class="text-sm font-semibold text-deep-brown mb-2">Tips</h3>
                                        <p class="text-xs text-warm-brown">Ask specific questions about your documents for better AI responses. You can also request summaries or explanations.</p>
                                    </div>
                                    <div class="bg-white rounded-lg p-4 shadow-sm border border-border-brown/20 text-left">
                                        <h3 class="text-sm font-semibold text-deep-brown mb-2">Support</h3>
                                        <p class="text-xs text-warm-brown">If you encounter any issues, check your document format and try uploading again.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Enhanced Question Input Area - Fixed at bottom -->
                        <div class="flex-shrink-0 p-4 border-t border-border-brown/30 bg-gradient-to-r from-white to-soft-cream relative">
                            <div class="absolute inset-0 bg-gradient-to-r from-primary-orange/5 to-golden-yellow/5 opacity-50"></div>
                            <div class="max-w-4xl mx-auto relative z-10">
                                <div class="relative group">
                                    <div class="relative bg-white rounded-xl shadow-lg border border-border-brown/20 overflow-hidden">
                                        <textarea 
                                            id="questionInput" 
                                            placeholder="Ask me anything about your research..." 
                                            class="w-full p-4 pr-12 border-none rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-orange/50 transition-all duration-200 min-h-[3rem] max-h-24 text-sm placeholder-warm-brown/60"
                                            rows="1"
                                        ></textarea>
                                        <button class="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-br from-primary-orange to-hover-orange text-white rounded-lg hover:shadow-md transition-all duration-200 transform hover:scale-105">
                                            <i class="fas fa-paper-plane text-sm"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="flex items-center justify-between mt-3 text-xs text-warm-brown">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex items-center space-x-1">
                                            <i class="fas fa-keyboard text-primary-orange"></i>
                                            <span>Enter to send</span>
                                        </div>
                                        <div class="flex items-center space-x-1">
                                            <i class="fas fa-plus-circle text-golden-yellow"></i>
                                            <span>Shift+Enter for new line</span>
                                        </div>
                                    </div>
                                    <div class="flex items-center space-x-2 text-green-500">
                                        <div class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                        <span>AI Ready</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Hidden elements for ResearchAnalyser -->
            <input type="file" id="fileInput" style="display: none;" accept=".pdf,.doc,.docx,.txt,.md" />
            
            <!-- Toast notifications -->
            <div id="successToast" class="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300">
                <div class="flex items-center space-x-2">
                    <i class="fas fa-check-circle"></i>
                    <span id="successMessage">Success!</span>
                </div>
            </div>
            
            <div id="errorToast" class="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300">
                <div class="flex items-center space-x-2">
                    <i class="fas fa-exclamation-circle"></i>
                    <span id="errorMessage">Error!</span>
                </div>
            </div>
            
            <!-- Upload progress (hidden by default) -->
            <div id="uploadProgress" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50" style="display: none;">
                <div class="text-center">
                    <div class="mb-4">
                        <i class="fas fa-upload text-primary-orange text-2xl"></i>
                        <p class="mt-2 text-gray-700">Uploading document...</p>
                    </div>
                    <div class="w-64 bg-gray-200 rounded-full h-2">
                        <div id="progressBar" class="bg-primary-orange h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
                    </div>
                </div>
            </div>
        `;
    }
    
    attachEventListeners() {
        // Wait for DOM to be ready
        setTimeout(() => {
            const fileInput = document.getElementById("dashboardFileInput");
            const uploadBtn = document.getElementById("uploadBtn");
            const uploadProgress = document.getElementById("uploadProgress");
            const progressBar = document.getElementById("progressBar");
            const successToast = document.getElementById("successToast");
            const errorToast = document.getElementById("errorToast");
            const successMessage = document.getElementById("successMessage");
            const errorMessage = document.getElementById("errorMessage");

            // Upload functionality
            if (uploadBtn) {
                uploadBtn.addEventListener("click", () => {
                    if (fileInput) fileInput.click();
                });
            }

            if (fileInput) {
                fileInput.addEventListener("change", async () => {
                    const file = fileInput.files[0];
                    if (!file) return;

                    if (uploadProgress) uploadProgress.style.display = "block";
                    if (progressBar) progressBar.style.width = "0%";

                    const formData = new FormData();
                    formData.append("file", file);

                    try {
                        const response = await fetch("http://localhost:8000/upload/", {
                            method: "POST",
                            body: formData,
                            credentials: 'include'
                        });

                        if (!response.ok) {
                            const errorData = await response.json().catch(() => ({}));
                            throw new Error(errorData.detail || "Upload failed");
                        }

                        const result = await response.json();

                        if (uploadProgress) uploadProgress.style.display = "none";
                        if (successMessage) successMessage.textContent = result.message || "Upload successful!";
                        if (successToast) successToast.style.transform = "translateX(0)";
                        setTimeout(() => {
                            if (successToast) successToast.style.transform = "translateX(100%)";
                        }, 3000);

                        // Refresh documents list
                        this.loadDocuments();
                    } catch (error) {
                        if (uploadProgress) uploadProgress.style.display = "none";
                        if (errorMessage) errorMessage.textContent = error.message || "Network error. Please check again.";
                        if (errorToast) errorToast.style.transform = "translateX(0)";
                        setTimeout(() => {
                            if (errorToast) errorToast.style.transform = "translateX(100%)";
                        }, 3000);
                    }
                });
            }

            // Handle dropdown toggles
            const currentlyWorkingToggle = document.getElementById('currentlyWorkingToggle');
            const documentsToggle = document.getElementById('documentsToggle');
            
            if (currentlyWorkingToggle) {
                currentlyWorkingToggle.addEventListener('click', () => {
                    this.app.currentlyWorkingOpen = !this.app.currentlyWorkingOpen;
                    this.app.render();
                });
            }
            
            if (documentsToggle) {
                documentsToggle.addEventListener('click', () => {
                    this.app.documentsOpen = !this.app.documentsOpen;
                    this.app.render();
                });
            }

            // Handle sidebar toggles
            const openSidebarBtn = document.getElementById('openSidebarBtn');
            const closeSidebarBtn = document.getElementById('closeSidebarBtn');
            
            if (openSidebarBtn) {
                openSidebarBtn.addEventListener('click', () => {
                    this.app.sidebarOpen = true;
                    this.app.render();
                });
            }
            
            if (closeSidebarBtn) {
                closeSidebarBtn.addEventListener('click', () => {
                    this.app.sidebarOpen = false;
                    this.app.render();
                });
            }

            // Setup global functions for chat functionality
            this.setupGlobalFunctions(errorToast, errorMessage, successToast, successMessage);

            // Settings dropdown functionality
            const settingsBtn = document.getElementById('settingsBtn');
            const settingsDropdown = document.getElementById('settingsDropdown');
            const profileBtn = document.getElementById('profileBtn');
            const logoutBtn = document.getElementById('logoutBtn');
            
            if (settingsBtn && settingsDropdown) {
                settingsBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    settingsDropdown.classList.toggle('hidden');
                });
                
                // Close dropdown when clicking outside
                document.addEventListener('click', (e) => {
                    if (!settingsBtn.contains(e.target) && !settingsDropdown.contains(e.target)) {
                        settingsDropdown.classList.add('hidden');
                    }
                });
            }
            
            // Profile functionality
            if (profileBtn) {
                profileBtn.addEventListener('click', () => {
                    if (settingsDropdown) settingsDropdown.classList.add('hidden');
                    this.showProfileModal();
                });
            }
            
            // Logout functionality
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    if (settingsDropdown) settingsDropdown.classList.add('hidden');
                    this.handleLogout();
                });
            }

            // Initialize - load documents on page load
            this.loadDocuments();
        }, 100);
    }
    
    setupGlobalFunctions(errorToast, errorMessage, successToast, successMessage) {
        // View chat history function
        window.viewChatHistory = async (docId, filename) => {
            try {
                const response = await fetch(`http://localhost:8000/chat-history?doc_id=${docId}&user_email=${encodeURIComponent(window.app?.user?.email || '')}`, {
                    credentials: 'include'
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.detail || "Failed to load chat history");
                }

                const data = await response.json();
                console.log("Chat history data:", data); // Debug log
                this.showChatInterface(docId, filename, data.chat_history || []);
            } catch (error) {
                console.error("Chat history error:", error);
                if (errorMessage) errorMessage.textContent = error.message || "Failed to load chat history";
                if (errorToast) errorToast.style.transform = "translateX(0)";
                setTimeout(() => {
                    if (errorToast) errorToast.style.transform = "translateX(100%)";
                }, 3000);
                // Still show chat interface but with no history
                this.showChatInterface(docId, filename, []);
            }
        };

        // Rename document function
        window.renameDocument = async (docId, filename) => {
            const newName = prompt('Enter new name for the document:', filename);
            if (!newName || newName === filename) return;

            try {
                const response = await fetch(`http://localhost:8000/manage/document/rename`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        doc_id: docId,
                        user_email: window.app?.user?.email || '',
                        new_filename: newName
                    }),
                    credentials: 'include'
                });

                if (response.ok) {
                    if (successMessage) successMessage.textContent = "Document renamed successfully!";
                    if (successToast) successToast.style.transform = "translateX(0)";
                    setTimeout(() => {
                        if (successToast) successToast.style.transform = "translateX(100%)";
                    }, 3000);
                    this.loadDocuments();
                } else {
                    throw new Error("Failed to rename document");
                }
            } catch (error) {
                if (errorMessage) errorMessage.textContent = "Failed to rename document";
                if (errorToast) errorToast.style.transform = "translateX(0)";
                setTimeout(() => {
                    if (errorToast) errorToast.style.transform = "translateX(100%)";
                }, 3000);
            }
        };

        // Show delete options with matching UI style
        window.showDeleteOptions = (docId, filename) => {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-deep-brown bg-opacity-60 flex items-center justify-center z-50 p-4';
            modal.innerHTML = `
                <div class="bg-white rounded-xl border border-border-brown max-w-md w-full shadow-lg">
                    <div class="p-6 border-b border-border-brown">
                        <div class="flex items-center justify-between">
                            <h3 class="text-xl font-semibold text-deep-brown">Delete Options</h3>
                            <button onclick="this.closest('.fixed').remove()" class="p-2 hover:bg-golden-yellow hover:bg-opacity-20 rounded-lg transition-colors text-deep-brown">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <p class="text-warm-brown mt-2">Choose what you want to delete for "${filename}":</p>
                    </div>
                    <div class="p-6 space-y-4">
                        <button onclick="window.deleteChat('${docId}', '${filename}')" class="w-full p-4 bg-gradient-to-br from-golden-yellow/10 to-primary-orange/10 hover:from-golden-yellow/20 hover:to-primary-orange/20 border border-golden-yellow/30 rounded-xl text-left transition-all duration-200 group">
                            <div class="flex items-center space-x-4">
                                <div class="w-10 h-10 bg-gradient-to-br from-golden-yellow to-primary-orange rounded-lg flex items-center justify-center">
                                    <i class="fas fa-comments text-white"></i>
                                </div>
                                <div>
                                    <div class="font-semibold text-deep-brown group-hover:text-primary-orange transition-colors">Delete Chat History Only</div>
                                    <div class="text-sm text-warm-brown">Keep document, remove conversations</div>
                                </div>
                            </div>
                        </button>
                        <button onclick="window.deleteDocument('${docId}', '${filename}')" class="w-full p-4 bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 border border-red-200 rounded-xl text-left transition-all duration-200 group">
                            <div class="flex items-center space-x-4">
                                <div class="w-10 h-10 bg-gradient-to-br from-red-400 to-red-500 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-trash text-white"></i>
                                </div>
                                <div>
                                    <div class="font-semibold text-deep-brown group-hover:text-red-600 transition-colors">Delete Everything</div>
                                    <div class="text-sm text-warm-brown">Remove document and all chat history</div>
                                </div>
                            </div>
                        </button>
                        <button onclick="this.closest('.fixed').remove()" class="w-full px-4 py-3 bg-gradient-to-r from-warm-brown/10 to-deep-brown/10 text-warm-brown rounded-xl hover:from-warm-brown/20 hover:to-deep-brown/20 transition-all duration-200 border border-warm-brown/20">
                            Cancel
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            // Close on outside click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        };

        // Delete chat only
        window.deleteChat = async (docId, filename) => {
            console.log(`Attempting to delete chat history for docId: ${docId}, filename: ${filename}`);
            document.querySelector('.fixed.inset-0')?.remove();
            
            // Create custom confirmation modal
            const confirmModal = document.createElement('div');
            confirmModal.className = 'fixed inset-0 bg-deep-brown bg-opacity-60 flex items-center justify-center z-50 p-4';
            confirmModal.innerHTML = `
                <div class="bg-white rounded-xl border border-border-brown max-w-sm w-full shadow-lg">
                    <div class="p-6">
                        <div class="text-center mb-4">
                            <div class="w-16 h-16 bg-gradient-to-br from-golden-yellow to-primary-orange rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-exclamation-triangle text-2xl text-white"></i>
                            </div>
                            <h3 class="text-lg font-semibold text-deep-brown mb-2">Confirm Delete</h3>
                            <p class="text-warm-brown text-sm">Are you sure you want to delete the chat history for "${filename}"? The document will remain.</p>
                        </div>
                        <div class="flex space-x-3">
                            <button onclick="this.closest('.fixed').remove()" class="flex-1 px-4 py-3 bg-warm-brown/10 text-warm-brown rounded-lg hover:bg-warm-brown/20 transition-colors">Cancel</button>
                            <button id="confirmDeleteChat" class="flex-1 px-4 py-3 bg-gradient-to-r from-primary-orange to-hover-orange text-white rounded-lg hover:shadow-lg transition-all duration-200">Delete</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(confirmModal);
            
            document.getElementById('confirmDeleteChat').onclick = async () => {
                confirmModal.remove();

                try {
                    console.log('Making DELETE request to:', `http://localhost:8000/manage/chat?doc_id=${docId}&user_email=${encodeURIComponent(window.app?.user?.email || '')}`);
                    
                    const response = await fetch(`http://localhost:8000/manage/chat?doc_id=${docId}&user_email=${encodeURIComponent(window.app?.user?.email || '')}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        credentials: 'include'
                    });

                    console.log('Response status:', response.status);
                    const result = await response.json();
                    console.log('Response data:', result);
                    
                    if (response.ok) {
                        if (successMessage) successMessage.textContent = result.message || "Chat history deleted successfully!";
                        if (successToast) successToast.style.transform = "translateX(0)";
                        setTimeout(() => {
                            if (successToast) successToast.style.transform = "translateX(100%)";
                        }, 3000);
                        console.log("✅ Chat history deleted successfully:", result);
                        
                        // Refresh document list or chat interface if needed
                        if (typeof this.loadDocuments === 'function') {
                            this.loadDocuments();
                        }
                    } else {
                        throw new Error(result.detail || result.error || `Server error: ${response.status}`);
                    }
                } catch (error) {
                    console.error("❌ Delete chat error:", error);
                    if (errorMessage) errorMessage.textContent = error.message || "Failed to delete chat history. Please check your connection.";
                    if (errorToast) errorToast.style.transform = "translateX(0)";
                    setTimeout(() => {
                        if (errorToast) errorToast.style.transform = "translateX(100%)";
                    }, 3000);
                }
            };
        };

        // Delete document entirely
        window.deleteDocument = async (docId, filename) => {
            console.log(`Attempting to delete document docId: ${docId}, filename: ${filename}`);
            document.querySelector('.fixed.inset-0')?.remove();
            
            // Create custom confirmation modal
            const confirmModal = document.createElement('div');
            confirmModal.className = 'fixed inset-0 bg-deep-brown bg-opacity-60 flex items-center justify-center z-50 p-4';
            confirmModal.innerHTML = `
                <div class="bg-white rounded-xl border border-border-brown max-w-sm w-full shadow-lg">
                    <div class="p-6">
                        <div class="text-center mb-4">
                            <div class="w-16 h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-trash text-2xl text-white"></i>
                            </div>
                            <h3 class="text-lg font-semibold text-deep-brown mb-2">Permanent Delete</h3>
                            <p class="text-warm-brown text-sm">Are you sure you want to permanently delete "${filename}" and all its chat history? This action cannot be undone.</p>
                        </div>
                        <div class="flex space-x-3">
                            <button onclick="this.closest('.fixed').remove()" class="flex-1 px-4 py-3 bg-warm-brown/10 text-warm-brown rounded-lg hover:bg-warm-brown/20 transition-colors">Cancel</button>
                            <button id="confirmDeleteDocument" class="flex-1 px-4 py-3 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-lg hover:shadow-lg transition-all duration-200">Delete</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(confirmModal);
            
            document.getElementById('confirmDeleteDocument').onclick = async () => {
                confirmModal.remove();

                try {
                    console.log('Making DELETE request to:', `http://localhost:8000/manage/document?doc_id=${docId}&user_email=${encodeURIComponent(window.app?.user?.email || '')}`);
                    
                    const response = await fetch(`http://localhost:8000/manage/document?doc_id=${docId}&user_email=${encodeURIComponent(window.app?.user?.email || '')}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        credentials: 'include'
                    });

                    console.log('Response status:', response.status);
                    const result = await response.json();
                    console.log('Response data:', result);

                    if (response.ok) {
                        if (successMessage) successMessage.textContent = result.message || "Document deleted successfully!";
                        if (successToast) successToast.style.transform = "translateX(0)";
                        setTimeout(() => {
                            if (successToast) successToast.style.transform = "translateX(100%)";
                        }, 3000);
                        console.log("✅ Document deleted successfully:", result);
                        
                        // Refresh the document list
                        if (typeof this.loadDocuments === 'function') {
                            this.loadDocuments();
                        }
                    } else {
                        throw new Error(result.detail || result.error || `Server error: ${response.status}`);
                    }
                } catch (error) {
                    console.error("❌ Delete document error:", error);
                    if (errorMessage) errorMessage.textContent = error.message || "Failed to delete document. Please check your connection.";
                    if (errorToast) errorToast.style.transform = "translateX(0)";
                    setTimeout(() => {
                        if (errorToast) errorToast.style.transform = "translateX(100%)";
                    }, 3000);
                }
            };
        };

        // Close chat interface
        window.closeChatInterface = () => {
            const chatModal = document.querySelector('.fixed.inset-0.bg-warm-cream');
            if (chatModal) {
                chatModal.remove();
            }
        };

        // Export chat
        window.exportChat = async (docId, filename) => {
            try {
                const response = await fetch(`http://localhost:8000/chat-history?doc_id=${docId}&user_email=${encodeURIComponent(window.app?.user?.email || '')}`, {
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error("Failed to load chat history");
                }

                const data = await response.json();
                const chatHistory = data.chat_history || [];

                let exportText = `Chat History for: ${filename}\n`;
                exportText += `Exported on: ${new Date().toLocaleString()}\n`;
                exportText += `${'='.repeat(50)}\n\n`;

                chatHistory.forEach((message, index) => {
                    exportText += `${message.type === 'user' ? 'User' : 'Assistant'}: ${message.content}\n`;
                    exportText += `Time: ${message.timestamp || 'N/A'}\n`;
                    exportText += `${'-'.repeat(30)}\n\n`;
                });

                const blob = new Blob([exportText], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${filename}_chat_history.txt`;
                a.click();
                URL.revokeObjectURL(url);

            } catch (error) {
                if (errorMessage) errorMessage.textContent = "Failed to export chat history";
                if (errorToast) errorToast.style.transform = "translateX(0)";
                setTimeout(() => {
                    if (errorToast) errorToast.style.transform = "translateX(100%)";
                }, 3000);
            }
        };

        // Clear chat history
        window.clearChatHistory = async (docId) => {
            if (!confirm('Are you sure you want to clear the chat history? This action cannot be undone.')) {
                return;
            }

            try {
                const response = await fetch(`http://localhost:8000/manage/chat?doc_id=${docId}&user_email=${encodeURIComponent(window.app?.user?.email || '')}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });

                if (response.ok) {
                    // Refresh the chat interface
                    const chatMessages = document.getElementById('chatMessages');
                    if (chatMessages) {
                        chatMessages.innerHTML = `
                            <div class="text-center text-warm-brown py-8">
                                <i class="fas fa-comments text-3xl mb-2 opacity-60"></i>
                                <p class="text-sm">No chat history yet. Start a conversation!</p>
                            </div>
                        `;
                    }
                    
                    if (successMessage) successMessage.textContent = "Chat history cleared successfully!";
                    if (successToast) successToast.style.transform = "translateX(0)";
                    setTimeout(() => {
                        if (successToast) successToast.style.transform = "translateX(100%)";
                    }, 3000);
                } else {
                    throw new Error("Failed to clear chat history");
                }
            } catch (error) {
                if (errorMessage) errorMessage.textContent = "Failed to clear chat history";
                if (errorToast) errorToast.style.transform = "translateX(0)";
                setTimeout(() => {
                    if (errorToast) errorToast.style.transform = "translateX(100%)";
                }, 3000);
            }
        };
    }

    async loadDocuments() {
        try {
            const response = await fetch("http://localhost:8000/documents/", {
                method: "GET",
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error("Failed to load documents");
            }

            const documents = await response.json();
            this.displayDocuments(documents);
        } catch (error) {
            console.error("Error loading documents:", error);
            const documentsList = document.getElementById("documentsList");
            if (documentsList) {
                documentsList.innerHTML = `
                    <div class="text-center text-warm-brown py-8">
                        <i class="fas fa-exclamation-triangle text-3xl mb-2 opacity-60"></i>
                        <p class="text-sm">Error loading documents</p>
                    </div>
                `;
            }
        }
    }
    
    displayDocuments(documents) {
        const documentsList = document.getElementById("documentsList");
        if (!documentsList) return;
        
        if (!documents || documents.length === 0) {
            documentsList.innerHTML = `
                <div class="text-center text-warm-brown py-8">
                    <i class="fas fa-file-alt text-3xl mb-2 opacity-60"></i>
                    <p class="text-sm">No documents uploaded yet</p>
                </div>
            `;
            return;
        }

        documentsList.innerHTML = documents.map(doc => `
            <div class="group bg-gradient-to-r from-white to-soft-cream border border-border-brown/30 rounded-lg p-3 hover:shadow-md transition-all duration-300 cursor-pointer document-item" data-doc-id="${doc.doc_id}" data-filename="${doc.filename}">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2 flex-1 min-w-0">
                        <div class="w-8 h-8 bg-gradient-to-br from-primary-orange/20 to-golden-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-file-pdf text-primary-orange text-sm"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="font-medium text-deep-brown truncate text-sm">${doc.filename}</p>
                            <p class="text-xs text-warm-brown">${doc.upload_date}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <button class="p-1.5 hover:bg-primary-orange/10 rounded-md transition-colors" title="Options">
                            <i class="fas fa-ellipsis-v text-warm-brown text-sm"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Add click event listeners for document options
        document.querySelectorAll('.document-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const docId = item.dataset.docId;
                const filename = item.dataset.filename;
                this.showDocumentOptions(docId, filename, e);
            });
        });
    }
    
    showDocumentOptions(docId, filename, event) {
        event.stopPropagation();
        
        // Remove existing menu if any
        const existingMenu = document.querySelector('.document-options-menu');
        if (existingMenu) {
            existingMenu.remove();
        }

        const menu = document.createElement('div');
        menu.className = 'document-options-menu fixed bg-white shadow-xl border border-border-brown/30 rounded-lg z-50 py-2 min-w-48';
        
        // Position menu to appear above or to the side of the click, not below
        const menuHeight = 120; // Approximate height of menu
        const menuWidth = 192; // min-w-48 in pixels
        
        let left = event.pageX;
        let top = event.pageY - menuHeight - 10; // Position above the click
        
        // Adjust if menu would go off-screen
        if (top < 10) {
            top = event.pageY + 10; // Show below if not enough space above
        }
        if (left + menuWidth > window.innerWidth) {
            left = window.innerWidth - menuWidth - 10; // Adjust if too far right
        }
        
        menu.style.left = left + 'px';
        menu.style.top = top + 'px';

        menu.innerHTML = `
            <button class="w-full text-left px-4 py-2 hover:bg-primary-orange/10 transition-colors flex items-center space-x-2" onclick="window.viewChatHistory('${docId}', '${filename}')">
                <i class="fas fa-comments text-primary-orange"></i>
                <span>Chat History</span>
            </button>
            <button class="w-full text-left px-4 py-2 hover:bg-golden-yellow/10 transition-colors flex items-center space-x-2" onclick="window.renameDocument('${docId}', '${filename}')">
                <i class="fas fa-edit text-golden-yellow"></i>
                <span>Rename</span>
            </button>
            <div class="border-t border-border-brown/20 my-1"></div>
            <button class="w-full text-left px-4 py-2 hover:bg-red-50 transition-colors flex items-center space-x-2" onclick="window.showDeleteOptions('${docId}', '${filename}')">
                <i class="fas fa-trash text-red-500"></i>
                <span>Delete</span>
            </button>
        `;

        document.body.appendChild(menu);

        // Close menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeMenu() {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            });
        }, 100);
    }

    showChatInterface(docId, filename, chatHistory) {
        const chatModal = document.createElement('div');
        chatModal.className = 'fixed inset-0 bg-warm-cream z-50 flex flex-col';
        chatModal.innerHTML = `
            <div class="flex h-full">
                <!-- Chat Header -->
                <div class="w-full flex flex-col">
                    <div class="bg-gradient-to-r from-primary-orange to-hover-orange p-4 text-white">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <button onclick="window.closeChatInterface()" class="p-2 hover:bg-white/20 rounded-lg transition-colors">
                                    <i class="fas fa-arrow-left"></i>
                                </button>
                                <div>
                                    <h2 class="text-lg font-semibold">${filename}</h2>
                                    <p class="text-sm opacity-90">Document Chat</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-2">
                                <button onclick="window.clearChatHistory('${docId}')" class="p-2 hover:bg-white/20 rounded-lg transition-colors" title="Clear Chat">
                                    <i class="fas fa-broom"></i>
                                </button>
                                <button onclick="window.exportChat('${docId}', '${filename}')" class="p-2 hover:bg-white/20 rounded-lg transition-colors" title="Export Chat">
                                    <i class="fas fa-download"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Messages Container -->
                    <div id="chatMessages" class="flex-1 overflow-y-auto p-4 space-y-4">
                        ${this.renderChatHistory(chatHistory)}
                    </div>

                    <!-- Input Area -->
                    <div class="p-4 border-t border-border-brown/30 bg-gradient-to-r from-white to-soft-cream">
                        <div class="max-w-4xl mx-auto">
                            <div class="relative">
                                <textarea 
                                    id="chatInput" 
                                    placeholder="Ask me anything about ${filename}..." 
                                    class="w-full p-4 pr-16 border border-border-brown/30 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-orange/50 transition-all duration-200 min-h-[3rem] max-h-32"
                                    rows="1"
                                ></textarea>
                                <button id="sendChatBtn" class="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-br from-primary-orange to-hover-orange text-white rounded-lg hover:shadow-lg transition-all duration-200">
                                    <i class="fas fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(chatModal);

        // Setup chat functionality
        this.setupChatInterface(docId, filename);
    }

    renderChatHistory(chatHistory) {
        if (!chatHistory || chatHistory.length === 0) {
            return `
                <div class="text-center text-warm-brown py-8">
                    <i class="fas fa-comments text-3xl mb-2 opacity-60"></i>
                    <p class="text-sm">No previous chats available. Start a new chat!</p>
                </div>
            `;
        }

        const messages = [];
        
        // Process chat history to show both questions and answers properly
        chatHistory.forEach(entry => {
            // Add user question if it exists
            if (entry.question || entry.query) {
                messages.push({
                    content: entry.question || entry.query,
                    type: 'user',
                    timestamp: entry.created_at || entry.timestamp || new Date().toLocaleTimeString()
                });
            }
            
            // Add assistant answer if it exists
            if (entry.answer || entry.answer_text) {
                messages.push({
                    content: entry.answer || entry.answer_text,
                    type: 'assistant',
                    timestamp: entry.created_at || entry.timestamp || new Date().toLocaleTimeString()
                });
            }
        });
        
        return messages.map(message => {
            const content = message.content || 'Message content unavailable';
            const messageType = message.type;
            const timestamp = message.timestamp;
            
            return `
                <div class="flex ${messageType === 'user' ? 'justify-end' : 'justify-start'}">
                    <div class="max-w-3xl ${messageType === 'user' ? 'bg-gradient-to-r from-primary-orange to-hover-orange text-white' : 'bg-white border border-border-brown/30'} rounded-lg p-4 shadow-sm">
                        <div class="flex items-start space-x-3">
                            <div class="w-8 h-8 rounded-full flex items-center justify-center ${messageType === 'user' ? 'bg-white/20' : 'bg-gradient-to-br from-primary-orange/20 to-golden-yellow/20'}">
                                <i class="fas ${messageType === 'user' ? 'fa-user' : 'fa-robot'} ${messageType === 'user' ? 'text-white' : 'text-primary-orange'}"></i>
                            </div>
                            <div class="flex-1">
                                <p class="${messageType === 'user' ? 'text-white' : 'text-deep-brown'}">${content}</p>
                                <p class="text-xs ${messageType === 'user' ? 'text-white/70' : 'text-warm-brown'} mt-1">${timestamp}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    setupChatInterface(docId, filename) {
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendChatBtn');
        const messagesContainer = document.getElementById('chatMessages');

        if (!chatInput || !sendBtn) return;

        // Auto-resize textarea
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });

        // Send message function
        const sendMessage = async () => {
            const message = chatInput.value.trim();
            if (!message) return;

            // Clear input and add user message to UI
            chatInput.value = '';
            this.addMessageToUI(messagesContainer, message, 'user');

            // Show typing indicator
            const typingIndicator = this.addTypingIndicator(messagesContainer);

            try {
                const response = await fetch('http://localhost:8000/chat/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        user_email: window.app?.user?.email || '',
                        doc_id: docId,
                        question: message
                    })
                });

                if (response.ok) {
                    const result = await response.json();
                    
                    // Add a minimum delay to ensure LLM response is complete (2 seconds minimum)
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    typingIndicator.remove();
                    if (result.error) {
                        this.addMessageToUI(messagesContainer, `Error: ${result.error}`, 'assistant');
                    } else {
                        this.addMessageToUI(messagesContainer, result.answer || 'No response received', 'assistant');
                    }
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    typingIndicator.remove();
                    this.addMessageToUI(messagesContainer, `Error: ${errorData.detail || 'Failed to get response from server'}`, 'assistant');
                    console.error('Chat API error:', response.status, errorData);
                }
            } catch (error) {
                typingIndicator.remove();
                this.addMessageToUI(messagesContainer, `Network error: ${error.message}`, 'assistant');
                console.error('Chat network error:', error);
            }
        };

        // Send on Enter (but allow Shift+Enter for new line)
        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        // Send on button click
        sendBtn.addEventListener('click', sendMessage);
    }

    addMessageToUI(container, message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex ${type === 'user' ? 'justify-end' : 'justify-start'}`;
        messageDiv.innerHTML = `
            <div class="max-w-3xl ${type === 'user' ? 'bg-gradient-to-r from-primary-orange to-hover-orange text-white' : 'bg-white border border-border-brown/30'} rounded-lg p-4 shadow-sm">
                <div class="flex items-start space-x-3">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center ${type === 'user' ? 'bg-white/20' : 'bg-gradient-to-br from-primary-orange/20 to-golden-yellow/20'}">
                        <i class="fas ${type === 'user' ? 'fa-user' : 'fa-robot'} ${type === 'user' ? 'text-white' : 'text-primary-orange'}"></i>
                    </div>
                    <div class="flex-1">
                        <p class="${type === 'user' ? 'text-white' : 'text-deep-brown'}">${message}</p>
                        <p class="text-xs ${type === 'user' ? 'text-white/70' : 'text-warm-brown'} mt-1">${new Date().toLocaleTimeString()}</p>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;
        return messageDiv;
    }

    addTypingIndicator(container) {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'flex justify-start';
        typingDiv.innerHTML = `
            <div class="max-w-3xl bg-white border border-border-brown/30 rounded-lg p-4 shadow-sm">
                <div class="flex items-start space-x-3">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-primary-orange/20 to-golden-yellow/20">
                        <i class="fas fa-robot text-primary-orange"></i>
                    </div>
                    <div class="flex-1">
                        <div class="flex space-x-1">
                            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s;"></div>
                            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(typingDiv);
        container.scrollTop = container.scrollHeight;
        return typingDiv;
    }
    
    showProfileModal() {
        // Create and show profile modal
        const profileModal = document.createElement('div');
        profileModal.id = 'profileModal';
        profileModal.className = 'fixed inset-0 bg-deep-brown bg-opacity-60 flex items-center justify-center z-50 p-4';
        profileModal.innerHTML = `
            <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95" style="animation: modalFadeIn 0.3s ease-out forwards;">
                <div class="p-6 border-b border-border-brown bg-gradient-to-r from-primary-orange to-hover-orange text-white">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                <i class="fas fa-user text-2xl"></i>
                            </div>
                            <div>
                                <h2 class="text-xl font-bold">User Profile</h2>
                                <p class="text-white opacity-80 text-sm">Manage your account details</p>
                            </div>
                        </div>
                        <button id="closeProfileBtn" class="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
                            <i class="fas fa-times text-lg"></i>
                        </button>
                    </div>
                </div>
                <div class="p-6 space-y-6">
                    <!-- User Info Form -->
                    <div>
                        <label class="block text-sm font-medium text-deep-brown mb-2">First Name</label>
                        <input id="firstNameInput" type="text" class="w-full p-3 border border-border-brown rounded-lg focus:border-primary-orange focus:ring-2 focus:ring-primary-orange focus:ring-opacity-20 transition-all" placeholder="Enter your first name">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-deep-brown mb-2">Last Name</label>
                        <input id="lastNameInput" type="text" class="w-full p-3 border border-border-brown rounded-lg focus:border-primary-orange focus:ring-2 focus:ring-primary-orange focus:ring-opacity-20 transition-all" placeholder="Enter your last name">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-deep-brown mb-2">Email</label>
                        <input id="emailInput" type="email" class="w-full p-3 border border-border-brown rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed" readonly>
                    </div>
                    <!-- User Stats -->
                    <div class="bg-gradient-to-r from-golden-yellow/10 to-primary-orange/10 border border-border-brown rounded-xl p-4">
                        <h3 class="font-semibold text-deep-brown mb-3 flex items-center gap-2">
                            <i class="fas fa-chart-bar text-primary-orange"></i>
                            Account Statistics
                        </h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-primary-orange" id="documentCount">0</div>
                                <div class="text-sm text-warm-brown">Documents</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-primary-orange" id="joinDate">-</div>
                                <div class="text-sm text-warm-brown">Member Since</div>
                            </div>
                        </div>
                    </div>
                    <!-- Action Buttons -->
                    <div class="flex gap-3">
                        <button id="saveProfileBtn" class="flex-1 bg-gradient-to-r from-primary-orange to-hover-orange text-white py-3 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                            <i class="fas fa-save mr-2"></i>
                            Save Changes
                        </button>
                        <button id="cancelProfileBtn" class="flex-1 bg-gray-200 text-deep-brown py-3 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            
            <style>
            @keyframes modalFadeIn {
                from { opacity: 0; transform: scale(0.9) translateY(-20px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
            }
            </style>
        `;
        
        document.body.appendChild(profileModal);
        
        // Load user data
        this.loadUserProfile();
        
        // Add event listeners
        const closeBtn = document.getElementById('closeProfileBtn');
        const cancelBtn = document.getElementById('cancelProfileBtn');
        const saveBtn = document.getElementById('saveProfileBtn');
        
        const closeModal = () => {
            profileModal.remove();
        };
        
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
        if (saveBtn) saveBtn.addEventListener('click', () => this.saveUserProfile());
        
        // Close on backdrop click
        profileModal.addEventListener('click', (e) => {
            if (e.target === profileModal) closeModal();
        });
    }
    
    async loadUserProfile() {
        try {
            // Load user info
            const firstNameInput = document.getElementById('firstNameInput');
            const lastNameInput = document.getElementById('lastNameInput');
            const emailInput = document.getElementById('emailInput');
            const documentCountEl = document.getElementById('documentCount');
            const joinDateEl = document.getElementById('joinDate');
            
            if (this.app.user) {
                if (emailInput) emailInput.value = this.app.user.email || '';
                if (firstNameInput) firstNameInput.value = this.app.user.firstName || '';
                if (lastNameInput) lastNameInput.value = this.app.user.lastName || '';
                if (joinDateEl) joinDateEl.textContent = this.app.user.joinDate || new Date().getFullYear();
            }
            
            // Load document count
            const response = await fetch("http://localhost:8000/documents/", {
                credentials: 'include'
            });
            
            if (response.ok) {
                const documents = await response.json();
                if (documentCountEl) documentCountEl.textContent = documents.length;
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    }
    
    async saveUserProfile() {
        try {
            const firstNameInput = document.getElementById('firstNameInput');
            const lastNameInput = document.getElementById('lastNameInput');
            
            const firstName = firstNameInput?.value?.trim() || '';
            const lastName = lastNameInput?.value?.trim() || '';
            
            // Update user object
            if (this.app.user) {
                this.app.user.firstName = firstName;
                this.app.user.lastName = lastName;
                
                // Save to localStorage
                localStorage.setItem('user', JSON.stringify(this.app.user));
            }
            
            // Show success message
            const successToast = document.getElementById('successToast');
            const successMessage = document.getElementById('successMessage');
            if (successMessage) successMessage.textContent = 'Profile updated successfully!';
            if (successToast) successToast.style.transform = "translateX(0)";
            setTimeout(() => {
                if (successToast) successToast.style.transform = "translateX(100%)";
            }, 3000);
            
            // Close modal
            const profileModal = document.getElementById('profileModal');
            if (profileModal) profileModal.remove();
            
        } catch (error) {
            console.error('Error saving profile:', error);
            const errorToast = document.getElementById('errorToast');
            const errorMessage = document.getElementById('errorMessage');
            if (errorMessage) errorMessage.textContent = 'Failed to save profile';
            if (errorToast) errorToast.style.transform = "translateX(0)";
            setTimeout(() => {
                if (errorToast) errorToast.style.transform = "translateX(100%)";
            }, 3000);
        }
    }
    
    handleLogout() {
        // Show confirmation modal
        const confirmModal = document.createElement('div');
        confirmModal.className = 'fixed inset-0 bg-deep-brown bg-opacity-60 flex items-center justify-center z-50';
        confirmModal.innerHTML = `
            <div class="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4">
                <div class="p-6 border-b border-border-brown">
                    <h3 class="text-lg font-semibold text-deep-brown flex items-center gap-3">
                        <i class="fas fa-sign-out-alt text-red-500"></i>
                        Confirm Logout
                    </h3>
                </div>
                <div class="p-6">
                    <p class="text-warm-brown mb-6">Are you sure you want to logout? You'll need to sign in again to access your documents.</p>
                    <div class="flex gap-3">
                        <button id="confirmLogout" class="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                            <i class="fas fa-sign-out-alt mr-2"></i>
                            Logout
                        </button>
                        <button id="cancelLogout" class="flex-1 bg-gray-200 text-deep-brown py-3 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(confirmModal);
        
        const confirmBtn = document.getElementById('confirmLogout');
        const cancelBtn = document.getElementById('cancelLogout');
        
        const closeModal = () => {
            confirmModal.remove();
        };
        
        if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                // Clear user data
                localStorage.removeItem('user');
                this.app.user = null;
                
                // Redirect to landing page
                this.app.showPage('landing');
                closeModal();
            });
        }
        
        // Close on backdrop click
        confirmModal.addEventListener('click', (e) => {
            if (e.target === confirmModal) closeModal();
        });
    }
}