import React, { useState } from "react";
import Footer from "../components/layouts/Footer";

const Contact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const clearFormData = () =>
    setData({ name: "", email: "", subject: "", message: "" });

  const inputHandler = (e) => {
    let newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    await fetch("/portfolio/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) alert('message sent!');
    });
    clearFormData();
  };

  return (
    <div className="m-0 p-0">
      <section className="m-0">
        <div className="titr d-flex px-5 m-0 flex-row justify-content-between">
          <h1 className="m-3 align-self-center">
            <b>Contact</b>
          </h1>
          <h6 className="mx-2 my-3">(n) years of exprience</h6>
        </div>
      </section>

      <div className="mapouter mx-auto my-5">
        <div className="gmap_canvas mx-auto">
          <iframe
            title="map"
            width="1220px"
            height="180px"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=kolahduz%204,%20Mashhad,%20Iran&t=&z=17&ie=UTF8&iwloc=&output=embed"
            frameborder="0"
            scrolling="no"
            marginheight="auto"
            marginwidth="auto"
          ></iframe>
          <a href="https://123movies-to.org"></a>
          <br />
          <a href="https://www.embedgooglemap.net"></a>
        </div>
      </div>

      <section className="d-flex flex-row my-5">
        <div className="contact-info">
          <div className="d-flex flex-row mb-5">
            <img className="mx-3" src="./icons/mobile.svg" alt="phone" />
            <div>
              <h5 className="m-0">415-832-2000</h5>
              <p className="p-0 m-0">
                Duis erat leo, aliquam laoreet fringilla quis, pretium vitae
                dui.
              </p>
            </div>
          </div>
          <div className="d-flex flex-row mb-5">
            <img className="mx-3" src="./icons/map-marker.svg" alt="location" />
            <div>
              <h5 className="m-0">San Francisco</h5>
              <p className="p-0 m-0">
                Duis erat leo, aliquam laoreet fringilla quis, pretium vitae
                dui.
              </p>
            </div>
          </div>
          <div className="d-flex flex-row mb-5">
            <img className="mx-3" src="./icons/envelope.svg" alt="mail" />
            <div>
              <h5 className="m-0">hello@example.com</h5>
              <p className="p-0 m-0">
                Duis erat leo, aliquam laoreet fringilla quis, pretium vitae
                dui.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => sendMessage(e)}
          className="contact-form d-flex flex-row"
        >
          <div className="d-flex flex-column mx-auto">
            <h3 className="mb-4">How can i help you?</h3>
            <input
              name="name"
              id="name"
              value={data.name}
              onChange={(e) => inputHandler(e)}
              className="p-2"
              type="text"
              placeholder="Full Name"
            />
            <input
              name="email"
              id="email"
              value={data.email}
              onChange={(e) => inputHandler(e)}
              className="p-2"
              type="email"
              placeholder="Email Address"
            />
            <input
              name="subject"
              id="subject"
              value={data.subject}
              onChange={(e) => inputHandler(e)}
              className="p-2"
              type="text"
              placeholder="Subject"
            />
            <div
              className="g-recaptcha mb-4"
              data-sitekey="6Ldbdg0TAAAAAI7KAf72Q6uagbWzWecTeBWmrCpJ"
            ></div>
            <button className="contact-btn d-inline px-3 py-2" type="submit">
              Send Message
            </button>
          </div>

          <textarea
            name="message"
            id="message"
            type="text"
            value={data.message}
            onChange={(e) => inputHandler(e)}
            className="p-2 mt-5"
            cols="30"
            rows="10"
            placeholder="Message"
          ></textarea>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
