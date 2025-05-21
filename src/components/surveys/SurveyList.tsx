import React from "react";
import { Survey } from "@/types";

interface SurveysProps {
  surveys: Survey[];
}

const SurveyList: React.FC<SurveysProps> = ({ surveys }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow border border-gray-100">
        <div className="border-b border-gray-200 p-4">
          <h3 className="text-lg font-medium text-gray-900">Surveys</h3>
        </div>

        <div className="p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Pending Surveys
          </h4>
          <div className="space-y-4">
            {surveys
              .filter((survey) => survey.status === "Pending")
              .map((survey) => (
                <div
                  key={survey.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-gray-900">
                        {survey.title}
                      </h5>
                      <p className="text-sm text-gray-500 mt-1">
                        {survey.questions} questions • Due: {survey.dueDate}
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md font-medium hover:bg-blue-700">
                      Start Survey
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <h4 className="text-lg font-medium text-gray-900 mt-8 mb-4">
            Completed Surveys
          </h4>
          <div className="space-y-4">
            {surveys
              .filter((survey) => survey.status === "Completed")
              .map((survey) => (
                <div
                  key={survey.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-gray-900">
                        {survey.title}
                      </h5>
                      <p className="text-sm text-gray-500 mt-1">
                        {survey.questions} questions • Completed
                      </p>
                    </div>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-md font-medium hover:bg-gray-50">
                      View Results
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyList;
