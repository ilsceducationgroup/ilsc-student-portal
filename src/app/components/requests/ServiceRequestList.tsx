import React, { useState } from "react";
import { ServiceRequest } from "../../../../types";

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
      <div className="bg-white rounded-lg shadow border border-gray-100">
        <div className="border-b border-gray-200 p-4 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Service Requests
          </h3>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
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
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date Submitted
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Last Updated
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {serviceRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {request.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {request.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            request.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : request.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.dateSubmitted}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.lastUpdated}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          className="text-blue-600 hover:text-blue-900"
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
          )}

          {selectedRequest && (
            <div>
              <button
                className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
                onClick={() => setSelectedRequest(null)}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Back to all requests
              </button>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                      Request Details
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="text-gray-500 w-32">Request ID:</span>
                        <span className="text-gray-900">
                          {selectedRequest.id}
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-500 w-32">Type:</span>
                        <span className="text-gray-900">
                          {selectedRequest.type}
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-500 w-32">Status:</span>
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            selectedRequest.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : selectedRequest.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {selectedRequest.status}
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-500 w-32">Submitted:</span>
                        <span className="text-gray-900">
                          {selectedRequest.dateSubmitted}
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-500 w-32">
                          Last Updated:
                        </span>
                        <span className="text-gray-900">
                          {selectedRequest.lastUpdated}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                      Request Description
                    </h4>
                    <p className="text-gray-700">{selectedRequest.details}</p>

                    <div className="mt-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">
                        Updates
                      </h4>
                      <div className="space-y-4">
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <div className="flex justify-between items-start">
                            <span className="font-medium text-gray-900">
                              Academic Advisor
                            </span>
                            <span className="text-sm text-gray-500">
                              {selectedRequest.lastUpdated}
                            </span>
                          </div>
                          <p className="text-gray-700 mt-1">
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
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                      Add Comment
                    </h4>
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Type your comment here..."
                      />
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700">
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
                className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
                onClick={() => setNewRequestForm(false)}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Back to all requests
              </button>

              <h4 className="text-lg font-medium text-gray-900 mb-6">
                Create New Request
              </h4>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="request-type"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Request Type
                  </label>
                  <select
                    id="request-type"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="request-subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief summary of your request"
                  />
                </div>

                <div>
                  <label
                    htmlFor="request-details"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Details
                  </label>
                  <textarea
                    id="request-details"
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Provide all relevant details about your request"
                  ></textarea>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    onClick={() => setNewRequestForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
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
