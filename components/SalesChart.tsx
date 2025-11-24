import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { DailySales } from '../types';

interface SalesChartProps {
    data: DailySales[];
}

const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
    return (
        <>
            <h3 className="text-xl font-semibold mb-4 text-text-dark">Daily Sales Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F8B9D4" />
                    <XAxis dataKey="date" stroke="#3D2A42" />
                    <YAxis 
                        stroke="#3D2A42"
                        tickFormatter={(value) => new Intl.NumberFormat('en-IN', { notation: 'compact', compactDisplay: 'short' }).format(value as number)}
                    />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#FEEBF2', border: '1px solid #FAD0E2', borderRadius: '10px', color: '#3D2A42' }} 
                        labelStyle={{ color: '#3D2A42', fontWeight: 'bold' }}
                        formatter={(value) => [new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value as number), 'Sales']}
                    />
                    <Legend wrapperStyle={{ color: '#3D2A42' }} />
                    <Line type="monotone" dataKey="totalSales" name="Total Sales" stroke="#E75480" strokeWidth={2} dot={{ r: 4, fill: '#E75480' }} activeDot={{ r: 8, stroke: '#E75480' }} />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
};

export default SalesChart;