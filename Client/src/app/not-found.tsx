import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center" }}>
      <Image
        src="/images/logoUNFood.png"
        alt="logo"
        width={459}
        height={280}
      ></Image>
      <h2>!Ooooooops!</h2>
      <p>Esta Pagina no existe</p>
      <Link href="/">Regresar</Link>
    </div>
  );
}
