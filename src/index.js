import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import {store, persistor} from "./Redux/index.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <PersistGate loding={null} persistor={persistor}>
        <ToastContainer
          theme="dark"
          position="top-right"
          autoClose={3000}
          closeOnClick
          pauseOnHover={false}
          style={{
            zIndex: "999",
          }}
        />
        <App />
      </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
