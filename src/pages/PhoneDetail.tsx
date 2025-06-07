import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { phones } from '../data/phones';
import { Phone } from '../types';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export const PhoneDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const phone: Phone | undefined = phones.find(p => p.id === id);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const navigate = useNavigate();

  if (!phone) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-dark-950 text-white p-4">
        <h1 className="text-3xl font-bold mb-4">Phone Not Found</h1>
        <p className="mb-6">The phone you are looking for does not exist.</p>
        <Link to="/phones" className="text-primary-500 hover:underline">
          Back to Phones
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(phone.id);

  const handleAddToCart = () => {
    addToCart(phone, phone.colors[0]);
    toast.success(`${phone.name} added to cart!`);
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(phone.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(phone);
      toast.success('Added to wishlist');
    }
  };

  const handleBuyNow = () => {
    addToCart(phone, phone.colors[0]);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white p-6 max-w-4xl mx-auto pt-24">
      <Link to="/phones" className="text-primary-500 hover:underline mb-6 inline-block">
        &larr; Back to Phones
      </Link>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0 w-full md:w-1/2">
          <img
            src={phone.image}
            alt={phone.name}
            className="w-full rounded-xl object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{phone.name}</h1>
          <p className="text-gray-400 mb-6">{phone.description}</p>
          <div className="mb-4">
            <span className="text-primary-400 font-semibold">Brand:</span> {phone.brand}
          </div>
          <div className="mb-4">
            <span className="text-primary-400 font-semibold">Price:</span> ${phone.price}
            {phone.originalPrice && (
              <span className="line-through text-gray-500 ml-2">${phone.originalPrice}</span>
            )}
          </div>
          <div className="mb-4">
            <span className="text-primary-400 font-semibold">Rating:</span> {phone.rating} ({phone.reviews} reviews)
          </div>
          <div className="mb-4">
            <span className="text-primary-400 font-semibold">Specifications:</span>
            <ul className="list-disc list-inside">
              <li>Processor: {phone.specs.processor}</li>
              <li>RAM: {phone.specs.ram}</li>
              <li>Storage: {phone.specs.storage}</li>
              <li>Battery: {phone.specs.battery}</li>
              <li>Network: {phone.specs.network}</li>
              <li>Colors: {phone.colors.join(', ')}</li>
            </ul>
          </div>
          <div className="flex space-x-4 mt-6">
            <button
              onClick={handleWishlistToggle}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                inWishlist ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-primary-500 hover:bg-primary-600 text-white'
              }`}
            >
              {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 rounded-lg bg-secondary-500 hover:bg-secondary-600 text-white font-semibold"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
