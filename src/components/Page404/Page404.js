import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Page404.css';

function Page404() {
  const navigate = useNavigate();
  return (
    <>
      <header />
      <main className="page404">
        <h2 className="page404__title">404</h2>
        <p className="page404__text">Страница не найдена</p>
        <Link
          className="page404__text page404__text_type_link"
          onClick={() => navigate(-1)}
        >
          Назад
        </Link>
      </main>
      <footer />
    </>
  );
}

export default Page404;
