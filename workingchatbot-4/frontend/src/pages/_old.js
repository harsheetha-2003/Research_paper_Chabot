// class DashboardPage {
//     constructor(app) {
//         this.app = app;
//     }

//     render() {
//         return `
//             <div class="min-h-screen bg-gradient-to-br from-warm-cream to-soft-cream relative">
//                 <!-- Mobile/Collapsed Sidebar Toggle Button -->
//                 ${!this.app.sidebarOpen ? `
//                     <button id="openSidebarBtn" class="fixed top-4 left-4 z-50 p-3 bg-gradient-to-br from-primary-orange to-hover-orange text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group">
//                         <i class="fas fa-bars text-lg"></i>
//                         <div class="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//                             Open Menu
//                         </div>
//                     </button>
//                 ` : ''}
                
//                 <div class="flex h-screen">
//                     <!-- Sidebar -->
//                     <div id="sidebar" class="${this.app.sidebarOpen ? 'w-80' : 'w-0'} bg-gradient-to-b from-white to-soft-cream border-r border-border-brown flex flex-col transition-all duration-500 ease-in-out overflow-hidden shadow-2xl relative">
//                         <!-- Animated Background Decoration -->
//                         <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-orange/10 to-golden-yellow/10 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
//                         <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-hover-orange/10 to-primary-orange/10 rounded-full translate-y-12 -translate-x-12 animate-pulse" style="animation-delay: 1s;"></div>
                        
//                         <!-- Top Navigation Icons -->
//                         <div class="flex items-center justify-between p-6 border-b border-border-brown/50 bg-gradient-to-r from-primary-orange/5 to-golden-yellow/5 backdrop-blur-sm relative z-10">
//                             <div class="flex items-center space-x-3">
//                                 <!-- Close Sidebar Button -->
//                                 <button id="closeSidebarBtn" class="p-3 hover:bg-primary-orange/10 rounded-xl transition-all duration-200 group relative transform hover:scale-110" title="Close Sidebar">
//                                     <i class="fas fa-times text-warm-brown group-hover:text-primary-orange transition-colors"></i>
//                                     <div class="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//                                         Close Menu
//                                     </div>
//                                 </button>
                            
//                                 <!-- New Chat Button -->
//                                 <button id="newChatBtn" class="p-3 hover:bg-gradient-to-br hover:from-golden-yellow/20 hover:to-primary-orange/20 rounded-xl transition-all duration-200 group relative transform hover:scale-110" title="New Chat">
//                                     <i class="fas fa-plus text-warm-brown group-hover:text-primary-orange transition-colors"></i>
//                                     <div class="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//                                         New Chat
//                                     </div>
//                                 </button>
//                             </div>
                            
//                             <!-- Settings Button -->
//                             <button id="settingsBtn" class="p-3 hover:bg-gradient-to-br hover:from-golden-yellow/20 hover:to-primary-orange/20 rounded-xl transition-all duration-200 group relative transform hover:scale-110" title="Settings">
//                                 <i class="fas fa-cog text-warm-brown group-hover:text-primary-orange transition-colors transform group-hover:rotate-90 duration-300"></i>
//                                 <div class="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//                                     Settings
//                                 </div>
//                             </button>
//                         </div>
                    
//                     <!-- Enhanced Upload Section -->
//                     <div class="p-6 border-b border-border-brown/50 relative z-10">
//                         <div class="bg-gradient-to-br from-white to-soft-cream border-2 border-dashed border-primary-orange/30 rounded-2xl p-6 hover:border-primary-orange/60 transition-all duration-300 hover:shadow-lg group cursor-pointer" id="uploadArea">
//                             <div class="text-center">
//                                 <div class="w-16 h-16 bg-gradient-to-br from-primary-orange to-golden-yellow rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
//                                     <i class="fas fa-file-pdf text-2xl text-white"></i>
//                                 </div>
//                                 <h3 class="font-semibold text-deep-brown mb-2 group-hover:text-primary-orange transition-colors">Upload Document</h3>
//                                 <p class="text-sm text-warm-brown mb-4">Drag & drop or click to browse</p>
//                                 <input type="file" id="dashboardFileInput" accept=".pdf,.doc,.docx,.txt" class="hidden">
//                                 <button id="uploadBtn" class="px-6 py-2 bg-gradient-to-r from-primary-orange to-hover-orange text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
//                                     <i class="fas fa-cloud-upload-alt mr-2"></i>
//                                     <span id="uploadBtnText">Choose Files</span>
//                                 </button>
//                                 <div id="uploadProgress" class="hidden mt-4">
//                                     <div class="w-full bg-border-brown bg-opacity-40 rounded-full h-2">
//                                         <div id="progressBar" class="bg-primary-orange h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
                    
