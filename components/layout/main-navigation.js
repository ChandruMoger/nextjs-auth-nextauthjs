import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import classes from './main-navigation.module.css';

function MainNavigation() {
  const { data: session } = useSession();

  const logOutHandler = () => {
    signOut();
  }
  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {
            !session && <li>
              <Link href="/auth">Login</Link>
            </li>
          }
          {session && <li>
            <Link href="/profile">Profile</Link>
          </li>
          }

          {
            session && <li>
              <button onClick={logOutHandler}>Logout</button>
            </li>
          }

        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
