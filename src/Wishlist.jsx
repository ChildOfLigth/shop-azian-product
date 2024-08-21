import { useEffect, useState } from "react";
import CustomH1forProductList from "./CustomH1forProductList";
import classes from "./styles/Wishlist.module.css";
import toBascketIco from "./imgs/icons/shopping-basket.png";
import delateProd from "./imgs/icons/bin.png";

export default function Wishlist() {
  const [parseArray, setParseArray] = useState([]);

  useEffect(() => {
    const acquiredData = localStorage.getItem("prodArrayForWishlist");
    if (acquiredData) {
      setParseArray(JSON.parse(acquiredData));
    }
  }, []);

  function removeProduct(product) {
    const updatedArray = parseArray.filter(
      (elem) => elem.name !== product.name
    );
    setParseArray(updatedArray);
    localStorage.setItem("prodArrayForWishlist", JSON.stringify(updatedArray));
  }


  function sendProductToTheCart(prod) {
    const allBascketElems = JSON.parse(localStorage.getItem("prodArrayForBascket"));
    const searchProduct = parseArray.find((elem) => elem.name === prod.name);
  
    if (searchProduct) {
      allBascketElems.push(searchProduct);
      localStorage.setItem("prodArrayForBascket", JSON.stringify(allBascketElems));
    }
  }

  return (
    <>
      <CustomH1forProductList>Список желаний</CustomH1forProductList>
      {parseArray.length > 0 ? (
        parseArray.map((elem) => (
          <div className={classes.productCard} key={elem.name}>
            <img src={elem.photo} alt={elem.name} />
            <p>{elem.name}</p>
            <button
              className={classes.functionButton}
              title="Добавить в корзину"
              onClick={() => sendProductToTheCart(elem)}
            >
              <img src={toBascketIco} alt="Add to basket" />
            </button>
            <button
              className={classes.functionButton}
              title="Удалить из списка"
              onClick={() => removeProduct(elem)}
            >
              <img src={delateProd} alt="Delete" />
            </button>
          </div>
        ))
      ) : (
        <h1>Список желаний пуст</h1>
      )}
    </>
  );
}
