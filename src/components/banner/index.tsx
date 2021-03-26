import './styles.css';

interface BannerProps {
  title: string;
  description: string;
}

function Banner({ title, description }: BannerProps) {
  return (
    <div className="smart-name">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export default Banner;
