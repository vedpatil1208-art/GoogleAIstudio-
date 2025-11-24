
import React, { useState, useEffect, useCallback } from 'react';
import type { CombinedOrder, Prediction, DailySales, RegionSales } from '../types';
import { getCombinedSalesData, calculatePredictions, getDailySalesForChart, getRegionSalesForChart, getAIInsights } from '../services/salesService';
import PredictionCard from './PredictionCard';
import SalesChart from './SalesChart';
import SalesDataTable from './SalesDataTable';
import RegionBarChart from './RegionBarChart';
import { SparklesIcon, DocumentChartBarIcon } from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
    const [salesData, setSalesData] = useState<CombinedOrder[]>([]);
    const [predictions, setPredictions] = useState<Prediction>({ monthly: 0, quarterly: 0 });
    const [dailySales, setDailySales] = useState<DailySales[]>([]);
    const [regionSales, setRegionSales] = useState<RegionSales[]>([]);
    const [aiInsights, setAiInsights] = useState<string>('');
    const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState('dashboard');

    useEffect(() => {
        const data = getCombinedSalesData();
        setSalesData(data);
        setPredictions(calculatePredictions(data));
        setDailySales(getDailySalesForChart(data));
        setRegionSales(getRegionSalesForChart(data));
    }, []);

    const handleGenerateInsights = useCallback(async () => {
        setIsLoadingAI(true);
        setAiInsights('');
        const insights = await getAIInsights(salesData);
        setAiInsights(insights);
        setIsLoadingAI(false);
    }, [salesData]);

    const tabStyles = {
        inactive: 'border-transparent text-text-dark/70 hover:text-text-dark hover:border-barbie-pink-medium',
        active: 'border-barbie-accent-magenta text-barbie-accent-magenta font-bold',
    };

    const getTabClassName = (tabName: string) => `whitespace-nowrap py-4 px-4 border-b-2 text-sm cursor-pointer transition-colors duration-200 ${activeTab === tabName ? tabStyles.active : tabStyles.inactive}`;


    return (
        <div className="container mx-auto">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-text-dark flex items-center gap-3 [text-shadow:0_0_8px_theme(colors.barbie-accent-magenta)]">
                    <DocumentChartBarIcon className="h-10 w-10 text-barbie-accent-purple" />
                    Sales Prediction Dashboard
                </h1>
                <p className="text-text-dark/80 mt-2">Forecasting future sales based on historical data.</p>
            </header>

            {/* Tabs Navigation */}
            <div className="mb-6 border-b border-barbie-pink-medium">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button onClick={() => setActiveTab('dashboard')} className={getTabClassName('dashboard')}>
                        Dashboard Overview
                    </button>
                    <button onClick={() => setActiveTab('data')} className={getTabClassName('data')}>
                        Detailed Sales Data
                    </button>
                </nav>
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 'dashboard' && (
                    <div className="animate-fade-in">
                        {/* Prediction Cards & AI Insights */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            <PredictionCard title="Next Month's Forecast" value={predictions.monthly} />
                            <PredictionCard title="Next Quarter's Forecast" value={predictions.quarterly} />
                            <div className="md:col-span-2 p-6 bg-barbie-pink-medium rounded-2xl shadow-lg flex flex-col justify-center items-start border border-barbie-pink-light">
                                <h3 className="text-lg font-semibold text-text-dark mb-2 flex items-center gap-2">
                                    <SparklesIcon className="h-6 w-6 text-barbie-accent-magenta" />
                                    AI-Powered Insights
                                </h3>
                                {aiInsights ? (
                                    <p className="text-text-dark text-sm whitespace-pre-wrap">{aiInsights}</p>
                                ) : (
                                    <p className="text-text-dark/80 text-sm">Click the button to generate an analysis of the current sales data using Gemini.</p>
                                )}
                                <button
                                    onClick={handleGenerateInsights}
                                    disabled={isLoadingAI}
                                    className="mt-4 bg-barbie-accent-magenta hover:bg-barbie-accent-magenta/80 disabled:bg-barbie-pink-light text-text-light font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center w-full sm:w-auto shadow-md"
                                >
                                    {isLoadingAI ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-text-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Generating...
                                        </>
                                    ) : 'Generate AI Insights'}
                                </button>
                            </div>
                        </div>

                        {/* Charts Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            {/* Daily Sales Chart */}
                            <div className="bg-barbie-pink-medium p-6 rounded-2xl shadow-lg border border-barbie-pink-light">
                                <SalesChart data={dailySales} />
                            </div>
                            
                            {/* Region Chart */}
                            <div className="bg-barbie-pink-medium p-6 rounded-2xl shadow-lg border border-barbie-pink-light">
                                <RegionBarChart data={regionSales} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'data' && (
                     <div className="animate-fade-in bg-barbie-pink-medium p-6 rounded-2xl shadow-lg border border-barbie-pink-light">
                        <SalesDataTable data={salesData} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
