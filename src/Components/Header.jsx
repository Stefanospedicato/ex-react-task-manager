import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <ul className="m-3">
          <li>
            <Link to="/home">HOME</Link>
          </li>
          <li>
            <Link to="/task-list">YOUR TASKS</Link>
          </li>
          <li>
            <Link to="/add-task">NEW TASK</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
