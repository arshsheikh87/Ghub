import type { Metadata } from "next";
import { AdminGallery } from "@/components/admin/AdminGallery";
export const metadata: Metadata = { title: "Gallery" };
export default function AdminGalleryPage() { return <AdminGallery />; }
