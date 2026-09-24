import './App.css'
import { useEffect, useState } from 'react'
import type { Policy } from './types/policy.ts'
import PolicyCard from './components/PolicyCard.tsx'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error,setError] = useState<string | null>(null);

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
      <ul> 
        {policies.map((policy) => (
          <li key={policy.policyNumber}>
            <PolicyCard policy={policy} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
