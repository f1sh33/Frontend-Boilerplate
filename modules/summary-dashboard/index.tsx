'use client';
import { SectionCards } from './components/section-cards';
import { DataTableSection } from './components/data-table-section';
import { ChartAreaInteractive } from './components/chart-area-interactive';

export default function SummaryDashboard() {
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 md:gap-6">
                    <SectionCards />
                    <ChartAreaInteractive />
                    <DataTableSection />
                </div>
            </div>
        </div>
    );
}
