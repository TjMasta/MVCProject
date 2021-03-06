const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let CartModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();
const setLastUser = (user) => _.escape(user).trim();
const setLastReFuelDate = (date) => _.escape(date).trim();
const setNotes = (notes) => _.escape(notes).trim();

// Sets up the data for the cart
const CartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  usage: {
    type: Number,
    min: 0,
  },

  lastUser: {
    type: String,
    set: setLastUser,
  },

  lastReFuel: {
    type: String,
    set: setLastReFuelDate,
  },

  notes: {
    type: String,
    set: setNotes,
  },

  working: {
    type: Boolean,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

CartSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  usage: doc.usage,
  lastUser: doc.lastUser,
  lastReFuel: doc.lastReFuel,
  notes: doc.notes,
  working: doc.working,
});

CartSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return CartModel.find(search).select('name usage lastUser lastReFuel notes working').lean().exec(callback);
};

CartSchema.statics.update = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return CartModel.find(search, callback).select('_id name usage lastUser lastReFuel notes working').exec();
};

CartModel = mongoose.model('Cart', CartSchema);

module.exports.CartModel = CartModel;
module.exports.CartSchema = CartSchema;
