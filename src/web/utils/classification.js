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

const calculateClassification = (modules) => {

    const latestResults = getLatestModuleResults(modules);
    const groupedModules = groupByYear(latestResults);

    const finalAvg = calculateFinalAvg(groupedModules);
    const creditsByYear = calculateYearCredits(groupedModules)

    let totalCredits = 0;
    Object.keys(creditsByYear).forEach(year => {
            totalCredits += creditsByYear[year];
    });

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
    
    let classification;

    if (totalCredits === 360 && allYearsValid && !hasOutstandingFails){
        if (finalAvg >= 70){
            classification = "First"
        } else if (finalAvg >=60){
            classification = "2:1"
        } else if (finalAvg >=50){
            classification = "2:2"
        } else if (finalAvg >=40){
            classification = "3rd"
        } else {
            classification = "Fail"
        }
    } else {
        classification = "Not eligible"
    }

    return classification;

};

export default { calculateYearAvg, calculateYearCredits, calculateFinalAvg, groupByYear, getLatestModuleResults, calculateClassification }