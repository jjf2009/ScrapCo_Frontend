import React, { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUserAlt, FaWeightHanging, FaRecycle } from "react-icons/fa";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ScrapCard = ({ scrap }) => {
  const dispatch = useDispatch();
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Create WhatsApp message
  const createWhatsAppMessage = () => {
    return encodeURIComponent(
      `Hello ${scrap?.sellerName}, I'm interested in purchasing your ${scrap?.materialType} scrap from ${scrap?.pickupLocation}. Is it still available for ₹${scrap?.price}/kg?`
    );
  };

  // Add item to cart
  const handleAddToCart = () => {
    dispatch(addToCart(scrap));
  };

  // Initialize map
  useEffect(() => {
    if (showMap && !mapRef.current && mapContainerRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([20.5937, 78.9629], 5);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);

      if (scrap?.locationCoordinates) {
        try {
          const { lat, lng } = scrap.locationCoordinates;
          L.marker([lat, lng]).addTo(mapRef.current)
            .bindPopup(`<b>Pickup Location:</b> ${scrap.pickupLocation}`)
            .openPopup();
          mapRef.current.setView([lat, lng], 14);
        } catch (err) {
          console.error("Error displaying location:", err);
        }
      }
    }

    return () => {
      if (mapRef.current && !showMap) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [showMap, scrap]);

  return (
    <div className="rounded-xl border p-6 shadow-sm hover:shadow-md bg-white transition-all">
      {/* Price & Seller Info */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-green-600">₹{scrap?.price}/kg</h3>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <FaUserAlt size={14} />
          <span className="font-medium">{scrap?.seller_name}</span>
        </div>
      </div>

      {/* Scrap Details */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <FaRecycle className="text-green-500 mt-1 flex-shrink-0" size={20} />
          <div className="text-sm">
            <span className="font-medium text-gray-800">{scrap?.material}</span>
            <p className="text-gray-500">{scrap?.description}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" size={20} />
          <div className="text-sm">
            <span className="font-medium text-gray-800">{scrap?.pickUpAddress}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <FaWeightHanging className="text-blue-500" size={18} />
          <span>Quantity: {scrap?.quantity} kg</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <FaCalendarAlt className="text-blue-500" size={18} />
          <span>{scrap?.listedDate ? formatDate(scrap?.listedDate) : "Date not available"}</span>
          <FaClock className="text-orange-500" size={18} />
          <span>{scrap?.availableUntil ? formatDate(scrap?.availableUntil) : "Ongoing"}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 text-xs text-gray-600 mt-2">
          <span className="bg-gray-100 px-3 py-1 rounded-full">{scrap?.material}</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">Condition: Good</span>
          {scrap?.needsTransport && (
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Transport needed</span>
          )}
        </div>
      </div>

      {/* Show Map Button */}
      <button
        className="mt-3 w-full py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold text-sm transition-all hover:bg-gray-200 active:scale-95"
        type="button"
        onClick={() => setShowMap((prev) => !prev)}
      >
        {showMap ? "Hide Map" : "Show Pickup Location"}
      </button>

      {/* Map Display */}
      {showMap && (
        <div className="my-3">
          <div ref={mapContainerRef} className="h-48 rounded-lg border border-gray-300 overflow-hidden shadow-inner" />
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <a
          className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold text-sm transition-all hover:bg-green-700 active:scale-95 text-center"
          href={`https://wa.me/${scrap?.phoneNumber}?text=${createWhatsAppMessage()}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact Seller
        </a>
        <button
          className="w-full py-3 rounded-lg bg-gray-200 text-gray-800 font-semibold text-sm transition-all hover:bg-gray-300 active:scale-95"
          type="button"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ScrapCard;
