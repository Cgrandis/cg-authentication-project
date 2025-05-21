export default function BaseSection({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-12 px-6 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
