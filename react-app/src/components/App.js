import { Router } from "@reach/router";
import React, { createContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";

//import components
import Header from "./layouts/Header";
import About from "../routes/About";
import Contact from "../routes/Contact";
import Extra from "../routes/Extra";
import Login from "../routes/Login";
import Messages from "../routes/Messages";
import Resume from "../routes/Resume";

export const userContext = createContext([]);

function App() {
  let [user, setUser] = useState('k');
  
  return (
    <userContext.Provider value={{user, setUser}}>
      <Header />
      <Router id="router">
        <Contact path="contact" />
        <Extra path="extra" />
        <Login path="login" />
        <Messages path="message" />
        <Resume path="resume" />
        <About path="/" />
      </Router>
    </userContext.Provider>
  );

  // const abuot = loadable(() => import("../routes/about"));
  // const resume = loadable(() => import("../routes/resume"));
  // const contact = loadable(() => import("../routes/contact"));
  // const extra = loadable(() => import("../routes/extra"));
  // const login = loadable(() => import("../routes/login"));
  // const messages = loadable(() => import("../routes/messages"));
  // return (
  // <BrowserRouter>
  //   <Header />
  //   <Switch>
  //     <Route path="/" component={abuot} exact />
  //     <Route path="/resume" component={resume} />
  //     <Route path="/contact" component={contact} />
  //     <Route path="/extra" component={extra} />
  //     <Route path="/login" component={login} />
  //     <Route path="/message" component={messages} />
  //   </Switch>
  // </BrowserRouter>
  // );
}

export default App;