//                     <!-- Currently Working On Section -->
//                     <div class="border-b border-border-brown/50 relative z-10">
//                         <button id="currentlyWorkingToggle" class="w-full flex items-center justify-between p-5 hover:bg-gradient-to-r hover:from-primary-orange/5 hover:to-golden-yellow/5 transition-all duration-300 group rounded-lg mx-2">
//                             <div class="flex items-center space-x-3">
//                                 <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                                 <span class="font-semibold text-deep-brown group-hover:text-primary-orange transition-colors">Currently working on</span>
//                             </div>
//                             <i class="fas fa-chevron-${this.app.currentlyWorkingOpen ? 'up' : 'down'} text-warm-brown group-hover:text-primary-orange transition-all duration-300 transform ${this.app.currentlyWorkingOpen ? 'rotate-180' : ''}"></i>
//                         </button>
//                         <div id="currentlyWorkingContent" class="transition-all duration-500 ease-in-out overflow-hidden ${this.app.currentlyWorkingOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}">
//                             <div class="px-6 pb-5">
//                                 <div class="bg-gradient-to-r from-golden-yellow/10 to-primary-orange/10 rounded-xl p-4 border border-golden-yellow/20">
//                                     <div class="flex items-center space-x-3">
//                                         <i class="fas fa-clock text-golden-yellow"></i>
//                                         <p class="text-sm text-warm-brown">No active documents</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
                    
//                     <!-- Documents Section -->
//                     <div class="flex-1 relative z-10">
//                         <button id="documentsToggle" class="w-full flex items-center justify-between p-5 hover:bg-gradient-to-r hover:from-primary-orange/5 hover:to-golden-yellow/5 transition-all duration-300 group rounded-lg mx-2">
//                             <div class="flex items-center space-x-3">
//                                 <div class="w-8 h-8 bg-gradient-to-br from-primary-orange/20 to-golden-yellow/20 rounded-lg flex items-center justify-center">
//                                     <i class="fas fa-folder text-primary-orange text-sm"></i>
//                                 </div>
//                                 <span class="font-semibold text-deep-brown group-hover:text-primary-orange transition-colors">Documents</span>
//                             </div>
//                             <i class="fas fa-chevron-${this.app.documentsOpen ? 'up' : 'down'} text-warm-brown group-hover:text-primary-orange transition-all duration-300 transform ${this.app.documentsOpen ? 'rotate-180' : ''}"></i>
//                         </button>
//                         <div id="documentsContent" class="transition-all duration-500 ease-in-out overflow-hidden ${this.app.documentsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}">
//                             <div class="px-6 pb-5 space-y-3">
//                                 <div class="text-xs text-warm-brown mb-3 font-medium flex items-center space-x-2">
//                                     <i class="fas fa-clock text-golden-yellow"></i>
//                                     <span>Recent</span>
//                                 </div>
//                                 <!-- Dynamic documents list populated by ResearchAnalyser -->
//                                 <div id="documentsList">
//                                     <div class="text-center text-warm-brown py-8">
//                                         <i class="fas fa-file-alt text-3xl mb-2 opacity-60"></i>
//                                         <p class="text-sm">No documents uploaded yet</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
                
//                     <!-- Main Chat Area -->
//                     <div class="flex-1 flex flex-col relative">
//                         <!-- Animated Background Elements -->
//                         <div class="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-primary-orange/5 to-golden-yellow/5 rounded-full blur-3xl animate-pulse"></div>
//                         <div class="absolute bottom-40 left-20 w-48 h-48 bg-gradient-to-tr from-hover-orange/5 to-primary-orange/5 rounded-full blur-2xl animate-pulse" style="animation-delay: 2s;"></div>
                        
//                         <!-- Chat Content -->
//                         <div class="flex-1 flex items-center justify-center relative z-10">
//                             <div class="text-center max-w-3xl mx-auto px-6">
//                                 <div class="mb-8">
//                                     <div class="w-24 h-24 bg-gradient-to-br from-primary-orange to-golden-yellow rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300 cursor-pointer">
//                                         <i class="fas fa-brain text-3xl text-white"></i>
//                                     </div>
//                                     <div class="w-16 h-16 bg-gradient-to-br from-golden-yellow/20 to-primary-orange/20 rounded-2xl mx-auto mb-8 animate-bounce"></div>
//                                 </div>
//                                 <h1 class="text-5xl font-bold bg-gradient-to-r from-deep-brown to-primary-orange bg-clip-text text-transparent mb-6">
//                                     Hi there. What should we dive into today?
//                                 </h1>
//                                 <p class="text-xl text-warm-brown mb-8 leading-relaxed">
//                                     Upload a document to start analyzing or ask me a question about your research.
//                                 </p>
//                                 <div class="flex items-center justify-center space-x-8">
//                                     <div class="flex items-center space-x-2 text-primary-orange">
//                                         <i class="fas fa-magic text-lg"></i>
//                                         <span class="text-sm font-medium">AI-Powered</span>
//                                     </div>
//                                     <div class="flex items-center space-x-2 text-golden-yellow">
//                                         <i class="fas fa-rocket text-lg"></i>
//                                         <span class="text-sm font-medium">Fast Analysis</span>
//                                     </div>
//                                     <div class="flex items-center space-x-2 text-hover-orange">
//                                         <i class="fas fa-shield-alt text-lg"></i>
//                                         <span class="text-sm font-medium">Secure</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
                        
