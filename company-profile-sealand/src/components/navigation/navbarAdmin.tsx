"use client";

import { Menu, Bell, LogOut, Search } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { ModalConfirmation } from "../modals/modalConfirmation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { logout } from "@/api/auth";
import { set } from "zod";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const open = useUIStore((state) => state.open);
  const close = useUIStore((state) => state.close);
  const isModalLogout = useUIStore((state) => state.activeModal === "logout");

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      setIsLoading(false);
      close();
      router.push("/");
      router.refresh();
      toast.success("Logout berhasil!");
    } catch (error) {
      toast.error("Terjadi kesalahan saat logout");
    } finally {
      setIsLoading(false);
      close();
    }
  };

  return (
    <nav className="h-14 sm:h-16 bg-neutral-white border-b border-gray-200 flex items-center justify-between px-3 sm:px-6 gap-2 sm:gap-4 shadow-sm">
      {/* Left Section - Menu Button */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu size={20} className="text-gray-700" />
        </button>
      </div>

      {/* Center Section - Search */}
      <div className="hidden md:flex flex-1 max-w-md">
        <div className="w-full relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Cari artikel..."
            className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        <button className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
          <Bell size={18} className="text-primary sm:w-5 sm:h-5" />
        </button>
        <button className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors">
          <LogOut
            size={18}
            className="text-primary  sm:w-5 sm:h-5"
            onClick={() => open("logout")}
          />
        </button>
      </div>
      {isModalLogout && (
        <ModalConfirmation
          title="Logout"
          message="Apakah Anda yakin ingin logout?"
          onClose={close}
          isLoading={isLoading}
          onConfirm={() => {
            handleLogout();
          }}
        />
      )}
    </nav>
  );
}
