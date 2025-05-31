export class LikeButton {
    constructor(parent, onClick) {
        this.parent = parent;
        this.onClick = onClick;
        this.isLiked = false;
    }

    render(isActive) {
        const button = document.createElement('button');
        button.className = `btn ${isActive ? 'btn-success' : 'btn-outline-success'} like-btn`;
        button.innerHTML = `<i class="bi bi-hand-thumbs-up${isActive ? '-fill' : ''}"></i> ${isActive ? '<span class="text-light">Liked</span>' : 'Like'}`;

        button.addEventListener('click', () => {
            this.toggleLike(button);
            this.onClick();
        });

        this.parent.appendChild(button);
        this.updateButtonState(button);
    }

    toggleLike(button) {
        this.isLiked = !this.isLiked;
        this.updateButtonState(button);
    }

    updateButtonState(button) {
        if (this.isLiked) {
            button.classList.remove('btn-outline-success');
            button.classList.add('btn-success');
            button.innerHTML = `<i class="bi bi-hand-thumbs-up-fill" style="color:white"></i> <span class="text-light">Liked</span>`;
        } else {
            button.classList.remove('btn-success');
            button.classList.add('btn-outline-success');
            button.innerHTML = `<i class="bi bi-hand-thumbs-up"></i> Like`;
        }
    }
}
