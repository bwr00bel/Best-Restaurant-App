import Search from './modes/Search';
import Result from './modes/Result';
import Restaurant from './modes/Restaurant'

import * as searchView from './views/searchView';
import * as resultView from './views/resultView';
import * as restaurantView from './views/restaurantView';

import {
    elements,
    elementStrings,
    renderLoader,
    clearLoader

} from './views/base';



/* Global state of the app
1. Search object by city/ location
2. Show the restaurants
3. Description of the restaurant
4. Reviews for the restaurant
*/

const state = {};


// Search controller


const controllSearch = async () => {

    //1. Get query from searchView
    const query = searchView.getInput();
    let id, type;

    if (query) {

        //2. New searching object and add to the state

        state.search = new Search(query);


        //3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes)
        // restaurantView.clearRestaurant();

        try {
            //4. Seaerch for cities
            await state.search.getLocation();
            id = state.search.id;
            type = state.search.type;
            clearLoader();


        } catch (err) {
            console.log('Something went wrong with the search...');
            clearLoader();
        }

    }


    if (query, id, type) {
        //5.Create Top 10 restaurants objects
        state.result = new Result(query, id, type)
        clearLoader();

        //6.Get Top 10 restaurant data
        try {
            await state.result.getResult();

            //7. Render result
            resultView.renderResults(state.result.result)
            //console.log(state.result.result)

        } catch (err) {
            alert('Something wrong with displaying results ;(')
            clearLoader()
        }

    }

}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controllSearch();



});

elements.searchResPage.addEventListener('click', e => {
    const btn = e.target.closest('.btn-page')
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        resultView.renderResults(state.result.result, goToPage)

    }
})


/* RESTAURANT CONTROLLER */


const controllRestaurant = async () => {

    //ID from UI
    const id = window.location.hash.replace("#", '');

    if (id) {

        //Preparing UI for changes
        restaurantView.clearRestaurant();
        renderLoader(elements.cardResult);

        //Highlight restaurant
        if (state.result) resultView.highlightResult(id)

        //Create new restaurant object
        state.restaurant = new Restaurant(id);

        try {
            //Get restaurant data
            await state.restaurant.getRestaurant()

            //Render restaurant

            clearLoader();
            const stateRes = state.restaurant;
            //console.log(stateRes)
            restaurantView.renderRestaurant(stateRes)



        } catch (err) {
            alert('Something wrong with the restaurant processing!')
            console.log(err)
        }

    }

}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controllRestaurant))