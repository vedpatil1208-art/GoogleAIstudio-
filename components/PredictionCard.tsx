import React from 'react';

interface PredictionCardProps {
    title: string;
    value: number;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ title, value }) => {
    const formattedValue = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(value);

    return (
        <div className="bg-barbie-pink-medium p-6 rounded-2xl shadow-lg flex flex-col justify-between hover:bg-barbie-pink-light transition-colors duration-300 border border-barbie-pink-light">
            <h3 className="text-lg font-semibold text-text-dark/80">{title}</h3>
            <p className="text-4xl font-bold text-text-dark mt-2">{formattedValue}</p>
        </div>
    );
};

export default PredictionCard;