import ReactDOM from "react-dom";
import replaces from "./replaces";
import "antd/dist/antd.css";
import "./components/Header.css";

replaces.forEach((replace) => {
  const Component = replace.component;
  ReactDOM.hydrate(<Component />, document.getElementById(replace.id));
});
