
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { RegionSales } from '../types';

interface RegionBarChartProps {
    data: RegionSales[];
}

const RegionBarChart: React.FC<RegionBarChartProps> = ({ data }) => {
    return (
        <>
            <h3 className="text-xl font-semibold mb-4 text-text-dark">Sales by Region</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                    data={data}
                    layout="vertical"
                    margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#F8B9D4" />
                    <XAxis 
                        type="number" 
                        stroke="#3D2A42"
                        tickFormatter={(value) => new Intl.NumberFormat('en-IN', { notation: 'compact', compactDisplay: 'short' }).format(value as number)}
                    />
                    <YAxis 
                        type="category" 
                        dataKey="name" 
                        stroke="#3D2A42"
                        width={60}
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#FEEBF2', border: '1px solid #FAD0E2', borderRadius: '10px', color: '#3D2A42' }} 
                        labelStyle={{ color: '#3D2A42', fontWeight: 'bold' }}
                        formatter={(value) => [new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value as number), 'Sales']}
                    />
                    <Legend wrapperStyle={{ color: '#3D2A42' }} />
                    <Bar dataKey="value" name="Total Sales" fill="#C37ACD" barSize={20} />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
};

export default RegionBarChart;
