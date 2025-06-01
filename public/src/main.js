import { MainPage } from '../pages/main';
import 'bootstrap/dist/css/bootstrap.css';

const root = document.getElementById('root');
const mainPage = new MainPage(root);
mainPage.render();