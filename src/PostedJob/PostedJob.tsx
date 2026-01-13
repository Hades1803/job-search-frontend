import React, { useEffect, useState } from 'react';
import { Tabs } from '@mantine/core';
import PostedJobCard from './PostedJobCard';
import { getEmployerJobs, JobResponse } from '../Services/jobService';

const PostedJob: React.FC = () => {
  const [activeJobs, setActiveJobs] = useState<JobResponse[]>([]);
  const [draftJobs, setDraftJobs] = useState<JobResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getEmployerJobs()
      .then((jobs) => {
        // Giả sử status=true là active, false là draft
        setActiveJobs(jobs.filter((job) => job.status));
        setDraftJobs(jobs.filter((job) => !job.status));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading jobs...</p>;

  return (
    <div className="mx-10 mt-5">
      <div className="text-2xl font-semibold mb-5">Jobs Posted</div>
      <Tabs variant="pills" defaultValue="active">
        <Tabs.List className="font-medium [&_button[aria-selected='true']]:bg-bright-sun-400 [&_button[aria-selected='false']]:bg-mine-shaft-900">
          <Tabs.Tab value="active">Active [{activeJobs.length}]</Tabs.Tab>
          <Tabs.Tab value="draft">Drafts [{draftJobs.length}]</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="active">
          <div className="flex flex-col gap-5 mt-5">
            {activeJobs.map((job) => (
              <PostedJobCard key={job.id} {...job} />
            ))}
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="draft">
          <div className="flex flex-col gap-5 mt-5">
            {draftJobs.map((job) => (
              <PostedJobCard key={job.id} {...job} />
            ))}
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default PostedJob;
