import React from "react";
import { Product } from "@/types/product";
import styles from "../../../styles/stock.dashboard.module.css";

interface StockItem {
  id: string;
  product: string;
  quantity: number;
  color: string;
}

const baseSize = 100;
const scaleFactor = 0.5;

const calculateSize = (quantity: number, maxQuantity: number): number => {
  const size = baseSize + (quantity / maxQuantity) * scaleFactor * baseSize;
  return size < 20 ? 20 : size; // Tamaño mínimo para círculos muy pequeños
};

const renderCircle = (item: StockItem, maxQuantity: number) => (
  <div
    key={item.id}
    className={styles.stockItem}
    style={{
      width: `${calculateSize(item.quantity, maxQuantity)}px`,
      height: `${calculateSize(item.quantity, maxQuantity)}px`,
      backgroundColor: item.color,
    }}
  >
    <span className={styles.stockQuantity}>{item.quantity}</span>
    <p className={styles.stockProduct}>{item.product}</p>
  </div>
);

function Stock({ products }: { products: Product[] }) {
  // Transformar los productos en StockItems y alternar colores
  const stockItems: StockItem[] = products.map((product, index) => ({
    id: product._id.toString(),
    product: product.name.toString(),
    quantity: product.stock,
    color: index % 2 === 0 ? "#550A2D" : "#874463", // Alternar colores
  }));

  // Encontrar la cantidad máxima para el escalado
  const maxQuantity = Math.max(...stockItems.map((item) => item.quantity));

  // Ordenar y tomar los 5 productos con más stock
  const topStockItems = stockItems
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  return (
    <div className={styles.stockContainerB}>
      {topStockItems.map((item) => renderCircle(item, maxQuantity))}
    </div>
  );
}

export default Stock;
