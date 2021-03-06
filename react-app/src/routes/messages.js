import React, { useEffect, useState } from "react";
import Footer from "../components/layouts/Footer";
import { navigate } from "@reach/router";

const Messages = () => {
  const [message, setMessage] = useState([]);
  const [tokenObj, setToken] = useState('');

  //get messages
  const getmessages = () => {
    fetch("/portfolio/message", { method: "GET" })
      .then((res) => {
        if (res.ok) return res.json(res);
      })
      .then((jsonRes) => setMessage(jsonRes));
  };

  //get token to verify user
  const verifyUser = () => {
    let token = window.localStorage.getItem('authentication');
    setToken(token);
  }
  
  //log out user
  const logOutCallBack = () => {
    fetch("/portfolio/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => setToken(''))
      .then(() => navigate("/login"));
      window.localStorage.removeItem('authentication');
  };

  useEffect(() => {
    getmessages();
    verifyUser();
  }, []);
  
  let messages = message.message;

  const deletMsg = (id) => {
    fetch(`/portfolio/message/${id}`, { method: "DELETE" }).then((res) => {
      if (res.ok) getmessages();
    });
  };

  return (
    <div>
      <section className="m-0 mb-5">
        <div className="titr d-flex px-5 m-0 flex-row justify-content-between">
          <h1 className="m-3 align-self-center">
            <b>Messages</b>
          </h1>
          <div>
            <h6 className="mx-2 my-3">refresh to update massages...</h6>
            <button className="px-3 py-2 logout" onClick={logOutCallBack}>
              Log out
            </button>
          </div>
        </div>
      </section>

      <div className="msg-div">
        <section className="msg-bar p-3 mt-5 mx-3">
          <div className="d-flex flex-column">
            <div className="d-flex flex-row">
              <h5 className="msg-name">Name</h5>
              <h5 className="msg-email">Email</h5>
              <h5 className="msg-subject">Subject</h5>
              <h5 className="msg-content">Message</h5>
            </div>
            <hr className="p-0 mt-0 mb-2" />

            <div className="d-flex flex-column">
              {messages === undefined
                ? null
                : messages.map((msg) => (
                    <div key={msg._id} className="d-flex flex-row">
                      <p className="msg-name">{msg.name}</p>
                      <p className="msg-email">{msg.email}</p>
                      <p className="msg-subject">{msg.subject}</p>
                      <p className="msg-content">{msg.message}</p>
                      <button
                        className="py-1 px-2 msg-btn"
                        onClick={() => deletMsg(msg._id)}
                      >
                        del
                      </button>
                    </div>
                  ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Messages;
