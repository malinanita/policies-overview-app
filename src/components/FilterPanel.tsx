import type { PolicyStatus } from '../types/policy';

type FilterPanelProps = {
  productNames: string[];
  selectedProducts: string[];
  selectedStatuses: PolicyStatus[];
  onProductChange: (product: string) => void;
  onStatusChange: (status: PolicyStatus) => void;
  onApplyFilters: () => void;
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
}: FilterPanelProps) {
  return (
    <div>
      <fieldset>
        <legend>Typ av försäkring</legend>
        {productNames.map((product) => (
          <label key={product}>
            <input
              type="checkbox"
              checked={selectedProducts.includes(product)}
              onChange={() => onProductChange(product)}
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
              onChange={() => onStatusChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </fieldset>

      <button type="button" onClick={onApplyFilters}>
        Visa försäkringar
      </button>
    </div>
  );
}