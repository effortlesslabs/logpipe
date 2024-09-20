import CreateSpaceForm from "./createspaceform";
import Integrations from "./integrations";

function CreateSpace() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col mt-20 ml-96 w-full h-screen">
        <span className="text-4xl font-bold">Create New Space.</span>
        <span className="text-md pt-2">
          Create a new space, to get your logs displayed.
        </span>
        <div className="flex h-1/2 pt-5 gap-5">
          <CreateSpaceForm />
          <Integrations />
        </div>
      </div>
    </div>
  );
}

export default CreateSpace;
