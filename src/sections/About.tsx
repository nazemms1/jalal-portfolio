import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.container}>
        <div className={styles.label}>About Me</div>
        <h2 className={styles.heading}>Who I Am</h2>

        <div className={styles.content}>
          <div className={styles.avatar} aria-hidden="true">
            <span>J</span>
          </div>

          <div className={styles.text}>
            <p>
              I&apos;m <strong>Jalal Al-Nabelsi</strong>, an AI Engineer and
              Front-End Developer passionate about building intelligent
              applications and modern user interfaces that solve real problems.
            </p>
            <p>
              I hold a Bachelor&apos;s degree in Information and Communication
              Engineering from Arab International University, where I developed
              a strong foundation in software development and AI systems.
            </p>
            <p>
              My interests lie at the intersection of{" "}
              <strong>machine learning</strong> and{" "}
              <strong>interactive web applications</strong> — creating
              experiences that are both smart and delightful to use.
            </p>

            <div className={styles.highlights}>
              <div className={styles.highlight}>
                <span className={styles.icon}>🤖</span>
                <span>AI &amp; Machine Learning</span>
              </div>
              <div className={styles.highlight}>
                <span className={styles.icon}>💻</span>
                <span>Front-End Development</span>
              </div>
              <div className={styles.highlight}>
                <span className={styles.icon}>📊</span>
                <span>Data Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
