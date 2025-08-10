class Card {
    static render(content, options = {}) {
        const {
            title = null,
            className = '',
            padding = 'p-6',
            shadow = 'shadow-lg',
            border = 'border border-border-brown',
            background = 'bg-white',
            hover = 'hover:shadow-xl',
            id = null
        } = options;

        const baseClasses = `${background} rounded-xl ${shadow} ${border} ${hover} transition-all duration-300 ${padding} ${className}`;
        const idAttr = id ? `id="${id}"` : '';

        const titleHtml = title ? `<h3 class="text-xl font-semibold text-deep-brown mb-4">${title}</h3>` : '';

        return `
            <div ${idAttr} class="${baseClasses}">
                ${titleHtml}
                ${content}
            </div>
        `;
    }

    static renderFeatureCard(icon, title, description, options = {}) {
        const content = `
            <div class="w-12 h-12 bg-gradient-to-br from-primary-orange to-golden-yellow rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <i class="${icon} text-white text-xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-deep-brown mb-3">${title}</h3>
            <p class="text-warm-brown leading-relaxed">${description}</p>
        `;

        return this.render(content, {
            className: 'group',
            ...options
        });
    }

    static renderStatsCard(value, label, icon = null, options = {}) {
        const iconHtml = icon ? `<i class="${icon} text-primary-orange text-2xl mb-2"></i>` : '';
        
        const content = `
            <div class="text-center">
                ${iconHtml}
                <div class="text-3xl font-bold text-deep-brown mb-1">${value}</div>
                <div class="text-warm-brown">${label}</div>
            </div>
        `;

        return this.render(content, {
            background: 'bg-soft-cream',
            ...options
        });
    }

    static renderTestimonialCard(quote, author, role, avatar = null, options = {}) {
        const avatarHtml = avatar 
            ? `<img src="${avatar}" alt="${author}" class="w-12 h-12 rounded-full object-cover">`
            : `<div class="w-12 h-12 bg-gradient-to-br from-primary-orange to-golden-yellow rounded-full flex items-center justify-center">
                <i class="fas fa-user text-white"></i>
               </div>`;

        const content = `
            <div class="space-y-4">
                <p class="text-warm-brown italic leading-relaxed">"${quote}"</p>
                <div class="flex items-center space-x-3">
                    ${avatarHtml}
                    <div>
                        <div class="font-semibold text-deep-brown">${author}</div>
                        <div class="text-sm text-warm-brown">${role}</div>
                    </div>
                </div>
            </div>
        `;

        return this.render(content, options);
    }
}

// Export for use in other components
window.Card = Card;