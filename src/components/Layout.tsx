import { Link, Outlet } from "react-router-dom";
import { Footer } from "./partials/Footer";

export const Layout = () => {
  return (
    <div className='layout-container'>
      <header>
        <nav>
          <ul>
            <li>
              <Link to='/'>Hem</Link>
            </li>
            <li>
              <Link to='/about'>Om Jullans zoo</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <Footer />
    </div>
  );
};
