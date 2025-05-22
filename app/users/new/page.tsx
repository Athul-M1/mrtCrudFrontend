import { UserForm } from "@/components/ui/user-form";

export default function NewUserPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Create New User</h1>
      
      <div className="bg-card p-6 rounded-lg border border-border">
        <UserForm />
      </div>
    </div>
  );
}