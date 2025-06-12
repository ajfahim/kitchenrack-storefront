"use client";
import VariantSelectSheet from "./VariantSelectSheet";
import { Product } from "@/types/product";

interface CartSheetVariantModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export default function CartSheetVariantModal({ product, open, onClose }: CartSheetVariantModalProps) {
  // This is a wrapper for reusing VariantSelectSheet as a modal
  return (
    <VariantSelectSheet product={product} open={open} onClose={onClose} />
  );
}
