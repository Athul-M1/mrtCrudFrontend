"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User } from "@/lib/types";
import { getUsers } from "@/lib/api";
import { UserCard } from "@/components/user-card";
import { Button } from "@/components/ui/button";
import { UserPlus, RefreshCw, AlertCircle, Users } from "lucide-react";
import { toast } from "sonner";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchUsers() {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to load users. Please try again.");
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    try {
      await fetchUsers();
      toast.success("User list refreshed");
    } finally {
      setRefreshing(false);
    }
  }

  function handleUserDeleted() {
    fetchUsers();
  }

  useEffect(() => {
    fetchUsers();
  }, []);
  console.log(users)

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing || loading}
            className="h-9"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Link href="/users/new">
            <Button size="sm" className="h-9">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </Link>
        </div>
      </div>

      {loading && !refreshing ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
          <p className="mt-4 text-muted-foreground">Loading users...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-destructive/10 p-4 rounded-full">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">{error}</h3>
          <p className="mt-2 text-muted-foreground max-w-md">
            There was a problem connecting to the server. Please check your
            connection and try again.
          </p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => fetchUsers()}
          >
            Try Again
          </Button>
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted p-4 rounded-full">
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No users found</h3>
          <p className="mt-2 text-muted-foreground max-w-md">
            Get started by creating a new user.
          </p>
          <Link href="/users/new">
            <Button className="mt-6">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {users?.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={handleUserDeleted}
              onUpdate={handleUserDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
}