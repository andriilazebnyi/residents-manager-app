"use client";

import { DarkThemeToggle, Sidebar as FlowbiteSidebar } from "flowbite-react";
import { usePathname } from "next/navigation";
import { HiOutlineUserGroup, HiOutlineClipboardList } from "react-icons/hi";

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <FlowbiteSidebar aria-label="Default sidebar example">
      <FlowbiteSidebar.Items>
        <FlowbiteSidebar.ItemGroup>
          <FlowbiteSidebar.Item
            href="/residents"
            active={pathname.includes("residents")}
            icon={HiOutlineUserGroup}
          >
            Residents
          </FlowbiteSidebar.Item>
          <FlowbiteSidebar.Item
            href="/programs"
            active={pathname.includes("programs")}
            icon={HiOutlineClipboardList}
          >
            Programs
          </FlowbiteSidebar.Item>
        </FlowbiteSidebar.ItemGroup>
        <FlowbiteSidebar.ItemGroup>
          <div className="flex items-center justify-between p-2 dark:text-white">
            Switch theme <DarkThemeToggle />
          </div>
        </FlowbiteSidebar.ItemGroup>
      </FlowbiteSidebar.Items>
    </FlowbiteSidebar>
  );
};
