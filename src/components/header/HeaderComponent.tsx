"use client";

import Link from "next/link";
import { useSession, signIn, signOut, SessionProvider } from "next-auth/react";
import { Home, ShoppingBag, ShoppingCart, LogOut, LogIn } from "lucide-react";
import styles from "./HeaderComponent.module.scss";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <SessionProvider>
      <header className={styles.header}>
        <div>
          <nav className={styles.nav}>
            <Link href="/" className={styles.link}>
              <Home size={30} className={styles.icon} />
            </Link>
            <Link href="/shop" className={styles.link}>
              <ShoppingBag size={30} className={styles.icon} />
            </Link>
            <Link href="/cart" className={styles.link}>
              <ShoppingCart size={30} className={styles.icon} />
            </Link>
          </nav>
        </div>
        <div className={styles.userHeader}>
          {status === "loading" ? (
            <span className={styles.loading}>Loading...</span>
          ) : session ? (
            <>
              <span className={styles.user}>
                Hola {session.user?.name || session.user?.email}!
              </span>
              <button onClick={() => signOut()} className={styles.button}>
                <LogOut size={18} className={styles.icon} />
                Cerrar Sesión
              </button>
            </>
          ) : (
            <button onClick={() => signIn()} className={styles.button}>
              <LogIn size={18} className={styles.icon} />
              Iniciar Sesión
            </button>
          )}
        </div>
      </header>
    </SessionProvider>
  );
}
