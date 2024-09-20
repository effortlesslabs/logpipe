import React from "react";
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
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => props.handleNextPage()}
        disabled={!props.getCanPreviousPage()}
      >
        Next
      </Button>
    </div>
  );
}
