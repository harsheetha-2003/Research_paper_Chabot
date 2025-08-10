class Modal {
    static render(content, options = {}) {
        const {
            title = null,
            size = 'medium',
            id = null,
            showCloseButton = true,
            onClose = null,
            className = '',
            backdrop = true,
            backdropClass = 'bg-deep-brown bg-opacity-60'
        } = options;

        const sizes = {
            small: 'max-w-md',
            medium: 'max-w-2xl',
            large: 'max-w-4xl',
            xlarge: 'max-w-6xl'
        };

        const modalId = id || `modal-${Math.random().toString(36).substr(2, 9)}`;
        const closeFunction = onClose || `document.getElementById('${modalId}').classList.add('hidden')`;

        const titleHtml = title ? `
            <div class="p-6 border-b border-border-brown flex items-center justify-between">
                <h3 class="text-xl font-semibold text-deep-brown">${title}</h3>
                ${showCloseButton ? `
                    <button onclick="${closeFunction}" class="p-2 hover:bg-golden-yellow hover:bg-opacity-20 rounded-lg transition-colors text-deep-brown">
                        <i class="fas fa-times"></i>
                    </button>
                ` : ''}
            </div>
        ` : '';

        const backdropHtml = backdrop ? `
            <div class="fixed inset-0 ${backdropClass}" onclick="${closeFunction}"></div>
        ` : '';

        return `
            <div id="${modalId}" class="fixed inset-0 z-50 flex items-center justify-center p-4 hidden">
                ${backdropHtml}
                <div class="relative bg-white rounded-xl border border-border-brown ${sizes[size]} w-full max-h-[90vh] flex flex-col shadow-xl ${className}">
                    ${titleHtml}
                    <div class="flex-1 overflow-y-auto">
                        ${content}
                    </div>
                </div>
            </div>
        `;
    }

    static renderConfirmModal(message, options = {}) {
        const {
            title = 'Confirm Action',
            confirmText = 'Confirm',
            cancelText = 'Cancel',
            confirmVariant = 'primary',
            onConfirm = null,
            onCancel = null,
            id = null
        } = options;

        const modalId = id || `confirm-modal-${Math.random().toString(36).substr(2, 9)}`;
        const confirmFunction = onConfirm || 'console.log("Confirmed")';
        const cancelFunction = onCancel || `document.getElementById('${modalId}').classList.add('hidden')`;

        const content = `
            <div class="p-6">
                <div class="flex items-center space-x-4 mb-6">
                    <div class="w-12 h-12 bg-golden-yellow bg-opacity-20 rounded-full flex items-center justify-center">
                        <i class="fas fa-question-circle text-golden-yellow text-xl"></i>
                    </div>
                    <div class="flex-1">
                        <p class="text-deep-brown leading-relaxed">${message}</p>
                    </div>
                </div>
                <div class="flex justify-end space-x-3">
                    ${Button.render(cancelText, {
                        variant: 'outline',
                        onClick: cancelFunction
                    })}
                    ${Button.render(confirmText, {
                        variant: confirmVariant,
                        onClick: `${confirmFunction}; ${cancelFunction}`
                    })}
                </div>
            </div>
        `;

        return this.render(content, {
            title,
            id: modalId,
            size: 'small',
            showCloseButton: false
        });
    }

    static renderLoadingModal(message = 'Loading...', options = {}) {
        const {
            title = null,
            subtext = null,
            id = null,
            spinner = true
        } = options;

        const modalId = id || `loading-modal-${Math.random().toString(36).substr(2, 9)}`;

        const spinnerHtml = spinner ? `
            <div class="relative mb-4">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-orange"></div>
                <div class="absolute inset-0 rounded-full border-2 border-border-brown"></div>
            </div>
        ` : '';

        const subtextHtml = subtext ? `
            <div class="text-sm text-warm-brown mt-1">${subtext}</div>
        ` : '';

        const content = `
            <div class="p-8 text-center">
                ${spinnerHtml}
                <div class="text-lg font-medium text-deep-brown">${message}</div>
                ${subtextHtml}
            </div>
        `;

        return this.render(content, {
            title,
            id: modalId,
            size: 'small',
            showCloseButton: false,
            backdrop: false
        });
    }

    static show(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    static hide(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    static updateContent(modalId, newContent) {
        const modal = document.getElementById(modalId);
        if (modal) {
            const contentContainer = modal.querySelector('.flex-1.overflow-y-auto');
            if (contentContainer) {
                contentContainer.innerHTML = newContent;
            }
        }
    }
}

// Export for use in other components
window.Modal = Modal;