export class ProductCard {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card" style="width: 300px;">
                <div class="image-container" style="width: 100%; height: 200px; overflow: hidden;">
                    <img class="card-img-top" src="${data.src}" alt="картинка" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Узнать больше...</button>
                    <div class="d-flex justify-content-between mt-2">
                        <div class="d-flex align-items-center">
                            <i class="bi bi-hand-thumbs-up-fill text-success me-1"></i>
                            <span id="like-counter-${data.id}">${data.likes}</span>
                        </div>
                        <div class="d-flex align-items-center">
                            <i class="bi bi-hand-thumbs-down-fill text-danger me-1"></i>
                            <span id="dislike-counter-${data.id}">${data.dislikes}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
        const button = this.parent.querySelector(`#click-card-${data.id}`);
        if (button) {
            button.addEventListener("click", listener);
        } else {
            console.error(`Кнопка click-card-${data.id} не найдена`);
        }
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}
