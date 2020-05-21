export const elements = {
    headerArea: document.querySelector('.header'),
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPage: document.querySelector('.app-title'),
    cardResult: document.querySelector('.card'),


}

export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
    <div class="${elementStrings.loader}">
        <svg>
            <use href = "img/icons.svg#icon-spinner2"></use>
        
        </svg>
    
    </div>
    `
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`)
    if (loader) loader.parentElement.removeChild(loader)

}