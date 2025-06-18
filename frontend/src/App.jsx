import { useState, useEffect } from 'react';
import { useDispatch }   from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom';

import Navigation        from './components/Navigation/Navigation.jsx';
import LoginFormModal    from './components/LoginFormModal/LoginFormModal.jsx';
import SignupFormModal   from './components/SignupFormModal/SignupFormModal.jsx';
import CreateSpotForm    from './components/CreateSpotForm/CreateSpotForm.jsx';
import SpotDetailsPage   from './components/SpotDetailsPage/SpotDetailsPage.jsx';

import * as sessionActions from './store/session.js';
import SpotsList from './components/Spots/SpotsList.jsx';
import ReviewList from './components/Reviews/ReviewList.jsx';

function Layout() {
  const dispatch   = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      {isLoaded && <Outlet />}
    </>
  );
  // return (
  //   <div className="app-container">
  //     <Navigation isLoaded={isLoaded} />
  //     {isLoaded && <Outlet />}
  //   </div>
  
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/',               element: <SpotsList /> },
      { path: '/login',          element: <LoginFormModal /> },
      { path: '/signup',         element: <SignupFormModal /> },
      { path: '/spots/new',      element: <CreateSpotForm /> },
      { path: '/spots/:spotId',  element: <SpotDetailsPage /> },
      { path: '/reviews/:spotId', element: <ReviewList /> },
    ],
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}



// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormModal/LoginFormModal.jsx';
// import SignupFormPage from './components/SignupFormModal/SignupFormModal.jsx';
// // import Navigation from './components/Navigation/Navigation.jsx';
// import * as sessionActions from './store/session.js';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import CreateSpotForm from './components/Spots/CreateSpotForm';
// import SpotDetailsPage from './components/Spots/SpotDetailsPage.jsx';


// <Router>
//   <Routes>
//     <Route path="/spots/new" element={<CreateSpotForm />} />
//  other routes here
//   </Routes>
// </Router>

// function Layout() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
//   }, [dispatch]);

//   return (
//     <>
//       {isLoaded && <Outlet />}
//     </>
//   );
// }

// const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       {
//         path: '/',
//         element: <h1>Welcome!</h1>
//       },
//       {
//         path: '/login',
//         element: <LoginFormPage />
//       },
//       {
//         path: '/signup',
//         element: <SignupFormPage />
//       },
//       { path: '/spots/new', 
//         element: <CreateSpotForm /> 
//       },
//       {
//         path: '/spots/:spotId',
//         element: <SpotDetailsPage />
//       }
//     ]
//   }
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;
















































// PRE-EXISTING PREVIOUS COMPONENT CODE
// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
// import * as sessionActions from './store/session';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <h1>Welcome!</h1>
//   },
//   {
//     path: '/login',
//     element: <LoginFormPage />
//   },

// {
//     element: <Layout />,
//     children: [
//       {
//         path: '/',
//         element: <h1>Welcome!</h1>
//       },
//       {
//         path: '/login',
//         element: <LoginFormPage />
//       }
//     ]
//   }
//   ]);

// function App() {
//   return <h1> Hello from App </h1>;
// }

// function Layout() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     dispatch(sessionActions.restoreUser()).then(() => {
//       setIsLoaded(true)
//     });
//   }, [dispatch]);

//   return (
//     <>
//       {isLoaded && <Outlet />}
//     </>
//   );
// };

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;
