// src/app/debug/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";

export default function DebugPage() {
  const [envCheck, setEnvCheck] = useState<any>({});
  const [connectionTest, setConnectionTest] = useState<any>({});
  const [simpleQuery, setSimpleQuery] = useState<any>({});
  const [tablesCheck, setTablesCheck] = useState<any>({});

  useEffect(() => {
    async function runDebugTests() {
      // 1. Check environment variables
      const envStatus = {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing",
        key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          ? "✅ Set"
          : "❌ Missing",
        urlValue:
          process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 20) + "...",
        keyValue:
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + "...",
      };
      setEnvCheck(envStatus);

      // 2. Test basic connection
      try {
        const { data, error } = await supabase
          .from("tblUser")
          .select("count")
          .limit(1);
        setConnectionTest({
          success: !error,
          error: error?.message || "No error",
          data,
        });
      } catch (err) {
        setConnectionTest({
          success: false,
          error: `Exception: ${err}`,
          data: null,
        });
      }

      // 3. Check if tables exist
      try {
        const { data: userTable, error: userError } = await supabase
          .from("tblUser")
          .select("*")
          .limit(1);

        const { data: userDataTable, error: userDataError } = await supabase
          .from("UserData")
          .select("*")
          .limit(1);

        const { data: userFieldTable, error: userFieldError } = await supabase
          .from("UserField")
          .select("*")
          .limit(1);

        setTablesCheck({
          tblUser: {
            exists: !userError,
            error: userError?.message,
            count: userTable?.length,
          },
          UserData: {
            exists: !userDataError,
            error: userDataError?.message,
            count: userDataTable?.length,
          },
          UserField: {
            exists: !userFieldError,
            error: userFieldError?.message,
            count: userFieldTable?.length,
          },
        });
      } catch (err) {
        setTablesCheck({
          error: `Exception checking tables: ${err}`,
        });
      }

      // 4. Try simple query
      try {
        const { data, error } = await supabase
          .from("tblUser")
          .select("id, firstname, lastname")
          .eq("id", 1)
          .single();

        setSimpleQuery({
          success: !error,
          error: error?.message || "No error",
          data,
        });
      } catch (err) {
        setSimpleQuery({
          success: false,
          error: `Exception: ${err}`,
          data: null,
        });
      }
    }

    runDebugTests();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Supabase Debug Information</h1>

      {/* Environment Variables */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-3">🔧 Environment Variables</h2>
        <div className="space-y-2">
          <p>
            <strong>NEXT_PUBLIC_SUPABASE_URL:</strong> {envCheck.url}
          </p>
          <p>
            <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong> {envCheck.key}
          </p>
          {envCheck.urlValue && (
            <p className="text-sm text-gray-600">
              URL Preview: {envCheck.urlValue}
            </p>
          )}
          {envCheck.keyValue && (
            <p className="text-sm text-gray-600">
              Key Preview: {envCheck.keyValue}
            </p>
          )}
        </div>
      </div>

      {/* Connection Test */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-3">🔌 Connection Test</h2>
        <div
          className={`p-3 rounded ${
            connectionTest.success ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <p>
            <strong>Status:</strong>{" "}
            {connectionTest.success ? "✅ Connected" : "❌ Failed"}
          </p>
          <p>
            <strong>Error:</strong> {connectionTest.error}
          </p>
          {connectionTest.data && (
            <pre className="mt-2 text-sm">
              {JSON.stringify(connectionTest.data, null, 2)}
            </pre>
          )}
        </div>
      </div>

      {/* Tables Check */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-3">📋 Tables Check</h2>
        {tablesCheck.error ? (
          <div className="bg-red-100 p-3 rounded">
            <p className="text-red-800">{tablesCheck.error}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {Object.entries(tablesCheck).map(
              ([tableName, info]: [string, any]) => (
                <div
                  key={tableName}
                  className="flex justify-between items-center p-2 bg-gray-50 rounded"
                >
                  <span>
                    <strong>{tableName}:</strong>
                  </span>
                  <span
                    className={info.exists ? "text-green-600" : "text-red-600"}
                  >
                    {info.exists
                      ? `✅ Exists (${info.count} records)`
                      : `❌ ${info.error}`}
                  </span>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Simple Query Test */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-3">
          🔍 Simple Query Test (User ID: 1)
        </h2>
        <div
          className={`p-3 rounded ${
            simpleQuery.success ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <p>
            <strong>Status:</strong>{" "}
            {simpleQuery.success ? "✅ Success" : "❌ Failed"}
          </p>
          <p>
            <strong>Error:</strong> {simpleQuery.error}
          </p>
          {simpleQuery.data && (
            <div className="mt-2">
              <p>
                <strong>Data Found:</strong>
              </p>
              <pre className="text-sm bg-white p-2 rounded mt-1">
                {JSON.stringify(simpleQuery.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <a href="/" className="text-blue-600 hover:underline">
          ← Back to Student Portal
        </a>
      </div>
    </div>
  );
}
