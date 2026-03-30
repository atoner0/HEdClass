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


    if (isEligible){
        if (finalAvg >= 70){
            proposedClass = "First"
        } else if (finalAvg >=60){
            proposedClass = "2:1"
        } else if (finalAvg >=50){
            proposedClass = "2:2"
        } else if (finalAvg >=40){
            proposedClass = "3rd"
        } else {
            proposedClass = "Fail"
        }
    }

    return {creditsByYear, yr1Creds, yr2Creds, yr3Creds, yr2Avg, yr3Avg, finalAvg, proposedClass, isEligible, eligibilityReason};

};

export default { calculateYearAvg, calculateYearCredits, calculateFinalAvg, groupByYear, getLatestModuleResults, calculateClassificationResults }