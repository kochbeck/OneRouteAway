import Link from 'next/link';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            Main View
          </Link>
        </li>
        <li>
          <Link href="/destination">
            Destination View
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;