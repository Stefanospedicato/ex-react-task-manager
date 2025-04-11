import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <ul className="m-3">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/add-task">Nuova Task</Link>
          </li>
          <li>
            <Link to="/task-list">Le tue task</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
