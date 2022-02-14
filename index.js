import fastify from 'fastify';
import axios from 'axios';

const app = fastify({ logger: true });

/**
 * EXERCICE I - CATS FACTS
 */

const CAT_FACTS_BASE_URL = "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount="

const fetch_facts = async (number_of_facts) => {
  try {
    return await axios.get(CAT_FACTS_BASE_URL + number_of_facts)
      .then(
        function (response) {
          return response.data.map(element => element.text)
        }
      )
  } catch (error) {
    return null
  }
}
 
 /**
  * EXERCICE II - FOX IMAGE
  */
 
const FOX_IMAGE_BASE_URL = "https://randomfox.ca/floof/"

const fetch_fox = async () => {
  try {
    return await axios.get(FOX_IMAGE_BASE_URL)
      .then(
        function (response) {
          return response.data.image
        }
      )
  } catch (error) {
    return null
  }
}
 
 /**
  * EXERCICE II - FOX IMAGE
  */
 
const HOLIDAY_BASE_URL = "https://date.nager.at/api/v3/publicholidays/2022/"

const fetch_holiday = async (country_code) => {
  try {
    return await axios.get(HOLIDAY_BASE_URL + country_code)
      .then(
        function (response) {
          return response.data
        }
      )

  } catch (error) {
    return null
  }
}

app.post('/', async (req, res) => {
  return {
    "catFacts": await fetch_facts(req.body?.numberOfFacts ?? 3),
    "foxPicture": await fetch_fox(),
    "holidays": await fetch_holiday(req.body?.countryCode ?? "FR")
  };
});

// Only used for dev server, do not remove
app.head('/', () => ({ ping: 'pong' }));

// Run the server!
const start = async () => {
  try {
    await app.listen(5000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();