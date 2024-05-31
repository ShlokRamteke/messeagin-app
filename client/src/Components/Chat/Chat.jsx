/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "../Axios/axios";
import { useStateValue } from "../Redux/StateProvider";
import { Avatar, IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MicIcon from "@mui/icons-material/Mic";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import "./Chat.css";

const Chat = ({ messages }) => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post("/messages/new", {
      message: input,
      name: user.displayName,
      timestamp: new Date().toUTCString(),
      received: true,
    });
    setInput("");
  };
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${seed.toString()}`}
        />
        <div className="chat__headerInfo">
          <h3>Dev Help</h3>
          <p>Last seen at {messages[messages.length - 1]?.timestamp}</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && "chat__receiver"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
