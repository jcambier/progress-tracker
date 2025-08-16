import { convertWeight } from "./weight-helper.js"

/**
 * Helper functions used for determining display verbiage.
 */

export const getGreetingVerbiage = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
        return "Good morning!";
    } else if (hour < 18) {
        return "Good afternoon!";
    } else {
        return "Good evening!";
    }
}

// progress: a decimal number from 0 to 100
export const getProgressVerbiage = (progress) => {
    if (progress >= 100) {
        return "Congratulations! You've reached your goal weight!";
    } else if (progress >= 75) {
        return "Great job! You're almost there!";
    } else if (progress >= 50) {
        return "You're making good progress, keep it up!";
    } else if (progress >= 25) {
        return "Keep going, don't give up!";
    } else if (progress > 0) {
        return "You're off to a great start!";
    } else {
        return "Congratulations on starting your journey!";
    }
}

// Given a weight (combination of value and units) and a selected unit, returns converted weight value. 
// Rounds to two decimal places for display purposes.
export const getWeightDisplayValue = (weight, selectedUnits) => {
    if (weight === null) {
        return null;
    }
    const converted = convertWeight(weight, selectedUnits);
    return Math.round(converted * 100) / 100;
}

// Rounds the given value to two decimal places and returns its absolute value. Similar to 
// getWeightDisplayValue, but for values that don't require unit conversion.
export const getDisplayValue = (value) => {
    if (value === null) {
        return null;
    }
    return Math.abs(Math.round(value * 100) / 100);
}

export const getWeightChangeDisplayValue = (initialWeight, currentWeight, goalWeight) => {
    initialWeight = getWeightDisplayValue(initialWeight, "lbs");
    currentWeight = getWeightDisplayValue(currentWeight, "lbs");
    goalWeight = getWeightDisplayValue(goalWeight, "lbs");
    if (currentWeight === null || currentWeight === initialWeight) {
        if (goalWeight > initialWeight) {
            return "gained";
        } else {
            return "lost";
        }
    } else if (currentWeight > initialWeight) {
        return "gained";
    } else if (currentWeight < initialWeight) {
        return "lost";
    } 
}