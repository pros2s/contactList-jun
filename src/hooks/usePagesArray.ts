import { useMemo } from 'react';


export const usePagesArray = (totalPages: number) => {
  return useMemo(() => {
    const pages: Number[] = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(i + 1);
    }
    return pages;
  }, [totalPages]);
};
