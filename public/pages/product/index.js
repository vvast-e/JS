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
    }

    async getData() {
        ajax.get(stockUrls.getStockById(this.id), (data, status) => {
            if (status === 200) {
                this.renderData(data);
            } else {
                console.error("Ошибка загрузки карточки:", status);
            }
        });
    }

    handleDelete() {
        if (!confirm('Вы уверены, что хотите удалить эту карточку?')) return;

        ajax.delete(stockUrls.removeStockById(this.id), (data, status) => {
            if (status === 200) {
                alert('Карточка успешно удалена');
                this.mainPage.getData(); // Обновляем список на главной странице
                this.clickBack(); // Возвращаемся назад
            } else {
                alert('Ошибка при удалении карточки');
            }
        });
    }

    clickBack() {
        this.mainPage.render();
    }
    toggleEditMode() {
        this.isEditing = !this.isEditing;

        if (this.isEditing) {
            // Показываем форму редактирования
            this.renderEditForm();
        } else {
            // Скрываем форму
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
            (updatedData) => {
                this.handleFormSubmit(updatedData);
                this.toggleEditMode(); // Выходим из режима редактирования после сохранения
            }
        ).render();
    }

    renderData(item) {
        if (!this.pageRoot || !item) return;

        this.productData = item;

        this.pageRoot.innerHTML = '';

        const productContainer = document.createElement('div');
        this.pageRoot.appendChild(productContainer);

        const product = new ProductCardComponent(productContainer);
        product.render(item, this.mainPage);

        // Добавляем кнопку редактирования
        const editButton = document.createElement('button');
        editButton.textContent = 'Редактировать';
        editButton.className = 'edit-button';
        editButton.addEventListener('click', () => this.toggleEditMode());
        this.pageRoot.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.className = 'delete-button btn btn-danger ms-3';
        deleteButton.addEventListener('click', () => this.handleDelete());
        this.pageRoot.appendChild(deleteButton);

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