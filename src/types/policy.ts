export type Policy = {
    policyNumber: number;
    productName: string;
    policyDescription: string;
    policyStatus: "Active" | "Inactive";
    policyStartDate: string;
    yearlyPrice: number;
}