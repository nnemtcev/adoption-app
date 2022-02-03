import { useState, useEffect } from "react";

// Why not just store the fetched breed lists in local storage?

const localCache = {};

// Here, we're making use of custom hooks which pretty much always use
// other built-in React hooks (useState, useEffect, etc.)

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      // Setting initial state before the breeds are fetched.
      // breedList is going to be an empty array since breeds
      // haven't been fetched yet and we're loading.

      setBreedList([]);
      setStatus("loading");

      // Fetch the breeds from the API.

      const res = await fetch(
        `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}
