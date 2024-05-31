import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import "./SidebarChat.css";

const SidebarChat = ({ messages }) => {
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="sidebarChat">
      <Avatar
        src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${seed.toString()}`}
      />
      <div className="sidebarChat__info">
        <h2>Dev Help</h2>
        <p>{messages[messages.length - 1]?.messages}</p>
      </div>
    </div>
  );
};
export default SidebarChat;
