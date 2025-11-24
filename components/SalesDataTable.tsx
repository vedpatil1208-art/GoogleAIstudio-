import React from 'react';
import type { CombinedOrder } from '../types';

interface SalesDataTableProps {
    data: CombinedOrder[];
}

const SalesDataTable: React.FC<SalesDataTableProps> = ({ data }) => {
    
    const StatusBadge: React.FC<{status: string}> = ({status}) => {
        const baseClasses = "px-2.5 py-1 text-xs font-bold rounded-full text-text-light";
        let colorClasses = "";

        switch (status.toLowerCase()) {
            case 'delivered':
                colorClasses = "bg-barbie-accent-magenta";
                break;
            case 'pending':
                colorClasses = "bg-barbie-accent-purple";
                break;
            case 'cancelled':
                colorClasses = "bg-rose-400";
                break;
            default:
                colorClasses = "bg-pink-300";
        }
        return <span className={`${baseClasses} ${colorClasses}`}>{status}</span>;
    };

    return (
        <>
            <h3 className="text-xl font-semibold mb-4 text-text-dark">Detailed Sales Data</h3>
            <div className="overflow-x-auto max-h-96">
                <table className="min-w-full text-sm text-left text-text-dark">
                    <thead className="text-xs text-text-dark/80 uppercase bg-barbie-pink-light sticky top-0">
                        <tr>
                            <th scope="col" className="px-6 py-3">Order ID</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Customer</th>
                            <th scope="col" className="px-6 py-3">Product</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Amount</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Sales Rep</th>
                            <th scope="col" className="px-6 py-3">Region</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((order) => (
                            <tr key={order.orderId} className="bg-barbie-pink-medium border-b border-barbie-pink-light hover:bg-barbie-pink-light transition-colors duration-200">
                                <td className="px-6 py-4">{order.orderId}</td>
                                <td className="px-6 py-4">{order.date}</td>
                                <td className="px-6 py-4 font-medium text-text-dark">{order.customerName}</td>
                                <td className="px-6 py-4">{order.productName}</td>
                                <td className="px-6 py-4">{order.category}</td>
                                <td className="px-6 py-4">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(order.totalAmount)}</td>
                                <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                                <td className="px-6 py-4">{order.salesRep}</td>
                                <td className="px-6 py-4">{order.region}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default SalesDataTable;