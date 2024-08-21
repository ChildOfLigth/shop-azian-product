import { Outlet, NavLink, useNavigate } from "react-router-dom";
import icoWeb from "./imgs/icons/ramenico.png";
import likeIco from "./imgs/icons/heart-upside-down.png";
import basketIco from "./imgs/icons/shopping-basket.png";
import "./styles/Header.css";

export default function Header() {
  const navigate = useNavigate();
  return (
    <>
      <header className="header">
        <img
          src={icoWeb}
          alt="icoWebsite"
          className="icoWeb"
          onClick={() => navigate("/shop-azian-product")}
        />
        <span className="titleWeb">Oriental Delights</span>

        <ul className="linkBlock">
          <NavLink to="/shop-azian-product/fast-food">Лапша</NavLink>
          <NavLink to="/shop-azian-product/sauces">Соусы</NavLink>
          <NavLink to="/shop-azian-product/sweets">Сладости</NavLink>
          <NavLink to="/shop-azian-product/chips">Чипсы</NavLink>
        </ul>

        <div className="otherFunc">
          <button className="ico" onClick={() => navigate("/shop-azian-product/wishlist")}>
            <img
              src={likeIco}
              alt="likeProd"
              title="Список желаний"
              className="likeIco"
            />
          </button>

          <button className="ico" onClick={() => navigate("/shop-azian-product/productBascket")}>
            <img src={basketIco} alt="basket" title="Корзина" />
          </button>
        </div>
      </header>
      <Outlet />
    </>
  );
}
