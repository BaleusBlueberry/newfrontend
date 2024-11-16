import { Card, ProductCard } from "../components/Card";
import Spinner from "../components/Spinner";
import useProducts from "../hooks/useProducts";
import { getSingleProduct } from "../services/products-service";

export const Products = () => {
  const { products, isLoading } = useProducts();

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
              <ProductCard
                key={product.id}
                title={product.name}
                image={product.imageUrl}
                text={product.description}
                price={product.price}
              />
            ))}
        </div>
      )}
      <div>
        <button
          onClick={async () => {
            const product = await getSingleProduct(1);
            console.log(product);
          }}
        >
          aaaa
        </button>
      </div>
    </>
  );
};

export default Products;
