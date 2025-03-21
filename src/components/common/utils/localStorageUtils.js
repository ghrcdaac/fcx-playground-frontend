// set local storage with latest status received in the respective job
export function updateLocalStorage(uid, status) {
    let existingJobDetails = localStorage.getItem(uid);
    existingJobDetails = JSON.parse(existingJobDetails);
    existingJobDetails.status.push(status);
    localStorage.setItem(uid, JSON.stringify(existingJobDetails));
    return existingJobDetails;
}