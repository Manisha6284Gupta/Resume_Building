import fs from 'fs';
import path from 'path';
import Resume from '../models/resumeModel.js';
import upload from '../middleware/uploadMiddleware.js';

// Controller to upload resume images
export const uploadResumeImages = async (req, res) => {
    try {
        // Use multer upload middleware
        upload.fields([{ name: "thumbnail" }, { name: "profileImage" }])(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: "File upload failed", error: err.message });
            }

            const resumeId = req.params.id;
            const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });

            if (!resume) {
                return res.status(404).json({ message: "Resume not found" });
            }

            // Resolve the path to uploads folder
            const uploadsFolder = path.join(process.cwd(), "uploads");

            // Generate base URL
            const baseUrl = `${req.protocol}://${req.get("host")}`;
            const newThumbnail = req.files.newThumbnail?.[0];
            const newProfileImage = req.files['newProfileImage'][0];

            

            if(newThumbnail){
                if(resume.thumbnaillink){
                    const oldThumbnail = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl))
                    if(fs.existsSync(oldThumbnail))
                    {
                        fs.unlinkSync(oldThumbnail)
                    }
                    resume.thumbnaillink = `${baseUrl}/uploads/${newThumbnail.filename}`;

                }

            }
            // Same for profilepreview image
            if(newProfileImage){
                if(resume.profileInfo?.profilePreviewUrl){
                    const oldProfile = path.join(uploadsFolder, path.basename(resume.thumbnaillink))
                    if(fs.existsSync(oldProfile))
                    {
                        fs.unlinkSync(oldProfile)

                    }
                    resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`
                }
                await resume.save();
                res.status(200).json({
                    message:"Image uploaded successfully",
                    thumbnaillink: resume.thumbnaillink,
                    profilePreviewUrl: resume.profileInfo.profilePreviewUrl
                })
            }
            
        });
    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
