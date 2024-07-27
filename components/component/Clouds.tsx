import styles from '@/app/CloudAnimation.module.css';

export default function Clouds() {
    return (
        <div className={styles.cloudContainer}>
            <div className={`${styles.cloud} ${styles.cloud1}`}></div>
            <div className={`${styles.cloud} ${styles.cloud2}`}></div>
            <div className={`${styles.cloud} ${styles.cloud3}`}></div>
        </div>
    )
}