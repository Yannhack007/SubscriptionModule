import Link from 'next/link'
import React, { useState } from 'react'
import { useCurrency } from '../context/CurrencyContext';

interface SummaryProps{
    months:number
}

const Summary = ({months}:SummaryProps) => {
    const date = new Date(Date.now());
    const subscription_date = date.toLocaleString();
    const [paymentLaunched,launchPayment] = useState(false);
    const expiryDate = new Date();
    expiryDate.setMonth(date.getMonth() + months);
    const [promo_discount,setPromo_discount]=useState(0);

    const { 
            currency, 
            convertedAmount, 
        } = useCurrency();

    
  const total_payable_amount=(convertedAmount-(convertedAmount*promo_discount)/100)

        
  return (
    <div className="bg-white rounded-2xl p-3 mb-6 sm:p-4 lg:p-6 border">
                <h4 className="mb-0 font-semibold">Order summary</h4>
                <div className="border border-dashed my-2"></div>
                <ul className="gap-4">
                  <li className="flex items-center justify-between flex-wrap">
                    <p className="mb-0">Subscription date</p>
                    <p className="mb-0 font-medium">{subscription_date}</p>
                  </li>

                  <li className="flex items-center justify-between flex-wrap">
                    <p className="mb-0">Renewal date</p>
                    <p className="mb-0 font-medium">
                      {expiryDate.toLocaleString()}
                    </p>
                  </li>
                  <div className="border border-dashed my-2"></div>

                  <li className="flex items-center justify-between flex-wrap">
                    <p className="mb-0">Subtotal</p>
                    <p className="mb-0 font-medium">
                        {convertedAmount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })} {currency}
                    </p>
                  </li>
                  <div className="border border-dashed my-3"></div>
                  <li className="flex items-center justify-between flex-wrap">
                    <p className="mb-0">Promo Code</p>
                    <p className="mb-0 font-medium">{promo_discount} %</p>
                  </li>
                </ul>
                <div className="border border-dashed my-2"></div>
                <div className="flex items-center justify-between flex-wrap mb-6">
                  <p className="mb-0">Payable Now</p>
                  <p className="mb-0 font-medium">{total_payable_amount} FCFA</p>
                </div>
                <Link
                    href="" legacyBehavior
                >
                  <a
                      className={`link inline-flex items-center gap-2 py-3 px-6 rounded-lg  text-white :bg-primary-400 hover:text-white font-medium w-full justify-center ${paymentLaunched? 'bg-neutral-700':"bg-primary"}`}
                      
                      >
                    <span className="inline-block">  {paymentLaunched? "payment on process ... waiting for response": 'Launch Payment'} </span>
                  </a>

                </Link>
              </div>
  )
}

export default Summary