import { skills } from "@/data";
import styles from "./Skills.module.css";

const categoryLabel: Record<string, string> = {
  frontend: "Front-End",
  tools: "Tools & Testing",
  ai: "AI & Data",
};

const categoryEmoji: Record<string, string> = {
  frontend: "🎨",
  tools: "🛠️",
  ai: "🧠",
};

const categories = ["frontend", "tools", "ai"] as const;

export default function Skills() {
  return (
    <section className={styles.section} id="skills">
      <div className={styles.container}>
        <div className={styles.label}>Skills</div>
        <h2 className={styles.heading}>What I Work With</h2>

        <div className={styles.grid}>
          {categories.map((cat) => (
            <div key={cat} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.emoji}>{categoryEmoji[cat]}</span>
                <h3 className={styles.cardTitle}>{categoryLabel[cat]}</h3>
              </div>
              <div className={styles.badges}>
                {skills
                  .filter((s) => s.category === cat)
                  .map((skill) => (
                    <span key={skill.name} className={styles.badge}>
                      {skill.name}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
