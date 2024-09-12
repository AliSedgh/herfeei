import styles from "./spinner.module.scss";

export default function Spinner({ show = false }) {
  return <>{show && <span className={styles.loader}></span>}</>;
}
