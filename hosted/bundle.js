"use strict";

var sortUsage = 0;
var showWorking = true;

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
  if ($("usage").val() == undefined) e.target[0].value = e.target[0].placeholder;
  if ($("lastUser").val() == undefined) e.target[1].value = e.target[1].placeholder;
  if ($("lastReFuel").val() == undefined) e.target[2].value = e.target[2].placeholder;
  if ($("notes").val() == undefined) e.target[4].value = e.target[4].placeholder;
  sendAjax('POST', $("#" + e.target.id.toString()).attr("action"), $("#" + e.target.id.toString()).serialize(), function () {
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
  var sortUsage;
  var showWorking;
  if (props.sortUsage === undefined) sortUsage = 0;else sortUsage = props.sortUsage;
  if (props.showWorking === undefined) showWorking = true;else showWorking = props.showWorking;

  if (props.carts.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "cartList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyCart"
    }, "No Carts yet"));
  }

  var cartNodes = props.carts.map(function (cart) {
    if (cart.working) {
      return /*#__PURE__*/React.createElement("div", {
        key: cart._id,
        className: "cart"
      }, /*#__PURE__*/React.createElement("form", {
        id: cart._id,
        onSubmit: handleUpdate,
        action: "/update",
        method: "POST",
        className: "cartUpdateForm"
      }, /*#__PURE__*/React.createElement("h3", {
        id: "cartName"
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
      }, " Working: "), /*#__PURE__*/React.createElement("select", {
        className: "cartUpWorkingYes",
        name: "working"
      }, /*#__PURE__*/React.createElement("option", {
        value: "true",
        defaultValue: true
      }, "Yes"), /*#__PURE__*/React.createElement("option", {
        value: "false"
      }, "No")), /*#__PURE__*/React.createElement("label", {
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
        type: "hidden",
        name: "_id",
        value: cart._id
      }), /*#__PURE__*/React.createElement("input", {
        className: "updateCartSubmit",
        type: "submit",
        value: "Update Cart"
      })));
    } else {
      return /*#__PURE__*/React.createElement("div", {
        key: cart._id,
        className: "cart"
      }, /*#__PURE__*/React.createElement("form", {
        id: cart._id,
        onSubmit: handleUpdate,
        action: "/update",
        method: "POST",
        className: "cartUpdateForm"
      }, /*#__PURE__*/React.createElement("h3", {
        id: "cartName"
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
      }, " Working: "), /*#__PURE__*/React.createElement("select", {
        className: "cartUpWorkingNo",
        name: "working"
      }, /*#__PURE__*/React.createElement("option", {
        value: "false"
      }, "No"), /*#__PURE__*/React.createElement("option", {
        value: "true"
      }, "Yes")), /*#__PURE__*/React.createElement("label", {
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
        type: "hidden",
        name: "_id",
        value: cart._id
      }), /*#__PURE__*/React.createElement("input", {
        className: "updateCartSubmit",
        type: "submit",
        value: "Update Cart"
      })));
    }
  });

  if (sortUsage == 1) {
    var tempArray = [];

    while (cartNodes.length != 0) {
      var index = 0;
      var lowest = cartNodes[index].props.children.props.children[2].props.placeholder;
      var holder = cartNodes[index];

      for (var j = 0; j < cartNodes.length; j++) {
        if (lowest > cartNodes[j].props.children.props.children[2].props.placeholder) {
          lowest = cartNodes[j].props.children.props.children[2].props.placeholder;
          holder = cartNodes[j];
          index = j;
        }
      }

      cartNodes.splice(index, 1);
      tempArray.push(holder);
    }

    cartNodes = tempArray;
  } else if (sortUsage == 2) {
    var _tempArray = [];

    while (cartNodes.length != 0) {
      var _index = 0;
      var highest = cartNodes[_index].props.children.props.children[2].props.placeholder;
      var _holder = cartNodes[_index];

      for (var _j = 0; _j < cartNodes.length; _j++) {
        if (highest < cartNodes[_j].props.children.props.children[2].props.placeholder) {
          highest = cartNodes[_j].props.children.props.children[2].props.placeholder;
          _holder = cartNodes[_j];
          _index = _j;
        }
      }

      cartNodes.splice(_index, 1);

      _tempArray.push(_holder);
    }

    cartNodes = _tempArray;
    console.log(cartNodes);
  }

  if (showWorking != true) {
    console.log("here");

    for (var i = 0; i < cartNodes.length; i++) {
      console.log(cartNodes[i].props.children.props.children[8]);

      if (cartNodes[i].props.children.props.children[8].props.className === "cartUpWorkingNo") {
        cartNodes.splice(i, 1);
      }
    }
  }

  var buttonSortUsage = function buttonSortUsage() {
    sortUsage++;
    if (sortUsage > 2) sortUsage = 0;
    loadCartsFromServer(props.csrf, sortUsage, showWorking);
  };

  var flipWorking = function flipWorking() {
    showWorking = !showWorking;
    console.log(showWorking);
    loadCartsFromServer(props.csrf, sortUsage, showWorking);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "cartList"
  }, /*#__PURE__*/React.createElement("button", {
    id: "usage",
    type: "button",
    onClick: buttonSortUsage
  }, "Sort by Usage"), /*#__PURE__*/React.createElement("button", {
    id: "working",
    type: "button",
    onClick: flipWorking
  }, "Show/Hide Working"), cartNodes);
};

var loadCartsFromServer = function loadCartsFromServer(csrf, sortUsage, showWorking) {
  sendAjax('GET', '/getCarts', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(CartList, {
      carts: data.carts,
      csrf: data.csrfToken,
      sortUsage: sortUsage,
      showWorking: showWorking
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
