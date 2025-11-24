import React, { useState, useCallback } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Sector } from 'recharts';
import type { CategorySales } from '../types';

interface CategoryPieChartProps {
    data: CategorySales[];
}

// Recharts data prop expects an index signature.
interface ChartData {
    name: string;
    value: number;
    [key: string]: any;
}

const COLORS = ['#E75480', '#C37ACD', '#F49AC2', '#DE3163', '#FFA6C9', '#D8BFD8'];

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 4} // Pop out effect
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={4}
      />
    </g>
  );
};

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ data }) => {
    // FIX: Use `undefined` instead of `null` for the state to align with the optional prop type.
    const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
    
    const chartData: ChartData[] = data;
    const totalValue = chartData.reduce((sum, entry) => sum + entry.value, 0);

    const onPieEnter = useCallback((_: any, index: number) => {
        setActiveIndex(index);
    }, []);
    
    const onPieLeave = useCallback(() => {
        // FIX: Set state to `undefined` on leave.
        setActiveIndex(undefined);
    }, []);

    // FIX: Check against `undefined` to get the active data.
    const activeData = activeIndex !== undefined ? chartData[activeIndex] : null;

    return (
        <>
            <h3 className="text-xl font-semibold mb-4 text-text-dark">Sales by Category</h3>
            <div className="w-full h-[300px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            // FIX: Pass the state directly. `number | undefined` is compatible with the prop type.
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={110}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            onMouseEnter={onPieEnter}
                            onMouseLeave={onPieLeave}
                            paddingAngle={2}
                            label={false}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#FEEBF2', border: '1px solid #FAD0E2', borderRadius: '10px', color: '#3D2A42' }} 
                            labelStyle={{ color: '#3D2A42', fontWeight: 'bold' }}
                            formatter={(value: number, name: string) => [new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value as number), name]}
                        />
                        <Legend wrapperStyle={{ color: '#3D2A42', paddingTop: '20px' }} />
                    </PieChart>
                </ResponsiveContainer>
                <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center"
                >
                    {activeData ? (
                        <div className="animate-fade-in">
                            <p className="text-sm font-semibold text-text-dark/80">{activeData.name}</p>
                            <p className="text-2xl font-bold text-text-dark">
                                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(activeData.value)}
                            </p>
                            <p className="text-xs text-text-dark/70">
                                {totalValue > 0 ? `${((activeData.value / totalValue) * 100).toFixed(1)}% of Total` : '0% of Total'}
                            </p>
                        </div>
                    ) : (
                        <div className="animate-fade-in">
                             <p className="text-sm font-semibold text-text-dark/80">Total Sales</p>
                             <p className="text-2xl font-bold text-text-dark">
                                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalValue)}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CategoryPieChart;