import { Button } from "./ui/button";

function Navbar2() {
  return (
    <div className="px-2 h-[64px] min-h-[64px]">
      <div className="gap-5">
        <Button className="text-[#969696] bg-transparent hover:bg-[hsla(0,0%,100%,.09)] hover:text-white">
          Project
        </Button>
        <Button className="text-[#969696] bg-transparent hover:bg-[hsla(0,0%,100%,.09)] hover:text-white">
          Deployments
        </Button>
        <Button className="text-[#969696] bg-transparent hover:bg-[hsla(0,0%,100%,.09)] hover:text-white">
          Analytics
        </Button>
        <Button className="text-[#969696] bg-transparent hover:bg-[hsla(0,0%,100%,.09)] hover:text-white">
          Speed Insights
        </Button>
        <Button className="text-[#969696] bg-transparent hover:bg-[hsla(0,0%,100%,.09)] hover:text-white">
          Logs
        </Button>
        <Button className="text-[#969696] bg-transparent hover:bg-[hsla(0,0%,100%,.09)] hover:text-white">
          Firewall
        </Button>
        <Button className="text-[#969696] bg-transparent hover:bg-[hsla(0,0%,100%,.09)] hover:text-white">
          Storage
        </Button>
        <Button className="text-[#969696] bg-transparent hover:bg-[hsla(0,0%,100%,.09)] hover:text-white">
          Settings
        </Button>
      </div>
    </div>
  );
}

export default Navbar2;
