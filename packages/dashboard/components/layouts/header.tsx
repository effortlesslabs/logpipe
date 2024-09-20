import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

function Header() {
  const router = useRouter();

  const handleClick = async () => {
    await router.push("/spaces");
  };

  return (
    <div className="border-b py-3 px-5 flex justify-between">
      <h1 className="font-bold text-2xl">
        <a href="/spaces">LogPipe</a>
      </h1>
      <ModeToggle />
    </div>
  );
}

export default Header;
