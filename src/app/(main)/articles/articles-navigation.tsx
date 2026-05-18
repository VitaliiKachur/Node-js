"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../navigation.module.css";

const links = [
  { href: "/articles/favorite", label: "Favorite" },
  { href: "/articles/create", label: "Create" },
];

export function ArticlesNavigation() {
  const pathname = usePathname();

  return (
    <nav className={`${styles.nav} ${styles.sectionNav}`}>
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.link} ${
              isActive ? styles.sectionActive : ""
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
