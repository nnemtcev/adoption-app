// You can pass props into a component like so.
// Also, you could destructure the props in the parameters section of the function.
// The latest version of JSX makes it so that you don't need to import React
// when you write JSX. You only need it when you explicitly use something from the
// React library.

const Pet = ({ name, animal, breed }) => {
  return (
    <div>
      <h1>{name}</h1>
      <h2>{animal}</h2>
      <h2>{breed}</h2>
    </div>
  );
};

export default Pet;
