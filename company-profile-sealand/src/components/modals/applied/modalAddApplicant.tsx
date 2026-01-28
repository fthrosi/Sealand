"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplicantSchema, type ApplicantType } from "@/schema/jobAppliedSchema";
import { useState,useEffect } from "react";
import { toast } from "sonner";
import { useUIStore } from "@/store/useUIStore";
import Modal from "../modal";
import { addApplied } from "@/api/applied";


interface ApplicantFormProps {
  onSuccess: () => void;
  jobId: number | null;
}
export default function ApplicantForm({ onSuccess, jobId }: ApplicantFormProps) {
  const close = useUIStore((state) => state.close);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ApplicantType>({
    resolver: zodResolver(ApplicantSchema),
    defaultValues: {
      name: "",
      job_id: jobId ?? 0,
      no_telp: "",
      email: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("foto", e.target.files as FileList);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ApplicantType) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("job_id", data.job_id.toString());
    formData.append("no_telp", data.no_telp);
    formData.append("email", data.email);
    if (data.foto && data.foto.length > 0) {
      formData.append("foto", data.foto[0]);
    }
    if (data.cv && data.cv.length > 0) {
      formData.append("cv", data.cv[0]);
    }
    try {
      const response = await addApplied(formData);
      toast.success("Job application submitted successfully");
      onSuccess();
      close();
    } catch (error) {
      toast.error("Terjadi kesalahan saat membuat team");
    }
  };
  return (
    <Modal title="Form Tambah Team">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label
            htmlFor="foto"
            className="block text-sm text-neutral-black font-semibold mb-2"
          >
            Gambar <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-4">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Image preview"
                  className="w-full h-auto object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setValue("foto", undefined as any);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
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
            ) : (
              <label className="flex flex-col items-center justify-center cursor-pointer py-8">
                <svg
                  className="w-12 h-12 text-slate-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="text-slate-600 font-medium">
                  Upload Gambar
                </span>
                <span className="text-sm text-slate-500">
                  Drag & drop atau klik untuk memilih
                </span>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          {errors.foto && (
            <p className="text-red-500 text-sm mt-1">
              {errors.foto.message?.toString()}
            </p>
          )}
        </div>

        {/* TITLE */}
        <div className="text-neutral-black">
          <label className="block font-semibold mb-2">
            Nama <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Masukkan nama Pelamar"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="text-neutral-black">
          <label className="block font-semibold mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register("email")}
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Masukkan email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="text-neutral-black">
          <label className="block font-semibold mb-2">
            Nomor Telepon <span className="text-red-500">*</span>
          </label>
          <input
            {...register("no_telp")}
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Masukkan nomor telepon"
          />
          {errors.no_telp && (
            <p className="text-red-600 text-sm mt-1">{errors.no_telp.message}</p>
          )}
        </div>
        <div className="text-neutral-black">
          <label className="block font-semibold mb-2">
            CV <span className="text-red-500">*</span>
          </label>
          <input
            {...register("cv")}
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Masukkan CV"
            type="file"
          />
          {errors.cv && (
            <p className="text-red-600 text-sm mt-1">{errors.cv.message?.toString()}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Menyimpan..." : "Send Application"}
        </button>
      </form>
    </Modal>
  );
}
