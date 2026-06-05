import { courses } from "@/data";
import styles from "./Education.module.css";

export default function Education() {
  return (
    <section className={styles.section} id="education">
      <div className={styles.container}>
        <div className={styles.label}>Education &amp; Courses</div>
        <h2 className={styles.heading}>Academic Background</h2>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.iconRow}>
              <span className={styles.icon}>🎓</span>
              <span className={styles.period}>2018 – 2024</span>
            </div>
            <h3 className={styles.degree}>
              B.Sc. in Information &amp; Communication Engineering
            </h3>
            <p className={styles.institution}>Arab International University</p>
            <p className={styles.note}>Damascus, Syria</p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconRow}>
              <span className={styles.icon}>📚</span>
              <span className={styles.cardTitle}>Courses</span>
            </div>
            <ul className={styles.courseList}>
              {courses.map((course) => (
                <li key={course.name} className={styles.courseItem}>
                  <span className={styles.courseName}>{course.name}</span>
                  <span className={styles.provider}>{course.provider}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.card}>
            <div className={styles.iconRow}>
              <span className={styles.icon}>🌍</span>
              <span className={styles.cardTitle}>Languages</span>
            </div>
            <div className={styles.languages}>
              <div className={styles.lang}>
                <span className={styles.langName}>Arabic</span>
                <span className={styles.langLevel}>Native</span>
              </div>
              <div className={styles.lang}>
                <span className={styles.langName}>English</span>
                <span className={styles.langLevel}>Professional</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
