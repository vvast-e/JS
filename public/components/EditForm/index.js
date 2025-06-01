import { ajax } from "../../../modules/ajax.js";
import { stockUrls } from "../../../modules/stockUrl.js";

export class EditForm {
    constructor(parent, stockId, initialData, onSubmit) {
        this.parent = parent;
        this.stockId = stockId;
        this.initialData = initialData;
        this.onSubmit = onSubmit;
    }

    render() {
        this.parent.innerHTML = `
            <form class="edit-form">
                <div class="form-group">
                    <label>Название:</label>
                    <input type="text" name="title" value="${this.initialData.title}">
                </div>
                <div class="form-group">
                    <label>Описание:</label>
                    <input type="text" name="text" value="${this.initialData.text}">
                </div>
                <div class="form-group">
                    <label>URL изображения:</label>
                    <input type="text" name="src" value="${this.initialData.src}">
                </div>
                <button type="submit" class="save-btn btn btn-success">Сохранить изменения</button>
            </form>
        `;

        const form = this.parent.querySelector('.edit-form');
        form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(e) {
        e.preventDefault();

        const formData = {
            title: e.target.title.value.trim(),
            text: e.target.text.value.trim(),
            src: e.target.src.value.trim()
        };

        try {
            const data = await ajax.put(stockUrls.replaceStockById(this.stockId), formData);
            alert('Данные успешно обновлены!');
            this.onSubmit(data); // передаём обновлённые данные
        } catch (error) {
            alert('Ошибка при сохранении изменений');
            console.error('Ошибка PUT-запроса:', error);
        }
    }
}