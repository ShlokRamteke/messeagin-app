import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">Header</div>
      <div className="sidebar__search">Search</div>
      <div className="sidebar__chats">Chats</div>
    </div>
  );
};

export default Sidebar;
