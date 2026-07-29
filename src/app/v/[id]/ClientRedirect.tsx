'use client';

import { useEffect } from 'react';

export default function ClientRedirect({ id }: { id: string }) {
  useEffect(() => {
    // Use direct browser location replace to ensure home page parses query params immediately on mount
    window.location.replace(`/?trip=${id}`);
  }, [id]);

  return null;
}
