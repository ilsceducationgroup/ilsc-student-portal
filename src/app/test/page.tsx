// src/app/test/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { testConnection, getAllUsers } from "@/lib/supabase-queries";

export default function TestPage() {
  const [connectionStatus, setConnectionStatus] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function runTests() {
      setLoading(true);

      // Test connection
      const connectionResult = await testConnection();
      setConnectionStatus(connectionResult);

      // Get all users
      if (connectionResult.success) {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      }

      setLoading(false);
    }

    runTests();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">
          Testing Supabase Connection...
        </h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>

      {/* Connection Status */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Connection Status:</h2>
        <div
          className={`p-4 rounded ${
            connectionStatus?.success
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <p className="font-medium">
            {connectionStatus?.success ? "✅ Success!" : "❌ Failed"}
          </p>
          <p>{connectionStatus?.message}</p>
        </div>
      </div>

      {/* Users Data */}
      {connectionStatus?.success && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            Students in Database ({users.length}):
          </h2>
          <div className="bg-gray-100 p-4 rounded overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">ID</th>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">School</th>
                  <th className="text-left p-2">Student ID</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="p-2">{user.id}</td>
                    <td className="p-2">
                      {user.firstname} {user.lastname}
                    </td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.school}</td>
                    <td className="p-2">{user.idnumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Raw Data */}
      {connectionStatus?.data && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Sample Data:</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {JSON.stringify(connectionStatus.data, null, 2)}
          </pre>
        </div>
      )}
      <Link href="/" className="text-blue-600 hover:underline">
        ← Back to Student Portal
      </Link>
    </div>
  );
}
