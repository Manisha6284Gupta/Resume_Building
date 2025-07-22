import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { dashboardStyles as styles } from '../assets/dummystyle';
import { useNavigate } from 'react-router-dom';
import { FilePlus as LucideFilePlus, LucideTrash2 } from "lucide-react";
import { ResumeSummaryCard } from '../components/Cards';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import Modal from '../components/Modal';
import CreateResumeForm from '../components/CreateResumeForm'


function Dashboard() {
  const navigate = useNavigate();
  const [openCreateModel, setOpenCreateModel] = useState(false);
  const [allResumes, setAllResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const calculateCompletion = (resume) => {
    let completedFields = 0;
    let totalFields = 0;

    totalFields += 3;
    if (resume.profileInfo?.fullName) completedFields++;
    if (resume.profileInfo?.designation) completedFields++;
    if (resume.profileInfo?.summary) completedFields++;

    totalFields += 2;
    if (resume.contactInfo?.email) completedFields++;
    if (resume.contactInfo?.phone) completedFields++;

    resume.workExperience?.forEach(exp => {
      totalFields += 5;
      if (exp.company) completedFields++;
      if (exp.role) completedFields++;
      if (exp.startDate) completedFields++;
      if (exp.endDate) completedFields++;
      if (exp.description) completedFields++;
    });

    resume.education?.forEach(edu => {
      totalFields += 4;
      if (edu.degree) completedFields++;
      if (edu.institution) completedFields++;
      if (edu.startDate) completedFields++;
      if (edu.endDate) completedFields++;
    });

    resume.skills?.forEach(skill => {
      totalFields += 2;
      if (skill.name) completedFields++;
      if (skill.progress > 0) completedFields++;
    });

    resume.projects?.forEach(project => {
      totalFields += 4;
      if (project.title) completedFields++;
      if (project.description) completedFields++;
      if (project.github) completedFields++;
      if (project.liveDemo) completedFields++;
    });

    resume.certifications?.forEach(cert => {
      totalFields += 3;
      if (cert.title) completedFields++;
      if (cert.issuer) completedFields++;
      if (cert.year) completedFields++;
    });

    resume.languages?.forEach(lang => {
      totalFields += 2;
      if (lang.name) completedFields++;
      if (lang.progress > 0) completedFields++;
    });

    totalFields += (resume.interests?.length || 0);
    completedFields += (resume.interests?.filter(i => i?.trim() !== "")?.length || 0);

    return Math.round((completedFields / totalFields) * 100);
  };

  const fetchAllResumes = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      const resumesWithCompletion = response.data.map(resume => ({
        ...resume,
        completion: calculateCompletion(resume)
      }));
      setAllResumes(resumesWithCompletion);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  const handleDeleteResume = async () => {
    if (!resumeToDelete) return;
    try {
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeToDelete));
      toast.success('Resume deleted successfully');
      fetchAllResumes();
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast.error('Failed to delete the resume');
    } finally {
      setResumeToDelete(null);
      setShowDeleteConfirm(false);
    }
  };

  const handleDeleteClick = (id) => {
    setResumeToDelete(id);
    setShowDeleteConfirm(true);
  };

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={`${styles.headerWrapper} flex justify-between items-center flex-wrap gap-4`}>
          {/* Left Side */}
          <div>
            <h1 className={styles.headerTitle}>My Resume</h1>
            <p className={styles.headerSubtitle}>
              {allResumes.length > 0
                ? `You have ${allResumes.length} resume${allResumes.length !== 1 ? 's' : ''}`
                : 'Start building your professional resume'}
            </p>
          </div>

          {/* Right Side Button */}
          <div className="flex justify-end">
  <button className={styles.createButton} onClick={() => setOpenCreateModel(true)}>
    {/* Overlay comes first */}
    <div className={styles.createButtonOverlay}></div>

    {/* Content wrapper with text + icon, placed above the overlay */}
    <div className={`${styles.createButtonContent} relative z-10 flex items-center gap-2`}>
      <span>Create Now</span>
      <LucideFilePlus
        className="transition-transform group-hover:translate-x-1"
        size={20}
      />
    </div>
  </button>
</div>

        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className={styles.spinnerWrapper}>
            <div className={styles.spinner}></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && allResumes.length === 0 && (
          <div className={styles.emptyStateWrapper}>
            <div className={styles.emptyIconWrapper}>
              <LucideFilePlus className='text-violet-600' />
            </div>
            <h3 className={styles.emptyTitle}>No Resume Yet</h3>
            <p>You haven't created any resume yet. Start building your professional resume to land your dream job.</p>
            <button className={styles.createButton} onClick={() => setOpenCreateModel(true)}>
              <div className={styles.createButtonOverlay}></div>
              <span className={styles.createButtonContent}>
                Create Your First Resume
                <LucideFilePlus className='group-hover:translate-x-1 transition-transform ml-2' size={20} />
              </span>
            </button>
          </div>
        )}

        {/* Resume Grid View */}
        {!loading && allResumes.length > 0 && (
          <div className={styles.grid}>
            {/* "Create New Resume" Card */}
            <div className={styles.newResumeCard} onClick={() => setOpenCreateModel(true)}>
              <div className={styles.newResumeIcon}>
                <LucideFilePlus size={32} className='text-white' />
              </div>
              <h3 className={styles.newResumeTitle}>Create New Resume</h3>
              <p className={styles.newResumeText}>Start building your career</p>
            </div>

            {/* Render All Resume Cards */}
            {allResumes.map((resume) => (
              <ResumeSummaryCard
                key={resume._id}
                imgUrl={resume.thumbnailLink}
                title={resume.title}
                createdAt={resume.createdAt}
                updatedAt={resume.updatedAt}
                onSelect={() => navigate(`/resume/${resume._id}`)}
                onDelete={() => handleDeleteClick(resume._id)}
                completion={resume.completion || 0}
                isPremium={resume.isPremium}
                isNew={dayjs().diff(dayjs(resume.createdAt), 'day') < 7}
              />
            ))}
          </div>
        )}
      </div>
      {/* Create Modal */}
      <Modal isOpen={openCreateModel} onClose={() => setOpenCreateModel(false)} 
        hideHeader maxWidth="max-w-2xl">
          <div className='p-6'>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Create New Resume</h3>
            <button onClick={() => setOpenCreateModel(false)} className={styles.modalCloseButton}> 
              X

            </button>
            
           </div>
           <CreateResumeForm onSucces={()=>{
            setOpenCreateModel(false);
            fetchAllResumes();

           }}/>

          </div>

      </Modal>

      {/* Deletion Modal */}
      <Modal isOpen={showDeleteConfirm} onClose={() =>setShowDeleteConfirm(false)} title='Confirm Deletion'
       showActionBtn actionBtnText = 'Delete' actionBtnClassName = 'bg-red-600 hover:bg-red-700' onActionClick={handleDeleteResume}>
        <div className='p-4'>
          <div className='flex flex-col items-center text-center'>
            <div className={styles.deleteIconWrapper}>
              <LucideTrash2 className='text-orange-600'/>
            </div>
            <h3 className={styles.deleteTitle}>Delete Resume</h3>
            <p className={styles.deleteText}>
              Are you sure you want to delete this resum? This action cannot be undone.
            </p>
          </div>
        </div>



        
      </Modal>
    </DashboardLayout>
  );
}

export default Dashboard;
