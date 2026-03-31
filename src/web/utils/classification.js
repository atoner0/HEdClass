const calculateYearAvg = (groupedModules) => {
    let totalMarks = 0;
    let totalCredits = 0;

    groupedModules.forEach(m => {
        const mark = m.capped_mark;
        totalMarks += mark * m.credits;
        totalCredits += m.credits
    });

    return (totalMarks/totalCredits).toFixed(2);
};

const calculateYearCredits = (groupedModules) => {
    const creditsByYear = {};

    Object.keys(groupedModules).forEach(year => {
        let total = 0;

        groupedModules[year].forEach(mod => {
            if(mod.passed === 1){
                total += Number(mod.credits);
            }
        });

        creditsByYear[year] = total;
    });

    return creditsByYear;
}

const calculateFinalAvg = (groupedModules) => {
    const y2Avg = calculateYearAvg(groupedModules[2] || []);
    const y3Avg = calculateYearAvg(groupedModules[3] || []);

    const finalAvg = Number(((y2Avg * 0.3) + (y3Avg * 0.7)).toFixed(2));

    return finalAvg;
};

const groupByYear = (modules) => {
    const groupedModules = {};
        modules.forEach(mod => {
        if (!groupedModules[mod.academic_level]) {
            groupedModules[mod.academic_level] = [];
        }
        groupedModules[mod.academic_level].push(mod);
    });

    return groupedModules;
}

const getLatestModuleResults = (modules) => {
    const latestResults = {};

    modules.forEach(mod => {
        const id = mod.moduleId;

        if (!latestResults[id] || mod.attempt_no > latestResults[id].attempt_no ) {
            latestResults[id] = mod;
        }
    });

    return Object.values(latestResults);
}

const calculateClassificationResults = (modules) => {

    const latestResults = getLatestModuleResults(modules);
    const groupedModules = groupByYear(latestResults);

    const creditsByYear = calculateYearCredits(groupedModules)

    const yr1Creds = creditsByYear[1] || 0;
    const yr2Creds = creditsByYear[2] || 0;
    const yr3Creds = creditsByYear[3] || 0;
    let totalCredits = yr1Creds + yr2Creds + yr3Creds;

    const yr2Avg = calculateYearAvg(groupedModules[2] || []);
    const yr3Avg = calculateYearAvg(groupedModules[3] || []);
    const finalAvg = calculateFinalAvg(groupedModules);

    let allYearsValid = true;
    Object.values(creditsByYear).forEach(credits => {
        if (credits < 120) {
            allYearsValid = false;
        }
    });

    let hasOutstandingFails = false;
    latestResults.forEach(mod => {
        if (mod.passed === 0){
            hasOutstandingFails = true;
        }
    })

    let isEligible = true;
    let eligibilityReason = "All credits passed & No outstanding failed modules"

    if(totalCredits !== 360) {
        isEligible = false;
        eligibilityReason = "Student does not have 360 total credits";
    } else if (!allYearsValid){
        isEligible = false;
        eligibilityReason = "Student does not have 120 credits in each year"
    } else if (hasOutstandingFails){
        isEligible = false;
        eligibilityReason = "Student has outstanding failed modules"
    }

    let proposedClass = "Pending review";
    let needsReview = false;
    let reviewReason = "";

    if (isEligible){
        if (finalAvg >= 70){
            proposedClass = "First"
        } else if (finalAvg >=68 && finalAvg < 70) {
            needsReview = true;
            reviewReason = "Borderline First classification";
        } else if (finalAvg >=60){
            proposedClass = "2:1"
        } else if (finalAvg >=58 && finalAvg < 60) {
            needsReview = true;
            reviewReason = "Borderline 2:1 classification";
        } else if (finalAvg >=50){
            proposedClass = "2:2"
        } else if (finalAvg >=48 && finalAvg < 50) {
            needsReview = true;
            reviewReason = "Borderline 2:2 classification";
        } else if (finalAvg >=40){
            proposedClass = "3rd"
        } else if (finalAvg >=38 && finalAvg < 40) {
            needsReview = true;
            reviewReason = "Borderline Third/Fail classification";
        } else {
            proposedClass = "Fail"
        }
    } else {
        needsReview = true;
        reviewReason = eligibilityReason;
    }

    const rationale = buildRationale({yr1Creds, yr2Creds, yr3Creds, yr2Avg, yr3Avg, finalAvg, isEligible, hasOutstandingFails});

    return {creditsByYear, yr1Creds, yr2Creds, yr3Creds, yr2Avg, yr3Avg, finalAvg, proposedClass, isEligible, 
                eligibilityReason, rationale, needsReview, reviewReason};

    }

const buildRationale = ({yr1Creds, yr2Creds, yr3Creds, yr2Avg, yr3Avg, finalAvg, isEligible, hasOutstandingFails}) => {
        if (!isEligible){
            return `<ul>
                        <li><strong>Student not eligible for classification.</strong></li>
                        <li><strong>Credits achieved:</strong>
                            <ul>
                                <li>Year 1 - ${yr1Creds}</li>
                                <li>Year 2 - ${yr2Creds}</li>
                                <li>Year 3 - ${yr3Creds}</li>
                            </ul>
                        </li>
                        <li><strong>Outstanding Fails:</strong> ${hasOutstandingFails ? "Yes" : "No"}</li>
                    </ul>`
        } else {
            return `<ul>
                        <li><strong>Credits achieved:</strong>
                            <ul>
                                <li>Year 1 - ${yr1Creds}</li>
                                <li>Year 2 - ${yr2Creds}</li>
                                <li>Year 3 - ${yr3Creds}</li>
                            </ul>
                        </li>
                        <li><strong>Averages:</strong>
                            <ul>
                                <li>Year 2 - ${yr2Avg}</li>
                                <li>Year 3 - ${yr3Avg}</li>
                                <li>Final - ${Number(finalAvg).toFixed(2)} (using 30/70 weighting)</li>
                            </ul>
                        </li>
                        <li><strong>Outstanding Fails:</strong> ${hasOutstandingFails ? "Yes" : "No"}</li>
                    </ul>`
        }
};

const calculateStatusCounts = (classifications) => {
    let reviewCount = 0;
    let approvedCount = 0;

    const classifiedCount = classifications.length;

    classifications.forEach(classification => {
        if (classification.needs_review) {
            reviewCount ++;
        } else if (classification.is_approved){
            approvedCount ++;
        }
    });

    return {classifiedCount, reviewCount, approvedCount}
}

export default { calculateYearAvg, calculateYearCredits, calculateFinalAvg, groupByYear, getLatestModuleResults, calculateClassificationResults,
                    calculateStatusCounts
 }