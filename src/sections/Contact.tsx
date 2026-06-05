import styles from "./Contact.module.css";

const contactItems = [
  {
    icon: "✉️",
    label: "Email",
    value: "jalal.nablsi11@gmail.com",
    href: "mailto:jalal.nablsi11@gmail.com",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "+963 962 378 502",
    href: "tel:+963962378502",
  },
  {
    icon: "📍",
    label: "Location",
    value: "Damascus, Syria",
    href: null,
  },
];

export default function Contact() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <div className={styles.label}>Contact</div>
        <h2 className={styles.heading}>Get In Touch</h2>
        <p className={styles.sub}>
          I&apos;m open to new opportunities and collaborations. Feel free to
          reach out!
        </p>

        <div className={styles.cards}>
          {contactItems.map((item) => (
            <div key={item.label} className={styles.card}>
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.cardLabel}>{item.label}</span>
              {item.href ? (
                <a href={item.href} className={styles.value}>
                  {item.value}
                </a>
              ) : (
                <span className={styles.value}>{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
