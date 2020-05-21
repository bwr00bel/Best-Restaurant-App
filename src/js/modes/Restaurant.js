import axios from 'axios';


import {
   key
} from '../config';


export default class Restaurant {
   constructor(id) {
      this.id = id;

   }
   async getRestaurant() {
      try {
         const res = await axios({
            method: 'GET',

            //The best restaurant in current city
            url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${this.id}`,

            headers: {
               "user-key": `${key}`,
               "content-type": "application/json"
            }
         });

         // console.log(res)
         //Basic info
         this.name = res.data.name;
         this.cuisines = res.data.cuisines;
         this.city = res.data.location.city;
         this.locality = res.data.location.locality;
         this.full_adress = res.data.location.address;
         this.timings = res.data.timings;
         this.menu_url = res.data.menu_url;
         this.url = res.data.url;

         this.average_cost_for_two = res.data.average_cost_for_two;
         this.currency = res.data.currency;
         this.highlights = res.data.highlights;
         this.rate = res.data.user_rating.aggregate_rating;
         this.votes = res.data.user_rating.votes;
         this.photo_main = res.data.photos[0].photo.url;
         this.photo1 = res.data.photos[2].photo.url;
         this.id1 = res.data.photos[2].photo.id;
         this.photo2 = res.data.photos[3].photo.url;
         this.id2 = res.data.photos[3].photo.id;
         this.photo3 = res.data.photos[4].photo.url;
         this.id3 = res.data.photos[4].photo.id;

      } catch (err) {
         alert('There is problem with the data search!');
      }
   }

}