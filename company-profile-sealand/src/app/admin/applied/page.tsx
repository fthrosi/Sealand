"use client";

import { useState, useEffect } from "react";
import { Trash2, Download } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { AppliedOutput } from "@/types/applied.types";
import { ModalConfirmation } from "@/components/modals/modalConfirmation";
import { toast } from "sonner";
import loadingAnimation from "@/animations/loading.json";
import Lottie from "lottie-react";
import { deleteApplied, getApplieds } from "@/api/applied";

export default function AppliedManagement() {
  const [selectedApplied, setSelectedApplied] = useState<AppliedOutput>();
  const open = useUIStore((state) => state.open);
  const [loading, setLoading] = useState(false);
  const close = useUIStore((state) => state.close);
  const isModalDelete = useUIStore(
    (state) => state.activeModal === "deleteApplied"
  );
  const [applieds, setApplieds] = useState<AppliedOutput[]>([]);
  const fetchApplied = async () => {
    try {
      setLoading(true);
      const response = await getApplieds();
      console.log(response.data.data)
      setApplieds(response.data.data);
    } catch (error) {
      toast.error("Terjadi kesalahan saat memuat data applied");
    }
    finally {
      setLoading(false);
    } 
  };
  useEffect(() => {
    fetchApplied();
  }, []);
  
  const handleDeleteClick = (applied: AppliedOutput) => {
    setSelectedApplied(applied);
    open("deleteApplied");
  };
  const handleConfirmDelete = async () => {
    try {
      const response = await deleteApplied(Number(selectedApplied?.id));
        fetchApplied();
        close();
        toast.success("Aplicant berhasil dihapus");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus aplicant");
    }
  };
  const downloadCV = (cvFileName: string) => {
    const cvUrl = `${process.env.NEXT_PUBLIC_API_URL}/applied/file/cv/${cvFileName}`;
    window.open(cvUrl, "_blank");
  }
  const downloadImage = (imgFileName: string) => {
    const imgUrl = `${process.env.NEXT_PUBLIC_API_URL}/applied/file/foto/download/${imgFileName}`;
    window.open(imgUrl, "_blank");
  }
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Manajemen Applied Job
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Kelola semua applied job Anda di sini
          </p>
        </div>
      </div>

      {/* Team Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max sm:min-w-0">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Name Aplicant
                </th>
                <th className="hidden sm:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th className="hidden md:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Number Telp
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Aplicant Picture
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Aplicant CV
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Job
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Applied At
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-gray-900">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12">
                    <div className="flex justify-center">
                      <Lottie
                        animationData={loadingAnimation}
                        loop={true}
                        className="w-24 h-24"
                      />
                    </div>
                  </td>
                </tr>
              ) : applieds.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12">
                    <p className="text-slate-600 text-lg">No Applicants yet</p>
                    <p className="text-slate-500 text-sm mt-1">
                      There are no applicants available at the moment.
                    </p>
                  </td>
                </tr>
              ) : (
                applieds.map((applied) => (
                  <tr
                    key={applied.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                       {applied.name}
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 text-sm text-gray-600">
                      {applied.email}
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
                      {applied.no_telp}
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
                       <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/applied/file/foto/${applied.img_url}`}
                            alt={applied.name}
                            className="size-20 object-cover rounded-lg"
                            onClick={() => downloadImage(applied.img_url)}
                        />
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
                       <button
                          onClick={() => downloadCV(applied.cv)}
                          className="flex items-center justify-center rounded-lg bg-green-700 hover:bg-green-800 transition-colors px-3 py-2"
                        >
                          <Download
                            size={14}
                            className="text-white sm:w-4 sm:h-4"
                          />
                          <span className="text-white text-xs sm:text-sm ml-1">Download CV</span>
                        </button>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 text-sm text-gray-600">
                      {applied.job.title} - {applied.job.vessel_type.name} ({applied.job.route})
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 text-sm text-gray-600">
                      {applied.applied_at.toString().split("T")[0]}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center justify-center gap-1 sm:gap-2">
                        <button
                          onClick={() => handleDeleteClick(applied)}
                          className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <Trash2
                            size={14}
                            className="text-red-600 sm:w-4 sm:h-4"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalDelete && selectedApplied && (
        <ModalConfirmation
          title="Hapus Team"
          message={`Apakah Anda yakin ingin menghapus team "${selectedApplied.name}"? Tindakan ini tidak dapat dibatalkan.`}
          onConfirm={handleConfirmDelete}
          onClose={() => close()}
        />
      )}
    </div>
  );
}
