export type PolicyStatus = "Active" | "Inactive";

export type Policy = {
    policyNumber: number;
    productName: string;
    policyDescription: string;
    policyStatus: PolicyStatus;
    policyStartDate: string;
    yearlyPrice: number;
}