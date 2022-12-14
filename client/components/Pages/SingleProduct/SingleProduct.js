import React, { useState, useEffect } from "react";
import { fetchProduct, updateCart, _getCart, _getProduct } from "../../../store";
import { connect } from "react-redux";
import swal from 'sweetalert'

function SingleProduct(props) {
  const { getProduct, updateCart, guestUpdateCart, product, user, cart, removeProduct } = props;

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        await getProduct(props.match.params.productId);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleProduct();
    return ()=>{removeProduct()}
  }, []);

  const onChangeHandler = (event) => {
    setQuantity(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (user?.id) {
        console.log("ur logged in!")
        let prevAmount = 0
        let obj = cart.find(item => item.product.id === product.id)
        if (obj){prevAmount = +obj.quantity}
      updateCart({quantity: +quantity + prevAmount, productId:product.id, price:product.price}, user.id)
      } else {
        let currentCart = {};
        if (localStorage.getItem("cart")) {
          currentCart = JSON.parse(localStorage.getItem("cart"));
        }
        let prevQuantity = 0
        if (currentCart[product.id]){prevQuantity = currentCart[product.id].quantity}
        currentCart = { ...currentCart, [product.id]: { quantity: +quantity + prevQuantity, product } };
        localStorage.setItem("cart", JSON.stringify(currentCart));
        guestUpdateCart(Object.values(currentCart))
      }
      swal("Success!", `Added ${product.title} to cart`, "success")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={"card"} style={{ width: "18rem" }}>
      <img className={"card-img-top"} src={product.imageUrl} alt="Card cap" />
      <div className={"card-body"}>
        <h5 className={"card-title"}>{product.title}</h5>

        <p className={"card-text"}>{product.description}</p>
        <input
          type="number"
          placeholder="1"
          min="1"
          onChange={onChangeHandler}
        />
        <button onClick={onSubmitHandler} className="btn btn-success single-button">Add to Cart</button>
      </div>
    </div>
  );
}

const mapDispatch = (dispatch) => {
  return {
    getProduct: (id) => dispatch(fetchProduct(id)),
    updateCart: (item, id) => dispatch(updateCart(item, id)),
    guestUpdateCart:(item) => dispatch(_getCart(item)),
    removeProduct: ()=> dispatch(_getProduct({}))
  };
};
const mapState = (state) => {
  return {
    product: state.singleProduct,
    user: state.auth.authUser,
    cart: state.cart
  };
};
export default connect(mapState, mapDispatch)(SingleProduct);
