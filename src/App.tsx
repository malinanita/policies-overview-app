import styles from './App.module.css'
import { useEffect, useState } from 'react'
import type { Policy, PolicyStatus } from './types/policy.ts'
import PolicyCard from './components/PolicyCard.tsx'
import FilterPanel from './components/FilterPanel.tsx'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
  };

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
    return <p className={styles.message} role="status">Laddar...</p>;
  }

  if (error) {
    return <p className={styles.message} role="alert">{error}</p>;
  }

  if (policies.length === 0) {
    return <p className={styles.message}>Inga försäkringar hittades.</p>;
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Mina Försäkringar</h1>

      <div className={styles.layout}>
        <div className={styles.toolbar}>
          <button
            type="button"
            className={styles.filterButton}
            aria-expanded={isFilterOpen}
            aria-controls="filter-panel"
            onClick={() => setIsFilterOpen(true)}
          >
            Filtrera
          </button>
        </div>

        {isFilterOpen && (
          <FilterPanel
            productNames={productNames}
            selectedProducts={selectedProducts}
            selectedStatuses={selectedStatuses}
            onProductChange={handleProductChange}
            onStatusChange={handleStatusChange}
            onApplyFilters={handleApplyFilters}
            onClose={() => setIsFilterOpen(false)}
          />
        )}

        {filteredPolicies.length === 0 ? (
          <p className={styles.emptyFilter}>Inga försäkringar matchar dina filter.</p>
        ) : (
          <ul className={styles.list}>
            {filteredPolicies.map((policy) => (
              <li key={policy.policyNumber}>
                <PolicyCard policy={policy} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}

export default App
