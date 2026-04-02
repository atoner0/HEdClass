import officerModel from "../../web/models/officerModel.js";
import classificationCalc from "../../web/utils/classification.js";

const runBatchClassification = async (req, res) => {
    try {    
        const user = req.session.user;
        if (!user) {
            return res.redirect("/");
        }
    
        const programmeId = req.params.programmeId;
    
        const students = await officerModel.getStudents(programmeId);

        let processedStudents = 0;

            for (const student of students){
        const studentId = student.id;

        const modules = await officerModel.getModulesResults(studentId);

        const classificationData = classificationCalc.calculateClassificationResults(modules);

        await officerModel.addClassification(studentId, classificationData.yr1Creds, classificationData.yr2Creds, classificationData.yr3Creds,
                                                classificationData.yr2Avg, classificationData.yr3Avg, classificationData.finalAvg, 
                                                classificationData.proposedClass, classificationData.isEligible, classificationData.eligibilityReason,
                                                classificationData.rationale, classificationData.needsReview, classificationData.reviewReason, user.id
        );

        processedStudents++;
    }

    return res.status(200).json({
        success: true,
        message: `${processedStudents} students classified successfully`,
        programmeId,
        processedStudents
    });
    } catch (error){
        console.error("Batch classification API error:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to run batch classification"
     });
    }
  
};

export default { runBatchClassification };