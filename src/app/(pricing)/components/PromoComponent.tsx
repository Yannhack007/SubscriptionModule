import React, { ChangeEvent, useState } from 'react'

const PromoComponent = () => {
    const promo=20;
    const [promocode,setPromocode]=useState("");
    const [message,setMessage]=useState("")
  
    const handlePromoCode=(e:ChangeEvent<HTMLInputElement>)=>{
      setPromocode(e.target.value)
    }

  
    const handleApply=async()=>{
/*await axios.get("http://localhost:5000/get_promo")
            .then(async(response)=>{
              const results=response.data
              console.log(results);
    
              const res=results.find((result:any)=>result.code===promocode)
              console.log(res);
    
              if (res) {
                // setPromo_discount(res.discount)
                const newstate={code: res.code, validity: res.validity, discount: res.discount, status: 'inactive', startDate:Date.now()}
                await axios.post("http://localhost:5000/delete_promo",res)
                    .then((response)=>{
                      console.log(response);
                    })
                    .catch((error)=>{
                      console.log(error);
                    })
    
                await axios.post("http://localhost:5000/save_promo",newstate)
                    .then((response)=>{
                      console.log(response);
                    })
                    .catch((error)=>{
                      console.log(error);
    
                    })
              }else{
                if (promocode ==="") {
                  setMessage("Enter a code")
                } else {
                  setMessage("This promo code is already used or not available")
                }
    
                console.log("don't exist");
              }
            })
            .catch((error)=>{
              console.log(error);
    
            })*/
      }
  return (
    <div className="bg-white rounded-2xl text p-3 sm:p-4 lg:p-6 mb-6">
    <h4 className="mb-3 font-semibold">
      {" "}
      Enter Promo Code{" "}
    </h4>
    <p className="italic text-[red]">{message}</p>
    <div className="p-2 rounded-full border border-neutral-40 bg-[var(--bg-2)] mb-4">
      <form action="#" className="flex items-center">
        <input
            value={promocode}
            onChange={handlePromoCode}
            type="text"
            placeholder="Promo Code"
            className="w-full border-0 bg-transparent text-[var(--neutral-700)] px-3 py-1 ::placeholder-neutral-600 focus:outline-none"
        />
        <button
            type="button"
            className="grid place-content-center px-3 py-2 rounded-full bg-primary text-white border-0"
            onClick={handleApply}
        >
          Apply
        </button>
      </form>
    </div>
    <span className="block text-[var(--neutral-700)]">
    {promo} % Off Discount
  </span>
  </div>
  )
}

export default PromoComponent