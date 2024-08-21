import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "../styles/ProductCard.module.css";
import arrowIco from "../imgs/icons/arrow.png";
import homeIco from "../imgs/icons/home.png";
import likeIco from "../imgs/icons/heart-upside-down.png";
import basketIco from "../imgs/icons/shopping-basket.png";
import successIco from "../imgs/icons/accept.png";
import closeIco from "../imgs/icons/closeIco.png";

function ProductCard({ array }) {
  const { name } = useParams();
  const [srcPhoto, setSrcPhoto] = useState(null);
  const [dopPhoto, setDopPhoto] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [priceProd, setPriceProduct] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [isMainPhoto, setIsMainPhoto] = useState(true);
  const navigate = useNavigate();
  const product = array.find((prod) => prod.name === name);

  useEffect(() => {
    if (product) {
      setSrcPhoto(product.photo);
      setDopPhoto(product.dopPhoto);
      setPriceProduct(parseInt(product.price));
    }
  }, [product]);

  function addModaleWind(placeofInfo) {
    const moduleWindow = document.createElement("div");
    moduleWindow.className = "modalCartWindow";

    moduleWindow.innerHTML = `
        <button onclick="this.parentElement.classList.add('hiden')"><img src=${closeIco} /></button>
        <img src=${successIco} />
        <h2>Товар <span>${product.name}</span> добавлен в ${placeofInfo}</h2>
    `;
    setTimeout(() => moduleWindow.classList.add("hiden"), 5000);
    document.body.appendChild(moduleWindow);
  }
  function handleData(localStorVariant) {
    const productData = {
      name: product.name,
      photo: product.photo,
      price: priceProd,
      Defprice: parseInt(product.Defprice),
      quantity: quantity,
    };

    let storedArray = JSON.parse(localStorage.getItem(localStorVariant));
    if (!Array.isArray(storedArray)) {
      storedArray = [];
    }

    storedArray.push(productData);
    addModaleWind("корзину");
    localStorage.setItem(localStorVariant, JSON.stringify(storedArray));
  }

  function addProduct() {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      setPriceProduct(parseInt(product.price) * newQuantity);
      return newQuantity;
    });
  }

  function removeProduct() {
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        const newQuantity = prevQuantity - 1;
        setPriceProduct(parseInt(product.price) * newQuantity);
        return newQuantity;
      }
      return prevQuantity;
    });
  }

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  function handlePhotoClick() {
    setSrcPhoto(isMainPhoto ? product.dopPhoto : product.photo);
    setDopPhoto(isMainPhoto ? product.photo : product.dopPhoto);
    setIsMainPhoto(!isMainPhoto);
  }
  

  return (
    <>
      <div className={classes.navigateBlock}>
        <button className={classes.prevPage} onClick={() => navigate("/")}>
          <img src={homeIco} alt="Домой" />
        </button>
        <button className={classes.prevPage} onClick={() => navigate(-1)}>
          <img src={arrowIco} alt="Назад" />
        </button>
      </div>

      <div className={classes.productCard}>
        {product.dopPhoto && (
          <img
            src={dopPhoto}
            alt="Дополнительное фото"
            className={classes.dopPhoto}
            onClick={handlePhotoClick}
          />
        )}

        <img
          src={srcPhoto}
          alt="Основное фото"
          className={classes.defaultPhoto}
        />
        <div className={classes.dataProduct}>
          <h1>{product.name}</h1>
          <p>
            <span>Тип товара: </span> {product.type}
          </p>
          {product.producer && (
            <p>
              <span>Производитель: </span> {product.producer}
            </p>
          )}
          <p>
            <span>Вес: </span> {product.weight}
          </p>
          <p>
            <span>Цена: </span> {priceProd} грн
          </p>

          <div className={classes.productQuantity}>
            <p>Количество: </p>
            <div className={classes.blockButton}>
              <button onClick={addProduct}>+</button>
              <p className={animate ? classes.zoom : ""}>{quantity}</p>
              <button onClick={removeProduct}>-</button>
            </div>
          </div>

          <div className={classes.dataProcessing}>
            <button
              className={classes.ico}
              onClick={() => handleData("prodArrayForWishlist")}
            >
              <img
                src={likeIco}
                alt="likeProd"
                title="Список желаний"
                className={classes.likeIco}
              />
            </button>

            <button
              className={classes.ico}
              onClick={() => handleData("prodArrayForBascket")}
            >
              <img src={basketIco} alt="basket" title="Корзина" />
            </button>
          </div>
        </div>
      </div>
      <div className={classes.dopData}>
        <h2>{product.name}</h2>
        <p>{product.data}</p>
        <p>
          <span>Срок годности: </span>
          {product.shelfLife}
        </p>
      </div>
    </>
  );
}

export default ProductCard;
