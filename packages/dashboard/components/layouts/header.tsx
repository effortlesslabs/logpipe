import { ModeToggle } from "./mode-toggle";
import ProfileMenu from "../profile-menu";

function Header() {
  return (
    <div className="border-b py-3 px-5 flex justify-between">
      <h1 className="font-bold text-2xl">
        <a href="/spaces">LogPipe</a>
      </h1>
      <div className="gap-4 flex items-center">
        <ModeToggle />
        <ProfileMenu />
      </div>
    </div>
  );
}

export default Header;
