import React from "react";
import PropTypes from "prop-types";

export default function ResponsiveImage({ src, width, height, alt }) {
  return (
    <div
      style={{
        position: "relative",
        maxWidth: "100%"
      }}
    >
      <img
        src={src}
        style={{
          paddingBottom: (height / width) * 100 + "%",
          position: "absolute",
          width: "100%",
          height: "100%"
        }}
        alt={alt}
      />
    </div>
  );
}

ResponsiveImage.propTypes = {
  src: PropTypes.any.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  alt: PropTypes.string.isRequired
};
