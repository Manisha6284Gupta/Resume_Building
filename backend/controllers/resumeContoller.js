import Resume from '../models/resumeModel.js'

export const createResume = async (req, res) =>{
    try{
         const { title } = req.body;

        // Default template
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
        };

        const newResume = await Resume.create({
            userId : req.user._id,
            title,
            ...defaultResumeData,
            ...req.body
        })
        res.status(201).json({newResume})

    }
    catch(error){
        res.status(500).json({message:"Failed to create resume", error:error.message})

    }
}

//Get function
export const getUserResume = async (req, res) => {
    try{
        const resume = await Resume.find({userId: req.user._id}).sort({
            updateAt:-1
        });
        res.json(resumes)
    }
    catch(error){
        res.status(500).json({message:"Failed to get resume", error:error.message})
 
    }
}

// Get resume by Id

export const getResumeById = async (req, res) => {
    try{
         const resume = await Resume.findOne({_id:req.params.id,userID:req.user._id})

          if(!resume){
            return res.status(404).json({message:"Resume not found"})


          }
          res.json(resume)
    }
    catch(error){
         res.status(500).json({message:"Failed to get resume", error:error.message})
    }
}


//Update resumes
export const updateResume = async (req, res) => {
    try{
        const resume = await Resume.findOne({
            _id:req.params.id,
            userId:req.user._id
        })
        if(!resume){
            return res.status(404).json({message:"Resume not found or not authorized"})
        }
        // Merge updated resume
        Object.assign(resume,req.body)
        //save update resume
        const savedResume = await resume.save();
        res.json(savedResume)
    }
    catch(error)
    {
        res.status

    }
}