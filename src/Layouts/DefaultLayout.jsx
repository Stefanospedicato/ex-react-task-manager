import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

const DefaultLayout = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
