import axios from 'axios';
import Search from './Search'
import {
    key
} from '../config';


export default class Result extends Search {
    constructor(query, id, type) {
        super(query);
        this.id = id;
        this.type = type;
    }


    async getResult() {
        try {
            const res = await axios({
                method: 'GET',

                //The best restaurant in current city
                url: `https://developers.zomato.com/api/v2.1/location_details?entity_id=${this.id}&entity_type=${this.type}`,

                headers: {
                    "user-key": `${key}`,
                    "content-type": "application/json"
                }
            });

            this.result = res.data.best_rated_restaurant;

        } catch (err) {
            console.log(err);
            alert('There is probably no city in the data. :( Try it again!');
        }

    }



}