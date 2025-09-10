import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useImageStore = create(persist(
    (set) => ({
        images: [],
        addImage: (image) => set((state) => ({ images: [...state.images, image] })),
        removeImage: (id) => set((state) => ({ images: state.images.filter((img) => img.id !== id) }))
    }),
    { name: "image-storage" }
))