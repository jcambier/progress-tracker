import "../css/initial-weight-entry.css"

// Imports - helpers
import { Weight } from "../util/weight-helper"

// Imports - bootstrap
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form'

// Captures user's initial weight, their starting date, and their goal weight (in lbs or kg).
const InitialWeightEntry = ({setInitialWeight, setGoalWeight, setStartingDate}) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const initialWeight = new Weight(formData.get("initialWeight"), formData.get("unit"));
        const goalWeight = new Weight(formData.get("goalWeight"), formData.get("unit"));
        setStartingDate(formData.get("date"));
        setInitialWeight(initialWeight);
        setGoalWeight(goalWeight);
    }

    return (
        <Form className="initial-weight-form" onSubmit={handleSubmit}>
            <Form.Group className="initial-weight-form-item">
                <Form.Label>Starting Date</Form.Label>
                <Form.Control
                    required={true}
                    type="date"
                    name="date"
                />
            </Form.Group>
            <Form.Group className="initial-weight-form-item">
                <Form.Label>Starting Weight</Form.Label>
                <Form.Control 
                    required={true}
                    type="number"
                    name="initialWeight"
                />
            </Form.Group>
            <Form.Group className="initial-weight-form-item">
                <Form.Label>Goal Weight</Form.Label>
                <Form.Control 
                    required={true}
                    type="number"
                    name="goalWeight"
                />
            </Form.Group>
            <Form.Group className="initial-weight-form-item">
                <Form.Label>Unit</Form.Label>
                <Form.Select name="unit">
                    <option>lbs</option>
                    <option>kg</option>
                </Form.Select>
            </Form.Group>
            <Button type="submit" variant="primary" className="initial-weight-form-button" size="lg">Submit</Button>
        </Form>
    );
}

export default InitialWeightEntry;