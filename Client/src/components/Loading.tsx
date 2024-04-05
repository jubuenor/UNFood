import { Spinner } from "react-bootstrap";
import styles from "@/styles/loading.module.css";
import Image from "next/image";

function Loading() {
  return (
    <>
      <div className={styles.loading_backdrop}>
        <Image
          src="/images/logoUNFood_4.png"
          alt="logo"
          width={200}
          height={250}
        ></Image>

        <Spinner
          size="sm"
          animation="border"
          variant="light"
          className="position-absolute"
        ></Spinner>
      </div>
    </>
  );
}

export default Loading;
