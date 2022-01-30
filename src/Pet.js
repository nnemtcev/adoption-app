import React from "react";

// You can pass props into a component like so.
// Also, you could destructure the props in the parameters section of the function.

export default function Pet({ name, animal, breed }) {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, name),
    React.createElement("h2", {}, animal),
    React.createElement("h2", {}, breed),
  ]);
}
