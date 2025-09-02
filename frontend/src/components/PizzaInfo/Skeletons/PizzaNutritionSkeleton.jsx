import ContentLoader from "react-content-loader";

const PizzaNutritionSkeleton = (props) => (
  <ContentLoader
    speed={2}
    height={500}
    viewBox="0 0 565 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    preserveAspectRatio="none"
    style={{ width: "100%" }}
    {...props}
  >
    <rect x="0" y="0" rx="12" ry="12" width="100%" height="500" />
  </ContentLoader>
);

export default PizzaNutritionSkeleton;
