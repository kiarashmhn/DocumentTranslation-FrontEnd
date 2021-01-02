import React from "react";
import * as PropTypes from "prop-types";

const Iframe = ({ source }) => {
  if (!source) {
    return <div>Loading...</div>;
  }

  return (
    // basic bootstrap classes. you can change with yours.
    <div className="col-md-12">
      <div className="emdeb-responsive">
        <iframe src={source} />
      </div>
    </div>
  );
};
Iframe.propTypes = {
  source: PropTypes.string.isRequired
};

export default Iframe;
