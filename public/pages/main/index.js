import { ajax } from "../../../modules/ajax.js";
import { stockUrls } from "../../../modules/stockUrl.js";
import { ProductCard } from "../../components/Product-Card";
import {ProductPage} from "../product";
import {CreateForm} from "../../components/CreateForm";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.container = parent;
        this.pageRoot = document.createElement('div');
        this.pageRoot.className = 'main-page';

    }

    async getData() {
        try {
            ajax.get(
                stockUrls.getStocks(),
                (data, status) => {
                    if (status === 200 && data) {
                        this.renderData(data);
                    } else {
                        this.showError(`Ошибка загрузки: ${status}`);
                    }
                },
                (error) => {
                    this.showError(`Ошибка сети: ${error}`);
                }
            );
        } catch (error) {
            this.showError(`Неизвестная ошибка: ${error}`);
        }
    }

    renderData(items) {
        if (!items || !Array.isArray(items)) {
            console.error('Получены некорректные данные:', items);
            this.showError('Невозможно отобразить карточки');
            return;
        }

        this.pageRoot.innerHTML = '';

        const cardsContainer = this.pageRoot.querySelector('.cards-container') || document.createElement('div');
        if (!cardsContainer.className.includes('cards-container')) {
            cardsContainer.className = 'cards-container';
            this.pageRoot.appendChild(cardsContainer);
        }
        cardsContainer.innerHTML = '';

        cardsContainer.style.display = 'flex';
        cardsContainer.style.flexWrap = 'wrap';      // Перенос на следующую строку при нехватке места
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
        const createFormContainer = document.createElement('div');
        this.pageRoot.prepend(createFormContainer);

        new CreateForm(createFormContainer, (newCard) => {
            const cardWrapper = document.createElement('div');
            const productCard = new ProductCard(cardWrapper);
            productCard.render(newCard, () => this.clickCard(newCard.id));

            cardsContainer.appendChild(cardWrapper);
        }).render();
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
            <div class="cards-container"></div>
            <div class="loading">Загрузка данных...</div>
        `;
    }


    render() {
        this.parent.innerHTML = '';
        this.parent.appendChild(this.pageRoot);
        this.pageRoot.innerHTML = this.getHTML();
        this.getData();
    }
}