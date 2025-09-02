import ContentLoader from "react-content-loader";

const PizzaImageSkeleton = (props) => (
  <ContentLoader
    rtl
    speed={2}
    width={550}
    height={550}
    viewBox="0 0 550 550"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="290" cy="260" r="250" />
  </ContentLoader>
);

export default PizzaImageSkeleton;
