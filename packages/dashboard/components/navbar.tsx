import Logo from "./logo";
import Project from "./project";
import Space from "./space";
import { Button } from "./ui/button";
import Notification from "./notification";
import Profile from "./profile";

function Navbar() {
  return (
    <div className="flex items-center h-[64px] min-h-[64px] justify-between px-6">
      <div className="flex gap-2 text-white">
        <Logo />
        <svg
          data-testid="geist-icon"
          fill="none"
          height="24"
          shape-rendering="geometricPrecision"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          width="24"
          className="text-[#969696] w-[22px] h-[22px]"
        >
          <path d="M16.88 3.549L7.12 20.451"></path>
        </svg>
        <Project />
        <svg
          data-testid="geist-icon"
          fill="none"
          height="24"
          shape-rendering="geometricPrecision"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          width="24"
          className="text-[#969696] w-[22px] h-[22px]"
        >
          <path d="M16.88 3.549L7.12 20.451"></path>
        </svg>
        <Space />
      </div>
      <div className="flex gap-5 items-center ">
        <Button className="bg-transparent border border-[#969696] h-8 hover:bg-[hsla(0,0%,100%,.09)] px-[6px] text-[14px] text-[#969696] hover:text-white">
          Feedback
        </Button>
        <a href="/" className="text-[#969696] hover:text-white">
          Changelogs
        </a>
        <a href="/" className="text-[#969696] hover:text-white">
          Help
        </a>
        <a href="/" className="text-[#969696] hover:text-white">
          Docs
        </a>
        <div className="flex gap-3 items-center ">
          <Notification />
          <Profile />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
