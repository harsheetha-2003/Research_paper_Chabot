class LandingPage {
    constructor(app) {
        this.app = app;
    }

    render() {
        return `
            <div class="min-h-screen bg-warm-cream">
                ${this.renderHeader()}
                ${this.renderHeroSection()}
                ${this.renderFeaturesSection()}
                ${this.renderCtaSection()}
                ${this.renderFooter()}
            </div>
        `;
    }

    renderHeader() {
        return `
            <header class="bg-white border-b border-border-brown sticky top-0 z-50 shadow-sm">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-16">
                        <div class="flex items-center space-x-4">
                            <a href="#" onclick="app.navigate('/')" class="flex items-center space-x-2">
                                <div class="w-8 h-8 bg-gradient-to-br from-primary-orange to-golden-yellow rounded-lg flex items-center justify-center">
                                    <i class="fas fa-brain text-white text-sm"></i>
                                </div>
                                <span class="text-xl font-bold text-deep-brown">Research Analyser</span>
                            </a>
                        </div>
                        
                        <nav class="hidden md:flex items-center space-x-8">
                            <a href="#features" class="text-warm-brown hover:text-primary-orange transition-colors">Features</a>
                            <a href="#pricing" class="text-warm-brown hover:text-primary-orange transition-colors">Pricing</a>
                            <a href="#about" class="text-warm-brown hover:text-primary-orange transition-colors">About</a>
                        </nav>
                        
                        <div class="flex items-center space-x-3">
                            <button onclick="app.navigate('/login')" class="px-4 py-2 text-warm-brown hover:text-primary-orange transition-colors font-medium">
                                Sign In
                            </button>
                            <button onclick="app.navigate('/register')" class="px-6 py-2 bg-primary-orange hover:bg-hover-orange text-white font-semibold rounded-lg transition-all duration-200 btn-hover-lift">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }

    renderHeroSection() {
        return `
            <section class="py-20 px-4 sm:px-6 lg:px-8">
                <div class="max-w-7xl mx-auto">
                    <div class="grid lg:grid-cols-2 gap-12 items-center">
                        <div class="space-y-8">
                            <h1 class="text-5xl lg:text-6xl font-bold text-deep-brown leading-tight">
                                Unlock Insights from Your 
                                <span class="text-primary-orange">Research</span>
                            </h1>
                            <p class="text-xl text-warm-brown leading-relaxed">
                                Transform your documents into intelligent conversations. Upload, analyze, and discover insights with our AI-powered research assistant.
                            </p>
                            <div class="flex flex-col sm:flex-row gap-4">
                                <button onclick="app.navigate('/register')" class="px-8 py-4 bg-primary-orange hover:bg-hover-orange text-white font-semibold rounded-lg transition-all duration-200 btn-hover-lift text-lg">
                                    Start Analyzing
                                    <i class="fas fa-arrow-right ml-2"></i>
                                </button>
                                <button onclick="app.showResearchInterface()" class="px-8 py-4 border-2 border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-white transition-all duration-200 rounded-lg font-semibold text-lg">
                                    Try Research Tool
                                    <i class="fas fa-play ml-2"></i>
                                </button>
                            </div>
                            <div class="flex items-center space-x-6 pt-4">
                                <div class="flex items-center space-x-2">
                                    <i class="fas fa-check text-primary-orange"></i>
                                    <span class="text-warm-brown">No setup required</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <i class="fas fa-check text-primary-orange"></i>
                                    <span class="text-warm-brown">Free to start</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="relative">
                            <div class="float-animation">
                                <div class="bg-gradient-to-br from-soft-cream to-white rounded-2xl p-8 shadow-xl border border-border-brown">
                                    <div class="space-y-4">
                                        <div class="flex items-center space-x-3">
                                            <div class="w-3 h-3 bg-red-400 rounded-full"></div>
                                            <div class="w-3 h-3 bg-golden-yellow rounded-full"></div>
                                            <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                                        </div>
                                        <div class="space-y-3">
                                            <div class="h-4 bg-border-brown rounded w-3/4"></div>
                                            <div class="h-4 bg-border-brown rounded w-1/2"></div>
                                            <div class="h-12 bg-primary-orange bg-opacity-20 rounded-lg flex items-center px-4">
                                                <i class="fas fa-file-alt text-primary-orange mr-3"></i>
                                                <span class="text-warm-brown">Research Paper.pdf</span>
                                            </div>
                                            <div class="space-y-2">
                                                <div class="bg-soft-cream p-3 rounded-lg">
                                                    <p class="text-sm text-warm-brown">"What are the key findings?"</p>
                                                </div>
                                                <div class="bg-primary-orange bg-opacity-10 p-3 rounded-lg">
                                                    <p class="text-sm text-deep-brown">The research identifies three major insights...</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Floating elements -->
                            <div class="absolute -top-4 -right-4 w-20 h-20 bg-golden-yellow bg-opacity-20 rounded-full pulse-warm"></div>
                            <div class="absolute -bottom-6 -left-6 w-16 h-16 bg-primary-orange bg-opacity-20 rounded-full pulse-warm" style="animation-delay: 1s"></div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderFeaturesSection() {
        return `
            <section id="features" class="py-20 bg-soft-cream">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-16">
                        <h2 class="text-4xl font-bold text-deep-brown mb-4">Powerful Research Features</h2>
                        <p class="text-xl text-warm-brown max-w-3xl mx-auto">
                            Everything you need to transform your documents into actionable insights
                        </p>
                    </div>
                    
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        ${this.renderFeatureCard('fas fa-upload', 'Smart Upload', 'Support for PDF, DOC, TXT files with intelligent parsing and processing')}
                        ${this.renderFeatureCard('fas fa-comments', 'AI Conversations', 'Natural language interface to query and explore your documents')}
                        ${this.renderFeatureCard('fas fa-search', 'Deep Analysis', 'Extract key insights, summaries, and connections from your content')}
                        ${this.renderFeatureCard('fas fa-history', 'Chat History', 'Keep track of all your research conversations and findings')}
                        ${this.renderFeatureCard('fas fa-download', 'Export Results', 'Download your insights and conversations in multiple formats')}
                        ${this.renderFeatureCard('fas fa-shield-alt', 'Secure & Private', 'Your documents and data remain completely secure and private')}
                    </div>
                </div>
            </section>
        `;
    }

    renderFeatureCard(icon, title, description) {
        return `
            <div class="bg-white p-6 rounded-xl shadow-lg border border-border-brown hover:shadow-xl transition-all duration-300 group">
                <div class="w-12 h-12 bg-gradient-to-br from-primary-orange to-golden-yellow rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <i class="${icon} text-white text-xl"></i>
                </div>
                <h3 class="text-xl font-semibold text-deep-brown mb-2">${title}</h3>
                <p class="text-warm-brown leading-relaxed">${description}</p>
            </div>
        `;
    }

    renderCtaSection() {
        return `
            <section class="py-20 bg-gradient-to-br from-primary-orange to-hover-orange text-white">
                <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 class="text-4xl font-bold mb-6">Ready to Transform Your Research?</h2>
                    <p class="text-xl mb-8 text-white/90">
                        Join thousands of researchers who trust our platform for their document analysis needs.
                    </p>
                    <button onclick="app.navigate('/register')" class="px-8 py-4 bg-white text-primary-orange hover:bg-soft-cream font-semibold rounded-lg transition-all duration-200 btn-hover-lift text-lg">
                        Get Started for Free
                        <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </section>
        `;
    }

    renderFooter() {
        return `
            <footer class="bg-deep-brown text-white py-12">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid md:grid-cols-4 gap-8">
                        <div class="space-y-4">
                            <div class="flex items-center space-x-2">
                                <div class="w-8 h-8 bg-gradient-to-br from-primary-orange to-golden-yellow rounded-lg flex items-center justify-center">
                                    <i class="fas fa-brain text-white text-sm"></i>
                                </div>
                                <span class="text-xl font-bold">Research Analyser</span>
                            </div>
                            <p class="text-gray-400">Transform your documents into intelligent conversations with AI-powered analysis.</p>
                        </div>
                        
                        <div>
                            <h4 class="font-semibold mb-4">Product</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li><a href="#" class="hover:text-primary-orange transition-colors">Features</a></li>
                                <li><a href="#" class="hover:text-primary-orange transition-colors">Pricing</a></li>
                                <li><a href="#" class="hover:text-primary-orange transition-colors">API</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 class="font-semibold mb-4">Company</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li><a href="#" class="hover:text-primary-orange transition-colors">About</a></li>
                                <li><a href="#" class="hover:text-primary-orange transition-colors">Blog</a></li>
                                <li><a href="#" class="hover:text-primary-orange transition-colors">Careers</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 class="font-semibold mb-4">Support</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li><a href="#" class="hover:text-primary-orange transition-colors">Help Center</a></li>
                                <li><a href="#" class="hover:text-primary-orange transition-colors">Contact</a></li>
                                <li><a href="#" class="hover:text-primary-orange transition-colors">Privacy</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 Research Analyser. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
    }
}