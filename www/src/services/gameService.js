import { supabase } from "../lib/supabase.js";
import { getSession, setSession } from "../utils/session.js";

export async function updateStage(nextStage) {
    const user = await getSession();

    const { error: updateError } = await supabase
        .from("students")
        .update({
            unlocked_stage: nextStage,
        })
        .eq("id", user.id);

    if (updateError) {
        throw updateError;
    }

    user.unlocked_stage = nextStage;

    setSession(user);

    return {
        success: true,
        user,
    };
}

export async function saveStudentProgress({ stage, score }) {
    const user = await getSession();
    const { error: progressError } = await supabase
        .from("student_game_progress")
        .insert({
            student_id: user.id,
            stage,
            score,
        });

    if (progressError) {
        throw progressError;
    }

    return {
        success: true,
    };
}
