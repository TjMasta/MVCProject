const models = require('../models');

const Cart = models.Cart;

const makeCart = (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'RAWR! Both name and age are required' });
  }

  const cartData = {
    name: req.body.name,
    usage: req.body.usage,
    lastUser: req.body.lastUser,
    lastReFuel: req.body.lastReFuel,
    notes: req.body.notes,
    working: req.body.notes,
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
        console.log(docs[1].name);
        return res.json({ carts: docs });
    });
};

const updateCarts = (request, response) =>
{
    const req = request;
    const res = response;
    
    let tempCart;
    Cart.CartModel.findByOwner(req.session.account._id, (err, docs) => {
        if(err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occurred' });
        }
        
        for(let i = 0; i < docs.length; i++)
        {
            if(req.body.name === docs[i].name)
                tempCart = docs[i];
            else
                return res.status(400).json({ error: 'An error occurred' });
        }
    });
};
//      Update form to figure out
//                <form id="cartForm"
//                    onSubmit={handleCart}
//                    name="cartForm"
//                    action="/maker"
//                    method="POST"
//                    className="cartForm"
//                >
//                    <input className="cartUsage" type="text" name="usage" placeholder={cart.usage}> 
//                    <input className="cartWorking" type="text" name="working" placeholder={cart.working}>
//                    <input className="cartUser" type="text" name="user" placeholder={cart.lastUser}>
//                    <input className="cartRefuel" type="text" name="refuel" placeholder={cart.lastReFuel}>
//                    <input className="cartNotes" type="text" name="notes" placeholder={cart.notes}>
//                    <input className="cartName" type="hidden" value={cart.name} />
//                    <input type="hidden" name="_csrf" value={props.csrf} />
//                    <input className="makeCartSubmit" type="submit" value="Update Cart" />
//                </form>

module.exports.makerPage = makerPage;
module.exports.getCarts = getCarts;
module.exports.make = makeCart;
module.exports.update = updateCarts;