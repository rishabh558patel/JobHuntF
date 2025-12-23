import { AlertTriangle } from "lucide-react";

const UploadMandatoryNote = () => {
  return (
    <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-md text-sm">
      <AlertTriangle className="w-4 h-4 mt-0.5" />
      <p>
        <span className="font-semibold">Note:</span> Uploading an image or document
        is <span className="font-semibold">mandatory</span> for successful submission.
      </p>
    </div>
  );
};

export default UploadMandatoryNote;
