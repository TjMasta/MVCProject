const models = require('../models');

const Cart = models.Cart;

const makeCart = (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'RAWR! Both name and age are required' });
  }

  const cartData = {
    name: req.body.name,
    age: req.body.age,
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
      if(err) {
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
        if(err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occurred' });
        }
        
        return res.json({ carts: docs });
    });
};

module.exports.makerPage = makerPage;
module.exports.getCarts = getCarts;
module.exports.make = makeCart;