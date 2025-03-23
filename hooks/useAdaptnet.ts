import { useState } from 'react';

interface FormData {
  community_name: string;
  population: string;
  feature_1: string;
  feature_2: string;
  feature_3: string;
}

interface AdaptationResult {
  community_name: string;
  population: number;
  recommendation: string;
}

export const useAdaptnet= () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adaptationResult, setAdaptationResult] = useState<AdaptationResult | null>(null);
  const [formData, setFormData] = useState<FormData>({
    community_name: "",
    population: "",
    feature_1: "",
    feature_2: "",
    feature_3: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://adaptnet-test.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          community_name: formData.community_name,
          population: parseFloat(formData.population),
          feature_1: parseFloat(formData.feature_1),
          feature_2: parseFloat(formData.feature_2),
          feature_3: parseFloat(formData.feature_3)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate adaptation plan');
      }

      const data = await response.json();
      setAdaptationResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      community_name: "",
      population: "",
      feature_1: "",
      feature_2: "",
      feature_3: ""
    });
    setAdaptationResult(null);
    setError(null);
  };

  return {
    formData,
    loading,
    error,
    adaptationResult,
    handleInputChange,
    generatePlan,
    resetForm
  };
};