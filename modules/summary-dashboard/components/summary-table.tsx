import { summaryTableColumns } from './summary-table-columns';
import { DataTable } from '@/modules/ui/table';
import data from '../data.json';

export function SummaryTable() {
    return <DataTable columns={summaryTableColumns} data={data} />;
}