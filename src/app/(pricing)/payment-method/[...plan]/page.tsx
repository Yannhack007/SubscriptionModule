"use client";
import _features from "@/app/(pricing)/components/datas/features";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import PlanRecap from "../../components/PlanRecap";
import BillingAddress from "../../components/BillingAddress"; 
import PaymentMethod from "../../components/PaymentMethod";
import PromoComponent from "../../components/PromoComponent";
import Summary from "../../components/Summary";

const Page = ({ params }: { params: { plan: string[] } }) => {
  ;
  const profile = parseInt(params.plan[0]);
  const choice =(_features [profile])[params.plan[1]]
  const months = parseInt(params.plan[2]);
  

  function handleFailure() {

    alert("sectionfail")  }

  function handleSuccess() {
    const customMsg = "payment succeeded"
    alert(customMsg)
    //validate()
  }

  const handleVerify=()=>{
     
  }

  const payementDTO={
    "transaction_amount": 0,
    "transaction_currency": "XAF",
    "transaction_method": "MOBILE",
    "transaction_reference": "string",
    "payer_reference": "string",
    "payer_name": "string",
    "payer_phone_number": "string",
    "payer_lang": "string",
    "payer_email": "string",
    "service_reference": "string",
    "service_name": "string",
    "service_description": "string",
    "service_quantity": 0
  }

  const api_key=process.env.API_KEY
  
  useEffect(()=>{console.log(api_key);},[])

  const handlePay=async()=>{
    await axios.post('https://gateway.yowyob.com/payment-service/'+{api_key}+'/payin',payementDTO)
    .then((response)=>{
      if (response.data.status==="SUCCESS") {
        
      }else{
        console.log(response.data.message);
      }
    })
    .catch((error)=>{
      console.error(error);
      
    })
  }

  const verifyPay=async()=>{
    await axios.get('https://gateway.yowyob.com/payment-service/'+{api_key}+'/transactions/{transaction_code}/status')
  }


  return (
      <div className="py-[30px] text lg:py-[60px] bg-[var(--bg-2)] px-3 font-Inter">
        <div className="container">
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            <div className="col-span-12 lg:col-span-6">
              <div className="pb-lg-0">
                <PlanRecap params={params}/>
                <BillingAddress params={params}/>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6">
              <PaymentMethod params={params}/>
              <PromoComponent/>
              <Summary months={months}/>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Page;