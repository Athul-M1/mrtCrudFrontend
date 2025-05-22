import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserPlus, Users, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center py-12 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
          User Management System
        </h1>
        
        <p className="mt-4 text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          A complete CRUD application for managing user information, built with Next.js and connected to a Go backend server.
        </p>
        
        <div className="grid gap-6 mt-8 md:grid-cols-2 max-w-2xl mx-auto">
          <Link href="/users/new" className="w-full">
            <Button
              variant="default"
              size="lg"
              className="w-full group relative overflow-hidden h-24 transition-all duration-300"
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <UserPlus className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                <span className="font-medium">Add New User</span>
              </div>
              <ArrowRight className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" />
            </Button>
          </Link>
          
          <Link href="/users" className="w-full">
            <Button
              variant="outline"
              size="lg"
              className="w-full group relative overflow-hidden h-24 transition-all duration-300"
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <Users className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                <span className="font-medium">View All Users</span>
              </div>
              <ArrowRight className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        <div className="mt-16 p-6 bg-secondary/30 rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">API Endpoints</h2>
          <div className="text-sm text-left grid gap-2">
            <div className="flex items-center gap-2 p-2 bg-background rounded">
              <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded text-xs font-mono">POST</span>
              <span className="font-mono">/add-user</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-background rounded">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded text-xs font-mono">GET</span>
              <span className="font-mono">/get-users</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-background rounded">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded text-xs font-mono">PUT</span>
              <span className="font-mono">/update-user/:id</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-background rounded">
              <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded text-xs font-mono">DELETE</span>
              <span className="font-mono">/delete-user/:id</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}