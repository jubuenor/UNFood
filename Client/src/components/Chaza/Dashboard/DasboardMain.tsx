// components/Dashboard/DashboardMain.tsx

import React from "react";
import Revenue from "./Ganancia";
import Stock from "./Stock";
import OrderHistory from "../Dashboard/OrderHistory";
import TopSellingProducts from "./TopSellingProducts";
import styles from "../../../styles/dashboard.module.css";
import { stats } from "@/types/chaza";
import { Col, Row } from "react-bootstrap";

function DashboardMain({ stats }: { stats: stats }) {
  return (
    <div className={`${styles.container} overflow-auto w-100`}>
      <Row className="gx-0 w-100">
        <Col md={6}>
          <div className="w-100">
            <div>
              <h2>Ganancias</h2>
              <Revenue orders={stats.orders} />
            </div>
            <OrderHistory orders={stats.orders} />
          </div>
        </Col>
        <Col md={6}>
          <div className="w-100">
            <h2 style={{ textAlign: "center", padding: "20px" }}>
              Top productos vendidos
            </h2>
            <TopSellingProducts products={stats.products} />
            <div className={styles.line}></div>
            <h2 style={{ textAlign: "center", padding: "30px" }}>
              Stock de tu chaza
            </h2>
            <h5 className={styles.subtitlestock}>A tu chaza le quedan ...</h5>
            <Stock products={stats.products} />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DashboardMain;
