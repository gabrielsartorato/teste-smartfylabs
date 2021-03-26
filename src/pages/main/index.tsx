import { useCallback, useEffect, useMemo, useState } from 'react';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

import { List } from '../../interfaces';

import Card from '../../components/card';
import Header from '../../components/header';
import Banner from '../../components/banner';

function Main() {
  const [indexPages, setIndexPages] = useState(1);
  const [search, setSearch] = useState<string>('filmes');
  const [list, setList] = useState<List[]>([]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`${search}`, {
        params: {
          page: indexPages,
        },
      });

      setList(response.data.results.slice(0, 4));
    }

    loadData();
  }, [indexPages, search]);

  const handleSumIndexPages = useCallback(() => {
    setIndexPages(indexPages + 1);
  }, [indexPages]);

  const handleSubtractIndexPages = useCallback(() => {
    if (indexPages === 1) {
      return;
    }
    setIndexPages(indexPages - 1);
  }, [indexPages]);

  const handleSelectedMovie = useCallback(() => {
    if (search === 'filmes') {
      return;
    }
    setIndexPages(1);
    setSearch('filmes');
  }, [search]);

  const handleSelectedSerie = useCallback(() => {
    if (search === 'series') {
      return;
    }
    setIndexPages(1);
    setSearch('series');
  }, [search]);

  const titles = useMemo(() => {
    return list.map((titleName) => {
      return {
        ...titleName,
        overview:
          titleName.overview.length <= 500
            ? titleName.overview
            : titleName.overview.slice(0, 500) + '...',
      };
    });
  }, [list]);

  return (
    <div className="container">
      <Header />
      <Banner
        description="Aqui você encontra o melhor conteúdo de filmes e séries"
        title="Bem vindo a Smart Movies"
      />
      <main>
        <div className="group-movies-series">
          <button
            className={
              search === 'filmes' ? 'selected-left' : 'unselected-left'
            }
            onClick={handleSelectedMovie}
          >
            Filmes
          </button>
          <button
            className={
              search === 'series' ? 'selected-right' : 'unselected-right'
            }
            onClick={handleSelectedSerie}
          >
            Séries
          </button>
        </div>
        <div className="group-button-pages">
          <button onClick={handleSubtractIndexPages}>
            <FiChevronsLeft />
          </button>
          <div className="box-pages">
            <p>{indexPages}</p>
          </div>
          <button onClick={handleSumIndexPages}>
            <FiChevronsRight />
          </button>
        </div>
        <section>
          {titles.map((movie) => (
            <Card
              id={movie.id}
              type={search!}
              key={movie.id}
              img={movie.poster_path}
              description={movie.overview}
              title={movie.title || movie.name}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default Main;
