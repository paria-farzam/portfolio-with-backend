import React from 'react';

const Header = () => {
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
              About
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
            <a className="text-decoration-none" href="./login">
              login
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