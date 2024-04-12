export function refreshStatus(setSavedJobs, jobType) {
  var jobs = [];
  var keys = Object.keys(localStorage);

  // adding latest status to local storage
  keys.forEach(key => {
    const job = JSON.parse(localStorage.getItem(key));
    key.length === 8 && job.jobType === jobType && jobs.push({
      uid: key,
      timestamp: job.timestamp,
      shortName: job.shortName,
      statuses: job.status
    });
  });

  // to show most recent job in status tab
  jobs = jobs.sort((job1, job2) => job1.timestamp < job2.timestamp ? 1 : -1);
  setSavedJobs(jobs);
}