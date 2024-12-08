import React from "react";
import { useRouteError, Link } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="flex flex-col p-8 gap-10 items-center">
      <h1 className="text-4xl font-bold text-[#eadaff] text-center">
        Hatalı Sayfa
      </h1>
      <div className="flex flex-col items-center justify-center flex-wrap gap-10 w-4/5">
        <div className="flex justify-center items-center w-4/5 p-8 bg-gray-500 border-8 border-gray-600 rounded-xl  font-medium text-black text-3xl">
          Merhabalar, Hatalı Bir Sayfaya Geldiniz Ya Da Bir Hatayla
          Karşılaştınız
        </div>
        <div className="flex flex-col justify-center items-center w-4/5 p-8 gap-14 bg-gray-300 border-8 border-gray-600 rounded-xl  font-medium text-black text-3xl">
          <span>
            HATA: <span className="text-red-800">{error.error.message}</span>
          </span>
          <Link
            className="hover:brightness-90 text-white bg-gray-700 duration-200 transition-all p-4 rounded-lg"
            to="/"
          >
            ANA SAYFAYA GERİ DÖNÜN
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
