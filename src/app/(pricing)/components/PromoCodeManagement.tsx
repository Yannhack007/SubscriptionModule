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
import { 
  ChevronDown, Download, FileEdit, Plus, Search, 
  Trash2, Calendar, Filter, Copy, CheckCircle, XCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'react-hot-toast';
import { PromoFormModal } from './modals/PromoFormModal';
import { FilterModal } from './modals/FilterModalPromo';

interface PromoCode {
  id: string;
  code: string;
  validity: number;
  discount: number;
  status: 'active' | 'expired' | 'disabled';
  startDate: string;
  usageCount?: number;
  maxUsage?: number;
}

interface FilterState {
  status: string[];
  dateRange: {
    start: string | null;
    end: string | null;
  };
  discountRange: {
    min: number | null;
    max: number | null;
  };
}

const PromoCodeManagement = () => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState<PromoCode | null>(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    status: [],
    dateRange: { start: null, end: null },
    discountRange: { min: null, max: null },
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const columnHelper = createColumnHelper<PromoCode>();

  const handleEdit = (promo: PromoCode) => {
    setSelectedPromo(promo);
    setIsAddModalOpen(true);
  };

  const handleDelete = async (promo: String) => {
    try {
      await fetch(`http://localhost:5000/delete_promo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promo),
      });
      //setPromoCodes((prev) => prev.filter((p) => p.id !== promo.id));
    } catch (error) {
      console.error('Error deleting promo code:', error);
    }
  };

  const handleStatusToggle = async (promo: PromoCode) => {
    try {
      await fetch(`http://localhost:5000/update_promo_status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promo),
      });
      setPromoCodes((prev) => prev.map((p) => (p.id === promo.id ? { ...p, status: p.status === 'active' ? 'disabled' : 'active' } : p)));
    } catch (error) {
      console.error('Error updating promo code status:', error);
    }
  };

  const columns = [
    columnHelper.accessor('code', {
      header: 'Promo code',
      cell: (info) => (
        <div className="flex items-center space-x-2">
          <span className="font-mono font-medium">{info.getValue()}</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(info.getValue());
              toast.success('Promo code copied to clipboard');
            }}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Copy size={14} />
          </button>
        </div>
      ),
    }),
    columnHelper.accessor('discount', {
      header: 'Discount (%)',
      cell: (info) => <span>{info.getValue()}%</span>,
    }),
    columnHelper.accessor('validity', {
      header: 'Validity (days)',
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor('startDate', {
      header: 'Start Date',
      cell: (info) => (
        <span>
          {format(new Date(info.getValue()), 'dd MMM yyyy', { locale: fr })}
        </span>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => {
        const status = info.getValue();
        return (
          <span className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${status === 'active' ? 'bg-green-100 text-green-800' : ''}
            ${status === 'expired' ? 'bg-red-100 text-red-800' : ''}
            ${status === 'disabled' ? 'bg-gray-100 text-gray-800' : ''}
          `}>
            {status === 'active' ? 'Actif' : status === 'expired' ? 'Expiré' : 'Désactivé'}
          </span>
        );
      },
    }),
    columnHelper.accessor('usageCount', {
      header: 'Usage',
      cell: (info) => (
        <span>
          {info.getValue()}/{info.row.original.maxUsage || '∞'}
        </span>
      ),
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
            onClick={() => handleStatusToggle(info.row.original)}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            {info.row.original.status === 'active' ? (
              <XCircle size={18} />
            ) : (
              <CheckCircle size={18} />
            )}
          </button>
          <button
            onClick={() => handleDelete(info.row.original.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: promoCodes,
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
    const headers = ['Code', 'Discount', 'Validity', 'Start date', 'Status', 'Usage'];
    const csvData = promoCodes.map(promo => [
      promo.code,
      `${promo.discount}%`,
      promo.validity,
      format(new Date(promo.startDate), 'dd/MM/yyyy'),
      promo.status,
      `${promo.usageCount}/${promo.maxUsage || '∞'}`
    ]);

    const csv = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `codes-promo-${format(new Date(), 'dd-MM-yyyy')}.csv`;
    a.click();
  };

  return (
    <div className="p-6 pl-64">
      <div className="flex justify-between items-center mb-6 pl-6">
        <h2 className="text-2xl font-bold text-gray-800">Promo code</h2>
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
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter size={20} />
            <span>Filter</span>
          </button>
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
            <span>New Code</span>
          </button>
        </div>
      </div>

      
      <div className="grid grid-cols-4 gap-4 mb-6 ml-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Actives Codes</h3>
          <p className="text-2xl font-bold text-green-600">
            {promoCodes.filter(p => p.status === 'active').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Total uages</h3>
          <p className="text-2xl font-bold text-blue-600">
            {promoCodes.reduce((acc, p) => acc + (p.usageCount || 0), 0)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Average discount</h3>
          <p className="text-2xl font-bold text-purple-600">
            {Math.round(promoCodes.reduce((acc, p) => acc + p.discount, 0) / promoCodes.length)}%
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Expired Codes</h3>
          <p className="text-2xl font-bold text-red-600">
            {promoCodes.filter(p => p.status === 'expired').length}
          </p>
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

      {/* Modals */}
      <AnimatePresence>
        {isAddModalOpen && (
          <PromoFormModal
            promo={selectedPromo}
            onClose={() => {
              setIsAddModalOpen(false);
              setSelectedPromo(null);
            }}
            onSubmit={(promo) => {
              // Handle promo submission
              setIsAddModalOpen(false);
              setSelectedPromo(null);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFilterModalOpen && (
          <FilterModal
            filters={filters}
            onClose={() => setIsFilterModalOpen(false)}
            onApply={(newFilters) => {
              setFilters(newFilters);
              setIsFilterModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PromoCodeManagement;