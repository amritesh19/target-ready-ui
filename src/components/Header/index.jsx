import Logo from "../Logo";
import SideNavigation from "../SideNavigation";

const Header = () => {
  return (
    <>
      <header className="App-header">
        <Logo />
        <h2>Target Ready</h2>
        <SideNavigation />
      </header>
    </>
  );
};
export default Header;
