import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-3">
      {/* Previous Button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        className="flex items-center gap-2 px-4 py-2 border text-black hover:bg-gray-50 transition-colors duration-200"
        style={{ 
          backgroundColor: 'white', 
          borderColor: '#8B7B5B',
          borderWidth: '1px'
        }}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous Page</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            className={`w-8 h-8 text-sm font-medium transition-colors duration-200 ${
              page === currentPage
                ? "text-white"
                : page === "..."
                ? "text-black cursor-default"
                : "text-black hover:text-gray-600"
            }`}
            style={page === currentPage ? {
              backgroundColor: '#8B7B5B'
            } : {
              backgroundColor: 'transparent'
            }}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        className="flex items-center gap-2 px-4 py-2 border text-black hover:bg-gray-50 transition-colors duration-200"
        style={{ 
          backgroundColor: 'white', 
          borderColor: '#8B7B5B',
          borderWidth: '1px'
        }}
      >
        <span>Next Page</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
