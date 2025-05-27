"use client";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../loading";

const BuyCreditsPage = () => {
  const [{ isPending }, dispatch] = usePayPalScriptReducer();
  const [selected, setSelected] = useState({ credits: 50, price: 10.0 });
  const creditsPrice = [
    {
      credits: 50,
      price: 10.0,
    },
    {
      credits: 100,
      price: 18.0,
    },
    {
      credits: 250,
      price: 40.0,
    },
  ];
  const handleSuccess = async (details: any) => {
    console.log(details);
  };
  const handleError = (error: any) => {
    console.error("PayPal error:", error);
    toast.error(
      "An error occurred while processing your payment. Please try again."
    );
  };
  if (isPending) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col min-h-screen justify-center items-center container">
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="px-4 py-5 sm:px-6 text-center">
          <h3 className="text-2xl font-semibold leading-6 text-emerald-500">
            Buy Credits
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Purchase credits to use for various features.
          </p>
        </div>
        <div className="px-4 flex flex-col justify-between gap-8 py-5 sm:p-6">
          {creditsPrice.map((credit) => (
            <button
              className={`${
                credit.credits === selected.credits
                  ? "bg-emerald-500"
                  : "bg-blue-500"
              } px-5 py-3 rounded-md text-white font-semibold hover:bg-emerald-600 transition-colors cursor-pointer`}
              onClick={() => setSelected(credit)}
              key={credit.credits}
            >
              {credit.credits} Credits - ${credit.price}
            </button>
          ))}
        </div>
        <div className="px-4 py-5 sm:px-6 text-center">
          <PayPalButtons
            key={selected.credits}
            createOrder={(data, actions) => {
              const selectedPrice = selected.price.toFixed(2);
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    amount: {
                      value: selectedPrice,
                      currency_code: "USD",
                    },
                    custom_id: selected.credits.toString(),
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              const details = await actions?.order?.capture();
              handleSuccess(details);
            }}
            onError={handleError}
          />
        </div>
      </div>
    </div>
  );
};

export default BuyCreditsPage;
