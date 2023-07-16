export default function AppCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded-3xl mt-14 shadow-lg max-w-3xl mx-auto text-gray-500 dark:text-white bg-white dark:bg-gray-900">
      <div className="mx-12 my-10">{children}</div>
    </div>
  );
}
