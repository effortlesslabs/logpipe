import { Logs, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Logs[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      spaceId: "1",
      profileId: "1",
      createdAt: "2021-09-01T00:00:00Z",
      level: "info",
      message: "Hello, world!",
    },
    {
      id: "2",
      spaceId: "1",
      profileId: "1",
      createdAt: "2021-09-01T01:00:00Z",
      level: "info",
      message: "Hello, world!2",
    },
    {
      id: "3",
      spaceId: "1",
      profileId: "1",
      createdAt: "2021-09-01T02:00:00.12Z",
      level: "info",
      message: "Hello, world!3",
    },
    {
      id: "4",
      spaceId: "1",
      profileId: "1",
      createdAt: "2021-09-01T18:00:00.12Z",
      level: "warning",
      message: "Hello, world!3",
    },
    {
      id: "5",
      spaceId: "1",
      profileId: "1",
      createdAt: "2021-09-01T02:00:00Z",
      level: "error",
      message: "Hello, world!3",
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
