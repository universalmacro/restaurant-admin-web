import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import BillTables from "views/admin/bill";
import OrderTables from "views/admin/order";
import SettingsTables from "views/admin/settings";


import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

const routes = [
  {
    name: "訂單管理",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "order-management",
    component: <OrderTables />,
  },
  {
    name: "餐廳設置",
    layout: "/admin",
    path: "settings",
    icon: <MdHome className="h-6 w-6" />,
    component: <SettingsTables />,
  },
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "訂單管理React-table",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "bill-management",
    component: <BillTables />,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
];
export default routes;
