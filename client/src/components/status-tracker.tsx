import { CompanyRegistration, StatusHistory } from "@shared/schema";
import { format } from "date-fns";
import { CheckIcon, Loader2, Clock, ClipboardCheck, FileCheck, Search, FileText, Award } from "lucide-react";
import { motion } from "framer-motion";

type StatusTrackerProps = {
  registration: CompanyRegistration;
  statusHistory: StatusHistory[];
};

export default function StatusTracker({ registration, statusHistory }: StatusTrackerProps) {
  // Status order for timeline display with icons
  const statusSteps = [
    { name: "Application Received", icon: <FileText className="h-5 w-5" /> },
    { name: "Document Verification", icon: <ClipboardCheck className="h-5 w-5" /> },
    { name: "Name Reservation", icon: <Search className="h-5 w-5" /> },
    { name: "Regulatory Review", icon: <FileCheck className="h-5 w-5" /> },
    { name: "Certificate Issuance", icon: <Award className="h-5 w-5" /> }
  ];
  
  // Sort status history by timestamp (oldest first)
  const sortedHistory = [...statusHistory].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  
  // Find the current active status
  const currentStatusIndex = statusSteps.findIndex(
    step => step.name === sortedHistory[sortedHistory.length - 1]?.status
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
  
  // Calculate progress percentage for the progress bar
  const progressPercentage = ((currentStatusIndex + 1) / statusSteps.length) * 100;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  return (
    <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-6 md:p-8 shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-accent-700 mb-2">
            Application Status
          </h3>
          <p className="text-gray-600">
            Application ID: <span className="font-mono font-medium">{registration.referenceNumber}</span>
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 flex items-center">
          <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2 animate-pulse"></div>
          <span className="font-medium text-primary-900">
            {registration.applicationStatus.charAt(0).toUpperCase() + registration.applicationStatus.slice(1)}
          </span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
      
      <motion.div 
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Timeline vertical line */}
        <div className="absolute left-6 top-0 h-full w-0.5">
          <div className="h-full w-full bg-gray-200 rounded-full"></div>
          <motion.div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"
            initial={{ height: "0%" }}
            animate={{ height: `${progressPercentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
        
        {statusSteps.map((step, index) => {
          const historyItem = sortedHistory.find(item => item.status === step.name);
          const isCompleted = index <= currentStatusIndex;
          const isActive = index === currentStatusIndex;
          
          return (
            <motion.div 
              key={index} 
              className="relative mb-10 last:mb-0 pl-16"
              variants={itemVariants}
            >
              {/* Step marker */}
              <motion.div 
                className={`absolute left-0 rounded-full h-12 w-12 flex items-center justify-center z-10 shadow-lg ${
                  isCompleted 
                    ? isActive
                      ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-white ring-4 ring-primary-100'
                      : 'bg-gradient-to-br from-primary-600 to-accent-600 text-white'
                    : 'bg-white border-2 border-gray-200 text-gray-400'
                }`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {isCompleted ? (
                  isActive ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <CheckIcon className="h-5 w-5" />
                  )
                ) : (
                  step.icon
                )}
              </motion.div>
              
              {/* Step content */}
              <div className={`p-5 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-primary-50 to-primary-100/50 border border-primary-200 shadow-md' 
                  : isCompleted
                    ? 'bg-white border border-gray-100'
                    : 'bg-gray-50 border border-gray-100'
              }`}>
                <h4 className={`font-semibold text-lg ${isCompleted ? 'text-primary-900' : 'text-gray-500'}`}>
                  {step.name}
                </h4>
                
                {historyItem && (
                  <p className="text-sm text-gray-600 mt-1 flex items-center">
                    <Clock className="h-4 w-4 mr-1.5 inline" />
                    {formatDate(historyItem.timestamp)}
                  </p>
                )}
                
                {isActive && (
                  <div className="mt-3 flex items-center">
                    <motion.div 
                      className="h-2 w-2 bg-green-500 rounded-full mr-2"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <p className="text-primary-800 font-medium">
                      {isActive && historyItem ? "Currently processing" : "In Progress"}
                    </p>
                  </div>
                )}
                
                {historyItem && historyItem.description && (
                  <motion.div 
                    className="mt-3 text-gray-700 p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-100"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm">
                      {historyItem.description}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      
      <motion.div 
        className="mt-10 p-6 bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-100 rounded-xl shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex items-center mb-3">
          <Calendar className="h-5 w-5 text-primary-700 mr-2" />
          <h5 className="font-bold text-primary-900">Estimated Completion Date</h5>
        </div>
        <p className="text-gray-700">
          Your registration is expected to be completed by: 
          <span className="ml-1 font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-accent-700">
            {estimatedCompletionDate}
          </span>
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Updates will be sent to your registered email address as your application progresses.
        </p>
      </motion.div>
    </div>
  );
}

// Calendar icon component
function Calendar(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      {...props}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
      />
    </svg>
  );
}
