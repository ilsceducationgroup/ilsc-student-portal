// src/app/test-update/page.tsx - Updated to use services
"use client";

import { useState } from "react";
import { UserService } from "@/lib/services";
import Link from "next/link";

export default function TestUpdatePage() {
  const [testResult, setTestResult] = useState<any>(null);
  const [userBefore, setUserBefore] = useState<any>(null);
  const [userAfter, setUserAfter] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runUpdateTest = async () => {
    setLoading(true);
    console.log("🧪 Running update test...");

    try {
      // Get user data before update
      const beforeResult = await UserService.getUserById(1);
      setUserBefore(beforeResult.data);

      if (beforeResult.success) {
        // Update phone number as a test
        const timestamp = new Date().toLocaleTimeString();
        const updateResult = await UserService.updateProfile(1, {
          phone: `604-555-TEST (Updated at ${timestamp})`,
        });
        setTestResult(updateResult);

        // Get user data after update
        if (updateResult.success) {
          const afterResult = await UserService.getUserById(1);
          setUserAfter(afterResult.data);
        }
      }
    } catch (error) {
      setTestResult({
        success: false,
        error: `Exception: ${error}`,
        data: null,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Service Update Test</h1>

      <div className="mb-6">
        <button
          onClick={runUpdateTest}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Running Test..." : "Test Profile Update"}
        </button>
      </div>

      {/* Test Results */}
      {testResult && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Update Result:</h2>
          <div
            className={`p-4 rounded ${
              testResult.success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <p className="font-medium">
              {testResult.success
                ? "✅ Update Successful!"
                : "❌ Update Failed"}
            </p>
            {testResult.error && <p>Error: {testResult.error}</p>}
          </div>
        </div>
      )}

      {/* Before/After Comparison */}
      {userBefore && userAfter && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Before Update:</h3>
            <div className="bg-gray-100 p-4 rounded">
              <p>
                <strong>Name:</strong> {userBefore.firstname}{" "}
                {userBefore.lastname}
              </p>
              <p>
                <strong>Phone:</strong> {userBefore.phone}
              </p>
              <p>
                <strong>Email:</strong> {userBefore.email}
              </p>
              <p>
                <strong>Last Modified:</strong> {userBefore.timemodified}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">After Update:</h3>
            <div className="bg-blue-100 p-4 rounded">
              <p>
                <strong>Name:</strong> {userAfter.firstname}{" "}
                {userAfter.lastname}
              </p>
              <p>
                <strong>Phone:</strong> {userAfter.phone}
              </p>
              <p>
                <strong>Email:</strong> {userAfter.email}
              </p>
              <p>
                <strong>Last Modified:</strong> {userAfter.timemodified}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 space-x-4">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Portal
        </Link>
        <Link href="/simple-test" className="text-blue-600 hover:underline">
          Connection Test
        </Link>
      </div>
    </div>
  );
}
