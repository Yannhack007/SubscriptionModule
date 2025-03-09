import React, { useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  createColumnHelper,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { ChevronDown, Download, FileEdit, Plus, Search, Trash2, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Plan {
  planId: string;
  category: string;
  description: string[];
  content: string;
  amount: number;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

interface HistoryEntry {
  timestamp: string;
  action: string;
  user: string;
  changes: Record<string, any>;
}

const PlanManagement = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columnHelper = createColumnHelper<Plan>();

  const handleEdit = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsAddModalOpen(true);
  };

  const handleDelete = (planId: string) => {
    // Implement delete logic here
  };

  const handleViewHistory = (plan: Plan) => { 
    setSelectedPlan(plan);
    setIsHistoryModalOpen(true);
  };

  const columns = [
    columnHelper.accessor('category', {
      header: 'Category',
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: (info) => (
        <div className="max-w-xs">
          <ul className="list-disc list-inside">
            {info.getValue().map((desc, idx) => (
              <li key={idx} className="truncate text-sm">{desc}</li>
            ))}
          </ul>
        </div>
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'Amount',
      cell: (info) => <span>{info.getValue().toFixed(2)} €</span>,
    }),
    columnHelper.accessor('duration', {
      header: 'Duration (month)',
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.display({
      id: 'actions',
      cell: (info) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(info.row.original)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <FileEdit size={18} />
          </button>
          <button
            onClick={() => handleDelete(info.row.original.planId)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Trash2 size={18} />
          </button>
          <button
            onClick={() => handleViewHistory(info.row.original)}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <History size={18} />
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: plans,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  const exportToCSV = () => {
    const headers = ['Category', 'Description', 'Amount', 'Duration'];
    const csvData = plans.map(plan => [
      plan.category,
      plan.description.join('; '),
      plan.amount,
      plan.duration
    ]);

    const csv = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plans-export-${new Date().toISOString()}.csv`;
    a.click();
  };

  return (
    <div className="p-6 pl-64">
      <div className="flex justify-between items-center mb-6 pl-6">
        <h2 className="text-2xl font-bold text-gray-800">Plan Management</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <button
            onClick={exportToCSV}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Download size={20} />
            <span>Export</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-purple-900"
          >
            <Plus size={20} />
            <span>New Plan</span>
          </button>
        </div>
      </div>


      <div className="bg-white rounded-lg shadow overflow-hidden ml-6">
        <table className="w-full">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={`flex items-center space-x-2 ${
                          header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                        {header.column.getCanSort() && (
                          <ChevronDown size={16} className="text-gray-400" />
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">
              Page{' '}
              <span className="font-medium">{table.getState().pagination.pageIndex + 1}</span> on{' '}
              <span className="font-medium">{table.getPageCount()}</span>
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <PlanFormModal
            plan={selectedPlan}
            onClose={() => {
              setIsAddModalOpen(false);
              setSelectedPlan(null);
            }}
            onSubmit={(plan) => {
              // Handle plan submission
              setIsAddModalOpen(false);
              setSelectedPlan(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* History Modal */}
      <AnimatePresence>
        {isHistoryModalOpen && selectedPlan && (
          <HistoryModal
            history={history}
            onClose={() => {
              setIsHistoryModalOpen(false);
              setSelectedPlan(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// PlanFormModal Component
const PlanFormModal: React.FC<{
  plan?: Plan | null;
  onClose: () => void;
  onSubmit: (plan: Partial<Plan>) => void;
}> = ({ plan, onClose, onSubmit }) => {
  // Modal implementation here
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      {/* Modal content */}
    </motion.div>
  );
};

// HistoryModal Component
const HistoryModal: React.FC<{
  history: HistoryEntry[];
  onClose: () => void;
}> = ({ history, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      {/* History content */}
    </motion.div>
  );
};

export default PlanManagement;