import { Route, Routes } from "react-router-dom";
import Purchase from "./index.jsx";
import PurchaseList from "./PurchaseList";
import AddPurchase from "./AddPurchase";
import React from "react";

const PurchaseLayout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Purchase />}>
          <Route index element={<PurchaseList />} />
          <Route path="purchaselist-purchase" element={<PurchaseList />} />
          <Route path="addpurchase-purchase" element={<AddPurchase />} />
        </Route>
      </Routes>
    </>
  );
};

export default PurchaseLayout;
