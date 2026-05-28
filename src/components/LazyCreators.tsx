'use client';

import dynamic from 'next/dynamic';

const Creators = dynamic(() => import('@/components/Creators'), {
  loading: () => <div className="h-screen bg-black" />,
  ssr: false,
});

export default Creators;