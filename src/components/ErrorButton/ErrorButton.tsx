import { MouseEvent, useState } from 'react';
import { useRouter } from 'next/router';

export default function ErrorButton() {
  const [isError, setError] = useState(false);
  const router = useRouter();
  const clickErrorHandler = () => {
    setError(true);
  };

  const clickPage404Handler = (e: MouseEvent) => {
    e.preventDefault();
    router.push('/someverybadaddress');
  };

  if (isError) {
    router.push('/500');
    setError(false);
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
