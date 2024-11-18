import { useEffect, useState } from "react";
import { productType } from "../services/@types";
import { getProduts } from "../services/products-service";
import { dialogs } from "../dialogs/dialogs";
import { AxiosError } from "axios";

const useProducts = () => {
  const [products, setProducts] = useState<productType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getProduts();
        setProducts(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.message);
          dialogs.error(error.message);
        } else {
          setError("An unknown error occurred");
          dialogs.error("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);
  return { products, isLoading, error };
};

export default useProducts;
