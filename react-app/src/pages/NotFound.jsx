import React from "react";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-center px-4">
      <h1 className="text-6xl font-extrabold text-primary-600 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-neutral-900 mb-4">
        Página Não Encontrada
      </h2>
      <p className="text-lg text-neutral-700 mb-8 max-w-md">
        Desculpe, a página que você está procurando não existe ou foi movida.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
      >
        Voltar para o Início
      </Link>
    </div>
  );
}
