import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { StateProvider } from "./Components/Redux/StateProvider";
import reducer, { initialState } from "./Components/Redux/Reducer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>
);
