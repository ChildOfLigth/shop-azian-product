import { tokkpoki } from "../listProduct";
import { tokkpokiInformation } from "../listProduct";
import GenerateProductList from "../GenerateProductList";
import classes from "../styles/GenerateProductList.module.css";
import CustomH1forProductList from "../CustomH1forProductList";

export default function Sauces() {
  return (
    <>
      <CustomH1forProductList>Токкпоки</CustomH1forProductList>

      {tokkpokiInformation ? (
        tokkpokiInformation.map((elem) => (
          <div className={classes.productInfo} key={elem.text}>
            <img src={elem.img} alt="" />
            <p>{elem.text}</p>
          </div>
        ))
      ) : (
        <h2>Data is not defined</h2>
      )}

      {tokkpoki && <GenerateProductList array={tokkpoki} classes={classes} />}
    </>
  );
}
