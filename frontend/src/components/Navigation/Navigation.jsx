import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'; // ✅ Add this
import ProfileButton from './ProfileButton.jsx';
import './Navigation.css';

export default function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user); // ✅ Add this

  return (
    <header className="app-header">
      <div className="logo">
        <NavLink to="/">
          <img src="/favicon.ico" alt="EC Manor logo" />
        </NavLink>
      </div>
      <nav className="nav-links">
        <NavLink to="/" end>Home</NavLink>

        {/* Create a New Spot button for logged-in users */}
        {sessionUser && (
          <NavLink to="/spots/new">
            <button>Create a New Spot</button>
          </NavLink>
        )}

        {isLoaded && <ProfileButton />}
      </nav>
    </header>
  );
}

// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton.jsx';
// import './Navigation.css';

// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector(state => state.session.user);

//   return (
//     <ul>
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>
//       {isLoaded && (
//         <li>
//           <ProfileButton user={sessionUser} />
//         </li>
//       )}
//     </ul>
//   );
// }

// export default Navigation;






// import { NavLink }    from 'react-router-dom';
// import ProfileButton   from './ProfileButton.jsx';
// import './Navigation.css';

// export default function Navigation({ isLoaded }) {
//   return (
//     <header className="app-header">
//       <div className="logo">
//         <NavLink to="/">
//           <img src="/favicon.ico" alt="EC Manor logo" />
//         </NavLink>
//       </div>
//       <nav className="nav-links">
//         <NavLink to="/" end>Home</NavLink>
//         {isLoaded && <ProfileButton />}
//       </nav>
//     </header>
//   );
// }





