import { DoggoResponse } from "../models/DogResponse";

const urls = {
  getDog: "https://dog.ceo/api/breed/retriever/golden/images/random"
};

export default {
  getDoggo() {
    return fetch(urls.getDog).then<DoggoResponse>(res => res.json());
  }
};
