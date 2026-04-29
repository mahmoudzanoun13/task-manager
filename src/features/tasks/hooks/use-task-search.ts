import { useState, useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useDebounce } from '@/lib/use-debounce';
import { TASK_CONFIG } from '../constants/task-constants';

export function useTaskSearch(delay = TASK_CONFIG.SEARCH_DEBOUNCE_DELAY) {
  const [query, setQuery] = useQueryState('q', {
    shallow: true,
  });

  const [searchValue, setSearchValue] = useState(query || '');
  const [lastQuery, setLastQuery] = useState(query);

  if (query !== lastQuery) {
    setLastQuery(query);
    setSearchValue(query || '');
  }

  const debouncedValue = useDebounce(searchValue, delay);

  useEffect(() => {
    setQuery(debouncedValue || null);
  }, [debouncedValue, setQuery]);

  const clearSearch = () => {
    setSearchValue('');
    setQuery(null);
  };

  return {
    searchValue,
    debouncedSearch: query || '',
    setSearchValue,
    clearSearch,
  };
}
