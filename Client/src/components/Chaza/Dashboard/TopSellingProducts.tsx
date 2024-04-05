// components/Dashboard/TopSellingProducts.tsx

import React from "react";
import styles from "../../../styles/TopSellingProducts.module.css";
import { Product } from "@/types/product";
import Image from "next/image";

// Simulando una función que obtendría los productos de alguna parte
// En tu caso, esta data vendría de tus productos, ya sea a través de props o de algún estado.
const getTopSellingProducts = (allProducts: Product[]): Product[] => {
  return allProducts.sort((a, b) => b.total_sales - a.total_sales).slice(0, 3);
};

function TopSellingProducts({ products }: { products: Product[] }) {
  // Obten los 3 productos más vendidos
  const topSellingProducts = getTopSellingProducts(products);

  return (
    <div className={styles.container}>
      <h3>Productos más vendidos</h3>
      <p>Tu chaza está onfire con estos productos...</p>
      <ul className={styles.productList}>
        {topSellingProducts.map((product, index) => (
          <li key={index} className={styles.productItem}>
            <Image
              src={product.image.toString()}
              alt={product.name.toString()}
              width={60}
              height={60}
            ></Image>
            <div className={styles.productDetails}>
              <span className={styles.productName}>{product.name}</span>
              <span className={styles.productPrice}>{product.total_sales}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopSellingProducts;
