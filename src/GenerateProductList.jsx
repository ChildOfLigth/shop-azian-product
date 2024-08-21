import { useState, useCallback } from "react";
import styles from "./styles/GenerateProductList.module.css";
import list from "./imgs/icons/list.png";
import pixels from "./imgs/icons/pixels.png";
import arrowIco from "./imgs/icons/arrowTop.png";
import goBackArray from "./imgs/icons/go-back-arrow.png";
import { useNavigate } from "react-router-dom";

export default function GenerateProductList({ array, classes }) {
  const [currentPhoto, setCurrentPhoto] = useState({});
  const [activePixButton, setActivePixButton] = useState(true);
  const [activeListButton, setActiveListButton] = useState(false);
  const [sortedArray, setSortedArray] = useState(array);
  const [selectedProducers, setSelectedProducers] = useState([]);
  const navigate = useNavigate();

  const handleMouseOver = useCallback((id, dopPhoto) => {
    setCurrentPhoto((prevState) => ({ ...prevState, [id]: dopPhoto }));
  }, []);

  const handleMouseOut = useCallback((id, photo) => {
    setCurrentPhoto((prevState) => ({ ...prevState, [id]: photo }));
  }, []);

  function scrollTopFunction() {
    window.scrollTo({
      top: 0,
      left: 1000,
      behavior: "smooth",
    });
  }

  function filterTheArrayProducts(producer) {
    let updatedProducers = [...selectedProducers];
    if (updatedProducers.includes(producer)) {
      updatedProducers = updatedProducers.filter((item) => item !== producer);
    } else {
      updatedProducers.push(producer);
    }
    setSelectedProducers(updatedProducers);

    const filterArray = array.filter((product) =>
      updatedProducers.includes(product.producer)
    );
    setSortedArray(filterArray.length ? filterArray : array);
  }

  function resetFilters() {
    setSelectedProducers([]);
    setSortedArray(array);
    document
      .querySelectorAll(`.${classes.wrapperFilterBlock} input[type="checkbox"]`)
      .forEach((checkbox) => {
        checkbox.checked = false;
      });
  }

  return (
    <>
      <div className={classes.wrapperFilterBlock}>
        <div className={classes.headSortBlock}>
          <h2>Бренд</h2>
          <button className={classes.removeChanges} onClick={resetFilters}>
            <img src={goBackArray} alt="" />
          </button>
        </div>

        <label>
          <input
            type="checkbox"
            onChange={() => filterTheArrayProducts("SamYang")}
          />{" "}
          SamYang
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => filterTheArrayProducts("Nongshim")}
          />{" "}
          Nongshim
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => filterTheArrayProducts("Ottogi")}
          />{" "}
          Ottogi
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => filterTheArrayProducts("YumYum")}
          />{" "}
          YumYum
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => filterTheArrayProducts("Yopokki")}
          />{" "}
          Yopokki
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => filterTheArrayProducts("Bibizan")}
          />{" "}
          Bibizan
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => filterTheArrayProducts("Orion")}
          />{" "}
          Orion
        </label>
      </div>
      <div className={styles.filterBlock}>
        <img
          src={list}
          alt="list"
          className={styles.sortIco}
          id="list"
          onClick={() => {
            setActiveListButton(true);
            setActivePixButton(false);
          }}
        />
        <img
          src={pixels}
          alt="pixels"
          className={styles.sortIco}
          id="pixels"
          onClick={() => {
            setActivePixButton(true);
            setActiveListButton(false);
          }}
        />

        <div className={classes.wrapperBtnFunc}>
          <input
            type="checkbox"
            id="toggle"
            className={styles.toggleCheckbox}
          />
          <label htmlFor="toggle" className={styles.toggleLabel}>
            Сортировать данные..
          </label>

          <div className={styles.blockSortingFunc}>
            <button onClick={() => setSortedArray(array)}>По умолчанию</button>
            <button
              onClick={() => {
                const sorted = [...array].sort(
                  (a, b) => parseFloat(a.price) - parseFloat(b.price)
                );
                setSortedArray(sorted);
              }}
            >
              Цена по возрастанию
            </button>
            <button
              onClick={() => {
                const sorted = [...array].sort(
                  (a, b) => parseFloat(b.price) - parseFloat(a.price)
                );
                setSortedArray(sorted);
              }}
            >
              Цена по убыванию
            </button>
          </div>
        </div>
      </div>

      <ul className={classes.list}>
        {sortedArray.map((product) => (
          <div key={product.id}>
            {activePixButton && (
              <li className={activePixButton ? classes.elem : classes.hidden}>
                <div className={classes.wrapperImg}>
                  <img
                    alt={product.name}
                    src={currentPhoto[product.id] || product.photo}
                    onMouseOver={() =>
                      handleMouseOver(product.id, product.dopPhoto)
                    }
                    onMouseOut={() => handleMouseOut(product.id, product.photo)}
                    onClick={() => navigate(`/shop-azian-product/product/${product.name}`)}
                  />
                </div>
                <div className={classes.productData}>
                  <p>
                    {product.name.length >= 33
                      ? product.name.slice(0, 33) + "..."
                      : product.name}
                  </p>
                  <p className={classes.price}>{product.price}</p>
                </div>
              </li>
            )}
            {activeListButton && (
              <li
                className={
                  activeListButton ? classes.extendedElem : classes.hidden
                }
                onMouseOver={() =>
                  handleMouseOver(product.id, product.dopPhoto)
                }
                onMouseOut={() => handleMouseOut(product.id, product.photo)}
              >
                <img
                  alt={product.name}
                  src={currentPhoto[product.id] || product.photo}
                  onClick={() => navigate(`/shop-azian-product/product/${product.name}`)}
                />
                <div className={classes.extendedData}>
                  <p className={classes.name}>
                    {product.name.length >= 33
                      ? product.name.slice(0, 33) + "..."
                      : product.name}
                  </p>
                  <p>
                    {product.data.length >= 130
                      ? product.data.slice(0, 130) + "..."
                      : product.data}
                  </p>
                  <p className={classes.price}>{product.price}</p>
                </div>
              </li>
            )}
          </div>
        ))}
      </ul>
      <button className={styles.buttonTop} onClick={scrollTopFunction}>
        <img src={arrowIco} alt="" />
      </button>
    </>
  );
}
