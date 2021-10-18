import React from "react";
import Footer from '../components/layouts/Footer';

const Extra = () => {
  return (
    <div className='m-0 p-0'>
      <section className="m-0">
        <div className="titr d-flex px-5 m-0 flex-row justify-content-between">
          <h1 className="m-3 align-self-center">
            <b>Extra</b>
          </h1>
          <h6 className="mx-2 my-3">(n) years of exprience</h6>
        </div>
      </section>

      <section className="row mx-auto">
        <h4 className="col-12 mx-5 mt-5 w-75">Pricing</h4>
        <div className="col-4 price-option text-center first-PO">
          <p className="my-4">Silver</p>
          <h1 className="mb-4">$64</h1>
          <button className="mb-4 px-3 py-2">Free Trial</button>
          <ul className="px-0 mb-5">
            <li className="mb-3">Lorem Ipsum</li>
            <li className="mb-3">dolor sit sollicitudin</li>
            <li className="mb-3">amet consectetur</li>
          </ul>
        </div>
        <div className="col-4 price-option text-center">
          <p className="my-4">Gold</p>
          <h1 className="mb-4">$128</h1>
          <button className="mb-4 px-3 py-2">Free Trial</button>
          <ul className="px-0 mb-5">
            <li className="mb-3">Lorem Ipsum</li>
            <li className="mb-3">dolor sit sollicitudin</li>
            <li className="mb-3">amet consectetur</li>
            <li className="mb-3">adipisicing elit</li>
          </ul>
        </div>
        <div className="col-4 price-option text-center">
          <p className="my-4">Pelatinum</p>
          <h1 className="mb-4">$256</h1>
          <button className="mb-4 px-3 py-2">Free Trial</button>
          <ul className="px-0 mb-5">
            <li className="mb-3">Lorem Ipsum</li>
            <li className="mb-3">dolor sit sollicitudin</li>
            <li className="mb-3">amet consectetur</li>
            <li className="mb-3">adipisicing elit</li>
            <li className="mb-3">Ad dignissimos</li>
          </ul>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Extra;
