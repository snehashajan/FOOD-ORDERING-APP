import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title : {
    type : String,
    required : true,
    min : 4
  }, 
  desc : {
    type : String,
    required : true,
    min : 8
  },
  price : {
    type : Number,
    required : true
  },
    review : {
      type : Number,
      required : true
    },
    category : {
        type : String,
        required : true
    },
    img : {
        type : String,
        required : true
    }
})

export default mongoose.model("Product", ProductSchema);