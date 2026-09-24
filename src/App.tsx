import './App.css'
import { useEffect, useState } from 'react'
import type { Policy } from './types/policy.ts'

function App() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error,setError] = useState<string | null>(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    //Hämta policies
    const fetchPolicies = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/policies/List`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch policies: ${response.status}`);
        }

        const policiesData: Policy[] = await response.json();
        //console.log(policiesData);
        setPolicies(policiesData);
      } catch {
        setError('Något gick fel vid hämtning av policies');
      } finally {
        setIsLoading(false);
      }

    }
    fetchPolicies();
  },[]);

  return (
    <>
      <h1>Mina försäkringar</h1>
    </>
  )
}

export default App
