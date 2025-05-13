'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Home, ShoppingBag, ShoppingCart, LogOut, LogIn } from "lucide-react";
import styles from "./HeaderComponent.module.scss";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div>
        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>
            <Home size={30} className={styles.icon} />
          </Link>
          <Link href="/shop" className={styles.link}>
            <ShoppingBag size={30} className={styles.icon} />
          </Link>
          {session ? (
            <Link href="/cart" className={styles.link}>
              <ShoppingCart size={30} className={styles.icon} />
            </Link>
          ) : (
            <span className={styles.message}>
              
            </span>
          )}
        </nav>
      </div>
      <div className={styles.userHeader}>
        {status === "loading" ? (
          <span className={styles.loading}>Cargando...</span>
        ) : session ? (
          <>
            <span className={styles.user}>
              Hola {session.user?.name || session.user?.email}!
            </span>
            <button onClick={() => signOut()} className={styles.button}>
              <LogOut size={22} className={styles.icon} />
              Cerrar Sesión
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className={styles.button}
          > 
            Iniciar Sesión
            <LogIn size={18} className={styles.iconLogin} />
          </button>
        )}
      </div>
    </header>
  );
}