import styles from "./Experience.module.css";

const testingAreas = [
  {
    icon: "🔌",
    title: "API Testing",
    desc: "Testing REST APIs with Postman, validating responses, status codes, and data integrity.",
  },
  {
    icon: "✅",
    title: "Data Validation",
    desc: "Ensuring data correctness and consistency across application layers and databases.",
  },
  {
    icon: "🖥️",
    title: "UI Testing",
    desc: "Manual UI testing across browsers and devices to verify layout and functionality.",
  },
  {
    icon: "🐞",
    title: "Bug Reporting",
    desc: "Documenting bugs with clear reproduction steps, screenshots, and severity levels.",
  },
  {
    icon: "📄",
    title: "Test Documentation",
    desc: "Writing test cases, test plans, and reports to maintain clear QA documentation.",
  },
];

export default function Experience() {
  return (
    <section className={styles.section} id="experience">
      <div className={styles.container}>
        <div className={styles.label}>Experience</div>
        <h2 className={styles.heading}>Software Testing</h2>

        <div className={styles.grid}>
          {testingAreas.map((area) => (
            <div key={area.title} className={styles.card}>
              <span className={styles.icon}>{area.icon}</span>
              <h3 className={styles.title}>{area.title}</h3>
              <p className={styles.desc}>{area.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
