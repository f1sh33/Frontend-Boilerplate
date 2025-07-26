'use client';
import { Badge } from '@/modules/ui/badge';
import { Label } from '@/modules/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/modules/ui/select';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/modules/ui/tabs';
import { SummaryTable } from './summary-table';

export function DataTableSection() {
    return (
        <Tabs
            defaultValue="outline"
            className="w-full flex-col justify-start gap-6"
        >
            <div className="flex items-center justify-between">
                <Label htmlFor="view-selector" className="sr-only">
                    View
                </Label>
                <Select defaultValue="outline">
                    <SelectTrigger
                        className="flex w-fit @4xl/main:hidden"
                        size="sm"
                        id="view-selector"
                    >
                        <SelectValue placeholder="Select a view" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="outline">Outline</SelectItem>
                        <SelectItem value="past-performance">
                            Past Performance
                        </SelectItem>
                        <SelectItem value="key-personnel">
                            Key Personnel
                        </SelectItem>
                        <SelectItem value="focus-documents">
                            Focus Documents
                        </SelectItem>
                    </SelectContent>
                </Select>
                <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
                    <TabsTrigger value="outline">Outline</TabsTrigger>
                    <TabsTrigger value="past-performance">
                        Past Performance <Badge variant="secondary">3</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="key-personnel">
                        Key Personnel <Badge variant="secondary">2</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="focus-documents">
                        Focus Documents
                    </TabsTrigger>
                </TabsList>
            </div>
            <TabsContent
                value="outline"
                className="flex flex-col"
            >
                <SummaryTable />
            </TabsContent>
            <TabsContent
                value="past-performance"
                className="flex flex-col"
            >
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
            <TabsContent
                value="key-personnel"
                className="flex flex-col"
            >
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
            <TabsContent
                value="focus-documents"
                className="flex flex-col"
            >
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
        </Tabs>
    );
}