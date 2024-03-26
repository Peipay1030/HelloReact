import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <ul>
        <li>
          <NavLink to={"todo"}>TodoList</NavLink>
        </li>
        <li>
          <NavLink to={"todo/:id"}>Detail</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Home;
