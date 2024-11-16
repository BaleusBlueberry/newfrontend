import { useEffect, useState } from "react";
import { productType } from "../services/@types";
import { getProduts } from "../services/products-service";
import { dialogs } from "../dialogs/dialogs";

const useProducts = () => {
  const [products, setProducts] = useState<productType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getProduts()
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        dialogs.error(error.message);
        setIsLoading(false);
      });
  }, []);
  return { products, isLoading, error };
};

export default useProducts;
