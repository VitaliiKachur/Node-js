"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import styles from "./navigation.module.css";

const links = [
  { href: "/articles", label: "Articles" },
  { href: "/profile", label: "Profile" },
  { href: "/profile/settings", label: "Settings" },
  { href: "/profile/security", label: "Security" },
];

export function MainNavigation() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const displayName = session?.user?.name ?? session?.user?.email;

  return (
    <nav className={styles.nav}>
      {links.map((link) => {
        const isActive =
          link.href === "/articles"
            ? pathname.startsWith("/articles")
            : pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.link} ${isActive ? styles.active : ""}`}
          >
            {link.label}
          </Link>
        );
      })}
      {session?.user ? (
        <>
          <span className={styles.userName}>{displayName}</span>
          <button
            type="button"
            className={styles.link}
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Sign out
          </button>
        </>
      ) : (
        <Link
          href="/login"
          className={`${styles.link} ${pathname === "/login" ? styles.active : ""}`}
        >
          Sign in
        </Link>
      )}
    </nav>
  );
}
