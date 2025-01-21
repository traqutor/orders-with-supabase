'use client';
import { useState } from 'react';
import * as Form from '@/components/ui/form';

export function OmniSearch() {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
    setQuery('');
  };

  return (<Form.Root
    onSubmit={(event) => handleSearch(event)}
  >

    <Form.Input
      id="queryId"
      type="text"
      name="query"
      placeholder="Wyszukaj"
      value={query}
      onChange={handleChange}
    />

  </Form.Root>);
};