'use client';
import { useState } from 'react';
import * as Form  from '@radix-ui/react-form';


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

    <Form.Field name='query'>
      <Form.Label htmlFor="queryId" />
      <Form.Control asChild>

        <input
          id="queryId"
          type="text"
          name="query"
          placeholder="Wyszukaj"
          value={query}
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </Form.Control>
    </Form.Field>



  </Form.Root>);
}
