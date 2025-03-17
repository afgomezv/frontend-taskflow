export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-center py-3  bg-red-100 text-rose-flare font-bold uppercase text-sm rounded-lg">
      {children}
    </div>
  );
}
