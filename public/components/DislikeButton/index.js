export class DislikeButton {
    constructor(parent, onClick) {
        this.parent = parent;
        this.onClick = onClick;
        this.isDisliked = false;
    }

    render(isActive) {
        const button = document.createElement('button');
        button.className = `btn ${isActive ? 'btn-danger' : 'btn-outline-danger'} dislike-btn`;
        button.innerHTML = `<i class="bi bi-hand-thumbs-down${isActive ? '-fill' : ''}"></i> ${isActive ? '<span class="text-light">Disliked</span>' : 'Dislike'}`;

        button.addEventListener('click', () => {
            this.toggleDislike(button);
            this.onClick();
        });

        this.parent.appendChild(button);
        this.updateButtonState(button);
    }

    toggleDislike(button) {
        this.isDisliked = !this.isDisliked;
        this.updateButtonState(button);
    }

    updateButtonState(button) {
        if (this.isDisliked) {
            button.classList.remove('btn-outline-danger');
            button.classList.add('btn-danger');
            button.innerHTML = `<i class="bi bi-hand-thumbs-down-fill"></i> <span class="text-light">Disliked</span>`;
        } else {
            button.classList.remove('btn-danger');
            button.classList.add('btn-outline-danger');
            button.innerHTML = `<i class="bi bi-hand-thumbs-down"></i> Dislike`;
        }
    }
}
