import React from 'react';

const Footer = () => {
    return (
        <div className='m-0 p-0'>
      <footer className="d-flex flex-row justify-content-between pt-3">
            <hr className="m-0" />
        <ul className="d-flex flex-row p-0 mx-5">
          <li>
            <a href="https://twitter.com">Twitter</a>
          </li>
          <li>
            <a href="https://www.facebook.com/">Facebook</a>
          </li>
          <li>
            <a href="https://www.instagram.com/">Instagram</a>
          </li>
        </ul>
        <h6 className="mx-5">© 2021 All rights reserved.</h6>
      </footer>
        </div>
    );
};

export default Footer;