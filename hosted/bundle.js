"use strict";

var sortUsage = 0;
var showWorking = true;

var handleCart = function handleCart(e) {
  e.preventDefault();

  if ($("cartName").val() == '') {
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#cartForm").attr("action"), $("#cartForm").serialize(), function () {
    loadCartsFromServer();
  });
  return false;
}; // Handles the update form and makes the value equal to the placeholder value if nothing was input


var handleUpdate = function handleUpdate(e) {
  e.preventDefault();
  if ($("usage").val() == undefined) e.target[0].value = e.target[0].placeholder;
  if ($("lastUser").val() == undefined) e.target[1].value = e.target[1].placeholder;
  if ($("lastReFuel").val() == undefined) e.target[2].value = e.target[2].placeholder;
  if ($("notes").val() == undefined) e.target[4].value = e.target[4].placeholder;
  sendAjax('POST', $("#" + e.target.id.toString()).attr("action"), $("#" + e.target.id.toString()).serialize(), function () {
    loadCartsFromServer();
  });
  return false;
};

var handlePassChange = function handlePassChange(e) {
  e.preventDefault();

  if ($("#user").val() == '' || $("#password").val() == '' || $("#newPassword").val() == '') {
    handleError("All fields must be filled in.");
    return false;
  }

  sendAjax('POST', $("#ChangePassForm").attr("action"), $("#ChangePassForm").serialize());
  return false;
};

var ChangePassForm = function ChangePassForm(props) {
  console.log(props.csrf);
  return /*#__PURE__*/React.createElement("form", {
    id: "ChangePassForm",
    onSubmit: handlePassChange,
    name: "ChangePassForm",
    action: "/changePass",
    method: "POST",
    className: "ChangePassForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "username"
  }, "Username: "), /*#__PURE__*/React.createElement("input", {
    id: "username",
    type: "text",
    name: "username"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "password"
  }, "Password: "), /*#__PURE__*/React.createElement("input", {
    id: "password",
    type: "text",
    name: "password"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "newPassword"
  }, "New Password: "), /*#__PURE__*/React.createElement("input", {
    id: "newPassword",
    type: "text",
    name: "newPassword"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "changePassSubmit",
    type: "submit",
    value: "Change Password"
  }));
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
  }, "Number: "), /*#__PURE__*/React.createElement("input", {
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
}; // Handles showing the list of carts and handles how the user sorts them


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
  } // Makes 2 different forms depening on if the cart is working


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
      }, " Cart# ", cart.name), /*#__PURE__*/React.createElement("label", {
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
      }, " Cart# ", cart.name), /*#__PURE__*/React.createElement("label", {
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
  }); // Sorts the carts on usage on ascending and descending order

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
  } // Hides carts that aren't working


  if (showWorking != true) {
    console.log("here");

    for (var i = 0; i < cartNodes.length; i++) {
      console.log(cartNodes[i].props.children.props.children[8]);

      if (cartNodes[i].props.children.props.children[8].props.className === "cartUpWorkingNo") {
        cartNodes.splice(i, 1);
      }
    }
  } // Toggles how the carts are sorted


  var buttonSortUsage = function buttonSortUsage() {
    sortUsage++;
    if (sortUsage > 2) sortUsage = 0;
    loadCartsFromServer(props.csrf, sortUsage, showWorking);
  }; // Toggles if it shows the working carts or not


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
  ReactDOM.render( /*#__PURE__*/React.createElement(ChangePassForm, {
    csrf: csrf
  }), document.querySelector("#ChangePassForm"));
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
  console.log(message);
  $("#errorMessage").text(message);
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
