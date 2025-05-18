// frontend/src/App.jsx

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import LoginFormPage from './components/LoginFormModal/LoginFormModal.jsx';
import SignupFormPage from './components/SignupFormModal/SignupFormModal.jsx';
// import Navigation from './components/Navigation/Navigation.jsx';
import * as sessionActions from './store/session.js';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <h1>Welcome!</h1>
      },
      {
        path: '/login',
        element: <LoginFormPage />
      },
      {
        path: '/signup',
        element: <SignupFormPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;


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
