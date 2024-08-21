import { useNavigate } from "react-router-dom";
import catImg from "./imgs/icons/nekoCat.png";
import leftArrowIco from "./imgs/icons/left-arrowIco.png";
import rigthArrowIco from "./imgs/icons/right-arrow.png";
import classes from "./styles/MainPage.module.css";
import {
  recommendFastFood,
  recomendedSauces,
  recomendedSweets,
  recomendedChips,
} from "./listProduct";
import CustomH1forProductList from "./CustomH1forProductList";
import { useCallback, useMemo, useState } from "react";

function selectArrayElements(array, from, to) {
  const length = array.length;
  from = from % length;
  to = to % length;
  if (from < to) {
    return array.slice(from, to);
  }
  return array.slice(from).concat(array.slice(0, to));
}

export default function MainPage() {
  const itemsToShow = 4;
  const navigate = useNavigate();
  const [startIdx, setStartIdx] = useState(0);
  const [activeButton, setActiveButton] = useState("fastFood");

  const productLists = useMemo(
    () => ({
      fastFood: recommendFastFood,
      sauces: recomendedSauces,
      sweets: recomendedSweets,
      chips: recomendedChips,
    }),
    []
  );

  const [productDepartment, setProductDepartment] = useState(
    selectArrayElements(
      productLists[activeButton],
      startIdx,
      startIdx + itemsToShow
    )
  );

  function navigateDepart(array, department) {
    setStartIdx(0);
    setProductDepartment(selectArrayElements(array, 0, itemsToShow));
    setActiveButton(department);
  }

  const showMoreProducts = useCallback(() => {
    setStartIdx((prevIdx) => {
      const totalItems = productLists[activeButton].length;
      const newIdx = (prevIdx + 1) % totalItems;
      setProductDepartment(
        selectArrayElements(
          productLists[activeButton],
          newIdx,
          newIdx + itemsToShow
        )
      );
      return newIdx;
    });
  }, [activeButton, itemsToShow, productLists]);

  return (
    <>
      <div className={classes.advertisementBlock}>
        <span>В наличии</span>
        <h1>РАМЕНЫ ОТ SAMYANG</h1>
        <p>Популярная компания, у которой много других интересных товаров</p>
        <button
          className={classes.navigatButt}
          onClick={() => navigate("/shop-azian-product/fast-food")}
        >
          ЗАКАЗАТЬ
        </button>
      </div>
      <img src={catImg} alt="cat" className={classes.decoration} />

      <div className={classes.recomendProduct}>
        <CustomH1forProductList>
          Товары, которые мы рекомендуем
        </CustomH1forProductList>

        <div className={classes.blockNavigatingthrouDepartm}>
          <button
            onClick={() => navigateDepart(recommendFastFood, "fastFood")}
            className={activeButton === "fastFood" ? classes.active : ""}
          >
            Еда быстрого приготовления
          </button>
          <button
            onClick={() => navigateDepart(recomendedSauces, "sauces")}
            className={activeButton === "sauces" ? classes.active : ""}
          >
            Соусы
          </button>
          <button
            onClick={() => navigateDepart(recomendedSweets, "sweets")}
            className={activeButton === "sweets" ? classes.active : ""}
          >
            Сладости
          </button>
          <button
            onClick={() => navigateDepart(recomendedChips, "chips")}
            className={activeButton === "chips" ? classes.active : ""}
          >
            Чипсы
          </button>
        </div>

        <ul className={classes.listProduct}>
          <button>
            <img src={leftArrowIco} className={classes.navigate} alt="" />
          </button>
          {productDepartment.map((product) => (
            <li className={classes.elem} key={product.id}>
              <img
                alt={product.name}
                src={product.photo}
                onClick={() => navigate(`/shop-azian-product/product/${product.name}`)}
              />
              <div className={classes.productData}>
                <p>
                  {product.name.length >= 33
                    ? product.name.slice(0, 33) + "..."
                    : product.name}
                </p>
                <p className={classes.price}>{product.price}</p>
              </div>
            </li>
          ))}
          <button>
            <img
              src={rigthArrowIco}
              alt=""
              className={classes.navigate}
              onClick={showMoreProducts}
            />
          </button>
        </ul>
      </div>
    </>
  );
}