//                         <!-- Enhanced Question Input Area -->
//                         <div class="p-8 border-t border-border-brown/30 bg-gradient-to-r from-white to-soft-cream relative">
//                             <div class="absolute inset-0 bg-gradient-to-r from-primary-orange/5 to-golden-yellow/5 opacity-50"></div>
//                             <div class="max-w-5xl mx-auto relative z-10">
//                                 <div class="relative group">
//                                     <div class="absolute inset-0 bg-gradient-to-r from-primary-orange to-golden-yellow rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
//                                     <div class="relative bg-white rounded-2xl shadow-xl border border-border-brown/20 overflow-hidden">
//                                         <textarea 
//                                             id="questionInput" 
//                                             placeholder="Ask me anything about your research..." 
//                                             class="w-full p-6 pr-16 border-none rounded-2xl resize-none focus:outline-none focus:ring-0 transition-all duration-200 min-h-[4rem] max-h-32 text-lg placeholder-warm-brown/60"
//                                             rows="1"
//                                         ></textarea>
//                                         <button class="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-gradient-to-br from-primary-orange to-hover-orange text-white rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 group">
//                                             <i class="fas fa-paper-plane group-hover:translate-x-1 transition-transform duration-200"></i>
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <div class="flex items-center justify-between mt-4 text-sm text-warm-brown">
//                                     <div class="flex items-center space-x-6">
//                                         <div class="flex items-center space-x-2">
//                                             <i class="fas fa-keyboard text-primary-orange"></i>
//                                             <span>Press Enter to send</span>
//                                         </div>
//                                         <div class="flex items-center space-x-2">
//                                             <i class="fas fa-plus-circle text-golden-yellow"></i>
//                                             <span>Shift + Enter for new line</span>
//                                         </div>
//                                     </div>
//                                     <div class="flex items-center space-x-2 text-green-500">
//                                         <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                                         <span>AI Ready</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
            
//             <!-- Hidden elements for ResearchAnalyser -->
//             <input type="file" id="fileInput" style="display: none;" accept=".pdf,.doc,.docx,.txt,.md" />
            
//             <!-- Toast notifications -->
//             <div id="successToast" class="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300">
//                 <div class="flex items-center space-x-2">
//                     <i class="fas fa-check-circle"></i>
//                     <span id="successMessage">Success!</span>
//                 </div>
//             </div>
            
//             <div id="errorToast" class="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300">
//                 <div class="flex items-center space-x-2">
//                     <i class="fas fa-exclamation-circle"></i>
//                     <span id="errorMessage">Error!</span>
//                 </div>
//             </div>
            
//             <!-- Upload progress (hidden by default) -->
//             <div id="uploadProgress" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50" style="display: none;">
//                 <div class="text-center">
//                     <div class="mb-4">
//                         <i class="fas fa-upload text-primary-orange text-2xl"></i>
//                         <p class="mt-2 text-gray-700">Uploading document...</p>
//                     </div>
//                     <div class="w-64 bg-gray-200 rounded-full h-2">
//                         <div id="progressBar" class="bg-primary-orange h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
//                     </div>
//                 </div>
//             </div>
            
//         `;
//     }
    
//     attachEventListeners() {
//         // Wait for DOM to be ready
//         setTimeout(() => {
//             const fileInput = document.getElementById("dashboardFileInput");
//             const uploadBtn = document.getElementById("uploadBtn");
//             const uploadProgress = document.getElementById("uploadProgress");
//             const progressBar = document.getElementById("progressBar");
//             const successToast = document.getElementById("successToast");
//             const errorToast = document.getElementById("errorToast");
//             const successMessage = document.getElementById("successMessage");
//             const errorMessage = document.getElementById("errorMessage");
//             const documentsList = document.getElementById("documentsList");

//             // Upload functionality
//             if (uploadBtn) {
//                 uploadBtn.addEventListener("click", () => {
//                     fileInput.click();
//                 });
//             }

//             if (fileInput) {
//                 fileInput.addEventListener("change", async () => {
//                     const file = fileInput.files[0];
//                     if (!file) return;

//                     if (uploadProgress) uploadProgress.style.display = "block";
//                     if (progressBar) progressBar.style.width = "0%";

//                     const formData = new FormData();
//                     formData.append("file", file);

//                     try {
//                         const response = await fetch("http://localhost:8000/upload/", {
//                             method: "POST",
//                             body: formData,
//                             credentials: 'include' // Include cookies for session authentication
//                         });

//                         if (!response.ok) {
//                             const errorData = await response.json().catch(() => ({}));
//                             throw new Error(errorData.detail || "Upload failed");
//                         }

