
import React, { useMemo } from 'react';
import type { Expense } from '../types';
import { ExpenseCategory } from '../types';
import { CATEGORY_COLORS } from '../constants';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CategoryChartProps {
  expenses: Expense[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-card p-2 border border-gray-600 rounded-md shadow-lg">
        <p className="label text-text-primary">{`${payload[0].name} : Rs.${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

const CategoryChart: React.FC<CategoryChartProps> = ({ expenses }) => {
  const chartData = useMemo(() => {
    if (!expenses || expenses.length === 0) return [];
    
    const dataMap = new Map<ExpenseCategory, number>();
    
    expenses.forEach(expense => {
      const currentTotal = dataMap.get(expense.category) || 0;
      dataMap.set(expense.category, currentTotal + expense.amount);
    });

    return Array.from(dataMap, ([name, value]) => ({ name, value }));
  }, [expenses]);

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-center text-text-tertiary">
        <p>No data available to display chart.</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name as ExpenseCategory]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{color: '#d1d5db'}} />
            </PieChart>
        </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
