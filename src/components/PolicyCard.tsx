import type { Policy } from '../types/policy.ts'

type PolicyCardProps = {
  policy: Policy;
};

export default function PolicyCard({policy}: PolicyCardProps) {
    const monthlyPrice = policy.yearlyPrice / 12;

    return (
        <article>
            <h2>{policy.productName}</h2>
            <p>{policy.policyDescription}</p>
            <p>Startdatum: {policy.policyStartDate}</p>
            <p>Försäkringsnummer: {policy.policyNumber}</p>
            <p>Pris per månad: {monthlyPrice} kr/mån</p>
        </article>
    );
}