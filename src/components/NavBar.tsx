"use client";

console.log('RCC logger');

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
          <button onClick={() => navigate("/new")}>New</button>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
