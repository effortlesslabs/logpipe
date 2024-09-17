import { ModeToggle } from "./mode-toggle";

function Header() {
  return (
    <div className="border-b py-3 px-5 flex justify-between">
      <h1 className="font-bold text-2xl">LogPipe</h1>
      <ModeToggle />
    </div>
  );
}

export default Header;
