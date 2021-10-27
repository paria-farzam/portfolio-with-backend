import { navigate } from "@reach/router";
import React, { useState } from "react";
import Footer from "../components/layouts/Footer";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [res, setRes] = useState("");
  
  const formHandler = (e) => {
    let newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };
  
  const login = async (e) => {
    e.preventDefault();
    const result = await (
      await fetch("/portfolio/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    ).json();
    if (result.accessToken) {
      window.localStorage.setItem('authentication', result.accessToken);
      navigate("/message");
    } else console.log(result.error);
    if (result.message) setRes(result.message);
  };

  return (
    <div>
      <section className="m-0"></section>

      <section className="lg-form-section mx-auto my-5 py-2">
        <form
          onSubmit={(e) => login(e)}
          className="lg-form p-4 d-flex flex-column"
        >
          <h1 className="m-3 align-self-center">
            <b>Login</b>
          </h1>
          <h6 className="mx-2 my-3 align-self-center mb-5">
            *Only admin can login*
          </h6>
          <input
            name="username"
            id="username"
            value={data.username}
            onChange={(e) => formHandler(e)}
            className="lg-input p-2 mb-4"
            type="name"
            placeholder="username"
          />
          <input
            name="password"
            id="password"
            value={data.password}
            onChange={(e) => formHandler(e)}
            className="lg-input p-2 mb-4"
            type="password"
            placeholder="password"
          />
          {res !== null ? <p>{res}</p> : ""}
          <button className="lg-btn px-4 py-2 mx-auto mb-4" type="submit">
            LOGIN
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default Login;
