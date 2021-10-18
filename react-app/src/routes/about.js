import React, { useEffect, useState } from "react";

const About = () => {
  const downloadCV = () => {
    alert("sorry but this is a fake button 😂😁🤪");
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/portfolio/about", {method:'GET'})
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((jsonRes) => setData(jsonRes))
  },[]);

  const about = data.about;

  return (
    <section className="p-5 row m-0 section-full">
      <div className="home-img col-5 d-flex flex-row-reverse align-items-center p-0">
        <img
          className="mx-5"
          alt="your pic"
          src="https://lmpixels.com/wp/leven-wp/wp-content/uploads/2019/12/cesar-rincon-1024x1024.jpg"
        />
      </div>
      <div className="col-7 p-0 d-flex align-items-center">
        <div>
          <p>{about !== undefined ? about[0].career : 'your career'}</p>
          <h1>{about !== undefined ? about[0].name : 'your name'}</h1>
          <p>
            {about !== undefined ? about[0].desc : 'loading...'}
          </p>
          <button
            className="home-btn px-3 py-2 text-light"
            onClick={downloadCV}
          >
            Download CV
          </button>
          <a
            href="/contact"
            className="home-btn text-decoration-none px-3 py-2"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
