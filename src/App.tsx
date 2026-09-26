import './App.css'
import { useEffect, useState } from 'react'
import type { Policy, PolicyStatus } from './types/policy.ts'
import PolicyCard from './components/PolicyCard.tsx'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const statusOptions: { value: PolicyStatus; label: string }[] = [
  { value: "Active", label: "Aktiva försäkringar" },
  { value: "Inactive", label: "Avslutade försäkringar" },
];

function App() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Keep selected and applied filters separate so filtering only occurs
  // when the user clicks "Visa försäkringar".
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [appliedProducts, setAppliedProducts] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<PolicyStatus[]>([]);
  const [appliedStatuses, setAppliedStatuses] = useState<PolicyStatus[]>([]);

  const handleProductChange = (product: string) => {
    setSelectedProducts((prev) =>
      prev.includes(product)
      ? prev.filter((p) => p !== product)
      : [...prev, product]
    );
  };

  const handleStatusChange = (status: PolicyStatus) => {
    setSelectedStatuses((prev) => 
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
      );
  };

  const handleApplyFilters = () => {
    setAppliedProducts(selectedProducts);
    setAppliedStatuses(selectedStatuses);
  }

  const productNames = [
    ...new Set(policies.map((policy) => policy.productName))
  ].sort((a, b) => a.localeCompare(b, 'sv'));

  const filteredPolicies = policies.filter((policy) => {
    const matchesProduct =
    appliedProducts.length === 0 ||
    appliedProducts.includes(policy.productName);

    const matchesStatus =
      appliedStatuses.length === 0 ||
      appliedStatuses.includes(policy.policyStatus);

    return matchesProduct && matchesStatus;
  });

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/policies/List`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch policies: ${response.status}`);
        }

        const policiesData: Policy[] = await response.json();
        setPolicies(policiesData);
      } catch {
        setError('Något gick fel vid hämtning av försäkringar');
      } finally {
        setIsLoading(false);
      }

    }
    fetchPolicies();
  }, []);

  if (isLoading) {
    return <p>Laddar...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (policies.length === 0) {
    return <p>Inga försäkringar hittades.</p>;
  }

  return (
    <>
      <h1>Mina försäkringar</h1>

      <fieldset>
        <legend>Typ av försäkring</legend>
        {productNames.map((product) => (
          <label key={product}>
            <input
              type="checkbox"
              checked={selectedProducts.includes(product)}
              onChange={() => handleProductChange(product)}
            />
            {product}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Status</legend>
        {statusOptions.map((option) => (
          <label key={option.value}>
            <input
              type="checkbox"
              checked={selectedStatuses.includes(option.value)}
              onChange={() => handleStatusChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </fieldset>

      <button onClick={handleApplyFilters}>Visa försäkringar</button>
      
      {filteredPolicies.length === 0 ? (
        <p>Inga försäkringar matchar dina filter.</p>
      ) : (
        <ul> 
          {filteredPolicies.map((policy) => (
            <li key={policy.policyNumber}>
              <PolicyCard policy={policy} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default App
