import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ErrorButton() {
  const [isError, setError] = useState(false);
  const navigate = useNavigate();
  const clickErrorHandler = () => {
    setError(true);
  };

  const clickPage404Handler = (e: MouseEvent) => {
    e.preventDefault();
    navigate('/someverybadaddress');
  };

  if (isError) {
    throw new Error('Ooops');
  }

  return (
    <div>
      <button type="submit" onClick={clickErrorHandler}>
        Throw an Error.
      </button>
      <button
        type="submit"
        onClick={clickPage404Handler}
        data-testid="throw404"
      >
        Go to 404 Page.
      </button>
    </div>
  );
}
