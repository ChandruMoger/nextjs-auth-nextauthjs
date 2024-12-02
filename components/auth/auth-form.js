import { useState, useRef } from 'react';
import { useRouter } from 'next/router'
import classes from './auth-form.module.css';
import { signIn } from 'next-auth/react';

function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const emailElementRef = useRef();
  const passElementRef = useRef();
  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const loginOrSignUp = async () => {
    event.preventDefault();
    console.log("loginOrSignUp", isLogin);
    if (isLogin) {
      const response = await signIn('credentials', {
        redirect: false,
        email: emailElementRef.current.value,
        password: passElementRef.current.value 
      });

      console.log(response);

      if(!response.error) {
        router.replace("/");
      }
    } else {
      const response = (await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          email: emailElementRef.current.value,
          password: passElementRef.current.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })).json();
      console.log("response", response);
      if (response.ok) {
        alert("Account created!!!");
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' ref={emailElementRef} id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' ref={passElementRef} id='password' required />
        </div>
        <div className={classes.actions}>
          <button onClick={loginOrSignUp}>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
