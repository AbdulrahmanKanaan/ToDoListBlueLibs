import { Link } from "react-router-dom";
import { GROUPS } from "../routes";

export const HomePage = () => {
  return (
    <>
      WELCOME HOME :D <Link to={GROUPS.path}>GO HERE!</Link>
    </>
  );
};
