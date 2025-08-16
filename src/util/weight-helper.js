/**
 * Helper functions used for weight conversion and progress calculation.
 */

export class Weight {
    constructor(value, unit) {
        this.value = value;
        this.unit = unit;
    }
}

export const lbsToKg = (lbs) => {
    return lbs * 0.45359237;
}

export const kgToLbs = (kg) => {
    return kg / 0.45359237;
}

export const convertWeight = (weight, selectedUnits) => {
    if (weight.unit === selectedUnits) {
        return weight.value;
    } else {
        // If stored weight does not match selected units, convert and round.
        if (weight.units === "kg") {
            return kgToLbs(weight.value);
        } else {
            return lbsToKg(weight.value);
        }
    }
}

export const computeWeightProgress = (initialWeight, currentWeight, goalWeight) => {
    if (initialWeight == null || currentWeight == null || goalWeight == null) {
        return 0;
    }

    initialWeight = initialWeight.unit === "kg" ? kgToLbs(initialWeight.value) : initialWeight.value;
    currentWeight = currentWeight.unit === "kg" ? kgToLbs(currentWeight.value) : currentWeight.value;
    goalWeight = goalWeight.unit === "kg" ? kgToLbs(goalWeight.value) : goalWeight.value;

    let progress = ((currentWeight - initialWeight) / (goalWeight - initialWeight)) * 100;
    return Math.min(Math.max(0, progress), 100)
}

export const getLatestWeight = (weightData) => {
    const dates = Object.keys(weightData);
    if (dates.length === 0) return [null, null];
    const latestDate = dates.sort().pop();
    return [weightData[latestDate], latestDate];
}

export const computeWeightChange = (initialWeight, currentWeight, selectedUnits) => {
    if (initialWeight == null || currentWeight == null) {
        return 0;
    }

    initialWeight = convertWeight(initialWeight, selectedUnits);
    currentWeight = convertWeight(currentWeight, selectedUnits);

    let weightChange = currentWeight - initialWeight;
    return weightChange;
}

export const getAverageDailyWeightChange = (weightChange, startingDate, currentDate) => {
    // Parse the date strings as UTC dates
    const start = new Date(startingDate + "T00:00:00Z");
    const end = new Date(currentDate + "T00:00:00Z");
    const daysRemaining = (end - start) / (1000 * 60 * 60 * 24);
    return daysRemaining > 0 ? weightChange / daysRemaining : 0;
}

export const getProjectedCompletionDays = (averageDailyChange, selectedUnits, currentWeight, goalWeight) => {
    if (currentWeight == null || goalWeight == null) {
        return null;
    }
    currentWeight = convertWeight(currentWeight, selectedUnits);
    goalWeight = convertWeight(goalWeight, selectedUnits);

    return Math.ceil((goalWeight - currentWeight) / averageDailyChange);
}