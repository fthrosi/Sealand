"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PortfolioSchema, type PortfolioType } from "@/schema/portfolioSchema";
import { useState } from "react";
import { toast } from "sonner";
import { useUIStore } from "@/store/useUIStore";
import Modal from "../modal";
import { addPortfolio } from "@/api/portfolio";

interface PortfolioFormProps {
  onSuccess: () => void;
}
export default function PortfolioForm({ onSuccess }: PortfolioFormProps) {
  const close = useUIStore((state) => state.close);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PortfolioType>({
    resolver: zodResolver(PortfolioSchema),
    defaultValues: {
      name: "",
      value: "",
      description: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", e.target.files as FileList);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: PortfolioType) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("value", data.value);
    formData.append("description", data.description);
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }
    try {
      const response = await addPortfolio(formData);
        toast.success("Portfolio berhasil dibuat");
        onSuccess();
        close();
    } catch (error) {
      toast.error("Terjadi kesalahan saat membuat portfolio");
    }
  };

  return (
    <Modal title="Form Tambah Portfolio">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label
            htmlFor="image"
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
                    setValue("image", undefined as any);
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
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">
              {errors.image.message?.toString()}
            </p>
          )}
        </div>

        {/* TITLE */}
        <div className="text-neutral-black">
          <label className="block font-semibold mb-2">
            Name Portfolio <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Masukkan nama Portfolio"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* DESCRIPTION */}
          <div className="text-neutral-black">
          <label className="block font-semibold mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <input
            {...register("description")}
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Masukkan deskripsi Portfolio"
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* VALUE */}
        <div className="text-neutral-black">
          <label className="block font-semibold mb-2">
            Value Portfolio <span className="text-red-500">*</span>
          </label>
          <input
            {...register("value")}
            className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Masukkan value Portfolio"
          />
          {errors.value && (
            <p className="text-red-600 text-sm mt-1">{errors.value.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Portfolio"}
        </button>
      </form>
    </Modal>
  );
}
