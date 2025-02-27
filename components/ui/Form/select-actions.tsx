'use strict';

import React, { useEffect } from 'react';
import { useActions } from '@/lib/db/useActions';
import { MultiSelect } from '@/components/ui/Form/select-multi';


interface SelectFieldProps {
  label: string;
  name: string;
  value: string[] | undefined;
  required?: boolean;
  onChange: (value: string[]) => void;
}

const SelectActions: React.FC<SelectFieldProps> = ({ label, value, onChange }) => {

  const { actions, fetchActions } = useActions();

  const handleChange = (event: string[]) => {
    const options = actions.filter((option) => event.some(o => option.id === o));

    if (!options.length) return null;

    onChange(options.map((i) => i.id || ''));
  };

  useEffect(() => {
    fetchActions().then();

    return () => {
      console.log('Select Actions useEffect clean up', actions);
    };
  }, []);

  return (
    <MultiSelect
      options={actions.map((action) => ({ label: action.title || 'Label', value: action.id || '' }))}
      onValueChange={handleChange}
      placeholder={label}
      variant="inverted"
      animation={2}
      maxCount={3}
    />

  );
};

export default SelectActions;

