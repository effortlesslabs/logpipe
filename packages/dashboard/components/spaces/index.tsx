import RecentLogs from "./logs";
import SpaceList from "./lists";

export default function Spaces() {
  return (
    <div className="flex flex-col gap-5 h-full p-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Hello there</h1>
        <p className=" text-foreground/40">
          No hassles, just quick and easy access to get started now!
        </p>
      </div>
      <div className="flex flex-grow gap-10">
        <RecentLogs />
        <SpaceList />
      </div>
    </div>
  );
}
