import ContentLoader from "react-content-loader";

const PizzaAddSkeleton = (props) => (
  <ContentLoader
    speed={2}
    height={60}
    viewBox="0 0 150 60"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    preserveAspectRatio="none"
    style={{ width: "100%" }}
    {...props}
  >
    <rect x="0" y="0" rx="12" ry="12" width="100%" height="60" />
  </ContentLoader>
);

export default PizzaAddSkeleton;
