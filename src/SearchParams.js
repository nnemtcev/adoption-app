// We're using the useState hook for tracking location in the SearchParams component and
// we're using the useEffect hook for running an effect (fetching initial list of pets).

import { useState, useEffect } from "react";

// We'll be rendering pets.

import Pet from "./Pet";

// A custom hook that we created for fetching breeds of animals.

import useBreedList from "./useBreedList";

// It's a constant, so we're making it uppercase.

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  // The order of hooks is crucial, so you should never put
  // hooks inside if statements or for loops or anything like that.
  // We're keeping track of the location and animal states.

  const [location, updateLocation] = useState("Seattle, WA");
  const [pets, setPets] = useState([]);
  const [animal, updateAnimal] = useState("");
  const [breed, updateBreed] = useState("");
  const [breeds] = useBreedList(animal);

  // Running the useEffect hook only on the initial render,
  // which is why we pass an empty dependency array as a second argument.

  useEffect(() => {
    requestPets();
  }, []);

  // An async function that fetches pets from the PetFinder API and then
  // sets the relevant state using the fetched pets data.
  // Also, note that every async function returns a promise.
  // Lastly, note that we're taking advantage of closures here,
  // because requestPets() is a function defined within the SearchParams
  // functional component. When the component returns the JSX, we still
  // have access to the variables defined within the function.

  async function requestPets() {
    // Fetch data using the native fetch API.
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );

    // We're using await again because we want to resolve
    // the promise returned by calling res.json() so that
    // we can get access to the JSON pets data.
    const json = await res.json();

    // Setting the JSON data for pets which
    // triggers a rerender of the SearchParams component.
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => updateLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal">
          Animal
          {/* Don't understand why we're using both onChange and onBlur. */}
          <select
            id="animal"
            value={animal}
            onChange={(e) => updateAnimal(e.target.value)}
            onBlur={(e) => updateAnimal(e.target.value)}
          >
            {/* An option is put here so as to not have a "default" animal value,
            i.e. to make the default selected value blank. */}
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          {/* We disable the dropdown when there are no breeds, i.e. when breeds.length === 0. */}
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => updateBreed(e.target.value)}
            onBlur={(e) => updateBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      {pets.map((pet) => (
        <Pet {...pet} />
      ))}
    </div>
  );
};

export default SearchParams;
