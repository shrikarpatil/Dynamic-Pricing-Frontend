"use client";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Drawer } from "@mui/material";
import { useState } from "react";
import { DASHBOARD_PAGE, SIGNIN_PAGE } from "@/config/constants";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const HeaderSidebar = () => {
  const [sidebar, setSidebar] = useState<boolean>(false);
  const router = useRouter();
  const session = useSession();
  const drawerList = [
    {
      key: 0,
      label: "Dashboard",
      icon: (
        <p className="text-slate-400">
          <DashboardIcon fontSize="small" />
        </p>
      ),
      onClickAction: () => router.push(DASHBOARD_PAGE),
    },
    {
      key: 1,
      label: <p className="text-red-400">Sign Out</p>,
      icon: (
        <p className="text-red-400">
          <ExitToAppIcon fontSize="small" />
        </p>
      ),
      onClickAction: async () => {
        await signOut({ callbackUrl: SIGNIN_PAGE });
      },
    },
  ];
  return (
    <div className="h-screen bg-slate-100">
      <div className="flex bg-white shadow-lg h-1/14 justify-between items-center">
        <div>
          <div onClick={() => setSidebar(true)} className="px-4">
            <MenuOpenIcon />
            <span className="text-xl font-bold text-center text-blue-900 my-6 italic">
              Dynamic Pricing Engine
            </span>
          </div>
        </div>
        <p className="text-slate-400">
          {" "}
          <span className="text-slate-800">
            {" "}
            {` ${session?.data?.user?.firstname}
          ${session?.data?.user?.lastname}`}
          </span>
          <AccountCircleRoundedIcon fontSize="large" className="mx-2" />
        </p>
      </div>
      <Drawer
        open={sidebar}
        onClose={() => setSidebar(false)}
        variant="temporary"
        slotProps={{
          paper: {
            className: "w-70",
          },
        }}
      >
        <div>
          <h2 className="text-xl font-bold text-center text-blue-900 my-6 italic">
            Dynamic Pricing Engine
          </h2>
          <hr className="text-slate-400 mx-6 mb-2" />
        </div>
        {drawerList.map((item: any) => {
          return (
            <div
              className="flex gap-2 text-left rounded-lg cursor-default p-2 mx-4 hover:bg-slate-200"
              key={item.key}
              onClick={item.onClickAction}
            >
              {item.icon}
              {item.label}
            </div>
          );
        })}
      </Drawer>
    </div>
  );
};
export default HeaderSidebar;
