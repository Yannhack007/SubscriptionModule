
import React, { useState, useEffect } from 'react';
import _features from "@/app/(pricing)/components/datas/features";
import { useRouter } from "next/navigation";
import { currencyOptions } from '@/data/Structure';
import { useCurrency } from '../context/CurrencyContext';

interface PlanRecapData {
    params: {
        plan: string[];
    }  
}

const PlanRecap = ({ params }: PlanRecapData) => {
    const profile = parseInt(params.plan[0]);
    const choice = (_features[profile])[params.plan[1]];
    const months = parseInt(params.plan[2]);

    const myfeatures = choice.description;
    const date = new Date(Date.now());
    const subtotal = choice.prix * months;
    const expiryDate = new Date();

    expiryDate.setMonth(date.getMonth() + months);
    const router = useRouter();
    const { 
        currency, 
        setCurrency, 
        convertedAmount, 
        setConvertedAmount, 
        convertAmount,
        loading,
        error 
    } = useCurrency();

    const handleGoBack = () => {
        router.back();
    };

    const total_payable_amount = subtotal ;

    useEffect(() => {
        const updateConvertedAmount = async () => {
            const converted = await convertAmount(total_payable_amount);
            setConvertedAmount(converted);
        };

        updateConvertedAmount();
    }, [currency, total_payable_amount]);

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCurrency = event.target.value;
        setCurrency(selectedCurrency);
    };

    return (
        <div className="bg-white rounded-2xl p-3 sm:p-4 lg:p-6 mb-6">
            <div className='mb-10 flex items-center'>
                <i className="text-xl las la-arrow-left text-primary mr-2"></i>
                <button onClick={handleGoBack} className="text-primary hover:underline">
                    Retour
                </button>
            </div>
            <div className="flex items-center justify-between gap-5 mb-1">
                <span className="mb-0 text font-bold">{choice.title} Plan</span>
                <div className="flex items-center">
                    {loading ? (
                        <span className="x-4 px-4 text font-semibold">Chargement...</span>
                    ) : (
                        <span className="x-4 px-4 text font-semibold">
                            {convertedAmount.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })} {currency} / {months === 1 ? "Month" : months === 3 ? 'Quarter' : 'Year'}
                        </span>
                    )}
                    <select 
                        value={currency} 
                        onChange={handleCurrencyChange} 
                        className="ml-2 border rounded-md p-1 max-w-[100px]"
                        disabled={loading}
                    >
                        {currencyOptions.map((option) => (
                            <option key={option.value} value={option.value === 'FCFA' ? 'XOF' : option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {error && (
                <div className="text-red-600 text-sm mt-2">
                    {error}
                </div>
            )}
            <div className="grid grid-cols-12 gap-4 md:gap-3 mb-8">
                <div className="col-span-12 md:col-span-12">
                    <div className="border border-dashed my-2"></div>
                </div>

                {myfeatures.map((valeur: string, index: number) => (
                    <div key={index} className="col-span-12 md:col-span-12">
                        <div className="border border-neutral-40 rounded-2xl bg-[var(--bg-1)] py-1 px-4 px-xxl-8">
                            <div className="flex items-center justify-between gap-3 mb-1">
                                <span className="clr-neutral-400 inline-block text">
                                    {valeur}
                                </span>
                                <i className="text-xl las la-check text-primary"></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlanRecap;