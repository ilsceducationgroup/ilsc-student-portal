"use client";

import React from "react";
import { Survey } from "@/types";

interface SurveysProps {
  surveys: Survey[];
}

const SurveyList: React.FC<SurveysProps> = ({ surveys }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-dark-card rounded-lg shadow border border-gray-100 dark:border-dark-border">
        <div className="border-b border-gray-200 dark:border-dark-border p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text">
            Surveys
          </h3>
        </div>

        <div className="p-6">
          <h4 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">
            Pending Surveys
          </h4>
          <div className="space-y-4">
            {surveys
              .filter((survey) => survey.status === "Pending")
              .map((survey) => (
                <div
                  key={survey.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-dark-text">
                        {survey.title}
                      </h5>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {survey.questions} questions • Due: {survey.dueDate}
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white text-sm rounded-md font-medium hover:bg-blue-700 dark:hover:bg-blue-600 self-start sm:self-auto">
                      Start Survey
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {surveys.filter((survey) => survey.status === "Pending").length ===
            0 && (
            <div className="text-center py-4">
              <p className="text-gray-500 dark:text-gray-400">
                No pending surveys at the moment.
              </p>
            </div>
          )}

          <h4 className="text-lg font-medium text-gray-900 dark:text-dark-text mt-8 mb-4">
            Completed Surveys
          </h4>
          <div className="space-y-4">
            {surveys
              .filter((survey) => survey.status === "Completed")
              .map((survey) => (
                <div
                  key={survey.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-dark-text">
                        {survey.title}
                      </h5>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {survey.questions} questions • Completed
                      </p>
                    </div>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-md font-medium hover:bg-gray-50 dark:hover:bg-gray-700 self-start sm:self-auto">
                      View Results
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {surveys.filter((survey) => survey.status === "Completed").length ===
            0 && (
            <div className="text-center py-4">
              <p className="text-gray-500 dark:text-gray-400">
                No completed surveys yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyList;
