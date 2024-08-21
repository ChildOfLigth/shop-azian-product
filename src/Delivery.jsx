import classes from "./styles/Delivery.module.css";
import ico from "./imgs/icons/OIP-removebg-preview.png";

export default function Delivery() {
  return (
    <div className={classes.wrapper}>
      <h1>Доставка и оплата</h1>
      <h2>При первом заказе для Вас действует скидка 50% на все товары!</h2>

      <div className={classes.delivery}>
        <h2 className={classes.title}>Способы доставки</h2>
        <p>
          - доставка "Новой почтой". При заказе на 1000 гривен доставка
          бесплатная
        </p>
        <p>- доставка "Meest" При заказе на 1000 гривен доставка бесплатная</p>
        <p>
          - доставка "Укрпочтой". При заказе на 1000 гривен доставка бесплатная
        </p>
      </div>

      <div className={classes.payment}>
        <h2>Способ оплаты</h2>

        <ul>
          <h3 className={classes.title}>Оплата Новой почтой</h3>
          <li>
            -онлайн-оплата банковской картой (поддержка Apple Pay и Google Pay)
          </li>
          <li>-перевод на карту</li>
          <li>-оплата в отделении(любым способом), при заказе от 300грн</li>
        </ul>

        <ul>
          <h3 className={classes.title}>Оплата Meest почтой</h3>
          <li>
            -онлайн-оплата банковской картой (поддержка Apple Pay и Google Pay)
          </li>
          <li>-перевод на карту</li>
        </ul>

        <ul>
          <h3 className={classes.title}>Оплата Новой почтой</h3>
          <li>
            -онлайн-оплата банковской картой (поддержка Apple Pay и Google Pay)
          </li>
          <li>-перевод на карту</li>
          <li>-оплата в отделении(любым способом), при заказе от 300грн</li>
        </ul>

        <p>Доставка по всему Чернигову от 60 до 200 гривен</p>
      </div>
      <img src={ico} alt="" />
    </div>
  );
}
