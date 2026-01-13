import React from 'react';
import { JobResponse } from '../Services/jobService';

const PostedJobCard: React.FC<JobResponse> = (props) => {
  return (
    <div className="bg-mine-shaft-900 rounded-xl p-4 border-l-4 border-l-bright-sun-400 hover:shadow-lg transition-shadow">
      <div className="text-lg font-semibold text-white">{props.jobTitle}</div>
      <div className="text-sm text-mine-shaft-300 font-medium">{props.workAddress}</div>
      <div className="text-sm text-mine-shaft-400">
        Posted: {new Date(props.postedDate).toLocaleDateString()}
      </div>
    </div>
  );
};

export default PostedJobCard;
