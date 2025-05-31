export class Ajax {
    async get(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Ошибка GET-запроса: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Ошибка сети или сервера:', error);
            throw error;
        }
    }

    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Ошибка POST-запроса: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Ошибка отправки данных:', error);
            throw error;
        }
    }

    async put(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Ошибка PUT-запроса: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Ошибка редактирования:', error);
            throw error;
        }
    }

    async delete(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`Ошибка DELETE-запроса: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Ошибка удаления:', error);
            throw error;
        }
    }
}

export const ajax = new Ajax();