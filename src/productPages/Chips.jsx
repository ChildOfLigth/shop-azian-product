import { allChips } from "../listProduct";
import CustomH1forProductList from "../CustomH1forProductList";
import { chipsInformation } from "../listProduct";
import GenerateProductList from "../GenerateProductList";
import classes from "../styles/GenerateProductList.module.css";

export default function Chips() {
  return (
    <>
      <CustomH1forProductList>Чипсы и снеки</CustomH1forProductList>

      {chipsInformation ? (
        chipsInformation.map((elem) => (
          <div className={classes.productInfo} key={elem.text}>
            <img src={elem.img} alt="" />
            <p>{elem.text}</p>
          </div>
        ))
      ) : (
        <h2>Data is not defined</h2>
      )}

      {allChips && <GenerateProductList array={allChips} classes={classes} />}
    </>
  );
}
