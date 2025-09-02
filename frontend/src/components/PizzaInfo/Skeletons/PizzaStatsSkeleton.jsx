import ContentLoader from "react-content-loader";

const PizzaStatsSkeleton = (props) => (
  <ContentLoader
    speed={2}
    height={97}
    viewBox="0 0 550 97"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    preserveAspectRatio="none"
    style={{ width: "100%" }}
    {...props}
  >
    <rect x="0" y="0" rx="12" ry="12" width="100%" height="45" />
    <rect x="0" y="73" rx="8" ry="8" width="133" height="24" />
    <rect x="157" y="73" rx="8" ry="8" width="98" height="24" />
  </ContentLoader>
);

export default PizzaStatsSkeleton;
