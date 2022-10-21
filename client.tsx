import ReactDOM from "react-dom";
import { Header } from "./components/Header";
import replaces from "./replaces";

replaces.forEach((replace) => {
  const Component = replace.component;
  ReactDOM.hydrate(<Component />, document.querySelector(replace.selector));
});
