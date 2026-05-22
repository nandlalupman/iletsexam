import AuthPanel from "@/components/platform/AuthPanel";

export default function SignupPage() {
  return (
    <div className="platform-shell">
      <div className="container-premium py-8 lg:py-12">
        <AuthPanel mode="signup" />
      </div>
    </div>
  );
}
