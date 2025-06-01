import {ajax} from "../../../modules/ajax.js";
import {stockUrls} from "../../../modules/stockUrl.js";

export class CreateForm {
    constructor(parent, onCreate) {
        this.parent = parent;
        this.onCreate = onCreate;
    }

    render() {
        this.parent.innerHTML = `
            <form class="create-form">
                <h4>Добавить кошечку</h4>
                <div class="form-group">
                    <label for="title">Название:</label>
                    <input type="text" name="title" id="title" required />
                </div>
                <div class="form-group">
                    <label for="text">Описание:</label>
                    <input type="text" name="text" id="text" required />
                </div>
                <div class="form-group">
                    <label for="src">URL изображения:</label>
                    <input type="text" name="src" id="src" required />
                </div>
                <button type="submit" class="btn btn-success">Создать</button>
            </form>
        `;

        const form = this.parent.querySelector('.create-form');
        form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(e) {
        e.preventDefault();

        const formData = {
            title: e.target.title.value.trim(),
            text: e.target.text.value.trim(),
            src: e.target.src.value.trim(),
        };

        try {
            const data = await ajax.post(stockUrls.createStock(), formData);
            alert('Карточка успешно создана!');
            this.onCreate(data); // Передаём новую карточку обратно
        } catch (error) {
            alert('Ошибка при создании карточки');
            console.error('Ошибка создания карточки:', error);
        }
    }
}