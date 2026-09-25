import type { Policy } from '../types/policy.ts'

type PolicyCardProps = {
  policy: Policy;
};

export default function PolicyCard({policy}: PolicyCardProps) {
    const monthlyPrice = Math.round(policy.yearlyPrice / 12);
    const formattedStartDate = policy.policyStartDate.replaceAll("/", "-");

    return (
        <article>
            {policy.policyStatus === "Inactive" && (
                <p>Din försäkring har avslutats</p>
            )}
            <h2>{policy.productName}</h2>
            <p>{policy.policyDescription}</p>
            <p>Startdatum: {formattedStartDate}</p>
            <p>Försäkringsnummer: {policy.policyNumber}</p>
            <p>Pris per månad: {monthlyPrice} kr/mån</p>
        </article>
    );
}