
import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
// import { useModal } from '../../context/Modal';
// import { Modal } from './Modal';
import { useModal } from '../../context/ModalContext';

import './LoginForm.css';
// import Cookies from 'js-cookie'; 

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        console.log("Login error response:", res);

        try {
          const data = await res.json();
          if (data?.errors) setErrors(data.errors);
        } catch (err) {
          console.error("Could not parse JSON:", err);
          setErrors({ credential: "An unexpected error occurred." });
        }
      });
  };
const handleDemoLogin = (e) => {
  e.preventDefault();
  return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
    .then(closeModal)
    .catch((res) => {
      console.error("Demo user login failed", res);
    });
};

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button type="submit"
          disabled={credential.length < 4 || password.length < 6}
        >
        Log In</button>
        <button onClick={handleDemoLogin} type="button">
  Log in as Demo User
</button>

      </form>
    </>
  );
}

export default LoginFormModal;