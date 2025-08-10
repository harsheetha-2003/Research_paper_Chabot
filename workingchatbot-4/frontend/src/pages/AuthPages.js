class AuthPages {
    constructor(app) {
        this.app = app;
    }

    renderLoginPage() {
        return `
            <div class="min-h-screen bg-warm-cream flex">
                <!-- Back Button -->
                <button onclick="app.navigate('/')" class="absolute top-6 left-6 z-50 flex items-center space-x-2 text-warm-brown hover:text-primary-orange transition-colors font-medium">
                    <i class="fas fa-arrow-left"></i>
                    <span>Back</span>
                </button>
                
                <!-- Left Side - Visual Design -->
                <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-orange to-hover-orange relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-br from-primary-orange/90 to-hover-orange/90"></div>
                    <div class="relative z-10 flex flex-col justify-center items-center text-white p-12">
                        <div class="float-animation mb-8">
                            <div class="relative">
                                <div class="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-4">
                                    <i class="fas fa-brain text-6xl text-white"></i>
                                </div>
                                <div class="absolute -top-4 -right-4 w-16 h-16 bg-golden-yellow/30 rounded-full animate-pulse"></div>
                                <div class="absolute -bottom-6 -left-6 w-20 h-20 bg-white/10 rounded-full animate-pulse" style="animation-delay: 1s"></div>
                            </div>
                        </div>
                        <h1 class="text-4xl font-bold mb-4 text-center">Welcome Back</h1>
                        <p class="text-xl text-white/90 text-center max-w-md leading-relaxed">
                            Continue your research journey with AI-powered document analysis
                        </p>
                        <div class="mt-8 grid grid-cols-2 gap-4 text-sm">
                            <div class="flex items-center space-x-2">
                                <i class="fas fa-check-circle text-golden-yellow"></i>
                                <span>Smart Analysis</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <i class="fas fa-check-circle text-golden-yellow"></i>
                                <span>Secure & Private</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <i class="fas fa-check-circle text-golden-yellow"></i>
                                <span>Chat History</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <i class="fas fa-check-circle text-golden-yellow"></i>
                                <span>Export Results</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Right Side - Login Form -->
                <div class="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12">
                    <div class="max-w-md w-full">
                        <div class="lg:hidden mb-8 text-center">
                            <div class="w-16 h-16 bg-gradient-to-br from-primary-orange to-golden-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-brain text-2xl text-white"></i>
                            </div>
                            <h1 class="text-2xl font-bold text-deep-brown">Research Analyser</h1>
                        </div>
                        
                        <div class="bg-white rounded-xl shadow-lg p-8 border border-border-brown">
                            <h2 class="text-2xl font-bold text-deep-brown mb-6 text-center">Welcome Back</h2>
                            <form class="space-y-4" id="loginForm">
                                <div>
                                    <label class="block text-sm font-medium text-warm-brown mb-2">Email</label>
                                    <input type="email" id="loginEmail" class="w-full p-3 border border-border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-primary-orange" required>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-warm-brown mb-2">Password</label>
                                    <input type="password" id="loginPassword" class="w-full p-3 border border-border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-primary-orange" required>
                                </div>
                                <button type="submit" class="w-full bg-primary-orange hover:bg-hover-orange text-white font-semibold py-3 rounded-lg transition-all duration-200 btn-hover-lift">
                                    Sign In
                                </button>
                            </form>
                            <div id="loginMessage" class="mt-4 text-center text-sm" style="display: none;"></div>
                            <p class="text-center text-warm-brown mt-4">
                                Don't have an account? 
                                <a href="#" class="text-primary-orange hover:text-hover-orange font-medium" onclick="app.navigate('/register')">Sign up</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderRegisterPage() {
        return `
            <div class="min-h-screen bg-warm-cream flex">
                <!-- Back Button -->
                <button onclick="app.navigate('/')" class="absolute top-6 left-6 z-50 flex items-center space-x-2 text-warm-brown hover:text-primary-orange transition-colors font-medium">
                    <i class="fas fa-arrow-left"></i>
                    <span>Back</span>
                </button>
                
                <!-- Left Side - Visual Design -->
                <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-orange via-hover-orange to-golden-yellow relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-br from-primary-orange/95 via-hover-orange/90 to-golden-yellow/85"></div>
                    <div class="relative z-10 flex flex-col justify-center items-center text-white p-12">
                        <div class="float-animation mb-8">
                            <div class="relative">
                                <div class="w-40 h-40 bg-white/20 rounded-2xl flex items-center justify-center mb-4 transform rotate-12">
                                    <div class="w-32 h-32 bg-white/30 rounded-xl flex items-center justify-center transform -rotate-12">
                                        <i class="fas fa-rocket text-5xl text-white"></i>
                                    </div>
                                </div>
                                <div class="absolute -top-6 -right-6 w-12 h-12 bg-golden-yellow/40 rounded-full animate-pulse"></div>
                                <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-white/15 rounded-full animate-pulse" style="animation-delay: 0.5s"></div>
                                <div class="absolute top-1/2 -right-8 w-8 h-8 bg-soft-cream/30 rounded-full animate-pulse" style="animation-delay: 1.5s"></div>
                            </div>
                        </div>
                        <h1 class="text-4xl font-bold mb-4 text-center">Start Your Journey</h1>
                        <p class="text-xl text-white/90 text-center max-w-md leading-relaxed mb-6">
                            Join thousands of researchers and discover insights from your documents with AI
                        </p>
                        <div class="grid grid-cols-1 gap-3 text-sm max-w-sm">
                            <div class="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
                                <i class="fas fa-upload text-golden-yellow"></i>
                                <span>Upload any document format</span>
                            </div>
                            <div class="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
                                <i class="fas fa-comments text-golden-yellow"></i>
                                <span>Chat with your documents</span>
                            </div>
                            <div class="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
                                <i class="fas fa-lightbulb text-golden-yellow"></i>
                                <span>Get instant insights & summaries</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Right Side - Register Form -->
                <div class="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12">
                    <div class="max-w-md w-full">
                        <div class="lg:hidden mb-8 text-center">
                            <div class="w-16 h-16 bg-gradient-to-br from-primary-orange to-golden-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-brain text-2xl text-white"></i>
                            </div>
                            <h1 class="text-2xl font-bold text-deep-brown">Research Analyser</h1>
                        </div>
                        
                        <div class="bg-white rounded-xl shadow-lg p-8 border border-border-brown">
                            <h2 class="text-2xl font-bold text-deep-brown mb-6 text-center">Create Account</h2>
                            <form class="space-y-4" id="registerForm">
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-warm-brown mb-2">First Name</label>
                                        <input type="text" id="registerFirstName" class="w-full p-3 border border-border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-primary-orange" required>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-warm-brown mb-2">Last Name</label>
                                        <input type="text" id="registerLastName" class="w-full p-3 border border-border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-primary-orange" required>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-warm-brown mb-2">Email</label>
                                    <input type="email" id="registerEmail" class="w-full p-3 border border-border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-primary-orange" required>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-warm-brown mb-2">Password</label>
                                    <input type="password" id="registerPassword" class="w-full p-3 border border-border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-primary-orange" required>
                                </div>
                                <button type="submit" class="w-full bg-primary-orange hover:bg-hover-orange text-white font-semibold py-3 rounded-lg transition-all duration-200 btn-hover-lift">
                                    Create Account
                                </button>
                            </form>
                            <div id="registerMessage" class="mt-4 text-center text-sm" style="display: none;"></div>
                            <p class="text-center text-warm-brown mt-4">
                                Already have an account? 
                                <a href="#" class="text-primary-orange hover:text-hover-orange font-medium" onclick="app.navigate('/login')">Sign in</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}