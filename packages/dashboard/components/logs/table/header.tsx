import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function Header<T>({ groups }: { groups: HeaderGroup<T>[] }) {
  return (
    <TableHeader>
      {groups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead
                key={header.id}
                className={`${
                  header.column.columnDef.header === "Timestamp" ? "w-1/6" : ""
                } ${header.column.columnDef.header === "Level" ? "w-14" : ""}`}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}