//                         const result = await response.json();

//                         if (uploadProgress) uploadProgress.style.display = "none";
//                         if (successMessage) successMessage.textContent = result.message || "Upload successful!";
//                         if (successToast) successToast.style.transform = "translateX(0)";
//                         setTimeout(() => {
//                             if (successToast) successToast.style.transform = "translateX(100%)";
//                         }, 3000);

//                         // Refresh documents list
//                         this.loadDocuments();
//                     } catch (error) {
//                         if (uploadProgress) uploadProgress.style.display = "none";
//                         if (errorMessage) errorMessage.textContent = error.message || "Network error. Please check again.";
//                         if (errorToast) errorToast.style.transform = "translateX(0)";
//                         setTimeout(() => {
//                             if (errorToast) errorToast.style.transform = "translateX(100%)";
//                         }, 3000);
//                     }
//                 });
//             }

//             // Setup global functions for chat functionality
//             this.setupGlobalFunctions(errorToast, errorMessage, successToast, successMessage);

//             // Handle dropdown toggles
//             const currentlyWorkingToggle = document.getElementById('currentlyWorkingToggle');
//             const documentsToggle = document.getElementById('documentsToggle');
            
//             if (currentlyWorkingToggle) {
//                 currentlyWorkingToggle.addEventListener('click', () => {
//                     this.app.currentlyWorkingOpen = !this.app.currentlyWorkingOpen;
//                     this.app.render();
//                 });
//             }
            
//             if (documentsToggle) {
//                 documentsToggle.addEventListener('click', () => {
//                     this.app.documentsOpen = !this.app.documentsOpen;
//                     this.app.render();
//                 });
//             }

//             // Handle sidebar toggles
//             const openSidebarBtn = document.getElementById('openSidebarBtn');
//             const closeSidebarBtn = document.getElementById('closeSidebarBtn');
            
//             if (openSidebarBtn) {
//                 openSidebarBtn.addEventListener('click', () => {
//                     this.app.sidebarOpen = true;
//                     this.app.render();
//                 });
//             }
            
//             if (closeSidebarBtn) {
//                 closeSidebarBtn.addEventListener('click', () => {
//                     this.app.sidebarOpen = false;
//                     this.app.render();
//                 });
//             }

//             // Initialize - load documents on page load
//             this.loadDocuments();
//         }, 100);
//     }
    
//     setupGlobalFunctions(errorToast, errorMessage, successToast, successMessage) {
//         // View chat history function
//                     window.viewChatHistory = async function(docId, filename) {
//                         try {
//                             const response = await fetch(`http://localhost:8000/chat-history?doc_id=${docId}&user_email=${encodeURIComponent(window.app?.user?.email || '')}`, {
//                                 credentials: 'include'
//                             });

//                             if (!response.ok) {
//                                 throw new Error("Failed to load chat history");
//                             }

//                             const data = await response.json();
//                             showChatInterface(docId, filename, data.chat_history);
//                         } catch (error) {
//                             errorMessage.textContent = "Failed to load chat history";
//                             errorToast.style.transform = "translateX(0)";
//                             setTimeout(() => {
//                                 errorToast.style.transform = "translateX(100%)";
//                             }, 3000);
//                         }
//                     };

//                     // Show chat interface
//                     function showChatInterface(docId, filename, chatHistory) {
//                         const chatModal = document.createElement('div');
//                         chatModal.className = 'fixed inset-0 bg-warm-cream z-50 flex flex-col';
//                         chatModal.innerHTML = `
//                             <div class="flex h-full">
//                                 <!-- Chat Header -->
//                                 <div class="w-full flex flex-col">
//                                     <div class="bg-gradient-to-r from-primary-orange to-hover-orange p-4 text-white">
//                                         <div class="flex items-center justify-between">
//                                             <div class="flex items-center space-x-3">
//                                                 <button onclick="closeChatInterface()" class="p-2 hover:bg-white/20 rounded-lg transition-colors">
//                                                     <i class="fas fa-arrow-left"></i>
//                                                 </button>
//                                                 <div>
//                                                     <h2 class="text-lg font-semibold">${filename}</h2>
//                                                     <p class="text-sm opacity-90">Document Chat</p>
//                                                 </div>
//                                             </div>
//                                             <div class="flex items-center space-x-2">
//                                                 <button onclick="clearChatHistory('${docId}')" class="p-2 hover:bg-white/20 rounded-lg transition-colors" title="Clear Chat">
//                                                     <i class="fas fa-broom"></i>
//                                                 </button>
//                                                 <button onclick="exportChat('${docId}', '${filename}')" class="p-2 hover:bg-white/20 rounded-lg transition-colors" title="Export Chat">
//                                                     <i class="fas fa-download"></i>
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <!-- Messages Container -->
//                                     <div id="chatMessages" class="flex-1 overflow-y-auto p-4 space-y-4">
//                                         ${renderChatHistory(chatHistory)}
//                                     </div>

