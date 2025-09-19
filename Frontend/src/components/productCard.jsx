import "./productCard.css";

export default function ProductCard(props) {
    console.log(props);
   return (
     <div className="product-card">
        <img className="product-image" src="https://fastly.picsum.photos/id/5/5000/3334.jpg?hmac=R_jZuyT1jbcfBlpKFxAb0Q3lof9oJ0kREaxsYV3MgCc" alt="Product" />
       <h2>{props.name}</h2>
       <p>This is a great product that you will love!</p>
       <h2>price:{props.price}</h2>
       <button className="addToCart">Add to Cart</button>
       <button className="buyNow">Buy Now</button>
     </div>
   );
}
