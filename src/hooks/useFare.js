import { useEffect, useState } from 'react';
import { getFare } from '../services/fareService';

export function useFare(academicLevelId, deadlineId, pages) {
  const [perPage, setPerPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function fetchFare() {
      setLoading(true);
      setError(null);
      try {
        const data = await getFare({ academic_level_id: academicLevelId, deadline_id: deadlineId });
        if (active) setPerPage(data.per_page_price ?? 0);
      } catch (err) {
        if (active) setError(err.message || 'Unable to fetch price');
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchFare();
    return () => {
      active = false;
    };
  }, [academicLevelId, deadlineId]);

  const total = perPage * Number(pages || 0);

  return { perPage, total, loading, error };
}