//                                     <!-- Input Area -->
//                                     <div class="p-4 border-t border-border-brown/30 bg-gradient-to-r from-white to-soft-cream">
//                                         <div class="max-w-4xl mx-auto">
//                                             <div class="relative">
//                                                 <textarea 
//                                                     id="chatInput" 
//                                                     placeholder="Ask me anything about ${filename}..." 
//                                                     class="w-full p-4 pr-16 border border-border-brown/30 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-orange/50 transition-all duration-200 min-h-[3rem] max-h-32"
//                                                     rows="1"
//                                                 ></textarea>
//                                                 <button id="sendChatBtn" class="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-br from-primary-orange to-hover-orange text-white rounded-lg hover:shadow-lg transition-all duration-200">
//                                                     <i class="fas fa-paper-plane"></i>
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         `;

//                         document.body.appendChild(chatModal);

//                         // Setup chat functionality
//                         setupChatInterface(docId, filename);
//                     }

//                     // Render chat history
//                     function renderChatHistory(chatHistory) {
//                         if (!chatHistory || chatHistory.length === 0) {
//                             return `
//                                 <div class="text-center text-warm-brown py-8">
//                                     <i class="fas fa-comments text-3xl mb-2 opacity-60"></i>
//                                     <p class="text-sm">No chat history yet. Start a conversation!</p>
//                                 </div>
//                             `;
//                         }

//                         return chatHistory.map(message => `
//                             <div class="flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}">
//                                 <div class="max-w-3xl ${message.type === 'user' ? 'bg-gradient-to-r from-primary-orange to-hover-orange text-white' : 'bg-white border border-border-brown/30'} rounded-lg p-4 shadow-sm">
//                                     <div class="flex items-start space-x-3">
//                                         <div class="w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-white/20' : 'bg-gradient-to-br from-primary-orange/20 to-golden-yellow/20'}">
//                                             <i class="fas ${message.type === 'user' ? 'fa-user' : 'fa-robot'} ${message.type === 'user' ? 'text-white' : 'text-primary-orange'}"></i>
//                                         </div>
//                                         <div class="flex-1">
//                                             <p class="${message.type === 'user' ? 'text-white' : 'text-deep-brown'}">${message.content}</p>
//                                             <p class="text-xs ${message.type === 'user' ? 'text-white/70' : 'text-warm-brown'} mt-1">${message.timestamp || 'Now'}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         `).join('');
//                     }

//                     // Setup chat interface functionality
//                     function setupChatInterface(docId, filename) {
//                         const chatInput = document.getElementById('chatInput');
//                         const sendBtn = document.getElementById('sendChatBtn');
//                         const messagesContainer = document.getElementById('chatMessages');

//                         // Auto-resize textarea
//                         chatInput.addEventListener('input', function() {
//                             this.style.height = 'auto';
//                             this.style.height = this.scrollHeight + 'px';
//                         });

//                         // Send message on Enter (but allow Shift+Enter for new line)
//                         chatInput.addEventListener('keydown', function(e) {
//                             if (e.key === 'Enter' && !e.shiftKey) {
//                                 e.preventDefault();
//                                 sendMessage();
//                             }
//                         });

//                         sendBtn.addEventListener('click', sendMessage);

//                         async function sendMessage() {
//                             const message = chatInput.value.trim();
//                             if (!message) return;

//                             // Add user message to chat
//                             addMessageToChat('user', message);
//                             chatInput.value = '';
//                             chatInput.style.height = 'auto';

//                             // Show typing indicator
//                             addTypingIndicator();

//                             try {
//                                 const response = await fetch('http://localhost:8000/chat/', {
//                                     method: 'POST',
//                                     headers: {
//                                         'Content-Type': 'application/json',
//                                     },
//                                     credentials: 'include',
//                                     body: JSON.stringify({
//                                         user_email: window.app?.user?.email || '',
//                                         doc_id: docId,
//                                         question: message
//                                     })
//                                 });

//                                 if (!response.ok) {
//                                     throw new Error('Failed to send message');
//                                 }

//                                 const data = await response.json();
                                
//                                 // Remove typing indicator
//                                 removeTypingIndicator();
                                
//                                 // Add AI response
//                                 addMessageToChat('ai', data.answer || data.response || 'No response received');
//                             } catch (error) {
//                                 removeTypingIndicator();
//                                 addMessageToChat('ai', 'Sorry, I encountered an error processing your message.');
//                             }
//                         }

