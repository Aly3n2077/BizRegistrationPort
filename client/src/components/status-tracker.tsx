import { CompanyRegistration, StatusHistory } from "@shared/schema";
import { format } from "date-fns";
import { CheckIcon, Loader2, Clock } from "lucide-react";

type StatusTrackerProps = {
  registration: CompanyRegistration;
  statusHistory: StatusHistory[];
};

export default function StatusTracker({ registration, statusHistory }: StatusTrackerProps) {
  // Status order for timeline display
  const statusOrder = [
    "Application Received",
    "Document Verification",
    "Name Reservation",
    "Regulatory Review",
    "Certificate Issuance"
  ];
  
  // Sort status history by timestamp (oldest first)
  const sortedHistory = [...statusHistory].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  
  // Find the current active status
  const currentStatusIndex = statusOrder.findIndex(
    status => status === sortedHistory[sortedHistory.length - 1]?.status
  );
  
  // Format date to display
  const formatDate = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, "MMM d, yyyy - h:mm a");
  };
  
  // Get estimated completion date as formatted string
  const estimatedCompletionDate = registration.estimatedCompletionDate
    ? format(new Date(registration.estimatedCompletionDate), "MMMM d, yyyy")
    : "Unknown";
  
  return (
    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
      <h4 className="font-semibold text-primary-900 mb-3">
        Application Status: {registration.applicationStatus.charAt(0).toUpperCase() + registration.applicationStatus.slice(1)}
      </h4>
      
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-primary-200"></div>
        
        {statusOrder.map((status, index) => {
          const historyItem = sortedHistory.find(item => item.status === status);
          const isCompleted = index <= currentStatusIndex;
          const isActive = index === currentStatusIndex;
          
          return (
            <div key={index} className="relative mb-8 last:mb-0">
              <div className="flex items-center mb-2">
                <div className={`rounded-full h-8 w-8 flex items-center justify-center text-white z-10 ${
                  isCompleted 
                    ? 'bg-primary-600' 
                    : 'bg-gray-300'
                }`}>
                  {isCompleted ? (
                    isActive ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckIcon className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                </div>
                <div className="ml-4">
                  <h5 className={`font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-600'}`}>
                    {status}
                  </h5>
                  {historyItem && (
                    <p className="text-sm text-gray-500">
                      {formatDate(historyItem.timestamp)}
                    </p>
                  )}
                  {isActive && !historyItem && (
                    <p className="text-sm text-gray-500">In Progress</p>
                  )}
                  {!isCompleted && !isActive && (
                    <p className="text-sm text-gray-500">Pending</p>
                  )}
                </div>
              </div>
              {historyItem && (
                <div className="ml-12">
                  <p className="text-gray-600 text-sm">
                    {historyItem.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h5 className="font-medium text-primary-800 mb-2">Estimated Completion Date</h5>
        <p className="text-gray-700">
          Your registration is expected to be completed by: <strong>{estimatedCompletionDate}</strong>
        </p>
      </div>
    </div>
  );
}
