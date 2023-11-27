import { useRouter } from 'next/router';

export default function ErrorButton() {
  const router = useRouter();

  return (
    <div>
      <button type="submit" onClick={() => router.push('/500')}>
        Throw an Error.
      </button>
      <button type="submit" onClick={() => router.push('/someverybadaddress')}>
        Go to 404 Page.
      </button>
    </div>
  );
}
