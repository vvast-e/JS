import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: './vite', // Путь к папке с собранной статикой
        emptyOutDir: true, // Очищает папку перед сборкой
        assetsDir: 'assets', // Путь для сборки ассетов
    },
});