import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

const TaskListPagination = ({
    handleNext,
    handlePrev,
    handlePageChange,
    page,
    totalPages,
}) => {

    const generatePages = () => {
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Nếu đang ở gần đầu (trang 1, 2, 3)
            if (page <= 3) {
                pages.push(1, 2, 3, "...", totalPages);
            }
            // Nếu đang ở gần cuối
            else if (page >= totalPages - 2) {
                pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            }
            // Nếu đang ở khoảng giữa
            else {
                pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
            }
        }

        return pages;
    };
    const pagesToShow = generatePages();
    return (
        <div className="flex justify-center mt-4">
            <Pagination>
                <PaginationContent>
                    {/* prev */}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={page === 1 ? undefined : handlePrev}
                            className={cn(
                                "cursor-pointer",
                                page === 1 && "pointer-events-none opacity-50")} />
                    </PaginationItem>

                    {pagesToShow.map((p, index) => (
                        <PaginationItem key={index}>
                            {p === '...' ? (<PaginationEllipsis />) : (
                                <PaginationLink
                                    isActive={p === page}
                                    onClick={() => {
                                        if (p !== page) handlePageChange(p);
                                    }}
                                    className="cursor-pointer"
                                >
                                    {p}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    {/* next */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={page === totalPages ? undefined : handleNext}
                            className={cn(
                                "cursor-pointer",
                                page === totalPages && "pointer-events-none opacity-50"
                            )}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div >
    )
}

export default TaskListPagination
