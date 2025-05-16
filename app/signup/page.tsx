import SignForm from "@/components/auth/SignForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Chat",
  description: "My Chat",
};

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignForm />;
    </div>
  );
}
