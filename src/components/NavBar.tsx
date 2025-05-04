import { useRouter } from "../client/router";

const NavBar = () => {
  const { navigate } = useRouter();
  return (
    <div>
      <ul>
        <li>
          <button onClick={() => navigate("/list")}>List</button>
        </li>
        <li>
          <a href="/new">New</a>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
