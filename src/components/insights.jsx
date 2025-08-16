import "../css/insights.css";

// Imports - helpers
import { computeWeightChange, getAverageDailyWeightChange, getProjectedCompletionDays } from "../util/weight-helper";
import { getWeightChangeDisplayValue, getDisplayValue } from "../util/display-helper";

// Imports - bootstrap
import Card from 'react-bootstrap/Card';
import { CheckSquareFill } from 'react-bootstrap-icons'

// Displays statistics about user's weight gain/loss
const Insights = ({weightData, initialWeight, currentWeight, goalWeight, selectedUnits, startingDate, currentDate}) => {

    // Either "gained" or "lost", depending on context
    const weightChangeDisplayValue = getWeightChangeDisplayValue(initialWeight, currentWeight, goalWeight);
    // Signed change in weight, unrounded because it will be used in the subsequent calculations.
    const weightChange = computeWeightChange(initialWeight, currentWeight, selectedUnits);
    // Also signed and unrounded.
    const averageDailyWeightChange = getAverageDailyWeightChange(weightChange, startingDate, currentDate);
    // Rounded up to a whole number.
    const projectedCompletionDays = getProjectedCompletionDays(averageDailyWeightChange, selectedUnits, currentWeight, goalWeight);

    return (
        <Card className="insights-card">
            <Card.Body>
                <Card.Title>Insights</Card.Title>
                { Object.keys(weightData).length === 0 &&
                    <p>When you've reported your progress, you'll get personalized statistics here.</p>
                }
                { Object.keys(weightData).length > 0 && (
                    <>
                        <div className="statistic">
                            <CheckSquareFill className="statistic-icon" />
                            <p className="statistic-text">
                                You've {weightChangeDisplayValue} {getDisplayValue(weightChange, selectedUnits)} {selectedUnits}!
                            </p>
                        </div>
                        <div className="statistic">
                            <CheckSquareFill className="statistic-icon" />
                            <p className="statistic-text">
                                You've {weightChangeDisplayValue} an average of {getDisplayValue(averageDailyWeightChange)} {selectedUnits} per day!
                            </p>
                        </div>
                        <div className="statistic">
                            <CheckSquareFill className="statistic-icon" />
                            <p className="statistic-text">
                                At this rate, you'll reach your goal in {projectedCompletionDays} more days.
                            </p>
                        </div>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}

export default Insights;