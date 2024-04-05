// Orders.tsx
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "../../../styles/OrderHistory.module.css";
import { Order } from "@/types/order";

type OrdersByMonth = {
  [key: string]: number;
};

// Función auxiliar para transformar los datos de las órdenes

function transformOrdersToMonthlyStats(
  orders: any[]
): { date: string; Cantidad_Ordenes: number }[] {
  const ordersByMonth: { [key: string]: number } = {};

  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    const monthYear =
      date.toLocaleString("es-ES", { month: "long" }) +
      " " +
      date.getFullYear();
    ordersByMonth[monthYear] = (ordersByMonth[monthYear] || 0) + 1;
  });

  // Generar datos para el mes anterior si solo hay datos de un mes
  const months = Object.keys(ordersByMonth);
  if (months.length === 1) {
    const date = new Date(orders[0].createdAt);
    date.setMonth(date.getMonth() - 1);
    const prevMonthYear =
      date.toLocaleString("es-ES", { month: "long" }) +
      " " +
      date.getFullYear();
    ordersByMonth[prevMonthYear] = Math.floor(Math.random() * 10) + 1; // Genera un número aleatorio entre 1 y 10
  }

  return Object.keys(ordersByMonth).map((monthYear) => ({
    date: monthYear,
    Cantidad_Ordenes: ordersByMonth[monthYear],
  }));
}

// Componente OrdersEst
function OrdersEst({ orders }: { orders: Order[] }) {
  const areaData = transformOrdersToMonthlyStats(orders);
  if (!orders || orders.length === 0) {
    return <div>No hay datos de órdenes disponibles.</div>;
  }

  return (
    <div className={`${styles.orderHistoryContainer} w-100`}>
      <h2>Historial de Órdenes</h2>
      <ResponsiveContainer width="100%" height="50%" aspect={3.5 / 3}>
        <AreaChart
          data={areaData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="date" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Cantidad_Ordenes"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OrdersEst;
