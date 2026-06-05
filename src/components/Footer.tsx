import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        &copy; {new Date().getFullYear()} Jalal Al-Nabelsi · Built with Next.js
      </p>
    </footer>
  );
}
