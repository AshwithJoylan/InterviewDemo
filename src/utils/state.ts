import { useRoute } from '@react-navigation/native';
import { useState } from 'react';

export const createState = <T>(values: T) => {
  const [state, setStateValue] = useState<T>(values);
  const setState = (value: Partial<T>) => {
    setStateValue((m) => ({
      ...m,
      ...value,
    }));
  };
  return [state, setState] as [T, (value: Partial<T>) => void];
};

export const useParams = <T>(def?: T) => {
  const { params } = useRoute();

  return params && Object.keys(params).length > 0
    ? ((params as unknown) as T)
    : def!!;
};

export const useRouteName = () => {
  return useRoute().name;
};
