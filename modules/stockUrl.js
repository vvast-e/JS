class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    // Получить все карточки
    getStocks() {
        return `${this.baseUrl}/stocks`;
    }

    // Получить конкретную карточку
    getStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    // Создать новую карточку
    createStock() {
        return `${this.baseUrl}/stocks`;
    }

    // Удалить карточку
    removeStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    // Частично обновить карточку (PATCH)
    updateStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    // Полностью заменить карточку (PUT)
    replaceStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }
}

export const stockUrls = new StockUrls();