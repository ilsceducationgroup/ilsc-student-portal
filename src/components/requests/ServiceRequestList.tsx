"use client";

import React, { useState } from "react";
import { ServiceRequest } from "@/types";

interface RequestsProps {
  serviceRequests: ServiceRequest[];
}

const ServiceRequestList: React.FC<RequestsProps> = ({ serviceRequests }) => {
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(
    null
  );
  const [newRequestForm, setNewRequestForm] = useState(false);

  // Simple icon component for the back button
  const ChevronLeft = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-dark-card rounded-lg shadow border border-gray-100 dark:border-dark-border">
        <div className="border-b border-gray-200 dark:border-dark-border p-4 flex flex-col md:flex-row justify-between md:items-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4 md:mb-0">
            Service Requests
          </h3>
          <button
            className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md font-medium hover:bg-blue-700 dark:hover:bg-blue-600"
            onClick={() => {
              setSelectedRequest(null);
              setNewRequestForm(true);
            }}
          >
            New Request
          </button>
        </div>

        <div className="p-6">
          {!selectedRequest && !newRequestForm && (
            <>
              {/* Desktop view - table */}
              <div className="hidden md:block">
                <div className="responsive-table-container">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          ID
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
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Date Submitted
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Last Updated
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
                      {serviceRequests.map((request) => (
                        <tr
                          key={request.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-dark-text">
                            {request.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-dark-text">
                            {request.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                request.status === "Completed"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : request.status === "In Progress"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              }`}
                            >
                              {request.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {request.dateSubmitted}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {request.lastUpdated}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            <button
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                              onClick={() => setSelectedRequest(request)}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile view - cards */}
              <div className="md:hidden space-y-4">
                {serviceRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4"
                    onClick={() => setSelectedRequest(request)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                          ID: {request.id}
                        </span>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                          {request.type}
                        </h4>
                      </div>
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          request.status === "Completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : request.status === "In Progress"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="text-gray-500 dark:text-gray-400">
                        Submitted: {request.dateSubmitted}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Updated: {request.lastUpdated}
                      </div>
                    </div>
                    <button
                      className="mt-3 text-blue-600 dark:text-blue-400 text-sm font-medium"
                      onClick={() => setSelectedRequest(request)}
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {selectedRequest && (
            <div>
              <button
                className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6"
                onClick={() => setSelectedRequest(null)}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Back to all requests
              </button>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">
                      Request Details
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="text-gray-700 dark:text-gray-300 font-medium w-32">
                          Request ID:
                        </span>
                        <span className="text-gray-900 dark:text-dark-text">
                          {selectedRequest.id}
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-700 dark:text-gray-300 font-medium w-32">
                          Type:
                        </span>
                        <span className="text-gray-900 dark:text-dark-text">
                          {selectedRequest.type}
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-700 dark:text-gray-300 font-medium w-32">
                          Status:
                        </span>
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            selectedRequest.status === "Completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : selectedRequest.status === "In Progress"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}
                        >
                          {selectedRequest.status}
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-700 dark:text-gray-300 font-medium w-32">
                          Submitted:
                        </span>
                        <span className="text-gray-900 dark:text-dark-text">
                          {selectedRequest.dateSubmitted}
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-700 dark:text-gray-300 font-medium w-32">
                          Last Updated:
                        </span>
                        <span className="text-gray-900 dark:text-dark-text">
                          {selectedRequest.lastUpdated}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">
                      Request Description
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {selectedRequest.details}
                    </p>

                    <div className="mt-6">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">
                        Updates
                      </h4>
                      <div className="space-y-4">
                        <div className="bg-white dark:bg-dark-card p-3 rounded border border-gray-200 dark:border-dark-border">
                          <div className="flex justify-between items-start">
                            <span className="font-medium text-gray-900 dark:text-dark-text">
                              Academic Advisor
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {selectedRequest.lastUpdated}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mt-1">
                            Your request has been received and is being
                            processed. We will update you once a decision has
                            been made.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedRequest.status !== "Completed" && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">
                      Add Comment
                    </h4>
                    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                      <input
                        type="text"
                        className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Type your comment here..."
                      />
                      <button className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md font-medium hover:bg-blue-700 dark:hover:bg-blue-600">
                        Send
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {newRequestForm && (
            <div>
              <button
                className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6"
                onClick={() => setNewRequestForm(false)}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Back to all requests
              </button>

              <h4 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-6">
                Create New Request
              </h4>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="request-type"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Request Type
                  </label>
                  <select
                    id="request-type"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select request type</option>
                    <option value="class-change">Class Change</option>
                    <option value="accommodation">Accommodation</option>
                    <option value="academic-appeal">Academic Appeal</option>
                    <option value="counseling">Counseling</option>
                    <option value="internship">Internship</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="request-subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="request-subject"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Brief summary of your request"
                  />
                </div>

                <div>
                  <label
                    htmlFor="request-details"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Details
                  </label>
                  <textarea
                    id="request-details"
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Provide all relevant details about your request"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Attachments (Optional)
                  </label>
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
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
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

                <div className="flex justify-end space-x-3">
                  <button
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                    onClick={() => setNewRequestForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md font-medium hover:bg-blue-700 dark:hover:bg-blue-600"
                    onClick={() => {
                      setNewRequestForm(false);
                      // Show a success message in a real implementation
                    }}
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestList;
