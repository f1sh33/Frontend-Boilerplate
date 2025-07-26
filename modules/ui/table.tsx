import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
} from '@tanstack/react-table';

interface DataTableProps<TData> {
    columns: ColumnDef<TData>[];
    data: TData[];
}

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center h-32 border rounded-md bg-card">
                <p className="text-sm text-muted-foreground">Không có dữ liệu</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-md border">
            <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="px-6 py-3 text-center text-xs font-medium text-muted-foreground"
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="bg-card divide-y divide-border">
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-muted/50 transition-colors">
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="px-6 py-4 whitespace-nowrap text-xs text-center text-foreground"
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
