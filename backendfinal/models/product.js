const mongoose = require("mongoose");

const Product = mongoose.model(
  "product",
  new mongoose.Schema({
    name: {
      type: String,
     // required: true
    },
   
    
    image: {
      type: String,
      // required: true
    },
    description: {
      type: String,
      // required: true
    },
    rating: {
      type: Number,
      // required: true
    },  
    numReviews: {
        type: Number,
        // required: true
      },  
      price: {
        type: Number,
        // required: true
      },  
     
    
  })
);

module.exports = Product;