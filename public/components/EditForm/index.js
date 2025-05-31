import { ajax } from "../../../modules/ajax.js";
import { stockUrls } from "../../../modules/stockUrl.js";

export class EditForm {
    constructor(parent, stockId, initialData) {
        this.parent = parent;         // DOM-элемент для вставки формы
        this.stockId = stockId;      // ID редактируемой карточки
        this.initialData = initialData; // Начальные данные карточки
    }

    render() {
        // Создаем HTML форму с полями для редактирования
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
                <button type="submit" class="save-btn">Сохранить изменения</button>
            </form>
        `;

        // Навешиваем обработчик отправки формы
        this.parent.querySelector('form').addEventListener('submit', this.handleSubmit.bind(this));
    }

    handleSubmit(e) {
        e.preventDefault();

        // Собираем данные из формы
        const formData = {
            title: e.target.title.value,
            text: e.target.text.value,
            src: e.target.src.value
        };

        // Отправляем PUT запрос для полного обновления
        ajax.put(
            stockUrls.replaceStockById(this.stockId),
            formData,
            (data, status) => {
                if (status === 200) {
                    alert('Данные успешно обновлены!');
                    // Можно добавить перезагрузку данных или переход на другую страницу
                } else {
                    alert('Ошибка при обновлении данных');
                }
            }
        );
    }
}