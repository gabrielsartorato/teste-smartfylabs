import { useCallback, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import './styles.css';
import Header from '../../components/header';
import api from '../../services/api';

import { DetailParams, Movie } from '../../interfaces';

const backgroundOpacity =
  'linear-gradient(to bottom right, rgba(6.67%, 14.51%, 14.90%, 1.00), rgba(6.67%, 14.51%, 14.90%, 0.84))';

function Details() {
  const [movie, setMovie] = useState<Movie>();

  const history = useHistory();

  const { params } = useRouteMatch<DetailParams>();
  const { id, type } = params;

  useEffect(() => {
    async function loadTitle() {
      const response = await api.get(`${type}/${id}`);

      setMovie(response.data);
    }

    loadTitle();
  }, [id, type]);

  const handlePushToMain = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <div className="container">
      <Header />
      <div className="back-button">
        <button onClick={handlePushToMain}>Voltar</button>
      </div>
      <div
        className="box-detail"
        style={{
          background: `${backgroundOpacity}, url(${movie?.backdrop_path}) 0px -200px no-repeat`,
        }}
      >
        <div className="poster">
          <img src={movie?.poster_path} alt={movie?.title} />
        </div>

        <div className="box-synopsis-cast">
          <div className="title-overview">
            <h1>{movie?.title ? movie?.title : movie?.name}</h1>
            <h3>Sinopse</h3>
            <p>{movie?.overview}</p>
          </div>

          <h1 id="title-cast">Elenco</h1>

          <div className="box-cast">
            {movie?.credits.cast
              .map((cast) => (
                <div key={cast.name} className="cast">
                  <img src={cast.profile_path} alt={cast.character} />
                  <strong>{cast.name}</strong>
                  <p>{cast.character}</p>
                </div>
              ))
              .slice(0, 5)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
