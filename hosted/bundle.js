"use strict";

var handleCart = function handleCart(e) {
  e.preventDefault();
  $("#cartMessage").animate({
    width: 'hide'
  }, 350);

  if ($("cartName").val() == '') {
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#cartForm").attr("action"), $("#cartForm").serialize(), function () {
    loadCartsFromServer();
  });
  return false;
};

var handleUpdate = function handleUpdate(e) {
  e.preventDefault();
  $("#cartMessage").animate({
    width: 'hide'
  }, 350);

  if ($("cartName").val() == '') {
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#updateCart").attr("action"), $("#updateCart").serialize(), function () {
    loadCartsFromServer();
  });
  return false;
};

var CartForm = function CartForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "cartForm",
    onSubmit: handleCart,
    name: "cartForm",
    action: "/maker",
    method: "POST",
    className: "cartForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, "Name/Number: "), /*#__PURE__*/React.createElement("input", {
    id: "cartName",
    type: "text",
    name: "name",
    placeholder: "Cart Name"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeCartSubmit",
    type: "submit",
    value: "Make Cart"
  }));
};

var CartList = function CartList(props) {
  if (props.carts.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "cartList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyCart"
    }, "No Carts yet"));
  }

  console.log(props.csrf);
  var cartNodes = props.carts.map(function (cart) {
    return /*#__PURE__*/React.createElement("div", {
      key: cart._id,
      className: "cart"
    }, /*#__PURE__*/React.createElement("form", {
      id: "updateCart",
      onSubmit: handleUpdate,
      action: "/update",
      method: "POST",
      className: "cartUpdateForm"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "cartName"
    }, " Name: ", cart.name), /*#__PURE__*/React.createElement("label", {
      htmlFor: "usage"
    }, " Usage: "), /*#__PURE__*/React.createElement("input", {
      id: "cartUpUsage",
      type: "text",
      name: "usage",
      placeholder: cart.usage
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "lastUser"
    }, " Last User: "), /*#__PURE__*/React.createElement("input", {
      id: "cartUpUser",
      type: "text",
      name: "lastUser",
      placeholder: cart.lastUser
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "lastReFuel"
    }, " Last Refuel: "), /*#__PURE__*/React.createElement("input", {
      id: "cartUpFuel",
      type: "text",
      name: "lastReFuel",
      placeholder: cart.lastReFuel
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "working"
    }, " Working: "), /*#__PURE__*/React.createElement("input", {
      id: "cartUpWorking",
      type: "checkbox",
      name: "working",
      value: cart.working
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "notes"
    }, " Notes: "), /*#__PURE__*/React.createElement("input", {
      id: "cartUpNotes",
      type: "text",
      name: "notes",
      placeholder: cart.notes
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "name",
      value: cart.name
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "updateCartSubmit",
      type: "submit",
      value: "Update Cart"
    })));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "cartList"
  }, cartNodes);
};

var loadCartsFromServer = function loadCartsFromServer(csrf) {
  sendAjax('GET', '/getCarts', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(CartList, {
      carts: data.carts,
      csrf: data.csrfToken
    }), document.querySelector("#carts"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(CartForm, {
    csrf: csrf
  }), document.querySelector("#makeCart"));
  ReactDOM.render( /*#__PURE__*/React.createElement(CartForm, {
    carts: [],
    csrf: csrf
  }), document.querySelector("#carts"));
  loadCartsFromServer(csrf);
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  console.log(message); //    $("#errorMessage").text(message);
  //    $("#cartMessage").animate({width: 'toggle'}, 350);
};

var redirect = function redirect(response) {
  $("#cartMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
