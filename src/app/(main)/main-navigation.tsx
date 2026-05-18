"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navigation.module.css";

const links = [
  { href: "/articles", label: "Articles" },
  { href: "/profile/settings", label: "Settings" },
  { href: "/profile/security", label: "Security" },
];

export function MainNavigation() {
  const pathname = usePathname();

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
    </nav>
  );
}
