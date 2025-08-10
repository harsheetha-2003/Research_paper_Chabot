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
                    <div id="sidebar" class="${this.app.sidebarOpen ? 'w-80' : 'w-0'} bg-gradient-to-b from-white to-soft-cream border-r border-border-brown flex flex-col transition-all duration-500 ease-in-out overflow-hidden shadow-2xl relative">
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
                            
                            <!-- Settings Button -->
                            <button id="settingsBtn" class="p-3 hover:bg-gradient-to-br hover:from-golden-yellow/20 hover:to-primary-orange/20 rounded-xl transition-all duration-200 group relative transform hover:scale-110" title="Settings">
                                <i class="fas fa-cog text-warm-brown group-hover:text-primary-orange transition-colors transform group-hover:rotate-90 duration-300"></i>
                                <div class="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Settings
                                </div>
                            </button>
                        </div>
                    
                    <!-- Enhanced Upload Section -->
                    <div class="p-6 border-b border-border-brown/50 relative z-10">
                        <div class="bg-gradient-to-br from-white to-soft-cream border-2 border-dashed border-primary-orange/30 rounded-2xl p-6 hover:border-primary-orange/60 transition-all duration-300 hover:shadow-lg group cursor-pointer" id="uploadArea">
                            <div class="text-center">
                                <div class="w-16 h-16 bg-gradient-to-br from-primary-orange to-golden-yellow rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                    <i class="fas fa-file-pdf text-2xl text-white"></i>
                                </div>
                                <h3 class="font-semibold text-deep-brown mb-2 group-hover:text-primary-orange transition-colors">Upload Document</h3>
                                <p class="text-sm text-warm-brown mb-4">Drag & drop or click to browse</p>
                                <input type="file" id="dashboardFileInput" accept=".pdf,.doc,.docx,.txt" class="hidden">
                                <button id="uploadBtn" class="px-6 py-2 bg-gradient-to-r from-primary-orange to-hover-orange text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <i class="fas fa-cloud-upload-alt mr-2"></i>
                                    <span id="uploadBtnText">Choose Files</span>
                                </button>
                                <div id="uploadProgress" class="hidden mt-4">
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
                    <div class="flex-1 relative z-10">
                        <button id="documentsToggle" class="w-full flex items-center justify-between p-5 hover:bg-gradient-to-r hover:from-primary-orange/5 hover:to-golden-yellow/5 transition-all duration-300 group rounded-lg mx-2">
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-gradient-to-br from-primary-orange/20 to-golden-yellow/20 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-folder text-primary-orange text-sm"></i>
                                </div>
                                <span class="font-semibold text-deep-brown group-hover:text-primary-orange transition-colors">Documents</span>
                            </div>
                            <i class="fas fa-chevron-${this.app.documentsOpen ? 'up' : 'down'} text-warm-brown group-hover:text-primary-orange transition-all duration-300 transform ${this.app.documentsOpen ? 'rotate-180' : ''}"></i>
                        </button>
                        <div id="documentsContent" class="transition-all duration-500 ease-in-out overflow-hidden ${this.app.documentsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}">
                            <div class="px-6 pb-5 space-y-3">
                                <div class="text-xs text-warm-brown mb-3 font-medium flex items-center space-x-2">
                                    <i class="fas fa-clock text-golden-yellow"></i>
                                    <span>Recent</span>
                                </div>
                                <!-- Dynamic documents list populated by ResearchAnalyser -->
                                <div id="documentsList">
                                    <div class="text-center text-warm-brown py-8">
                                        <i class="fas fa-file-alt text-3xl mb-2 opacity-60"></i>
                                        <p class="text-sm">No documents uploaded yet</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                    <!-- Main Chat Area -->
                    <div class="flex-1 flex flex-col relative">
                        <!-- Animated Background Elements -->
                        <div class="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-primary-orange/5 to-golden-yellow/5 rounded-full blur-3xl animate-pulse"></div>
                        <div class="absolute bottom-40 left-20 w-48 h-48 bg-gradient-to-tr from-hover-orange/5 to-primary-orange/5 rounded-full blur-2xl animate-pulse" style="animation-delay: 2s;"></div>
                        
                        <!-- Chat Content -->
                        <div class="flex-1 flex items-center justify-center relative z-10">
                            <div class="text-center max-w-3xl mx-auto px-6">
                                <div class="mb-8">
                                    <div class="w-24 h-24 bg-gradient-to-br from-primary-orange to-golden-yellow rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300 cursor-pointer">
                                        <i class="fas fa-brain text-3xl text-white"></i>
                                    </div>
                                    <div class="w-16 h-16 bg-gradient-to-br from-golden-yellow/20 to-primary-orange/20 rounded-2xl mx-auto mb-8 animate-bounce"></div>
                                </div>
                                <h1 class="text-5xl font-bold bg-gradient-to-r from-deep-brown to-primary-orange bg-clip-text text-transparent mb-6">
                                    Hi there. What should we dive into today?
                                </h1>
                                <p class="text-xl text-warm-brown mb-8 leading-relaxed">
                                    Upload a document to start analyzing or ask me a question about your research.
                                </p>
                                <div class="flex items-center justify-center space-x-8">
                                    <div class="flex items-center space-x-2 text-primary-orange">
                                        <i class="fas fa-magic text-lg"></i>
                                        <span class="text-sm font-medium">AI-Powered</span>
                                    </div>
                                    <div class="flex items-center space-x-2 text-golden-yellow">
                                        <i class="fas fa-rocket text-lg"></i>
                                        <span class="text-sm font-medium">Fast Analysis</span>
                                    </div>
                                    <div class="flex items-center space-x-2 text-hover-orange">
                                        <i class="fas fa-shield-alt text-lg"></i>
                                        <span class="text-sm font-medium">Secure</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Enhanced Question Input Area -->
                        <div class="p-8 border-t border-border-brown/30 bg-gradient-to-r from-white to-soft-cream relative">
                            <div class="absolute inset-0 bg-gradient-to-r from-primary-orange/5 to-golden-yellow/5 opacity-50"></div>
                            <div class="max-w-5xl mx-auto relative z-10">
                                <div class="relative group">
                                    <div class="absolute inset-0 bg-gradient-to-r from-primary-orange to-golden-yellow rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                                    <div class="relative bg-white rounded-2xl shadow-xl border border-border-brown/20 overflow-hidden">
                                        <textarea 
                                            id="questionInput" 
                                            placeholder="Ask me anything about your research..." 
                                            class="w-full p-6 pr-16 border-none rounded-2xl resize-none focus:outline-none focus:ring-0 transition-all duration-200 min-h-[4rem] max-h-32 text-lg placeholder-warm-brown/60"
                                            rows="1"
                                        ></textarea>
                                        <button class="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-gradient-to-br from-primary-orange to-hover-orange text-white rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 group">
                                            <i class="fas fa-paper-plane group-hover:translate-x-1 transition-transform duration-200"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="flex items-center justify-between mt-4 text-sm text-warm-brown">
                                    <div class="flex items-center space-x-6">
                                        <div class="flex items-center space-x-2">
                                            <i class="fas fa-keyboard text-primary-orange"></i>
                                            <span>Press Enter to send</span>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <i class="fas fa-plus-circle text-golden-yellow"></i>
                                            <span>Shift + Enter for new line</span>
                                        </div>
                                    </div>
                                    <div class="flex items-center space-x-2 text-green-500">
                                        <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
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
}