import type { PolicyStatus } from '../types/policy';
import styles from './FilterPanel.module.css'

type FilterPanelProps = {
  productNames: string[];
  selectedProducts: string[];
  selectedStatuses: PolicyStatus[];
  onProductChange: (product: string) => void;
  onStatusChange: (status: PolicyStatus) => void;
  onApplyFilters: () => void;
  onClose: () => void;
};

const statusOptions: { value: PolicyStatus; label: string }[] = [
  { value: "Active", label: "Aktiva försäkringar" },
  { value: "Inactive", label: "Avslutade försäkringar" },
];

export default function FilterPanel({
  productNames,
  selectedProducts,
  selectedStatuses,
  onProductChange,
  onStatusChange,
  onApplyFilters,
  onClose,
}: FilterPanelProps) {
  return (
    <aside id="filter-panel" className={styles.panel} aria-label="Filter">
      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Stäng filter"
      >
        ×
      </button>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Typ av försäkring</legend>
        {productNames.map((product) => (
          <label key={product} className={styles.option}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={selectedProducts.includes(product)}
              onChange={() => onProductChange(product)}
            />
            {product}
          </label>
        ))}
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Status</legend>
        {statusOptions.map((option) => (
          <label key={option.value} className={styles.option}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={selectedStatuses.includes(option.value)}
              onChange={() => onStatusChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </fieldset>

      <button type="button" className={styles.applyButton} onClick={onApplyFilters}>
        Visa försäkringar
      </button>
    </aside>
  );
}