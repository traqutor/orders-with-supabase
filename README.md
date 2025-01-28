<a href="https://ets-orders.vercel.app/">
  <h1 align="center">Ets Orders</h1>
</a>

<p align="center">
 The way to manage the chaos... with 
</p>

## Features

- Zamówienia
    - Kontakty
    - Magazyn
    - Montaż

## Demo

Demo at [ets-orders.vercel.app](https://ets-orders.vercel.app/).

Generate TypeScript

```bash
npx supabase gen types typescript --project-id grokxcrznknfvpnzpmuk --schema public > types_db.ts
```

generated file needs update Tables type

``` typescript
...
export type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
PublicTableNameOrOptions extends | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
| { schema: keyof Database },
TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
Database[PublicTableNameOrOptions['schema']]['Views'])
: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
Row: infer R
}
? R
: never
: PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
PublicSchema['Views'])
? (PublicSchema['Tables'] &
PublicSchema['Views'])[PublicTableNameOrOptions] extends {
Row: infer R
}
? R
: never
: never
```