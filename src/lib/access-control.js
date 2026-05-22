import { redirect } from "next/navigation";
import {
  createServerSupabaseClient,
  createServiceRoleSupabaseClient,
  isSupabaseConfigured,
} from "@/lib/supabase-server";

async function buildAccessFromSupabaseUser(user) {
  if (!user) {
    return null;
  }

  let profileRole = null;
  const serviceClient = createServiceRoleSupabaseClient();

  if (serviceClient) {
    const { data: profile } = await serviceClient.from("profiles").select("role").eq("id", user.id).maybeSingle();
    profileRole = profile?.role || null;
  }

  const role = profileRole || user.user_metadata?.role || "student";

  return {
    mode: "live",
    id: user.id,
    email: user.email,
    fullName: user.user_metadata?.full_name || "",
    phone: user.user_metadata?.phone || "",
    role,
  };
}

export async function getCurrentAccess() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.auth.getUser();

  return buildAccessFromSupabaseUser(data.user);
}

export async function requireStudentAccess() {
  const access = await getCurrentAccess();

  if (!access) {
    redirect("/login");
  }

  if (access.role === "admin") {
    redirect("/admin");
  }

  return access;
}

export async function requireAdminAccess() {
  const access = await getCurrentAccess();

  if (!access) {
    redirect("/login");
  }

  if (access.role !== "admin") {
    redirect("/dashboard");
  }

  return access;
}
