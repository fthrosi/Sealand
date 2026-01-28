'use client';

import { useUIStore } from "@/store/useUIStore";
import { useDataStore } from "@/store/useDataStore";

interface ModalProps {
  children?: React.ReactNode;
  title?: string;
}

export default function Modal({ children, title }: ModalProps) {
  const onClose = useUIStore((state) => state.close);
  const vesselTypes = useDataStore((state) => state.vesselTypes);
    console.log("Vessel Types in Modal:", vesselTypes);
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 h-full z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container - Responsive */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div 
          className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()} // ✅ Prevent close when click inside
        >
          {/* Header - Fixed */}
          <div className="flex items-center justify-between border-b border-slate-200 p-6 shrink-0">
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="p-6 overflow-y-auto flex-1">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
