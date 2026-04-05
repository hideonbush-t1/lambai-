import { cn } from "@/lib/utils";

interface TableProps {
  headers: string[];
  children: React.ReactNode;
  className?: string;
}

export const Table = ({ headers, children, className }: TableProps) => {
  return (
    <div className={cn("w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm", className)}>
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50/50 border-b border-gray-200">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {children}
        </tbody>
      </table>
    </div>
  );
};