//                         function addMessageToChat(type, content) {
//                             const messageHtml = `
//                                 <div class="flex ${type === 'user' ? 'justify-end' : 'justify-start'} message-bubble">
//                                     <div class="max-w-3xl ${type === 'user' ? 'bg-gradient-to-r from-primary-orange to-hover-orange text-white' : 'bg-white border border-border-brown/30'} rounded-lg p-4 shadow-sm">
//                                         <div class="flex items-start space-x-3">
//                                             <div class="w-8 h-8 rounded-full flex items-center justify-center ${type === 'user' ? 'bg-white/20' : 'bg-gradient-to-br from-primary-orange/20 to-golden-yellow/20'}">
//                                                 <i class="fas ${type === 'user' ? 'fa-user' : 'fa-robot'} ${type === 'user' ? 'text-white' : 'text-primary-orange'}"></i>
//                                             </div>
//                                             <div class="flex-1">
//                                                 <p class="${type === 'user' ? 'text-white' : 'text-deep-brown'}">${content}</p>
//                                                 <p class="text-xs ${type === 'user' ? 'text-white/70' : 'text-warm-brown'} mt-1">Just now</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             `;
//                             messagesContainer.insertAdjacentHTML('beforeend', messageHtml);
//                             messagesContainer.scrollTop = messagesContainer.scrollHeight;
//                         }

//                         function addTypingIndicator() {
//                             const typingHtml = `
//                                 <div id="typingIndicator" class="flex justify-start">
//                                     <div class="bg-white border border-border-brown/30 rounded-lg p-4 shadow-sm">
//                                         <div class="flex items-center space-x-3">
//                                             <div class="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-primary-orange/20 to-golden-yellow/20">
//                                                 <i class="fas fa-robot text-primary-orange"></i>
//                                             </div>
//                                             <div class="typing-animation">
//                                                 <span class="text-warm-brown">AI is thinking...</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             `;
//                             messagesContainer.insertAdjacentHTML('beforeend', typingHtml);
//                             messagesContainer.scrollTop = messagesContainer.scrollHeight;
//                         }

//                         function removeTypingIndicator() {
//                             const indicator = document.getElementById('typingIndicator');
//                             if (indicator) {
//                                 indicator.remove();
//                             }
//                         }
//                     }

//                     // Close chat interface
//                     window.closeChatInterface = function() {
//                         const chatModal = document.querySelector('.fixed.inset-0.bg-warm-cream');
//                         if (chatModal) {
//                             chatModal.remove();
//                         }
//                     };

//                     // Clear chat history
//                     window.clearChatHistory = async function(docId) {
//                         if (!confirm('Are you sure you want to clear the chat history? This action cannot be undone.')) {
//                             return;
//                         }

//                         try {
//                             const response = await fetch(`http://localhost:8000/manage/chat?doc_id=${docId}&user_email=${encodeURIComponent(window.app?.user?.email || '')}`, {
//                                 method: 'DELETE',
//                                 credentials: 'include'
//                             });

//                             if (!response.ok) {
//                                 throw new Error('Failed to clear chat history');
//                             }

//                             // Refresh chat interface
//                             document.getElementById('chatMessages').innerHTML = `
//                                 <div class="text-center text-warm-brown py-8">
//                                     <i class="fas fa-comments text-3xl mb-2 opacity-60"></i>
//                                     <p class="text-sm">Chat history cleared. Start a new conversation!</p>
//                                 </div>
//                             `;

//                             successMessage.textContent = "Chat history cleared successfully";
//                             successToast.style.transform = "translateX(0)";
//                             setTimeout(() => {
//                                 successToast.style.transform = "translateX(100%)";
//                             }, 3000);
//                         } catch (error) {
//                             errorMessage.textContent = "Failed to clear chat history";
//                             errorToast.style.transform = "translateX(0)";
//                             setTimeout(() => {
//                                 errorToast.style.transform = "translateX(100%)";
//                             }, 3000);
//                         }
//                     };

//                     // Export chat
//                     window.exportChat = function(docId, filename) {
//                         const messages = Array.from(document.querySelectorAll('#chatMessages .message-bubble')).map(bubble => {
//                             const isUser = bubble.querySelector('.justify-end');
//                             const content = bubble.querySelector('p').textContent;
//                             return `${isUser ? 'User' : 'AI'}: ${content}`;
//                         }).join('\\n\\n');

//                         const blob = new Blob([`Chat History for ${filename}\\n\\n${messages}`], { type: 'text/plain' });
//                         const url = URL.createObjectURL(blob);
//                         const a = document.createElement('a');
//                         a.href = url;
//                         a.download = `${filename}_chat_history.txt`;
//                         a.click();
//                         URL.revokeObjectURL(url);
//                     };

//                     // Rename document
//                     window.renameDocument = function(docId, currentFilename) {
//                         const newName = prompt('Enter new document name:', currentFilename);
//                         if (!newName || newName === currentFilename) return;

//                         // For now, just show success message
//                         // Note: Backend doesn't have rename endpoint, would need to be implemented
//                         successMessage.textContent = "Document renamed successfully";
//                         successToast.style.transform = "translateX(0)";
//                         setTimeout(() => {
//                             successToast.style.transform = "translateX(100%)";
//                         }, 3000);
                        
//                         // Refresh documents list
//                         loadDocuments();
//                     };

