import InputForm from "./inputform";

function CreateSpaceForm() {
  return (
    <div className="border w-2/5 h-full rounded-xl p-5">
      <div className="text-2xl font-semibold">Create Page</div>
      <div className="p-5">
        <InputForm />
      </div>
    </div>
  );
}

export default CreateSpaceForm;
