import "../css/settings-bar.css";

// Imports - bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Allows user to switch between lbs and kg for display purposes and view all captured weight data
const SettingsBar = ({ setSelectedUnits, setIsModalOpen }) => {
    return (
        <div className="settings-bar">
            <div className="unit-select-widget">
                <Form.Label>Units:</Form.Label>
                <Form.Select 
                    className="settings-bar-element" 
                    name="unit" 
                    size="sm"
                    defaultValue="lbs"
                    onChange={(e) => setSelectedUnits(e.target.value)}
                >
                    <option value="lbs">lbs</option>
                    <option value="kg">kg</option>
                </Form.Select>
            </div>
            <Button variant="light" size="sm" className="settings-bar-element" onClick={setIsModalOpen}>
                View all weight data
            </Button>
        </div>
    );
}

export default SettingsBar;
