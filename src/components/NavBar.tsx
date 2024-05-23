import { Button, ButtonGroup } from "@mui/material";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <ButtonGroup sx={{ margin: "20px" }}>
        <Link href="/search-movement">
          <Button>Search Movement</Button>
        </Link>

        <Link href="/bank-account">
          <Button>Bank Account</Button>
        </Link>
      </ButtonGroup>
    </nav>
  );
}
