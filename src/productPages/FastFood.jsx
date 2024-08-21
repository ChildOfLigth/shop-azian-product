import { allNoodles } from "../listProduct";
import { noodleInformation } from "../listProduct";
import GenerateProductList from "../GenerateProductList";
import classes from "../styles/GenerateProductList.module.css";
import CustomH1forProductList from "../CustomH1forProductList";

export default function Sauces() {
  return (
    <>
      <CustomH1forProductList>Лапша</CustomH1forProductList>

      {noodleInformation ? (
        noodleInformation.map((elem) => (
          <div className={classes.productInfo} key={elem.text}>
            <img src={elem.img} alt="" />
            <p>{elem.text}</p>
          </div>
        ))
      ) : (
        <h2>Data is not defined</h2>
      )}

      {allNoodles && (
        <GenerateProductList array={allNoodles} classes={classes} />
      )}
    </>
  );
}
