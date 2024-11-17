import React from "react";
import { productType } from "../services/@types";
import placeholderImage from "../content/placeholder.png";

interface OverlayProps {
  isOverlayOpen: boolean;
  onClose: () => void;
  product: productType | null;
}

const Overlay: React.FC<OverlayProps> = ({
  isOverlayOpen,
  onClose,
  product,
}) => {
  if (!isOverlayOpen || !product) return null;

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="overlay-container" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="overlay-close-button no-theme">
          ×
        </button>
        <img
          src={
            product.imageUrl &&
            !product.imageUrl.toLowerCase().includes("string")
              ? product.imageUrl
              : placeholderImage
          }
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="overlay-content">
          <h2 className="overlay-title">{product.name}</h2>
          <p className="overlay-description">{product.description}</p>
          <p className="overlay-price">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
