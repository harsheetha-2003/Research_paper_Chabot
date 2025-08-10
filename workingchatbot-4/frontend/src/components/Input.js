class Input {
    static render(options = {}) {
        const {
            type = 'text',
            placeholder = '',
            value = '',
            label = null,
            id = null,
            name = null,
            required = false,
            disabled = false,
            className = '',
            icon = null,
            iconPosition = 'left',
            error = null,
            helpText = null,
            onInput = null,
            onChange = null,
            onFocus = null,
            onBlur = null
        } = options;

        const baseClasses = 'w-full p-3 border border-border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-primary-orange transition-all duration-200';
        const errorClasses = error ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : '';
        const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white';
        
        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
        const inputName = name || inputId;

        const labelHtml = label ? `
            <label for="${inputId}" class="block text-sm font-medium text-warm-brown mb-2">
                ${label} ${required ? '<span class="text-red-400">*</span>' : ''}
            </label>
        ` : '';

        const iconHtml = icon ? `
            <div class="absolute ${iconPosition === 'right' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-warm-brown">
                <i class="${icon}"></i>
            </div>
        ` : '';

        const paddingClass = icon ? (iconPosition === 'right' ? 'pr-10' : 'pl-10') : '';

        const errorHtml = error ? `
            <div class="mt-1 text-sm text-red-400 flex items-center">
                <i class="fas fa-exclamation-circle mr-1"></i>
                ${error}
            </div>
        ` : '';

        const helpTextHtml = helpText && !error ? `
            <div class="mt-1 text-sm text-warm-brown">${helpText}</div>
        ` : '';

        const eventHandlers = [
            onInput ? `oninput="${onInput}"` : '',
            onChange ? `onchange="${onChange}"` : '',
            onFocus ? `onfocus="${onFocus}"` : '',
            onBlur ? `onblur="${onBlur}"` : ''
        ].filter(Boolean).join(' ');

        return `
            <div class="mb-4">
                ${labelHtml}
                <div class="relative">
                    ${iconHtml}
                    <input
                        type="${type}"
                        id="${inputId}"
                        name="${inputName}"
                        placeholder="${placeholder}"
                        value="${value}"
                        class="${baseClasses} ${errorClasses} ${disabledClasses} ${paddingClass} ${className}"
                        ${required ? 'required' : ''}
                        ${disabled ? 'disabled' : ''}
                        ${eventHandlers}
                    />
                </div>
                ${errorHtml}
                ${helpTextHtml}
            </div>
        `;
    }

    static renderTextarea(options = {}) {
        const {
            placeholder = '',
            value = '',
            label = null,
            id = null,
            name = null,
            required = false,
            disabled = false,
            className = '',
            rows = 4,
            maxLength = null,
            error = null,
            helpText = null,
            showCharCount = false,
            onInput = null,
            onChange = null,
            onFocus = null,
            onBlur = null
        } = options;

        const baseClasses = 'w-full p-3 border border-border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-primary-orange transition-all duration-200 resize-none';
        const errorClasses = error ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : '';
        const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white';
        
        const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
        const textareaName = name || textareaId;

        const labelHtml = label ? `
            <label for="${textareaId}" class="block text-sm font-medium text-warm-brown mb-2">
                ${label} ${required ? '<span class="text-red-400">*</span>' : ''}
            </label>
        ` : '';

        const charCountHtml = showCharCount && maxLength ? `
            <div class="absolute bottom-2 right-3 text-xs text-warm-brown">
                <span id="${textareaId}-count">${value.length}</span>/${maxLength}
            </div>
        ` : '';

        const errorHtml = error ? `
            <div class="mt-1 text-sm text-red-400 flex items-center">
                <i class="fas fa-exclamation-circle mr-1"></i>
                ${error}
            </div>
        ` : '';

        const helpTextHtml = helpText && !error ? `
            <div class="mt-1 text-sm text-warm-brown">${helpText}</div>
        ` : '';

        const eventHandlers = [
            onInput ? `oninput="${onInput}"` : '',
            onChange ? `onchange="${onChange}"` : '',
            onFocus ? `onfocus="${onFocus}"` : '',
            onBlur ? `onblur="${onBlur}"` : ''
        ].filter(Boolean).join(' ');

        const maxLengthAttr = maxLength ? `maxlength="${maxLength}"` : '';

        return `
            <div class="mb-4">
                ${labelHtml}
                <div class="relative">
                    <textarea
                        id="${textareaId}"
                        name="${textareaName}"
                        placeholder="${placeholder}"
                        rows="${rows}"
                        class="${baseClasses} ${errorClasses} ${disabledClasses} ${className}"
                        ${required ? 'required' : ''}
                        ${disabled ? 'disabled' : ''}
                        ${maxLengthAttr}
                        ${eventHandlers}
                    >${value}</textarea>
                    ${charCountHtml}
                </div>
                ${errorHtml}
                ${helpTextHtml}
            </div>
        `;
    }

    static renderSelect(options = [], selectOptions = {}) {
        const {
            label = null,
            id = null,
            name = null,
            required = false,
            disabled = false,
            className = '',
            value = '',
            placeholder = 'Select an option',
            error = null,
            helpText = null,
            onChange = null
        } = selectOptions;

        const baseClasses = 'w-full p-3 border border-border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-primary-orange transition-all duration-200 bg-white';
        const errorClasses = error ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : '';
        const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : '';
        
        const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
        const selectName = name || selectId;

        const labelHtml = label ? `
            <label for="${selectId}" class="block text-sm font-medium text-warm-brown mb-2">
                ${label} ${required ? '<span class="text-red-400">*</span>' : ''}
            </label>
        ` : '';

        const placeholderOption = placeholder ? `<option value="" disabled ${!value ? 'selected' : ''}>${placeholder}</option>` : '';

        const optionsHtml = options.map(option => {
            const optionValue = typeof option === 'object' ? option.value : option;
            const optionLabel = typeof option === 'object' ? option.label : option;
            const selected = optionValue === value ? 'selected' : '';
            return `<option value="${optionValue}" ${selected}>${optionLabel}</option>`;
        }).join('');

        const errorHtml = error ? `
            <div class="mt-1 text-sm text-red-400 flex items-center">
                <i class="fas fa-exclamation-circle mr-1"></i>
                ${error}
            </div>
        ` : '';

        const helpTextHtml = helpText && !error ? `
            <div class="mt-1 text-sm text-warm-brown">${helpText}</div>
        ` : '';

        const onChangeAttr = onChange ? `onchange="${onChange}"` : '';

        return `
            <div class="mb-4">
                ${labelHtml}
                <div class="relative">
                    <select
                        id="${selectId}"
                        name="${selectName}"
                        class="${baseClasses} ${errorClasses} ${disabledClasses} ${className}"
                        ${required ? 'required' : ''}
                        ${disabled ? 'disabled' : ''}
                        ${onChangeAttr}
                    >
                        ${placeholderOption}
                        ${optionsHtml}
                    </select>
                    <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <i class="fas fa-chevron-down text-warm-brown"></i>
                    </div>
                </div>
                ${errorHtml}
                ${helpTextHtml}
            </div>
        `;
    }
}

// Export for use in other components
window.Input = Input;