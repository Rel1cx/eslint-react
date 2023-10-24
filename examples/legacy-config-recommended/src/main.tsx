import React from "react";
import ReactDOM from "react-dom/client";

function Step() {
    return [0, 1, 2].map((_, index) => <div key={index}>Step {index}</div>);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Step />
    </React.StrictMode>,
);
