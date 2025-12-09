import "./Shop.css";
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from "../../../db.json"
import { toast } from 'react-toastify';
import { useAuth } from '../../Authentication/AuthContext';
import { CartContext } from '../../context/CartContext';
import { FaHeart } from 'react-icons/fa';


const Shop = () => {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [shop, setShop] = useState(products);

  const { user } = useAuth()
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const filtered = products.filter(products =>
      products.title.toLowerCase().includes(search.toLowerCase()) ||
      products.name.toLowerCase().includes(search.toLowerCase())
    )
    setShop(filtered)
  }, [search]);

  const handleAddToCart = async (product) => {
    if (!user) {
      toast.error("Please login to add items to Cart !")
      return
    }
    addToCart(product);
  }

  return (
    <div className='shop-page'>
      <div className="back-home" onClick={() => navigate("/")}>Back to home</div>
      <input type="search" placeholder='search something' value={search}
        onChange={(e) => setSearch(e.target.value)} />
      <div className="product-grid">{shop.length > 0 ? (shop.map((item) => (
        <div className="product-card" key={item.id}>
          <div className="image-box">
            <FaHeart className="wishlist-icon" />
            <img src={item.image} alt={item.title} onClick={() => navigate(`/detail/${item.id}`)} />
          </div>
          <h3 onClick={() => navigate(`/detail/${item.id}`)}>{item.title}</h3>
          <h2 className="name">{item.name}</h2>
          <span className="price">₹ {item.price}</span>
          <button className="addCart" onClick={() => handleAddToCart(item)}>Add to Cart</button>
        </div>
      ))
      ) : (<p className="noProduct">No products found</p>)}</div>
    </div>
  )
}

export default Shop
