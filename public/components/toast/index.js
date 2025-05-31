// components/toast/state.js
export class ToastComponent {
    constructor(parent, options = {}) {
        this.parent = parent;
        this.options = options;
    }

    getHTML() {
        return `
            <div aria-live="polite" aria-atomic="true" class="position-fixed bottom-0 end-0 p-3">
                <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header bg-info text-white">
                        <strong class="me-auto">${this.options.title}</strong>
                        <small class="text-muted">${this.options.time}</small>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Закрыть"></button>
                    </div>
                    <div class="toast-body">
                        ${this.options.message || "Сообщение отсутствует."}
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // Инициализация toast
        const toastElement = this.parent.querySelector('.toast');
        const toast = new bootstrap.Toast(toastElement, {
            autohide: this.options.autohide,
            delay: this.options.delay
        });
        toast.show();
    }
}