import { ajax } from "../../../modules/ajax.js";
import { stockUrls } from "../../../modules/stockUrl.js";
import { ProductCard } from "../../components/Product-Card";
import { ProductPage } from "../product";
import { CreateForm } from "../../components/CreateForm";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.container = parent;
        this.pageRoot = document.createElement('div');
        this.pageRoot.className = 'main-page';
        this.formInitialized = false; // Флаг для формы создания
    }

    async render() {
        this.parent.innerHTML = '';
        this.parent.appendChild(this.pageRoot);
        this.pageRoot.innerHTML = this.getHTML();

        try {
            const items = await ajax.get(stockUrls.getStocks());
            this.renderData(items);
        } catch (error) {
            this.showError(`Не удалось загрузить данные: ${error.message}`);
        }
    }

    async renderData(items) {
        if (!items || !Array.isArray(items)) {
            console.error('Получены некорректные данные:', items);
            this.showError('Невозможно отобразить карточки');
            return;
        }

        // Очищаем pageRoot, но оставляем заголовок
        const header = this.pageRoot.querySelector('.main-header');
        this.pageRoot.innerHTML = '';
        if (header) this.pageRoot.appendChild(header);

        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'cards-container';
        cardsContainer.style.display = 'flex';
        cardsContainer.style.flexWrap = 'wrap';
        cardsContainer.style.gap = '20px';

        items.forEach(item => {
            if (!item || !item.id) {
                console.warn('Пропущен невалидный элемент:', item);
                return;
            }

            try {
                const cardWrapper = document.createElement('div');
                cardWrapper.className = 'card-wrapper';

                const productCard = new ProductCard(cardWrapper);
                productCard.render(item, () => this.clickCard(item.id));

                cardsContainer.appendChild(cardWrapper);
            } catch (e) {
                console.error('Ошибка рендеринга карточки:', e);
            }
        });

        // Добавляем форму создания один раз
        if (!this.formInitialized) {
            const createFormContainer = document.createElement('div');
            new CreateForm(createFormContainer, async (newCard) => {
                try {
                    const cardWrapper = document.createElement('div');
                    const productCard = new ProductCard(cardWrapper);
                    productCard.render(newCard, () => this.clickCard(newCard.id));
                    cardsContainer.appendChild(cardWrapper);
                } catch (e) {
                    console.error('Ошибка при добавлении новой карточки:', e);
                }
            }).render();

            this.pageRoot.prepend(createFormContainer);
            this.formInitialized = true;
        }

        this.pageRoot.appendChild(cardsContainer);
    }

    clickCard(id) {
        const productPage = new ProductPage(this.container, id, this);
        productPage.render();
    }

    showError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;

        this.pageRoot.innerHTML = '';
        this.pageRoot.appendChild(errorElement);
    }

    getHTML() {
        return `
            <div class="main-header">
                <h1>Кошечки</h1>
            </div>
        `;
    }
}