"use client";
import PaySwitch from "@/components/PaySwitch";
import SubHeadingBtn from "@/components/SubHeadingBtn";
import _features from "@/components/datas/features";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Plan } from "@/app/(pricing)/admin/plan/page";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoaderOverlay from "@/components/LoaderOverlay";
import EmptyJumbotron from "@/components/EmptyJumbotron";

const Page = () => {
    const [activeButton, setActiveButton] = useState(1);
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const [plans, setPlans] = useState<Plan[]>([
    ]);

    const filteredPlans = plans.filter(plan => plan.duration === activeButton);


    const handleButtonClick = (index: number) => {
        setActiveButton(index);
    };

    const fetchPlans = async () => {
        try {
            setLoading(true)
            await axios.get(process.env.SERVER_URL + '/plans')
                .then((response) => {
                    setPlans(response.data);
                })
        } catch (error) {
            console.error(error);

        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchPlans();
    }, [])

    const handleClick = (plan: Plan) => {
        const query = new URLSearchParams({
          data: JSON.stringify(plan)
        }).toString();
        router.push(`/payment-method?${query}`);
      };
      


    return (
        <main>
            <div className="py-[10px] lg:py-[25px] text bg-[var(--bg-2)] overflow-hidden px-3">
                {loading ? (<LoaderOverlay />) : (
                    <div>
                        {plans.length === 0 ? (<EmptyJumbotron />) : (
                            <div>
                                <div className="max-w-[570px] mx-auto flex flex-col items-center text-center">
                                    <SubHeadingBtn
                                        text="Pricing Plan"
                                        classes="bg-[var(--primary-light)]"
                                    />
                                    <h2 className="h2 text">Choose Our Pricing Plan</h2>
                                    <p className="text-neutral-600 pb-2">
                                        Here you have our differents pricing plan choose the option that
                                        fits you the most... Feel free and explore the terms
                                    </p>
                                </div>
                                <div className="mb-2 container row col-span-12">
                                    <div className="flex flex-wrap items-center justify-center gap-2">
                                        <div className="flex bg-[var(--primary-light)] rounded">
                                            <PaySwitch
                                                label="monthly"
                                                onClick={() => handleButtonClick(1)}
                                                isActive={activeButton === 1}
                                            />
                                            <PaySwitch
                                                label="Quarterly"
                                                onClick={() => handleButtonClick(3)}
                                                isActive={activeButton === 3}
                                            />

                                            <PaySwitch
                                                label="annually"
                                                onClick={() => handleButtonClick(12)}
                                                isActive={activeButton === 12}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="container">
                                    <div className="grid grid-cols-12 g-3 md:gap-0 overflow-hidden">
                                        {filteredPlans.map(plan => (
                                            <div className="col-span-12 md:col-span-6 lg:col-span-4 mx-3 h-full" key={plan.planId}>
                                                <div className="bg-white py-2 px-6 h-full">
                                                    <div className="text-center">
                                                        <p className="mb-0 font-medium text-primary">
                                                            {plan.category}
                                                        </p>
                                                        <div className="border border-dashed mt-2 mb-1"></div>
                                                        <h1 className="h2 clr-primary-400 mb-2 text">
                                                            {" "}
                                                            {(plan.amount)} FCFA / {activeButton} month{" "}
                                                        </h1>
                                                        <p className="m-1">{plan.content}</p>
                                                        <div className="border border-dashed mt-1 mb-2"></div>
                                                        <ul className="flex flex-col gap-4 max-text-30 mx-auto mb-3">
                                                            {plan.description.map((description, key) => (
                                                                <li className="flex items-center text-2xl gap-2" key=''>
                                                                    <i className="las la-check-circle text-primary"></i>
                                                                    <p className="mb-0 text text-start">{description}</p>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        <button onClick={() => { handleClick(plan) }} className="w-full rounded-lg btn-outline transition-colors duration-500 bg-primary text-white hover:bg-[#575fa0]  justify-center  font-semibold"
                                                        >
                                                            Choose Plan
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                )}

            </div>
        </main>
    );
};

export default Page;