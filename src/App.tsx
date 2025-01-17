import React from "react";
import logo from "./logo.svg";
import "./App.css";
import JewelleryTable from "./containers/jewelleryTable";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddJewelleryItem from "./containers/addJewelleryItem";

function App() {
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <JewelleryTable />,
    },
    {
      path: "/addJewelleryItem",
      element: <AddJewelleryItem />,
    },
    // {
    //   path: "/contact",
    //   element: <Contact />,
    // },
  ]);
  return <RouterProvider router={Router} />;
}

export default App;
