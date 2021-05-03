const handleCart = (e) => {
    e.preventDefault();
    
    $("#cartMessage").animate({width: 'hide'}, 350);
    
    if($("cartName").val() == '') {
        handleError("All fields are required");
        return false;
    }
    
    sendAjax('POST', $("#cartForm").attr("action"), $("#cartForm").serialize(), function() {
        loadCartsFromServer();
    });
    
    return false;
};

const handleUpdate = (e) => {
    e.preventDefault();
    
    $("#cartMessage").animate({width: 'hide'}, 350);
    
    if($("cartName").val() == '') {
        handleError("All fields are required");
        return false;
    }
    
    sendAjax('POST', $("#updateCart").attr("action"), $("#updateCart").serialize(), function() {
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
            <label htmlFor="name">Name/Number: </label>
            <input id="cartName" type="text" name="name" placeholder="Cart Name"/>
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
    console.log(props.csrf);
    const cartNodes = props.carts.map(function(cart) {
        return (
            <div key={cart._id} className="cart">
                <form id="updateCart" onSubmit={handleUpdate} action="/update" method="POST" className="cartUpdateForm">
                <h3 className="cartName"> Name: {cart.name}</h3>
            
                <label htmlFor="usage"> Usage: </label>
                <input id="cartUpUsage" type="text" name="usage" placeholder={cart.usage}/>
            
                <label htmlFor="lastUser"> Last User: </label>
                <input id="cartUpUser" type="text" name="user" placeholder={cart.lastUser}/>
            
                <label htmlFor="lastReFuel"> Last Refuel: </label>
                <input id="cartUpFuel" type="text" name="lastReFuel" placeholder={cart.lastReFuel}/>
            
                <label htmlFor="working"> Working: </label>
                <input id="cartUpWorking" type="checkbox" name="working" value={cart.working}/>
            
                <label htmlFor="notes"> Notes: </label>
                <input id="cartUpNotes" type="text" name="notes" placeholder={cart.notes}/>
            
                <input type="hidden" name="name" value={cart.name} />
                <input type="hidden" name="_csrf" value={props.csrf} />
                <input className="updateCartSubmit" type="submit" value="Update Cart" />
                </form>
            </div>
        );
    });
    
    return (
        <div className="cartList">
            {cartNodes}
        </div>
    );
};

const loadCartsFromServer = (csrf) => {
    sendAjax('GET', '/getCarts', null, (data) => {
        ReactDOM.render(
            <CartList carts={data.carts} csrf={data.csrfToken} />, document.querySelector("#carts")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <CartForm csrf={csrf} />, document.querySelector("#makeCart")
    );
    
    ReactDOM.render(
        <CartForm carts={[]} csrf={csrf} />, document.querySelector("#carts")
    );
    
    loadCartsFromServer(csrf);
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});