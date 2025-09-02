import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <div className="pizza-block__wrapper pizza-block__skeleton">
    <ContentLoader
      rtl
      speed={2}
      width={280}
      height={466}
      viewBox="0 0 280 466"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="140" cy="130" r="125" />
      <rect x="50" y="275" rx="8" ry="8" width="180" height="24" />
      <rect x="0" y="421" rx="30" ry="30" width="161" height="45" />
      <rect x="179" y="430" rx="10" ry="10" width="101" height="27" />
      <rect x="0" y="319" rx="10" ry="10" width="280" height="88" />
    </ContentLoader>
  </div>
);

export default Skeleton;
