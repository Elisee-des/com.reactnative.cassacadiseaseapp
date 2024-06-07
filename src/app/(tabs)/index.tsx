import Loading from '@/components/Loading';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';

export default function TabIndex() {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);
  
    if (isLoading) {
      return <Loading />;
    }

  return <Redirect href={'/(tabs)/recipe/'} />;
}
