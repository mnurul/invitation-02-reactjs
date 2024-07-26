import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Cover from "./pages/cover/index.jsx";
import Main from "./pages/main/index.jsx";

import global_eng from "./translations/eng/global.json";
import global_idn from "./translations/idn/global.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import DarkModeContextProvider from "./context/DarkMode.jsx";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "eng",
  resources: {
    eng: {
      global: global_eng,
    },
    idn: {
      global: global_idn,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Cover />,
  },
  {
    path: "/invitation",
    element: <Main />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <I18nextProvider i18n={i18next}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
