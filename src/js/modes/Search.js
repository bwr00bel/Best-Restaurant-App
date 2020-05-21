import axios from 'axios';
import {
    key,

} from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getLocation() {
        try {
            const res = await axios({
                method: 'GET',

                url: `https://developers.zomato.com/api/v2.1/locations?query=${this.query}`,
                headers: {
                    "user-key": `${key}`,
                    "content-type": "application/json"
                }
            });

            this.id = res.data["location_suggestions"][0]["entity_id"];
            this.type = res.data.location_suggestions[0].entity_type;

            // console.log(this.id)
        } catch (err) {
            console.log(err);
            alert(`Something went wrong or ${this.query} doesn't exisit in database! ;( Try it again by using english names.`)
        }

    }
}