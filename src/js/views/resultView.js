import {
    elements
} from './base';


export const highlightResult = id => {

    const resultArr = Array.from(document.querySelectorAll('.results__link'));
    // console.log(resultArr)
    resultArr.forEach(el => {
        el.classList.remove('results__link--active')

    });

    document.querySelector(`a[href="#${id}"]`).classList.add("results__link--active")
}


//Display results on UI

const renderResult = (restaurant) => {
    const img = restaurant.restaurant.photos[1].photo.url;

    const markup = `
        <li>
            <a class="results__link" href="#${restaurant.restaurant.id}">
                <div class="results__elem">
                    <img class="results__img" src="${img}" alt="Alt">
                    <div class="results__info">
                        <h4 class="results__restaurant">${restaurant.restaurant.name}</h4>
                        <p class="results__city">${restaurant.restaurant.location.locality_verbose}</p>
                        <div class="results__rates">
                            <svg class="overview__icon-star">
                            <use xlink:href="img/icons.svg#icon-star-full"></use>
                            </svg>
                        <p class="results__num">${restaurant.restaurant.user_rating.aggregate_rating}</p>
                        </div>
                    </div>
                
                
                </div>
                
            </a>
        </li>
`;

    elements.searchResList.insertAdjacentHTML('beforeend', markup);


};

const createButton = (page, type) => `

<button class=" btn-page app-title__btn--${type}" data-goto=${type ==='prev' ? page -1 : page + 1}>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-chevron-thin-${type ==='prev' ? 'left' : 'right'}"></use>
    </svg> 
    <span>Page ${type ==='prev' ? page -1 : page + 1 }</span>
</button> 

`;


const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if (page === 1 && pages > 1) {
        //Only button to go to next page
        button = createButton(page, 'next');


    } else if (page < pages) {
        //Both buttons
        button =
            `
        ${button = createButton(page, 'next')}
        ${button = createButton(page, 'prev')}`;


    } else if (page === pages && pages > 1) {
        //Only button to go to prev page
        button = createButton(page, 'prev');

    }


    elements.searchResPage.insertAdjacentHTML('afterbegin', button)

};

export const renderResults = (restaurants, page = 1, resPerPage = 3) => {
    //render results of restaurants
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    restaurants.slice(start, end).forEach(renderResult);

    //render buttons
    renderButtons(page, restaurants.length, resPerPage)
}