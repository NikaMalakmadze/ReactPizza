import ContentLoader from "react-content-loader";

const PizzaDescSkeleton = (props) => (
  <ContentLoader
    speed={2}
    height={200}
    viewBox="0 0 565 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    preserveAspectRatio="none"
    style={{ width: "100%" }}
    {...props}
  >
    <rect x="0" y="0" rx="8" ry="8" width="100%" height="200" />
  </ContentLoader>
);

export default PizzaDescSkeleton;
