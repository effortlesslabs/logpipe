import { useState } from "react";
import NodeExample from "./examples/nodeexample";
import Frameworks from "./frameworks";

function Integrations() {
  const [selectedFramework, setSelectedFramework] = useState("");
  return (
    <div className="w-2/5 h-full border rounded-xl p-5 flex flex-col justify-between">
      <div className="flex justify-between items-center h-fit">
        <span className="font-semibold text-2xl">Integrations</span>
        <Frameworks value={selectedFramework} setValue={setSelectedFramework} />
      </div>
      {selectedFramework === "node" && <NodeExample />}
    </div>
  );
}

export default Integrations;
