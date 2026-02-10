import "./index.css";

import { render } from "preact";

import App from "./app";

const root = <App />;

render(root, document.querySelector("#root")!);
