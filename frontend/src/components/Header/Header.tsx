import { Logo, LogoContainer } from "./Header.style";
import logo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <>
      <LogoContainer>
        <img src={logo} />
      </LogoContainer>
    </>
  );
};

export default Header;
