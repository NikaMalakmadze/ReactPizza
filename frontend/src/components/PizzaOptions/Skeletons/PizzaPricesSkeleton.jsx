import ContentLoader from "react-content-loader";

const PizzaPricesSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={120}
    height={42}
    viewBox="0 0 120 42"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="8" ry="8" width="120" height="42" />
  </ContentLoader>
);

export default PizzaPricesSkeleton;
