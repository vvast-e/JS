
export class AccordionComponent {
    constructor(parent, items = []) {
        this.parent = parent;
        this.items = items;
    }

    getHTML() {
        return `
            <div class="accordion accordion-flush" id="accordionExample">
                ${this.items.map((item, index) => `
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading${index}">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                                ${item.title}
                            </button>
                        </h2>
                        <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                ${item.content}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}