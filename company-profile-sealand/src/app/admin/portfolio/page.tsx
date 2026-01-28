"use client";

import { useState, useEffect, use } from "react";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import PortfolioForm from "@/components/modals/portfolio/modalAddPortfolio";
import PortfolioFormEdit from "@/components/modals/portfolio/modalEditPortfolio";
import { useDataStore } from "@/store/useDataStore";
import { PortfolioOutput } from "@/types/portfolio.types";
import { ModalConfirmation } from "@/components/modals/modalConfirmation";
import { toast } from "sonner";
import loadingAnimation from "@/animations/loading.json";
import Lottie from "lottie-react";
import { getPortfolios } from "@/api/portfolio";
import { deletePortfolio } from "@/api/portfolio";

export default function PortfolioManagement() {
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioOutput>();
  const open = useUIStore((state) => state.open);
  const [loading, setLoading] = useState(false);
  const isModalAdd = useUIStore((state) => state.activeModal === "addPortfolio");
  const isModalEdit = useUIStore(
    (state) => state.activeModal === "editPortfolio"
  );
  const close = useUIStore((state) => state.close);
  const isModalDelete = useUIStore(
    (state) => state.activeModal === "deletePortfolio"
  );
  const [portfolios, setPortfolios] = useState<PortfolioOutput[]>([]);

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
        const response = await getPortfolios();
        setPortfolios(response.data.data);
        setLoading(false);
    } catch (error) {
        setLoading(false);
        toast.error("Terjadi kesalahan saat memuat data portfolio");
    }
    };

  useEffect(() => {
    fetchPortfolio();
  }, []);
  const handleEditClick = (portfolio: PortfolioOutput) => {
    setSelectedPortfolio(portfolio);
    open("editPortfolio");
  };
  const handleDeleteClick = (portfolio: PortfolioOutput) => {
    setSelectedPortfolio(portfolio);
    open("deletePortfolio");
  };
  const handleConfirmDelete = async () => {
    try {
      const response = await deletePortfolio(Number(selectedPortfolio?.id));
        fetchPortfolio();
        close();
        toast.success("Portfolio berhasil dihapus");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus portfolio");
    }
  };
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Manajemen Portfolio
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Kelola semua portfolio Anda di sini
          </p>
        </div>
        <button
          onClick={() => open("addPortfolio")}
          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center font-medium transition-colors w-full sm:w-auto"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Buat Portfolio Baru</span>
          <span className="sm:hidden">Buat</span>
        </button>
      </div>

      {/* Portfolio Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max sm:min-w-0">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Gambar
                </th>
                <th className="hidden sm:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Nama Portfolio
                </th>
                <th className="hidden md:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Value
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Deskripsi
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
              ) : portfolios.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <p className="text-slate-600 text-lg">No portfolios yet</p>
                    <p className="text-slate-500 text-sm mt-1">
                      Click "Buat Portfolio Baru" to add a portfolio
                    </p>
                  </td>
                </tr>
              ) : (
                portfolios.map((portfolio) => (
                  <tr
                    key={portfolio.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/${portfolio.img_url}`}
                            alt={portfolio.name}
                            className="size-20 object-cover rounded-lg"
                        />
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 text-sm text-gray-600">
                      {portfolio.name}
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
                      {portfolio.value}
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
                      {portfolio.description}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center justify-center gap-1 sm:gap-2">
                        <button
                          onClick={() => handleEditClick(portfolio)}
                          className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Edit2
                            size={14}
                            className="text-gray-600 sm:w-4 sm:h-4"
                          />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(portfolio)}
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

      {/* Modal for Adding Portfolio */}
      {isModalAdd && <PortfolioForm onSuccess={fetchPortfolio} />}
      {isModalEdit && selectedPortfolio && (
        <PortfolioFormEdit onSuccess={fetchPortfolio} portfolio={selectedPortfolio} />
      )}
      {/* Modal for Deleting Portfolio */}
      {isModalDelete && selectedPortfolio && (
        <ModalConfirmation
          title="Hapus Portfolio"
          message={`Apakah Anda yakin ingin menghapus portfolio "${selectedPortfolio.name}"? Tindakan ini tidak dapat dibatalkan.`}
          onConfirm={handleConfirmDelete}
          onClose={() => close()}
        />
      )}
    </div>
  );
}