//                     // Show delete options
//                     window.showDeleteOptions = function(docId, filename) {
//                         const deleteModal = document.createElement('div');
//                         deleteModal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
//                         deleteModal.innerHTML = `
//                             <div class="bg-white rounded-xl p-6 max-w-md mx-4">
//                                 <h3 class="text-lg font-semibold text-deep-brown mb-4">Delete Options</h3>
//                                 <p class="text-warm-brown mb-6">What would you like to delete for "${filename}"?</p>
//                                 <div class="space-y-3">
//                                     <button onclick="deleteChat('${docId}', '${filename}')" class="w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-800 py-3 px-4 rounded-lg transition-colors flex items-center space-x-2">
//                                         <i class="fas fa-comments"></i>
//                                         <span>Delete Chat History Only</span>
//                                     </button>
//                                     <button onclick="deleteDocument('${docId}', '${filename}')" class="w-full bg-red-100 hover:bg-red-200 text-red-800 py-3 px-4 rounded-lg transition-colors flex items-center space-x-2">
//                                         <i class="fas fa-file"></i>
//                                         <span>Delete Document & All Data</span>
//                                     </button>
//                                 </div>
//                                 <div class="flex justify-end space-x-3 mt-6">
//                                     <button onclick="closeDeleteModal()" class="px-4 py-2 text-warm-brown hover:bg-border-brown/20 rounded-lg transition-colors">Cancel</button>
//                                 </div>
//                             </div>
//                         `;

//                         document.body.appendChild(deleteModal);

//                         window.closeDeleteModal = function() {
//                             deleteModal.remove();
//                         };

//                         // Close on backdrop click
//                         deleteModal.addEventListener('click', function(e) {
//                             if (e.target === deleteModal) {
//                                 deleteModal.remove();
//                             }
//                         });
//                     };

//                     // Delete chat only
//                     window.deleteChat = async function(docId, filename) {
//                         if (!confirm(`Are you sure you want to delete the chat history for "${filename}"? The document will remain.`)) {
//                             return;
//                         }

//                         try {
//                             const response = await fetch(`http://localhost:8000/manage/chat?doc_id=${docId}&user_email=${encodeURIComponent(window.app?.user?.email || '')}`, {
//                                 method: 'DELETE',
//                                 credentials: 'include'
//                             });

//                             if (!response.ok) {
//                                 throw new Error('Failed to delete chat history');
//                             }

//                             successMessage.textContent = "Chat history deleted successfully";
//                             successToast.style.transform = "translateX(0)";
//                             setTimeout(() => {
//                                 successToast.style.transform = "translateX(100%)";
//                             }, 3000);

//                             closeDeleteModal();
//                         } catch (error) {
//                             errorMessage.textContent = "Failed to delete chat history";
//                             errorToast.style.transform = "translateX(0)";
//                             setTimeout(() => {
//                                 errorToast.style.transform = "translateX(100%)";
//                             }, 3000);
//                         }
//                     };

//                     // Delete document completely
//                     window.deleteDocument = async function(docId, filename) {
//                         if (!confirm(`Are you sure you want to permanently delete "${filename}" and all its data? This action cannot be undone.`)) {
//                             return;
//                         }

//                         try {
//                             const response = await fetch(`http://localhost:8000/manage/document?doc_id=${docId}&user_email=${encodeURIComponent(window.app?.user?.email || '')}`, {
//                                 method: 'DELETE',
//                                 credentials: 'include'
//                             });

//                             if (!response.ok) {
//                                 throw new Error('Failed to delete document');
//                             }

//                             successMessage.textContent = "Document deleted successfully";
//                             successToast.style.transform = "translateX(0)";
//                             setTimeout(() => {
//                                 successToast.style.transform = "translateX(100%)";
//                             }, 3000);

//                             closeDeleteModal();
//                             loadDocuments(); // Refresh documents list
//                         } catch (error) {
//                             errorMessage.textContent = "Failed to delete document";
//                             errorToast.style.transform = "translateX(0)";
//                             setTimeout(() => {
//                                 errorToast.style.transform = "translateX(100%)";
//                             }, 3000);
//                         }
//                     };

//                     // Handle dropdown toggles
//                     const currentlyWorkingToggle = document.getElementById('currentlyWorkingToggle');
//                     const documentsToggle = document.getElementById('documentsToggle');
                    
//                     if (currentlyWorkingToggle) {
//                         currentlyWorkingToggle.addEventListener('click', () => {
//                             app.currentlyWorkingOpen = !app.currentlyWorkingOpen;
//                             app.render();
//                         });
//                     }
                    
//                     if (documentsToggle) {
//                         documentsToggle.addEventListener('click', () => {
//                             app.documentsOpen = !app.documentsOpen;
//                             app.render();
//                         });
//                     }

//                     // Handle sidebar toggles
//                     const openSidebarBtn = document.getElementById('openSidebarBtn');
//                     const closeSidebarBtn = document.getElementById('closeSidebarBtn');
                    
