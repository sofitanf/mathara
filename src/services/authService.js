import { supabase } from "../lib/supabase.js";
import { setSession } from "../utils/session.js";

export async function loginByNIS(nis) {
    if (!nis) {
        return {
            success: false,
            message: "NIS belum diisi",
        };
    }

    const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("nis", nis)
        .maybeSingle(); // jangan single()

    if (error || !data) {
        return {
            success: false,
            message: "NIS tidak ditemukan, coba lagi",
        };
    }

    const user = {
        id: data.id,
        nis: data.nis,
        name: data.name,
        unlocked_stage: data.unlocked_stage,
    };

    setSession(user);

    return {
        success: true,
        user,
    };
}
