import AuthPanel from "@/components/platform/AuthPanel";

export default function LoginPage() {
  return (
    <div className="platform-shell">
      <div className="container-premium py-8 lg:py-12">
        <AuthPanel mode="login" />
      </div>
    </div>
  );
}
