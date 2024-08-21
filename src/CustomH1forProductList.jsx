import "./styles/CustomH1Styles.css";

export default function CustomH1forProductList({ children }) {
  return (
    <div className="categoryBlock">
      <h1>{children}</h1>
    </div>
  );
}
