import React from 'react';
import { Spinner as BsSpinner } from 'react-bootstrap';

const Spinner = () => (
  <div className="text-center py-5">
    <BsSpinner animation="border" variant="primary" />
    <p>Loading...</p>
  </div>
);

export default Spinner;
