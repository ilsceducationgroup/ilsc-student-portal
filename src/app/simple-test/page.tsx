// src/app/simple-test/page.tsx - Updated to use services
"use client";

import { useEffect, useState } from "react";
import { ConnectionService, UserService } from "@/lib/services";
import Link from "next/link";

export default function SimpleTestPage() {
  const [connectionResult, setConnectionResult] = useState<any>(null);
  const [userResult, setUserResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function runTests() {
      console.log("Running connection tests...");

      // Test basic connection
      const connTest = await ConnectionService.testConnection();
      setConnectionResult(connTest);

      // Test getting user with fields
      const userTest = await UserService.getUserById(1);
      setUserResult(userTest);

      setLoading(false);
    }

    runTests();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Testing Connection...</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Services Test</h1>

      {/* Environment Check */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Environment Check:</h2>
        <div className="bg-gray-100 p-4 rounded">
          <p>
            <strong>URL:</strong>{" "}
            {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing"}
          </p>
          <p>
            <strong>Key:</strong>{" "}
            {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
              ? "✅ Set"
              : "❌ Missing"}
          </p>
        </div>
      </div>

      {/* Connection Test */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Connection Test:</h2>
        <div
          className={`p-4 rounded ${
            connectionResult?.success
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <p className="font-medium">
            {connectionResult?.success ? "✅ Success!" : "❌ Failed"}
          </p>
          {connectionResult?.error && <p>Error: {connectionResult.error}</p>}
          {connectionResult?.data && (
            <pre className="text-sm bg-white p-2 rounded mt-1 text-black">
              {JSON.stringify(connectionResult.data, null, 2)}
            </pre>
          )}
        </div>
      </div>

      {/* User Test */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">
          User Service Test (ID: 1):
        </h2>
        <div
          className={`p-4 rounded ${
            userResult?.success
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <p className="font-medium">
            {userResult?.success ? "✅ Success!" : "❌ Failed"}
          </p>
          {userResult?.error && <p>Error: {userResult.error}</p>}
          {userResult?.data && (
            <div className="mt-2">
              <p>
                <strong>User:</strong> {userResult.data.firstname}{" "}
                {userResult.data.lastname}
              </p>
              <p>
                <strong>Email:</strong> {userResult.data.email}
              </p>
              <p>
                <strong>School:</strong> {userResult.data.school}
              </p>
              {userResult.data.userFields && (
                <div className="mt-2">
                  <p>
                    <strong>Custom Fields:</strong>
                  </p>
                  <ul className="list-disc list-inside">
                    {Object.keys(userResult.data.userFields).map((field) => (
                      <li key={field}>
                        {field}:{" "}
                        {userResult.data.userFields[field]
                          ? "Has data"
                          : "No data"}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Link href="/" className="text-blue-600 hover:underline mr-4">
          ← Back to Portal
        </Link>
        <Link href="/test-update" className="text-blue-600 hover:underline">
          Test Updates →
        </Link>
      </div>
    </div>
  );
}
