import { DoggoResponse } from "../models/DogResponse";

const urls = {
  getDog: "https://dog.ceo/api/breed/"
};

export default {
  getDoggo(breed: string) {
    return fetch(`${urls.getDog}${breed}/images/random`).then<DoggoResponse>(
      res => res.json()
    );
  }
};
