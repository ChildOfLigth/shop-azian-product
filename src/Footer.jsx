import { Outlet, Link } from "react-router-dom";
import classes from "./styles/Footer.module.css";
import githubIco from "./imgs/icons/github.png";
import instagramIco from "./imgs/icons/instagram.png";

export default function Footer() {
  return (
    <div className={classes.wrapper}>
      <Outlet />
      <div
        className={`${classes.communicationMethods} ${classes.elem}`}
        id="elem"
      >
        <h2>Контакты</h2>
        <p>+380-99-343-00-11</p>
        <p>+380-98-223-10-45</p>
        <p>г.Чернигов ул Пролитарская 33</p>
        <p>Пн-Вс 10:00-19:00</p>
      </div>
      <div className={`${classes.aboutUs} ${classes.elem}`} id="elem">
        <h2>Информация</h2>
        <Link to={"/shop-azian-product/aboutUs"}>О нас</Link>
        <Link to={"/shop-azian-product/delivery"}>Доставка и оплата</Link>
      </div>
      <div className={`${classes.netwSell} ${classes.elem}`} id="elem">
        <h2>Соцсети</h2>
        <a href="https://github.com/ChildOfLigth" target="_blank" title="MyGitHub" rel="noreferrer">
          <img src={githubIco} alt="github" className={classes.icoNetw} />
        </a>
        <img src={instagramIco} alt="instagram" className={classes.icoNetw} />
      </div>
    </div>
  );
}
