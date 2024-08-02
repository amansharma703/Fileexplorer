import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ExplorerProvider } from "./context/ExplorerContext";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ExplorerProvider>
      <App />
    </ExplorerProvider>
  </React.StrictMode>
);
