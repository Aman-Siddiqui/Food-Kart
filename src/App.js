import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import RestrauntsMenu from "./components/RestrauntsMenu";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
//import Grocery from "./components/Grocery";

//Lazy Loading
//Chunking
//Dynamic Bundling- means it will not add the code in a single file, it will create a new file for the lazy code.
//                  means it will not load the whole code, whenever user click on grocery then only it will load the code.
//                  also for reducing the bundle size we do lazy loading
//onDemand Loading

const Grocery = lazy(() => import("./components/Grocery"));

const AppLayout = () => {
  const [userName, SetUserName] = useState();
  useEffect(() => {
    //Make an API call for getting the data
    const data = {
      name: "Aman",
    };
    SetUserName(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      
      <UserContext.Provider value={{ loggedIn: userName, SetUserName }}>
        <div className="app">
          <Header />
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1> Loading...</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/Restaurant/:resId",
        element: <RestrauntsMenu />,
      },
      {
        path: "/cart",
        element: <Cart/>,
      },
    ],

    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);

// Building an Food Ordering App-
// First Step :  Planning for creating an App
// Visual picture of the app:

// Header
//    - Logo
//    - Nav Items (home, aboutUs)
// Body
//    - Search
//    - CardContainer
//       - RestaurantCards
//           - img
//           - Name of res, Ratings, cousin names,
// Footer
//    - Copyright
//    - Links
//    - Address
//    - Contact
