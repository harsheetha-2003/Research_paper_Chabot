class Button {
    static render(text, options = {}) {
        const {
            variant = 'primary',
            size = 'medium',
            icon = null,
            iconPosition = 'left',
            onClick = null,
            disabled = false,
            className = '',
            id = null,
            type = 'button'
        } = options;

        const baseClasses = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2';
        
        const variants = {
            primary: 'bg-primary-orange hover:bg-hover-orange text-white focus:ring-primary-orange focus:ring-opacity-30 btn-hover-lift',
            secondary: 'border-2 border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-white',
            outline: 'border border-border-brown text-warm-brown hover:bg-soft-cream',
            ghost: 'text-primary-orange hover:bg-primary-orange hover:bg-opacity-10',
            danger: 'bg-red-400 hover:bg-red-500 text-white focus:ring-red-400 focus:ring-opacity-30'
        };

        const sizes = {
            small: 'px-3 py-1.5 text-sm',
            medium: 'px-6 py-2',
            large: 'px-8 py-4 text-lg'
        };

        const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
        
        const iconHtml = icon ? `<i class="${icon} ${iconPosition === 'right' ? 'ml-2' : 'mr-2'}"></i>` : '';
        const content = iconPosition === 'left' ? `${iconHtml}${text}` : `${text}${iconHtml}`;

        const onClickAttr = onClick ? `onclick="${onClick}"` : '';
        const idAttr = id ? `id="${id}"` : '';
        const disabledAttr = disabled ? 'disabled' : '';

        return `
            <button 
                ${idAttr}
                type="${type}"
                class="${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}"
                ${onClickAttr}
                ${disabledAttr}
            >
                ${content}
            </button>
        `;
    }
}

// Export for use in other components
window.Button = Button;