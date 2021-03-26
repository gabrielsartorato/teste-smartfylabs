import { Link } from 'react-router-dom';
import './styles.css';

interface CardProps {
  img: string;
  title: string;
  description: string;
  id: number;
  type: string;
}

function Card({ title, description, img, id, type }: CardProps) {
  return (
    <Link to={`/detail/${id}/${type}`} className="card-movies">
      <img src={img} alt={title} />
      <div className="info">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default Card;
