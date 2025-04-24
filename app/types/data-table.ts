import type { ColumnDef } from '@tanstack/react-table';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isLoading?: boolean;
}

export type { DataTableProps };
