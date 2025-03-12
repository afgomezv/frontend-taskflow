export default function Logo() {
  return (
    <div className="flex items-center">
      <section>
        <img src="/logo-task.svg" alt="logotipo taskflow" width="160px" />
      </section>
      <section>
        <h1 className="text-gray-700 text-4xl font-black mt-12 -ml-[70px]">
          TaskFlow
        </h1>
      </section>
    </div>
  );
}
