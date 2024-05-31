import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "./Components/Axios/axios";
import Login from "./Components/Login/Login";
import { useStateValue } from "./Components/Redux/StateProvider";
import "./App.css";
import Sidebar from "./Components/SideBar/Sidebar";
import Chat from "./Components/Chat/Chat";

function App() {
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    axios.get("/messages/sync").then((res) => {
      setMessages(res.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("8942ae445a3177a54ae6", {
      cluster: "ap2",
    });
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (data) => {
      setMessages([...messages, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  console.log(messages);
  return (
    <>
      <div className="app">
        {!user ? (
          <Login />
        ) : (
          <div className="app__body">
            <Sidebar messages={messages} />
            <Chat messages={messages} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
