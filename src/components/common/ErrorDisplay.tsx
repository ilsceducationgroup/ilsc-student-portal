// src/components/common/ErrorDisplay.tsx
import React from "react";

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
  showTestLink?: boolean;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  showTestLink = true,
}) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
          <h3 className="font-bold">Error Loading Student Portal</h3>
          <p>{error}</p>
          <p className="text-sm mt-2">
            Check that your database connection is working.
          </p>
        </div>
        <div className="mt-4 space-x-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Retry
            </button>
          )}
          {showTestLink && (
            <a
              href="/simple-test"
              className="inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Test Connection
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
