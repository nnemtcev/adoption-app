import ReactDOM from "react-dom";

// Components
import SearchParams from "./SearchParams";

// To pass multiple children into a component
// you can either pass it multiple elements in an array,
// or you can pass it multiple arguments (each argument being a separate child).

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <SearchParams />
    </div>
  );
};

// Note that we installed Prettier and ESLint using npm,
// and then created separate configuration files for each.
// Then we created npm commands that we could run to
// format the files, and enforce certain rules in our code.
// Don't really understand though: why install Prettier
// and ESLint extensions in VSCode? What do they do?

ReactDOM.render(<App />, document.getElementById("root"));
