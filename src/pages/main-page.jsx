import '../css/main-page.css'
import { useState } from 'react'

// Imports - helpers
import { getGreetingVerbiage } from '../util/display-helper'
import { getLatestWeight } from '../util/weight-helper'

// Imports - components
import DailyWeightEntry from "../components/daily-weight-entry"
import InitialWeightEntry from '../components/initial-weight-entry'
import Insights from '../components/insights'
import SettingsBar from '../components/settings-bar'
import WeightProgressBar from '../components/weight-progress-bar'
import WeightHistoryModal from '../modals/weight-history-modal'

// Imports - bootstrap
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'

const MainPage = () => {
    const [startingDate, setStartingDate] = useState(null);
    // Captures initial weight entered by user
    const [initialWeight, setInitialWeight] = useState(null);
    // Captures goal weight entered by user
    const [goalWeight, setGoalWeight] = useState(null);
    // Stores all other weight data (entered by day) in the form of Map<String, Weight>, 
    // where the key is the date.
    const [weightData, setWeightData] = useState({});
    const [selectedUnits, setSelectedUnits] = useState("lbs");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [currentWeight, currentDate] = getLatestWeight(weightData);

    return (
        <div className="main-page">
            <h1>{getGreetingVerbiage()}</h1>
            {/* If user has not yet entered their initial weight and goal, prompt them to do so first*/}
            {initialWeight == null && goalWeight == null &&
                <>
                    <Alert variant='warning'>
                        Before we begin, please enter your starting weight and goal weight below.
                    </Alert>
                    <InitialWeightEntry setInitialWeight={setInitialWeight} setGoalWeight={setGoalWeight} setStartingDate={setStartingDate}/>
                </>
            }
            {/* After initial weight is set, allow for daily entry and progress statistics*/}
            {initialWeight != null && goalWeight != null &&
                <>
                    <WeightHistoryModal weightData={weightData} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
                    <Alert variant='info'>We're glad to see you again. Let's check your progress on your weight goals!</Alert>
                    <DailyWeightEntry weightData={weightData} setWeightData={setWeightData} />
                    <Card className="progress-card">
                        <SettingsBar setSelectedUnits={setSelectedUnits} setIsModalOpen={setIsModalOpen} />
                        <WeightProgressBar 
                            initialWeight={initialWeight} 
                            currentWeight={currentWeight} 
                            goalWeight={goalWeight}
                            selectedUnits={selectedUnits}
                        />
                        <Insights 
                            weightData={weightData} 
                            initialWeight={initialWeight} 
                            goalWeight={goalWeight} 
                            currentWeight={currentWeight}
                            currentDate={currentDate} 
                            startingDate={startingDate}
                            selectedUnits={selectedUnits}
                        />
                    </Card>
                </>
            }
        </div>
    )
}

export default MainPage;