import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <ul>
      <li>
        <Link to={"/"}>home</Link>
      </li>
      <li>
        <Link to={"/profile"}>My profile</Link>
      </li>
    </ul>
  );
};

export default Navigation;
