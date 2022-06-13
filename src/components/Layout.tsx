import { Link, Outlet } from "react-router-dom";
import { Footer } from "./partials/Footer";
import { Header } from "./partials/Header";
import { StyledUl } from "./StyledComponents/Ul";
import { AppWrapper } from "./StyledComponents/Wrappers";

export const Layout = () => {
  return (
    <AppWrapper>
      <Header />
      <StyledUl>
        <li>
          <Link to='/'>Hem</Link>
        </li>
        <li>
          <Link to='/about'>Om oss</Link>
        </li>
      </StyledUl>
      <Outlet></Outlet>
      <Footer />
    </AppWrapper>
  );
};
