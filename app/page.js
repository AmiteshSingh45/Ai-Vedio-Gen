import { UserButton} from "@clerk/nextjs";
import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <>
      <Button>Click me</Button>
      <UserButton afterSignOutUrl="/" style={{ border: '1px solid red', marginTop: '20px' }} />
    </>
  );
}
