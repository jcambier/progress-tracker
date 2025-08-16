import "../css/weight-progress-bar.css";

// Imports - helpers
import { computeWeightProgress } from '../util/weight-helper';
import { getProgressVerbiage } from '../util/display-helper';
import { getWeightDisplayValue } from "../util/display-helper";

// Imports - bootstrap
import ProgressBar from 'react-bootstrap/ProgressBar';

// Component responsible for displaying a progress bar using initial, current, and goal weights.
const WeightProgressBar = ({initialWeight, currentWeight, goalWeight, selectedUnits}) => {

    const progress = computeWeightProgress(initialWeight, currentWeight, goalWeight);

    return (
        <div className="progress-information">
            <div className="weight-information-row">
                <div className="weight-row-entry">
                    <p>Starting:</p>
                    <p>{getWeightDisplayValue(initialWeight, selectedUnits)} {selectedUnits}</p>
                </div>
                {currentWeight && (
                    <div className="weight-row-entry">
                        <p>Latest:</p>
                        <p>{getWeightDisplayValue(currentWeight, selectedUnits)} {selectedUnits}</p>
                    </div>
                )}
                <div className="weight-row-entry">
                    <p>Goal:</p>
                    <p>{getWeightDisplayValue(goalWeight, selectedUnits)} {selectedUnits}</p>
                </div>
            </div>
            <ProgressBar 
                striped 
                animated 
                variant="success" 
                now={progress}
            />
            <p>{getProgressVerbiage(progress)}</p>
        </div>
    );
}

export default WeightProgressBar;