import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export default function FileTableFooter({
  filteredAndSortedData,
  handlePageChange,
  currentPage,
  itemsPerPage,
  totalPages,
  getPageNumbers,
}) {
  return (
    <div>
      <div className="p-4 ">
        {filteredAndSortedData && filteredAndSortedData.length > 0 && (
          <div className="">
            <div className="text-sm text-muted-foreground w-[100%]">
              Affichage de {(currentPage - 1) * itemsPerPage + 1} à{" "}
              {Math.min(
                currentPage * itemsPerPage,
                filteredAndSortedData.length
              )}{" "}
              sur {filteredAndSortedData.length} dossier
            </div>

            <Pagination className="w-full flex justify-center">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {getPageNumbers().map((pageNum, index) => {
                  if (pageNum === "ellipsis") {
                    return (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }

                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        isActive={currentPage === pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
