const handleCart = (e) => {
    e.preventDefault();
    
    $("#cartMessage").animate({width: 'hide'}, 350);
    
    if($("cartName").val() == '' || $("#cartAge").val() == '') {
        handleError("RAWR! All fields are required");
        return false;
    }
    
    sendAjax('POST', $("#cartForm").attr("action"), $("#cartForm").serialize(), function() {
        loadCartsFromServer();
    });
    
    return false;
};

const CartForm = (props) => {
    return (
        <form id="cartForm"
            onSubmit={handleCart}
            name="cartForm"
            action="/maker"
            method="POST"
            className="cartForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="cartName" type="text" name="name" placeholder="Cart Name"/>
            <label htmlFor="age">Age: </label>
            <input id="cartAge" type="text" name="age" placeholder="Cart Age"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeCartSubmit" type="submit" value="Make Cart" />
        </form>
    );
};

const CartList = function(props) {
    if(props.carts.length === 0) {
        return (
            <div className="cartList">
                <h3 className="emptyCart">No Carts yet</h3>
            </div>
        );
    }
    
    const cartNodes = props.carts.map(function(cart) {
        return (
            <div key={cart._id} className="cart">
                <img src="/assets/img/cartface.jpeg" alt="cart face" className="cartFace" />
                <h3 className="cartName"> Name: {cart.name} </h3>
                <h3 className="cartAge"> Age: {cart.age} </h3>
            </div>
        );
    });
    
    return (
        <div className="cartList">
            {cartNodes}
        </div>
    );
};

const loadCartsFromServer = () => {
    sendAjax('GET', '/getCarts', null, (data) => {
        ReactDOM.render(
            <CartList carts={data.carts} />, document.querySelector("#carts")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <CartForm csrf={csrf} />, document.querySelector("#makeCart")
    );
    
    ReactDOM.render(
        <CartForm carts={[]} />, document.querySelector("#carts")
    );
    
    loadCartsFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});