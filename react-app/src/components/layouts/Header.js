import React, { useState, useEffect } from 'react';

const Header = () => {
  const [tokenObj, setToken] = useState('');
  const verifyUser = () => {
    fetch('/portfolio/verify', {method : "GET"})
    .then((res)=>{
      if(res.ok) return res.json(res);
    })
    .then((jsonRes)=> {
      if(jsonRes.token) setToken(jsonRes.token)
    });
  }
  
  useEffect(() => {
    verifyUser();
  }, [tokenObj]);

  let lastNavLink;
  let lastNavHref;
  if(tokenObj){ 
    lastNavLink = 'Messages';
    lastNavHref = '/message'
  } else {
    lastNavLink = 'Login';
    lastNavHref = '/login';
  }
    return (
        <div className="p-5 row m-0">
            <header
          className="
          col-12
          d-flex
          navbar-expand-md
          text-light
          justify-content-between
          align-items-center
        "
        >
          <div className="navbar-expand-md">
            <h3 className="logo d-inline bg-primary py-2 px-3">
              <b>Y</b>
            </h3>
            <h2 className="d-inline mx-1">
              <b>Your</b> Name
            </h2>
          </div>
          <nav className="d-flex align-items-center">
            <a className="text-decoration-none" href="/">
              Home
            </a>
            <a className="text-decoration-none" href="./resume">
              Resume
            </a>
            <a className="text-decoration-none" href="./contact">
              Contact
            </a>
            <a className="text-decoration-none" href="./extra">
              Extra
            </a>
            <a className="text-decoration-none" href={lastNavHref}>
              {lastNavLink}
            </a>
            {/* <% if(isLogin){ %>
          <a className="text-decoration-none" href="./messages">Message</a>
          <% } else { %>
          <a className="text-decoration-none" href="./login">Login</a>
          <% } %> */}
          </nav>
        </header>
        </div>
    );
};

export default Header;