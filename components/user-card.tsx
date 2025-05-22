"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { deleteUser } from "@/lib/api";
import { toast } from "sonner";
import { UserForm } from "@/components/ui/user-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Mail, User as UserIcon, Pencil, Trash2 } from "lucide-react";

interface UserCardProps {
  user: User;
  onDelete: () => void;
  onUpdate: () => void;
}

export function UserCard({ user, onDelete, onUpdate }: UserCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await deleteUser(user.id);
      toast.success("User deleted successfully");
      onDelete();
    } catch (error) {
      toast.error("Failed to delete user");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
        <CardHeader className="bg-secondary/50 pb-2">
          <CardTitle className="flex items-center text-lg font-medium">
            <UserIcon className="mr-2 h-5 w-5 text-primary" />
            {user.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex items-center text-muted-foreground">
            <Mail className="mr-2 h-4 w-4" />
            <p className="hover:text-primary hover:underline transition-colors">
              {user.email}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-2">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Pencil className="h-3.5 w-3.5" />
                <span>Edit</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit User</DialogTitle>
              </DialogHeader>
              <UserForm 
                user={user} 
                onSuccess={() => {
                  setIsEditDialogOpen(false);
                  onUpdate();
                }}
              />
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="flex items-center gap-1">
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the user
                  and remove their data from the server.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground"
                >
                  {isDeleting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Deleting...
                    </span>
                  ) : "Delete User"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </motion.div>
  );
}