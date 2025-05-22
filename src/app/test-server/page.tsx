// app/test-server/page.tsx
import { testConnection, getAllUsers } from "@/lib/data/server-queries";

export default async function TestServerPage() {
  // These run on the server
  const connectionResult = await testConnection();
  const users = connectionResult.success ? await getAllUsers() : [];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Server Component Test</h1>

      {/* Connection Status */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Connection Status:</h2>
        <div
          className={`p-4 rounded ${
            connectionResult.success
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <p className="font-medium">
            {connectionResult.success ? "✅ Success!" : "❌ Failed"}
          </p>
          {connectionResult.error && <p>Error: {connectionResult.error}</p>}
        </div>
      </div>

      {/* Users Data */}
      {connectionResult.success && (
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

      <div className="mt-6 space-x-4">
        <a href="/" className="text-blue-600 hover:underline">
          ← Back to Student Portal
        </a>
        <a href="/debug" className="text-blue-600 hover:underline">
          Client Debug Page
        </a>
      </div>
    </div>
  );
}
