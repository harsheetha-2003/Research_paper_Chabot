class Toast {
    static show(message, type = 'success', duration = 3000) {
        // Remove any existing toasts
        this.removeAll();

        const toast = this.create(message, type);
        document.body.appendChild(toast);

        // Trigger animation
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        if (duration > 0) {
            setTimeout(() => {
                this.remove(toast);
            }, duration);
        }

        return toast;
    }

    static create(message, type) {
        const toastId = `toast-${Math.random().toString(36).substr(2, 9)}`;
        
        const types = {
            success: {
                bgColor: 'bg-primary-orange',
                icon: 'fas fa-check-circle',
                textColor: 'text-white'
            },
            error: {
                bgColor: 'bg-red-400',
                icon: 'fas fa-exclamation-circle',
                textColor: 'text-white'
            },
            warning: {
                bgColor: 'bg-golden-yellow',
                icon: 'fas fa-exclamation-triangle',
                textColor: 'text-deep-brown'
            },
            info: {
                bgColor: 'bg-blue-400',
                icon: 'fas fa-info-circle',
                textColor: 'text-white'
            }
        };

        const config = types[type] || types.success;

        const toastElement = document.createElement('div');
        toastElement.id = toastId;
        toastElement.className = `fixed top-4 right-4 ${config.bgColor} ${config.textColor} p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 z-50 max-w-sm`;
        
        toastElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <i class="${config.icon}"></i>
                    <span class="font-medium">${message}</span>
                </div>
                <button onclick="Toast.remove(this.parentElement)" class="ml-4 opacity-70 hover:opacity-100 transition-opacity">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        return toastElement;
    }

    static remove(toastElement) {
        if (toastElement && toastElement.parentElement) {
            toastElement.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toastElement.parentElement) {
                    toastElement.parentElement.removeChild(toastElement);
                }
            }, 300);
        }
    }

    static removeAll() {
        const existingToasts = document.querySelectorAll('[id^="toast-"]');
        existingToasts.forEach(toast => this.remove(toast));
    }

    static success(message, duration = 3000) {
        return this.show(message, 'success', duration);
    }

    static error(message, duration = 5000) {
        return this.show(message, 'error', duration);
    }

    static warning(message, duration = 4000) {
        return this.show(message, 'warning', duration);
    }

    static info(message, duration = 3000) {
        return this.show(message, 'info', duration);
    }

    static promise(promise, messages = {}) {
        const {
            loading = 'Loading...',
            success = 'Success!',
            error = 'Something went wrong'
        } = messages;

        const loadingToast = this.show(loading, 'info', 0);

        return promise
            .then((result) => {
                this.remove(loadingToast);
                this.success(success);
                return result;
            })
            .catch((err) => {
                this.remove(loadingToast);
                this.error(typeof error === 'function' ? error(err) : error);
                throw err;
            });
    }
}

// Export for use in other components
window.Toast = Toast;