
import { orders, statuses } from './salesData';
import type { CombinedOrder, Prediction, DailySales, RegionSales } from '../types';
import { GoogleGenAI } from "@google/genai";

export const getCombinedSalesData = (): CombinedOrder[] => {
  return orders.map((order, index) => ({
    ...order,
    ...statuses[index],
  }));
};

export const calculatePredictions = (data: CombinedOrder[]): Prediction => {
  const filteredData = data.filter(d => d.status === 'Delivered');
  if (filteredData.length === 0) {
    return { monthly: 0, quarterly: 0 };
  }

  const totalSales = filteredData.reduce((acc, order) => acc + order.totalAmount, 0);
  
  const uniqueDays = new Set(filteredData.map(order => order.date)).size;
  
  const averageDailySales = totalSales / uniqueDays;

  return {
    monthly: averageDailySales * 30,
    quarterly: averageDailySales * 90,
  };
};

export const getDailySalesForChart = (data: CombinedOrder[]): DailySales[] => {
    const filteredData = data.filter(d => d.status === 'Delivered');
    const dailySales: { [key: string]: number } = {};

    filteredData.forEach(order => {
        if (dailySales[order.date]) {
            dailySales[order.date] += order.totalAmount;
        } else {
            dailySales[order.date] = order.totalAmount;
        }
    });

    return Object.keys(dailySales).map(date => ({
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        totalSales: dailySales[date],
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};


export const getRegionSalesForChart = (data: CombinedOrder[]): RegionSales[] => {
    const filteredData = data.filter(d => d.status === 'Delivered');
    const regionSales: { [key: string]: number } = {};

    filteredData.forEach(order => {
        if (regionSales[order.region]) {
            regionSales[order.region] += order.totalAmount;
        } else {
            regionSales[order.region] = order.totalAmount;
        }
    });

    return Object.keys(regionSales).map(region => ({
        name: region,
        value: regionSales[region],
    })).sort((a, b) => b.value - a.value);
};


export const getAIInsights = async (data: CombinedOrder[]): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    
    const dataSummary = data.filter(d => d.status === 'Delivered').map(d => ({
        date: d.date,
        category: d.category,
        totalAmount: d.totalAmount,
        region: d.region,
    }));
    
    const prompt = `
      You are a senior sales analyst. Based on the following sales data (in JSON format), provide a concise analysis of sales performance.
      Focus on:
      1.  Overall sales trend.
      2.  Top-performing categories and regions.
      3.  Any potential insights or recommendations for the sales team.
      Keep the analysis professional and brief (under 150 words).

      Data:
      ${JSON.stringify(dataSummary, null, 2)}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    if (error instanceof Error) {
        return `An error occurred while generating AI insights: ${error.message}. Please ensure your Gemini API key is configured correctly.`;
    }
    return "An unknown error occurred while generating AI insights.";
  }
};
