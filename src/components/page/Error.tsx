import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <main className="size-full flex-1 flex flex-col items-center justify-center gap-4">
      <article className="bg-mantle rounded-lg p-4 flex flex-col items-center justify-center gap-4 text-center">
        <span className="text-3xl">Error 404</span>
        <span className="text-subtext-0 max-w-sm">
          No se encontró la Página o ha ocurrido un error buscandola.
        </span>
        <Link
          to="/"
          className="mt-3 px-4 py-1 rounded-md bg-base hover:bg-surface-0 text-sm transition-colors"
        >
          Volver al Inicio
        </Link>
      </article>
    </main>
  );
};

export default ErrorPage;
