import React, { useEffect, useState } from "react";
import Footer from "../components/layouts/Footer";

const Resume = () => {
  //fetch education and store it
  const [eduData, setEduData] = useState([]);
  useEffect(() => {
    fetch("/portfolio/education", { method: "GET" })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((jsonRes) => setEduData(jsonRes));
  }, []);
  let education = eduData.education;

  //fetch experience and store it
  const [expeData, setExpeData] = useState([]);
  useEffect(() => {
    fetch("/portfolio/experience", { method: "GET" })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((jsonRes) => setExpeData(jsonRes));
  }, []);
  let experience = expeData.experience;

  return (
    <div>
      <section className="m-0">
        <div className="titr d-flex px-5 m-0 flex-row justify-content-between">
          <h1 className="m-3 align-self-center">
            <b>Resume</b>
          </h1>
          <h6 className="mx-2 my-3">(n) years of exprience</h6>
        </div>
      </section>

      <section className="row resume-info">
        <div className="col-6 mb-3">
          <h3>Education</h3>
          {education !== undefined ? (
            <div className="vertical-line"></div>
          ) : null}
          {education === undefined
            ? null
            : education.map((item) => (
                <div key={item._id}>
                  <div className="info-container">
                    <h6 className="years d-inline py-1 px-2">
                      {item.year}
                    </h6>
                    <h4 className="mt-3">
                      <b>
                        {item.title}
                      </b>
                    </h4>
                    <p>{item.desc}</p>
                  </div>
                  <hr className="resume-hr" />
                </div>
              ))}
        </div>

        <div className="col-6 mb-3">
          <h3>Experience</h3>
          {experience !== undefined ? (
            <div className="vertical-line"></div>
          ) : null}
          {experience === undefined
            ? null
            : experience.map((item) => (
                <div key={item._id}>
                  <div className="info-container">
                    <h6 className="years d-inline py-1 px-2">
                      {item.year}
                    </h6>
                    <h4 className="mt-3">
                      <b>
                        {item.title}
                      </b>
                    </h4>
                    <p>{item.desc}</p>
                  </div>
                  <hr className="resume-hr" />
                </div>
              ))}   
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Resume;
