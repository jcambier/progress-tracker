import "../css/daily-weight-entry.css"

// Imports - helpers
import { Weight } from "../util/weight-helper"

// Imports - bootstrap
import BootstrapAccordion from 'react-bootstrap/Accordion'
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form'

// Allows users to enter weight in lbs or kg for a specific date.
const DailyWeightEntry = ({ setWeightData }) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const date = formData.get("date");
        const weight = formData.get("weight");
        const unit = formData.get("unit");
        // Will update existing entry or create a new one
        setWeightData((prevData) => ({
            ...prevData,
            [date]: new Weight(weight, unit)
        }));
    }

    return (
        <BootstrapAccordion className="enter-weight-accordion" defaultActiveKey={null}>
            <BootstrapAccordion.Item eventKey="0">
                <BootstrapAccordion.Header>Enter weight data</BootstrapAccordion.Header>
                <BootstrapAccordion.Body>
                    <Form className="daily-weight-form" onSubmit={handleSubmit}>
                        <Form.Group className="daily-weight-form-item">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                required={true}
                                type="date"
                                name="date"
                            />
                        </Form.Group>
                        <Form.Group className="daily-weight-form-item">
                            <Form.Label>Weight</Form.Label>
                            <Form.Control
                                required={true}
                                type="number"
                                name="weight"
                                placeholder="Enter your weight"
                            />
                        </Form.Group>
                        <Form.Group className="daily-weight-form-item">
                            <Form.Label>Unit</Form.Label>
                            <Form.Select name="unit">
                                <option value="lbs">lbs</option>
                                <option value="kg">kg</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary"
                            type="submit"
                            className="daily-weight-form-button"
                            size="lg">
                            Save
                        </Button>
                    </Form>
                </BootstrapAccordion.Body>
            </BootstrapAccordion.Item>
        </BootstrapAccordion>
    );
}

export default DailyWeightEntry;