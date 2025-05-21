"use client";

import React from "react";
import { Document } from "@/types";
import { FileText } from "lucide-react";

interface DocumentsProps {
  documents: Document[];
}

const DocumentList: React.FC<DocumentsProps> = ({ documents }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-dark-card rounded-lg shadow border border-gray-100 dark:border-dark-border">
        <div className="border-b border-gray-200 dark:border-dark-border p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text">
            Documents
          </h3>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Search documents..."
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400 dark:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Desktop view */}
          <div className="hidden md:block">
            <div className="responsive-table-container">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Document Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-dark-border">
                  {documents.map((document) => (
                    <tr
                      key={document.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-dark-text">
                              {document.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {document.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {document.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-3">
                          View
                        </button>
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile view */}
          <div className="md:hidden space-y-4">
            {documents.map((document) => (
              <div
                key={document.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mr-3">
                    <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">
                      {document.name}
                    </h4>
                    <div className="mt-1 flex justify-between">
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {document.type}
                        </span>
                        <span className="mx-2 text-gray-300 dark:text-gray-600">
                          •
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {document.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex space-x-3 border-t border-gray-100 dark:border-gray-700 pt-3">
                  <button className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                    View
                  </button>
                  <button className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border">
            <h4 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">
              Upload New Document
            </h4>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label
                    htmlFor="doc-upload"
                    className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="doc-upload"
                      name="doc-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, PDF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentList;
