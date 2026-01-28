"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DivisionSchema, type DivisionType } from "@/schema/divisionSchema";
import { toast } from "sonner";
import Modal from "../modal";
import { addDivision } from "@/api/division";

interface DivisionFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function DivisionAdd({ onClose, onSuccess }: DivisionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DivisionType>({
    resolver: zodResolver(DivisionSchema),
  });

  const onSubmit = async (data: DivisionType) => {
    try {
      const response = await addDivision(data);
      if (response.data.success) {
        toast.success("Divisi berhasil ditambahkan");
        reset();
        onSuccess();
        onClose();
      } else {
        toast.error("Gagal menambahkan divisi");
      }
      console.log(data);
    } catch (error) {
      toast.error("Terjadi kesalahan");
    }
  };

  return (
    <Modal title="Tambah Divisi">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Nama Divisi <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            placeholder="Masukkan nama divisi"
            className="w-full text-neutral-black px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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
            "Tambah Divisi"
          )}
        </button>
      </form>
    </Modal>
  );
}
