import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import classes from "./styles/ProductBascket.module.css";
import CustomH1forProductList from "./CustomH1forProductList";
import binIco from "./imgs/icons/bin.png";
import catsIco from "./imgs/icons/cfee189c5cbedbb42e6642275d6368db.gif";
import delateIco from "./imgs/icons/closeIco.png";

export default function ProductBasket() {
  const [submData, setSubmData] = useState([]);
  const [activeBlockForPlacingOrder, setActiveBlockForPlacingOrder] =
    useState(false);
  const [selectedRegion, setSelectedRegion] = useState("Выберите свою область");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [hasError, setHasError] = useState(false);
  const inputClass = classes.dataEntryString;

  const modalWindowCompletinPurchase = document.createElement("div");

  useEffect(() => {
    const storedArray = localStorage.getItem("prodArrayForBascket");
    if (storedArray) {
      const parseData = JSON.parse(storedArray);
      setSubmData(parseData);
    }
  }, []);

  const totalAll = Array.isArray(submData)
    ? submData.reduce((total, product) => total + product.price, 0)
    : 0;

  function addProduct(product) {
    const updatedData = submData.map((item) => {
      if (item.name === product.name) {
        return {
          ...item,
          quantity: item.quantity + 1,
          price: item.price + item.Defprice,
        };
      }
      return item;
    });

    setSubmData(updatedData);
    localStorage.setItem("prodArrayForBascket", JSON.stringify(updatedData));
  }

  function removeProduct(product) {
    const updatedData = submData.map((item) => {
      if (item.name === product.name) {
        const newQuantity = item.quantity > 1 ? item.quantity - 1 : 0;
        return {
          ...item,
          quantity: newQuantity,
          price: item.price - item.Defprice,
        };
      }
      return item;
    });

    setSubmData(updatedData);
    localStorage.setItem("prodArrayForBascket", JSON.stringify(updatedData));
  }

  function removeProductFromList(product) {
    const delatingProductFromList = submData.filter(
      (item) => item.name !== product.name
    );
    setSubmData(delatingProductFromList);
    localStorage.setItem(
      "prodArrayForBascket",
      JSON.stringify(delatingProductFromList)
    );
  }

  function validateFields() {
    let error = false;
    if (
      !name ||
      !surname ||
      !phone ||
      !city ||
      !postalCode ||
      selectedRegion === "Выберите свою область"
    ) {
      error = true;
    }
    setHasError(error);
    return !error;
  }

  function showModalWind() {
    if (validateFields()) {
      modalWindowCompletinPurchase.className = "modalWindComplatePurchas";
      modalWindowCompletinPurchase.innerHTML = `
      <h2>Успешно!</h2>
      <p>Ваш заказ оформлен, мы свяжемся с Вами в течение суток.</p>
      <p>Спасибо, что выбрали нас!</p>
      <img src=${catsIco}/>
    `;
      document.body.appendChild(modalWindowCompletinPurchase);
      setTimeout(() => {
        modalWindowCompletinPurchase.className = "";
      }, 4000);
    } else {
      console.log("Some fields are not filled!");
    }
  }

  function handleRegionChange(event) {
    setSelectedRegion(event.target.value);
  }

  return (
    <>
      <div className={classes.topBlock}>
        <CustomH1forProductList>Ваша корзина</CustomH1forProductList>
        <button
          className={classes.clearListButton}
          onClick={() => {
            setSubmData([]);
            localStorage.removeItem("prodArrayForBascket");
          }}
        >
          <img src={binIco} alt="" />
        </button>
      </div>
      <div>
        {submData.length > 0 ? (
          <>
            <table className={classes.tableBasketProduct}>
              <thead>
                <tr>
                  <th>Изображение</th>
                  <th>Название</th>
                  <th>Количество</th>
                  <th>Цена</th>
                </tr>
              </thead>
              <tbody>
                {submData.map((elem, index) => (
                  <tr key={index}>
                    <td>
                      <img src={elem.photo} alt={elem.name} />
                    </td>
                    <td>{elem.name}</td>
                    <td>
                      <div className={classes.generateQuintity}>
                        <button onClick={() => removeProduct(elem)}>-</button>
                        {elem.quantity}
                        <button onClick={() => addProduct(elem)}>+</button>
                        <button onClick={() => removeProductFromList(elem)}>
                          <img src={delateIco} alt="" />
                        </button>
                      </div>
                    </td>
                    <td>{elem.price} грн</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">Общая сумма:</td>
                  <td>{totalAll} грн</td>
                </tr>
              </tfoot>
            </table>

            <form
              className={classes.completePurchase}
              onSubmit={(event) => event.preventDefault()}
            >
              <h2>
                <span>К оплате:</span> {totalAll} грн
              </h2>
              <button
                className={classes.makeAPurchase}
                onClick={() => setActiveBlockForPlacingOrder(true)}
              >
                Оплатить
              </button>
            </form>
            <div
              className={
                !activeBlockForPlacingOrder
                  ? classes.formFillingDepartment
                  : `${classes.formFillingDepartment} ${classes.active}`
              }
            >
              <div
                id={classes.personalDataBlock}
                className={classes.blockForData}
              >
                <h3>Ваши личные данные</h3>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`${inputClass} ${
                    hasError && !name ? classes.errorClass : ""
                  }`}
                />
                <input
                  type="text"
                  placeholder="Ваша Фамилия"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className={`${inputClass} ${
                    hasError && !surname ? classes.errorClass : ""
                  }`}
                />
                <PhoneInput
                  country={"ua"}
                  value={phone}
                  onChange={setPhone}
                  inputClass={`${hasError && !phone ? classes.errorClass : ""}`}
                />
                <select
                  value={selectedRegion}
                  onChange={handleRegionChange}
                  className={`${inputClass} ${
                    hasError && selectedRegion === "Выберите свою область"
                      ? classes.errorClass
                      : ""
                  }`}
                >
                  <option value="Выберите свою область">
                    Выберите свою область
                  </option>
                  <option value="Киевская">Киевская</option>
                  <option value="Крымская">Крымская</option>
                  <option value="Кирововградская">Кирововградская</option>
                  <option value="Полтавская">Полтавская</option>
                  <option value="Луганская">Луганская</option>
                  <option value="Львовская">Львовская</option>
                  <option value="Донецкая">Донецкая</option>
                  <option value="Днепропетровская">Днепропетровская</option>
                  <option value="Виннецкая">Виннецкая</option>
                  <option value="Волынская">Волынская</option>
                  <option value="Херсонская">Херсонская</option>
                  <option value="Хмельницкая">Хмельницкая</option>
                  <option value="Харьковская">Харьковская</option>
                  <option value="Черкаская">Черкаская</option>
                  <option value="Черниговская">Черниговская</option>
                  <option value="Черновицкая">Черновицкая</option>
                </select>
                <input
                  type="text"
                  placeholder="Ваш город"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`${inputClass} ${
                    hasError && !city ? classes.errorClass : ""
                  }`}
                />
                <input
                  type="text"
                  placeholder="Почтовый индекс"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className={`${inputClass} ${
                    hasError && !postalCode ? classes.errorClass : ""
                  }`}
                />
              </div>

              <div id={classes.paymentDataBlock} className={inputClass}>
                <h3>Способ доставки</h3>
                <label htmlFor="novaPoshta">
                  <input type="radio" id="novaPoshta" name="deliveryMethod" />
                  Новая почта
                </label>
                <label htmlFor="ukrPoshta">
                  <input type="radio" id="ukrPoshta" name="deliveryMethod" />
                  УкрПочта
                </label>
                <label htmlFor="MeestPoshta">
                  <input type="radio" id="MeestPoshta" name="deliveryMethod" />
                  Meest почта
                </label>

                <h3>Способ оплаты</h3>
                <label htmlFor="online">
                  <input type="radio" id="online" name="paymentMethod" />
                  Оплата онлайн
                </label>
                <label htmlFor="toCard">
                  <input type="radio" id="toCard" name="paymentMethod" />
                  Перевод на карту
                </label>
              </div>
              <button onClick={showModalWind} className={classes.sendForm}>
                Завершить
              </button>
            </div>
          </>
        ) : (
          <h2 className={classes.emptyBasketMessage}>Ваша корзина пуста</h2>
        )}
      </div>
    </>
  );
}
