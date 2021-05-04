const models = require('../models');

const { Cart } = models;

const makeCart = (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Name required' });
  }
    
  const cartData = {
    name: req.body.name,
    usage: 0,
    lastUser: 'N/A',
    lastReFuel: 'N/A',
    notes: 'none',
    working: true,
    owner: req.session.account._id,
  };

  const newCart = new Cart.CartModel(cartData);

  const cartPromise = newCart.save();

  cartPromise.then(() => res.json({ redirect: '/maker' }));

  cartPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Cart already exists' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return cartPromise;
};

const makerPage = (req, res) => {
  Cart.CartModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error ocurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), carts: docs });
  });
};

const getCarts = (request, response) => {
  const req = request;
  const res = response;

  return Cart.CartModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.json({ carts: docs, csrfToken: req.csrfToken(), });
  });
};

const updateCarts = (request, response) => {
  const req = request;
  const res = response;

  console.log(req.body.lastUser);
    
  const cartData = {
    name: req.body.name,
    usage: req.body.usage,
    lastUser: req.body.lastUser,
    lastReFuel: req.body.lastReFuel,
    notes: req.body.notes,
    //working: req.body.working,
    owner: req.session.account._id,
  };
    
  const cartToChange = Cart.CartModel.update(req.session.account._id, cartData);
  cartToChange.then((data) => console.log(data));
    
    
};

module.exports.makerPage = makerPage;
module.exports.getCarts = getCarts;
module.exports.make = makeCart;
module.exports.update = updateCarts;
