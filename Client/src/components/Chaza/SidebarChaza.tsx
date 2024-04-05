import React from "react";
import { useState } from "react";
import styles from "@/styles/sidebar.chaza.module.css";
import { Nav, Navbar, Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import logout from "@/utils/logout";

function SidebarChaza() {
  return (
    <>
      <Navbar expand="md" className="p-0">
        <div className={`${styles.sidebar_chaza} text-center`}>
          <Navbar.Brand href="home">
            <div className={`${styles.img_container}`}>
              <Image
                className={`${styles.fondo}`}
                src="/images/logoUNFood_4.png"
                alt="logo"
                fill
              ></Image>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle
            className="p-2 m-0 mb-3"
            aria-controls="navbarScroll"
          />
          <Navbar.Collapse id="navbarScroll" className="w-100">
            <Nav navbarScroll className="w-100 d-flex flex-column">
              <div>
                <Link className="nav-link" href="home">
                  Administrar Chaza
                </Link>
                <Link className="nav-link" href="products">
                  Productos
                </Link>
                <Link className="nav-link" href="orders">
                  Pedidos
                </Link>
                <Link className="nav-link" href="dashboard">
                  Estadisticas
                </Link>
              </div>

              <div className="mt-5 mb-2">
                <Button variant="danger" className="mt-3">
                  <FiLogOut size={20} onClick={logout} />
                </Button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
}

export default SidebarChaza;
