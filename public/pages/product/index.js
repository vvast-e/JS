import { ProductCardComponent } from "../../components/Product";  // Расширенный компонент
import { BackButtonComponent } from "../../components/back-button";
import { ajax } from "../../../modules/ajax.js";
import { stockUrls } from "../../../modules/stockUrl.js";
import { EditForm } from "../../components/EditForm"; // Импорт формы

export class ProductPage {
    constructor(parent, id, mainPage) {
        this.parent = parent;
        this.id = id;
        this.mainPage = mainPage;
        this.isEditing = false;
        this.pageRoot = null;
    }

    async getData() {
        try {
            const data = await ajax.get(stockUrls.getStockById(this.id));
            this.renderData(data);
        } catch (error) {
            console.error("Ошибка загрузки карточки:", error);
        }
    }

    async handleDelete() {
        if (!confirm('Вы уверены, что хотите удалить эту карточку?')) return;

        try {
            await ajax.delete(stockUrls.removeStockById(this.id));
            alert('Карточка успешно удалена');
            this.mainPage.getData(); // Обновляем список на главной странице
            this.clickBack(); // Возвращаемся назад
        } catch (error) {
            console.error("Ошибка при удалении карточки:", error);
            alert('Ошибка при удалении карточки');
        }
    }

    clickBack() {
        this.mainPage.render();
    }

    toggleEditMode() {
        this.isEditing = !this.isEditing;

        if (this.isEditing) {
            this.renderEditForm();
        } else {
            const formContainer = this.pageRoot.querySelector('.edit-form-container');
            if (formContainer) formContainer.remove();
        }
    }

    renderEditForm() {
        const formContainer = document.createElement('div');
        formContainer.className = 'edit-form-container';
        this.pageRoot.appendChild(formContainer);

        new EditForm(
            formContainer,
            this.id,
            this.productData,
            async (updatedData) => {
                try {
                    const result = await ajax.put(stockUrls.replaceStockById(this.id), updatedData);
                    this.handleFormSubmit(result);
                    this.toggleEditMode();
                } catch (error) {
                    alert('Ошибка при сохранении изменений');
                    console.error('Ошибка PUT-запроса:', error);
                }
            }
        ).render();
    }

    handleFormSubmit(updatedData) {
        this.productData = updatedData;
        this.renderData(updatedData);
    }

    renderData(item) {
        if (!this.pageRoot || !item) return;

        this.productData = item;

        this.pageRoot.innerHTML = '';

        const productContainer = document.createElement('div');
        this.pageRoot.appendChild(productContainer);

        const product = new ProductCardComponent(productContainer);
        product.render(item, this.mainPage);

        // Кнопка редактирования
        const editButton = document.createElement('button');
        editButton.textContent = 'Редактировать';
        editButton.className = 'edit-button';
        editButton.addEventListener('click', () => this.toggleEditMode());
        this.pageRoot.appendChild(editButton);

        // Кнопка удаления
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.className = 'delete-button btn btn-danger ms-3';
        deleteButton.addEventListener('click', () => this.handleDelete());
        this.pageRoot.appendChild(deleteButton);

        // Кнопка "Назад"
        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));
    }

    render() {
        this.parent.innerHTML = '';
        this.pageRoot = document.createElement('div');
        this.parent.appendChild(this.pageRoot);
        this.getData();
    }
}