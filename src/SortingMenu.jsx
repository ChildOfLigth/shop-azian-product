import { NavLink } from "react-router-dom";
import classes from "./styles/NavigateMenu.module.css";
import {
  allChips,
  allNoodles,
  tokkpoki,
  allSauces,
  allSweets,
} from "./listProduct";

export default function NavigateMenu() {
  return (
    <div className={classes.wrapperForSortBlock}>
      <div className={classes.navigateBlock}>
        <div className={classes.headCategoriesBlock}>
          <p>Категории</p>
        </div>
        <ul className={classes.categoriesNoodles}>
          <p>
            <NavLink to="/shop-azian-product/fast-food">{`Лапша(${allNoodles.length})`}</NavLink>
          </p>
          <li>
            <NavLink to="/shop-azian-product/fast-food/tokkpoki">{`-Токпокки(${tokkpoki.length})`}</NavLink>
          </li>
        </ul>
        <NavLink to="/shop-azian-product/sauces">{`Соусы(${allSauces.length})`}</NavLink>
        <NavLink to="/shop-azian-product/sweets">{`Сладости(${allSweets.length})`}</NavLink>
        <NavLink to="/shop-azian-product/chips">{`Чипсы(${allChips.length})`}</NavLink>
      </div>
    </div>
  );
}
