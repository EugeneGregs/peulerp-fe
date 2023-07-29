import {Routes, Route} from "react-router-dom";
import React from "react";
import InventoryIndex from ".";
import InvertryList from "./inventoryList";
import ManageInventory from "./manageInventory";

const InventoryLayout = () => {
    return (
       <Routes>
              <Route path="/" element={<InventoryIndex />}>
                    <Route index element={<InvertryList />} />
                    <Route path="inventorylist" element={<InvertryList />} />
                    <Route path="addinventory" element={<ManageInventory />} />
              </Route>
       </Routes>
    )
}

export default InventoryLayout;