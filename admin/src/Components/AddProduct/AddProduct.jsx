import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name:"",
    image:"",
    category: "women",
    new_price: "",
    old_price: ""
  })
  const imageHandler = (e)=>{
    setImage(e.target.files[0]);
  }
  const changeHandel = (e)=>{
    setProductDetails({...productDetails, [e.target.name]: e.target.value})
  }
  const addProduct = async()=>{
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: formData,
    }).then((resp)=>resp.json()).then((data)=>{responseData = data});

    if(responseData.success){
      product.image = responseData.image_url; 
      console.log(product);
      await fetch('http://localhost:4000/addproduct',{
        method:'POST',
        headers: {
          Accept:'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("Product Added"):alert("Failed")
      })

    }
  }
  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandel} type="text" name='name' placeholder='Type here'/>
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandel} type="text" name='old_price' placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandel} type="text" name='new_price' placeholder='Type here'/>
        </div>
      </div>
      <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select value={productDetails.category} onChange={changeHandel} name="category" className='add-product-selector'>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>
        <div className="addproduct-itemfiled">
          <label htmlFor="file-out">
            <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img'/>
          </label>
          <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
        </div>
        <button onClick={()=>{addProduct()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct
