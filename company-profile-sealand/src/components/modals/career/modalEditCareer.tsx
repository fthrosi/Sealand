"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CareerSchema, type CareerType } from "@/schema/careerSchema";
import { useDataStore } from "@/store/useDataStore";
import { toast } from "sonner";
import { useUIStore } from "@/store/useUIStore";
import { CareerOutput } from "@/types/career.type";
import Modal from "../modal";
import { updateCareer } from "@/api/career";

interface CareerFormEditProps {
  onSuccess: () => void;
  career: CareerOutput;
}
export default function CareerFormEdit({
  onSuccess,
  career,
}: CareerFormEditProps) {
  const vesselTypes = useDataStore((state) => state.vesselTypes);
  const close = useUIStore((state) => state.close);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CareerType>({
    resolver: zodResolver(CareerSchema),
    defaultValues: {
      title: career.title,
      level: career.level,
      type_id: career.vessel_type.id,
      times_contract: career.times_contract,
      route: career.route,
      status: career.status,
    },
  });

  const onSubmit = async (data: CareerType) => {
    try {
        const response = await updateCareer(career.id, data);
        toast.success("Artikel berhasil diperbarui");
        onSuccess();
        close();
    } catch (error) {
      toast.error("Terjadi kesalahan saat memperbarui artikel");
    }
  };

  return (
    <Modal title="Edit Artikel">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Judul Posisi <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            placeholder="Masukkan judul posisi"
            className="w-full text-neutral-black px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Level Input */}
        <div>
          <label
            htmlFor="level"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Level <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="level"
            {...register("level")}
            placeholder="Masukkan level (contoh: Junior, Senior)"
            className="w-full text-neutral-black px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          />
          {errors.level && (
            <p className="text-red-500 text-sm mt-1">{errors.level.message}</p>
          )}
        </div>

        {/* Type Select */}
        <div>
          <label
            htmlFor="type_id"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Tipe Kapal <span className="text-red-500">*</span>
          </label>
          <select
            id="type_id"
            {...register("type_id", { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none cursor-pointer appearance-none bg-white text-neutral-black"
          >
            <option value="">Pilih Tipe Kapal</option>
            {vesselTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          {errors.type_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.type_id.message}
            </p>
          )}
        </div>

        {/* Times Contract Input */}
        <div>
          <label
            htmlFor="times_contract"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Durasi Kontrak <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="times_contract"
            {...register("times_contract")}
            placeholder="Masukkan durasi kontrak (contoh: 6 Bulan)"
            className="w-full text-neutral-black px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          />
          {errors.times_contract && (
            <p className="text-red-500 text-sm mt-1">{errors.times_contract.message}</p>
          )}
        </div>

        {/* Route Input */}
        <div>
          <label
            htmlFor="route"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Rute <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="route"
            {...register("route")}
            placeholder="Masukkan rute perjalanan"
            className="w-full text-neutral-black px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          />
          {errors.route && (
            <p className="text-red-500 text-sm mt-1">{errors.route.message}</p>
          )}
        </div>

        {/* Status Select */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Status <span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            {...register("status")}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none cursor-pointer appearance-none bg-white text-neutral-black"
          >
            <option value="">Pilih Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">
              {errors.status.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors mt-6"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Menyimpan...
            </span>
          ) : (
            "Tambah Karir"
          )}
        </button>
      </form>
    </Modal>
  );
}
