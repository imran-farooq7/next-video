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
  return <div>BuyCreditsPage</div>;
};

export default BuyCreditsPage;
