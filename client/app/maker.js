let sortUsage = 0;
let showWorking = true;

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
    
    if($("usage").val() == undefined)
        e.target[0].value = e.target[0].placeholder;
    if($("lastUser").val() == undefined)
        e.target[1].value = e.target[1].placeholder;
    if($("lastReFuel").val() == undefined)
        e.target[2].value = e.target[2].placeholder;
    if($("notes").val() == undefined)
        e.target[4].value = e.target[4].placeholder;
        
    sendAjax('POST', $("#" + e.target.id.toString()).attr("action"), $("#" + e.target.id.toString()).serialize(), function() {
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
    let sortUsage;
    let showWorking;
    
    if(props.sortUsage === undefined)
        sortUsage = 0;
    else
        sortUsage = props.sortUsage;
    if(props.showWorking === undefined)
        showWorking = true;
    else
        showWorking = props.showWorking;
    
    
    if(props.carts.length === 0) {
        return (
            <div className="cartList">
                <h3 className="emptyCart">No Carts yet</h3>
            </div>
        );
    }
    
    let cartNodes = props.carts.map(function(cart) {
        if(cart.working)
        {
            return (
                <div key={cart._id} className="cart">
                    <form id={cart._id} onSubmit={handleUpdate} action="/update" method="POST" className="cartUpdateForm">
                    <h3 id="cartName"> Name: {cart.name}</h3>

                    <label htmlFor="usage"> Usage: </label>
                    <input id="cartUpUsage" type="text" name="usage" placeholder={cart.usage}/>

                    <label htmlFor="lastUser"> Last User: </label>
                    <input id="cartUpUser" type="text" name="lastUser" placeholder={cart.lastUser}/>

                    <label htmlFor="lastReFuel"> Last Refuel: </label>
                    <input id="cartUpFuel" type="text" name="lastReFuel" placeholder={cart.lastReFuel}/>

                    <label htmlFor="working"> Working: </label>
                    <select className="cartUpWorkingYes" name="working">
                        <option value="true" defaultValue>Yes</option>
                        <option value="false">No</option>
                    </select>


                    <label htmlFor="notes"> Notes: </label>
                    <input id="cartUpNotes" type="text" name="notes" placeholder={cart.notes}/>

                    <input type="hidden" name="name" value={cart.name} />
                    <input type="hidden" name="_csrf" value={props.csrf} />
                    <input type="hidden" name="_id" value={cart._id} />
                    <input className="updateCartSubmit" type="submit" value="Update Cart" />
                    </form>
                </div>
            );
        }
        else
        {
            return (
                <div key={cart._id} className="cart">
                    <form id={cart._id} onSubmit={handleUpdate} action="/update" method="POST" className="cartUpdateForm">
                    <h3 id="cartName"> Name: {cart.name}</h3>

                    <label htmlFor="usage"> Usage: </label>
                    <input id="cartUpUsage" type="text" name="usage" placeholder={cart.usage}/>

                    <label htmlFor="lastUser"> Last User: </label>
                    <input id="cartUpUser" type="text" name="lastUser" placeholder={cart.lastUser}/>

                    <label htmlFor="lastReFuel"> Last Refuel: </label>
                    <input id="cartUpFuel" type="text" name="lastReFuel" placeholder={cart.lastReFuel}/>

                    <label htmlFor="working"> Working: </label>
                    <select className="cartUpWorkingNo" name="working">
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>


                    <label htmlFor="notes"> Notes: </label>
                    <input id="cartUpNotes" type="text" name="notes" placeholder={cart.notes}/>

                    <input type="hidden" name="name" value={cart.name} />
                    <input type="hidden" name="_csrf" value={props.csrf} />
                    <input type="hidden" name="_id" value={cart._id} />
                    <input className="updateCartSubmit" type="submit" value="Update Cart" />
                    </form>
                </div>
            );
        }
        
    });
    if(sortUsage == 1)
    {
        let tempArray = [];
        while(cartNodes.length != 0)
        {
            let index = 0;
            let lowest = cartNodes[index].props.children.props.children[2].props.placeholder;
            let holder = cartNodes[index];
            for(let j = 0; j < cartNodes.length; j++)
            {
                if(lowest > cartNodes[j].props.children.props.children[2].props.placeholder)
                {
                    lowest = cartNodes[j].props.children.props.children[2].props.placeholder;
                    holder = cartNodes[j];
                    index = j;
                }
            }
            cartNodes.splice(index, 1);
            tempArray.push(holder);
        }
    
        cartNodes = tempArray;
    }
    else if(sortUsage == 2)
    {
        let tempArray = [];
        while(cartNodes.length != 0)
        {
            let index = 0;
            let highest = cartNodes[index].props.children.props.children[2].props.placeholder;
            let holder = cartNodes[index];
            for(let j = 0; j < cartNodes.length; j++)
            {
                if(highest < cartNodes[j].props.children.props.children[2].props.placeholder)
                {
                    highest = cartNodes[j].props.children.props.children[2].props.placeholder;
                    holder = cartNodes[j];
                    index = j;
                }
            }
            cartNodes.splice(index, 1);
            tempArray.push(holder);
        }
    
        cartNodes = tempArray;
        console.log(cartNodes);
    }
    
    if(showWorking != true)
    {
        console.log("here");
        for(let i = 0; i < cartNodes.length; i++)
        {
            console.log(cartNodes[i].props.children.props.children[8]);
            if(cartNodes[i].props.children.props.children[8].props.className === "cartUpWorkingNo")
            {
                cartNodes.splice(i, 1);
            }
        }
    }
    
    
    const buttonSortUsage = function() {    
        sortUsage++;
        if(sortUsage > 2)
            sortUsage = 0;
        
        loadCartsFromServer(props.csrf, sortUsage, showWorking);
    };

    const flipWorking = function() {
        showWorking = !showWorking;
        console.log(showWorking);
        loadCartsFromServer(props.csrf, sortUsage, showWorking);
    }
    
    return (
        <div className="cartList">
            <button id="usage" type="button" onClick={buttonSortUsage}>Sort by Usage</button> 
            <button id="working" type="button" onClick={flipWorking}>Show/Hide Working</button>
            {cartNodes}
        </div>
    );
};

const loadCartsFromServer = (csrf, sortUsage, showWorking) => {
    sendAjax('GET', '/getCarts', null, (data) => {
        ReactDOM.render(
            <CartList carts={data.carts} csrf={data.csrfToken} sortUsage={sortUsage} showWorking={showWorking}/>, document.querySelector("#carts")
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