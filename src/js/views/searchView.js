import {
    elements
} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPage.innerHTML = `<h1 class="app-title--text">Find top 10 restaurant in your current location!
    <span> <img src="img/logo.png" alt="Logo" class="header__logo"></span></h1>`;
}