import { useState } from "react";
import { Card, ProductCard } from "../components/Card";
import Spinner from "../components/Spinner";
import useProducts from "../hooks/useProducts";
import Overlay from "../components/Overlay";
import { productType } from "../services/@types";

export const Products = () => {
  const { products, isLoading } = useProducts();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleOverlay = (product: productType | null = null) => {
    setSelectedProduct(product);
    setIsOverlayOpen(!isOverlayOpen);
  };

  return (
    <>
      <div className="mb-10">
        <Card title="Products Page"></Card>
      </div>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="grid grid-cols-4 gap-4">
          {products &&
            products.map((product) => (
              <div onClick={() => toggleOverlay(product)} key={product.id}>
                <ProductCard
                  title={product.name}
                  image={product.imageUrl}
                  text={product.description}
                  price={product.price}
                />
              </div>
            ))}
        </div>
      )}
      <Overlay
        isOverlayOpen={isOverlayOpen}
        onClose={() => toggleOverlay()}
        product={selectedProduct}
      />
    </>
  );
};

export default Products;
