import type { Metadata } from "next";
import { AdminGames } from "@/components/admin/AdminGames";
export const metadata: Metadata = { title: "Games" };
export default function AdminGamesPage() { return <AdminGames />; }
