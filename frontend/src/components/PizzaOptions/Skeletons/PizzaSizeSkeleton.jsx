import ContentLoader from "react-content-loader";

const PizzaSizeSkeleton = (props) => (
  <ContentLoader
    speed={2}
    height={204}
    viewBox="0 0 565 204"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    preserveAspectRatio="none"
    style={{ width: "100%" }}
    {...props}
  >
    <rect x="0" y="0" rx="12" ry="12" width="100%" height="60" />
    <rect x="0" y="72" rx="12" ry="12" width="100%" height="60" />
    <rect x="0" y="144" rx="12" ry="12" width="100%" height="60" />
  </ContentLoader>
);

export default PizzaSizeSkeleton;
