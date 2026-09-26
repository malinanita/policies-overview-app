import type { Policy } from '../types/policy.ts'
import styles from './PolicyCard.module.css'

type PolicyCardProps = {
  policy: Policy;
};

export default function PolicyCard({policy}: PolicyCardProps) {
    const monthlyPrice = Math.round(policy.yearlyPrice / 12);
    const formattedStartDate = policy.policyStartDate.replaceAll("/", "-");

    return (
        <article className={styles.card}>
            <header className={styles.header}>
                {policy.policyStatus === "Inactive" && (
                    <span className={styles.tag}>Din försäkring har avslutats</span>
                )}
                <h2 className={styles.title}>{policy.productName}</h2>
                <p className={styles.description}>{policy.policyDescription}</p>
            </header>

            <dl className={styles.details}>
                <div className={styles.row}>
                    <dt>Startdatum</dt>
                    <dd>{formattedStartDate}</dd>
                </div>
                <div className={styles.row}>
                    <dt>Försäkringsnummer</dt>
                    <dd>{policy.policyNumber}</dd>
                </div>
                <div className={styles.row}>
                    <dt>Pris per månad</dt>
                    <dd>{monthlyPrice} kr</dd>
                </div>
            </dl>
        </article>
    );
}
