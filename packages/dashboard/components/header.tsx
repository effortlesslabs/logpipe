import Space from "./space";
import { Icons } from "@/shared";

function Header() {
  return (
    <div className="h-16 text-white flex items-center">
      {/* <Profile /> */}
      <Icons.Separator size="24" className="text-[#333}" />
      <Space />
    </div>
  );
}

export default Header;
