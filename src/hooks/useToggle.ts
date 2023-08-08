import { useState } from 'react';

type IUseToggleReturn = [boolean, () => void];

export const useToggle = (defaultValue = false): IUseToggleReturn => {
  const [toggled, setToggled] = useState(defaultValue);
  const onToggle = () => setToggled((previous) => !previous);

  return [toggled, onToggle];
};
