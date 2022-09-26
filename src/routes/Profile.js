import { signOut } from "firebase/auth";
import { authService } from "myBase";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};