//                     if (openSidebarBtn) {
//                         openSidebarBtn.addEventListener('click', () => {
//                             app.sidebarOpen = true;
//                             app.render();
//                         });
//                     }
                    
//                     if (closeSidebarBtn) {
//                         closeSidebarBtn.addEventListener('click', () => {
//                             app.sidebarOpen = false;
//                             app.render();
//                         });
//                     }

//                     // Initialize - load documents on page load
//                     this.loadDocuments();
//                 }, 100);
//     }
    
//     async loadDocuments() {
//         try {
//             const response = await fetch("http://localhost:8000/documents/", {
//                 method: "GET",
//                 credentials: 'include'
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to load documents");
//             }

//             const documents = await response.json();
//             this.displayDocuments(documents);
//         } catch (error) {
//             console.error("Error loading documents:", error);
//             const documentsList = document.getElementById("documentsList");
//             if (documentsList) {
//                 documentsList.innerHTML = `
//                     <div class="text-center text-warm-brown py-8">
//                         <i class="fas fa-exclamation-triangle text-3xl mb-2 opacity-60"></i>
//                         <p class="text-sm">Error loading documents</p>
//                     </div>
//                 `;
//             }
//         }
//     }
    
//     displayDocuments(documents) {
//         const documentsList = document.getElementById("documentsList");
//         if (!documentsList) return;
        
//         if (!documents || documents.length === 0) {
//             documentsList.innerHTML = `
//                 <div class="text-center text-warm-brown py-8">
//                     <i class="fas fa-file-alt text-3xl mb-2 opacity-60"></i>
//                     <p class="text-sm">No documents uploaded yet</p>
//                 </div>
//             `;
//             return;
//         }

//         documentsList.innerHTML = documents.map(doc => `
//             <div class="group bg-gradient-to-r from-white to-soft-cream border border-border-brown/30 rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer document-item" data-doc-id="${doc.doc_id}" data-filename="${doc.filename}">
//                 <div class="flex items-center justify-between">
//                     <div class="flex items-center space-x-3 flex-1">
//                         <div class="w-10 h-10 bg-gradient-to-br from-primary-orange/20 to-golden-yellow/20 rounded-lg flex items-center justify-center">
//                             <i class="fas fa-file-pdf text-primary-orange"></i>
//                         </div>
//                         <div class="flex-1 min-w-0">
//                             <p class="font-medium text-deep-brown truncate">${doc.filename}</p>
//                             <p class="text-xs text-warm-brown">${doc.upload_date}</p>
//                         </div>
//                     </div>
//                     <div class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <button class="p-2 hover:bg-primary-orange/10 rounded-lg transition-colors" title="Options">
//                             <i class="fas fa-ellipsis-v text-warm-brown"></i>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         `).join('');

//         // Add click event listeners for document options
//         document.querySelectorAll('.document-item').forEach(item => {
//             item.addEventListener('click', (e) => {
//                 const docId = item.dataset.docId;
//                 const filename = item.dataset.filename;
//                 this.showDocumentOptions(docId, filename, e);
//             });
//         });
//     }
    
//     showDocumentOptions(docId, filename, event) {
//         event.stopPropagation();
        
//         // Remove existing menu if any
//         const existingMenu = document.querySelector('.document-options-menu');
//         if (existingMenu) {
//             existingMenu.remove();
//         }

//         const menu = document.createElement('div');
//         menu.className = 'document-options-menu fixed bg-white shadow-xl border border-border-brown/30 rounded-lg z-50 py-2 min-w-48';
//         menu.style.left = event.pageX + 'px';
//         menu.style.top = event.pageY + 'px';

//         menu.innerHTML = `
//             <button class="w-full text-left px-4 py-2 hover:bg-primary-orange/10 transition-colors flex items-center space-x-2" onclick="window.viewChatHistory('${docId}', '${filename}')">
//                 <i class="fas fa-comments text-primary-orange"></i>
//                 <span>Chat History</span>
//             </button>
//             <button class="w-full text-left px-4 py-2 hover:bg-golden-yellow/10 transition-colors flex items-center space-x-2" onclick="window.renameDocument('${docId}', '${filename}')">
//                 <i class="fas fa-edit text-golden-yellow"></i>
//                 <span>Rename</span>
//             </button>
//             <div class="border-t border-border-brown/20 my-1"></div>
//             <button class="w-full text-left px-4 py-2 hover:bg-red-50 transition-colors flex items-center space-x-2" onclick="window.showDeleteOptions('${docId}', '${filename}')">
//                 <i class="fas fa-trash text-red-500"></i>
//                 <span>Delete</span>
//             </button>
//         `;

//         document.body.appendChild(menu);

//         // Close menu when clicking outside
//         setTimeout(() => {
//             document.addEventListener('click', function closeMenu() {
//                 menu.remove();
//                 document.removeEventListener('click', closeMenu);
//             });
//         }, 100);
//     }
// }
// }