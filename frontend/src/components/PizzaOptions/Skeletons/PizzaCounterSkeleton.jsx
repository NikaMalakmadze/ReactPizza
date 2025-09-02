import ContentLoader from "react-content-loader";

const PizzaCounterSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={150}
    height={50}
    viewBox="0 0 150 50"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="12" ry="12" width="150" height="50" />
  </ContentLoader>
);

export default PizzaCounterSkeleton;
