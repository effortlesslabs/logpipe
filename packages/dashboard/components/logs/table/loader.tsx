import { times } from "lodash";

function Loader() {
  const data = times(15);
  return (
    <div className="flex flex-col w-full gap-1.5 px-2">
      {data.map((item) => (
        <div key={item} className="p-5 w-full bg-muted/40 animate-pulse" />
      ))}
    </div>
  );
}

export default Loader;
