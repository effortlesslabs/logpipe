import React from "react";
import { PaginationInstance } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  getCanPreviousPage: () => boolean;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

export function Pagination(props: PaginationProps) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => props.handlePreviousPage()}
        disabled={!props.getCanPreviousPage()}
        // onClick={() => table.previousPage()}
        // disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => props.handleNextPage()}
        disabled={!props.getCanPreviousPage()}
        // onClick={() => table.nextPage()}
        // disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  );
}
