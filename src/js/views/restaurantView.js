import {
    elements
} from './base';



export const clearRestaurant = () => {

    elements.cardResult.innerHTML = '';
};



//Format background header img 

const renderHeaderImg = picture => {
    let img1 = picture;
    if (picture) {
        elements.headerArea.style.backgroundImage = `url(${img1})`;
    }
    console.log(img1)
    return img1

}

//Format hours
const formatHours = hour => {

    const days = `(Mon, Tue, Wed, Thu, Sun)`;
    const dayShort = 'Mon-Sun';

    if (hour) {
        let newHour = hour;
        if (newHour.includes(days)) {
            const repDays = newHour.replace(days, dayShort)

            const newDays = repDays.split(',').map(el => `

            <li class= "open__hours">   
            <svg class="icon-right">
                <use xlink:href="img/icons.svg#icon-checkmark2">
            /use></svg>${el}</li>`).join('');
            return newDays

        } else {
            const newHours = newHour.split(',').map(el => `

                <li class= "open__hours">   
                <svg class="icon-right">
                    <use xlink:href="img/icons.svg#icon-checkmark2">
                /use></svg>${el}</li>`).join('');
            return newHours
        }



        return `<ul>${newHour}</ul>`
    }

}

//Format highlights
const formatHighlight = highlight => {
    if (highlight) {
        const newHighlight = highlight.map(highlight =>

            `<li class ="list__item">
            <svg class="icon-right">
                <use xlink:href="img/icons.svg#icon-checkmark2">
                /use></svg>
        ${highlight}</li>`).join('')

        return newHighlight
    }
}

// Format adress to 30 letters

const formatAdress = (adress, limit = 30) => {
    const newAdress = [];

    if (adress.length > limit) {
        adress.split(',').reduce((prev, curr) => {
            if (prev + curr.length <= limit) {
                newAdress.push(curr)
            }
            return prev + curr.length
        }, 0);

        return `${newAdress.join(' ')} ...`
    }
    return adress;

}


let rate, vote, img;

//Creating stars rating
let flag = true;



elements.searchResList.addEventListener('click', () => flag = true)


document.addEventListener('submit', e => {


    if (flag) {
        //Get the flag to use only once the funtion
        flag = false;

        //Only run on the .overview_stars form
        if (!e.target.matches('.overview__stars, .overview__stars *')) return;
        //Prevent form
        e.preventDefault()

        //Get the selected star
        const selected = document.activeElement;

        if (!selected) return;
        const selectedIndex = parseInt(selected.getAttribute('data-star'), 10);

        const stars = Array.from(e.target.querySelectorAll('.star'));

        stars.forEach((star, index) => {
            if (index < selectedIndex) {
                star.innerHTML = `<svg class="overview__icon-star"> <use xlink:href="img/icons.svg#icon-star-full"></use></svg>`

            } else {
                star.innerHTML = `<svg class="overview__icon-star"> <use xlink:href="img/icons.svg#icon-star-empty"></use></svg>`
            }

        })


        //Get the number from stars
        const valueStar = parseFloat(selected.dataset.star);

        // Calculate average 
        const calcRates = (rate * vote + valueStar) / (vote + 1)
        const calcRatesRound = calcRates.toFixed(3);

        //Add current votes
        const currVotes = vote + 1;

        // Get Html element
        const currUIrate = document.querySelector('.overview__rating-avarage');
        const currUIvote = document.querySelector('.overview__rating-count');

        //Display in UI current rates
        rate = calcRatesRound;
        currUIrate.innerHTML = `<div class="overview__rating-avarage">${rate}</div>`;

        //Display in UI current values
        vote = currVotes;
        currUIvote.innerHTML = `<div class="overview__rating-count">${vote} votes</div>`;
    }

});



export const renderRestaurant = (restaurant) => {

    //Get the current rate and votes in restaurant
    rate = parseFloat(restaurant.rate);
    vote = parseFloat(restaurant.votes);
    img = renderHeaderImg(restaurant.photo_main);

    const markup = `

    <div class="overview">
        <h2 class="overview__heading">${restaurant.name}</h2>
        <form class="overview__stars">
            <button class="star" type ="submit" data-star="1">
                <svg class="overview__icon-star"> <use xlink:href="img/icons.svg#icon-star-empty"></use></svg>
            </button>
            <button class="star" type ="submit" data-star="2">
                <svg class="overview__icon-star"> <use xlink:href="img/icons.svg#icon-star-empty"></use></svg>
            </button>
            <button class="star" type ="submit" data-star="3">
                 <svg class="overview__icon-star"> <use xlink:href="img/icons.svg#icon-star-empty"></use></svg>
            </button>
            <button class="star" type ="submit" data-star="4">
                <svg class="overview__icon-star"> <use xlink:href="img/icons.svg#icon-star-empty"></use></svg>
            </button>
            <button class="star" type ="submit" data-star="5">
                <svg class="overview__icon-star"> <use xlink:href="img/icons.svg#icon-star-empty"></use></svg>
            </button>
        </form>  

        <div class="overview__location">
            <svg class="overview__icon-location">
                <use xlink:href="img/icons.svg#icon-location"></use>
            </svg>
            <button class="btn-inline" type="submit" href="${restaurant.url}">${formatAdress(restaurant.full_adress)}</button>
        </div>
        <div class="overview__rating">
            <div class="overview__rating-avarage">${rate}</div>
            <div class="overview__rating-count">${vote} votes</div>
        </div>
    </div>

<div class="detail">
    <div class="description">
        <h3 class="description__heading">Restaurant overview</h3>
        <p class="paragraph">
        The <b>${restaurant.name}</b> is the best restaurant in ${restaurant.locality} in ${restaurant.city}. 
        <br>We are serving mostly <b>${restaurant.cuisines}</b>, but we can offer much more! 
        <br><br>You can come or call to our place alwyas: <b>${formatHours(restaurant.timings)}</b> 
        </p>
        <p class="paragraph"> Just come with your partner or best friend! In ${restaurant.name} you spend only ${restaurant.average_cost_for_two}${restaurant.currency}!
        Do not hestitate and check the best restaurant in ${restaurant.locality}!
        </p>
        <ul class="list">
      
  ${formatHighlight(restaurant.highlights)}
        
        </ul>
       
    <div class="btn-direct" >
        <h2 class="btn-direct__book-now">Good news! You can book your vist right now!</h2>
        <button class="btn-m" href="${restaurant.menu_url}">
            <span class="btn-m__visible">Find out more!</span>
            <span class="btn-m__invisible"> Get direction !</span>
        </button>
    </div>
</div>
    <div class="gallery">
        <figure class="gallery__item">
            <img src="${restaurant.photo1}" alt="${restaurant.id1}" class="gallery__photo">
        </figure>
        <figure class="gallery__item">
            <img src="${restaurant.photo2}" alt="${restaurant.id2}" class="gallery__photo">
        </figure>
        <figure class="gallery__item">
            <img src="${restaurant.photo3}" alt="${restaurant.id3}" class="gallery__photo">
        </figure>
    </div>
    


`;


    elements.cardResult.insertAdjacentHTML('afterbegin', markup);




}