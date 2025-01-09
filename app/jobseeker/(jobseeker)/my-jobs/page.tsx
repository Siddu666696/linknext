
import SavedJobsComponent from '../../../../components/jobseeker/SavedJobsComponent'; // Adjust the path if necessary
import MyJobs from "../../../../components/jobseeker/MyJobs"
export default async function SavedJobs(){
    // ... your data fetching logic (e.g., in getServerSideProps or getStaticProps)
  const newSavedJobs = []; // Replace with your fetched data
  const savedJobsLoading = false; // Replace with your loading state
  const handleShowJob = async() => {"use server"}; // Your logic
  const handleSingleJob = async() => {"use server"}; // Your logic
  const resume = {}; // Your logic
  const handleApplyForJob = async() => {"use server"}; // Your logic
  const handleModalForNoResumeAlert = async() => {"use server"}; // Your logic
  const handleSaveThisJob = async() => {"use server"}; // Your logic
  const handleDeleteThisSavedJobs = async() => {"use server"}; // Your logic
  const loaderBtn = false; // Your logic
  const clickedJob = {}; // Your logic
  const matches = false; // Your logic

  return (
    <div>
      {/* <SavedJobsComponent
        newSavedJobs={newSavedJobs}
        savedJobsLoading={savedJobsLoading}
        matches={matches}
        handleShowJob={handleShowJob}
        handleSingleJob={handleSingleJob}
        resume={resume}
        handleApplyForJob={handleApplyForJob}
        handleModalForNoResumeAlert={handleModalForNoResumeAlert}
        handleSaveThisJob={handleSaveThisJob}
        handleDeleteThisSavedJobs={handleDeleteThisSavedJobs}
        loaderBtn={loaderBtn}
        clickedJob={clickedJob}
      /> */}
      <MyJobs/>
    </div>
  );
}