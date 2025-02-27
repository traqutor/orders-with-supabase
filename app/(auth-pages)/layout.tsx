export default async function Layout(
  { children }: { children: React.ReactNode; }) {
  return (

    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full h-screen flex flex-col gap-20 items-center">

        <div className="flex flex-col gap-20 max-w-5xl p-5">
          <div className="max-w-7xl flex flex-col gap-12 items-start"></div>
          {children}
        </div>
      </div>

    </main>
  );
}
