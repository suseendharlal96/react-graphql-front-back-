import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Menu } from "semantic-ui-react";

const MenuBar = () => {
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (e,{ name }) => {
    setActiveItem(name);
  };

  return (
    <Menu pointing secondary size="massive" color="blue">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Item
        name="Posts"
        active={activeItem === "Posts"}
        onClick={handleItemClick}
        as={Link}
        to="/posts"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="Login"
          active={activeItem === "Login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="Signup"
          active={activeItem === "Signup"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
        <Menu.Item
          name="Logout"
          active={activeItem === "Logout"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
      </Menu.Menu>
    </Menu>
  );
};

export default MenuBar;
