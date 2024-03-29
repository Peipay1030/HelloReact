import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <ul>
        <li>
          <NavLink to={"todo"}>TodoList</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Home;
