import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/search-movement">Search Movement</Link>
        </li>
        <li>
          <Link href="/bank-account">Bank Account</Link>
        </li>
      </ul>
    </nav>
  );
}
