// Imports - bootstrap
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Modal from 'react-bootstrap/Modal';

// Component that appears when user clicks "View Weight History" in the settings bar. 
// All information is sorted by date.
const WeightHistoryModal = ({ weightData, isOpen, setIsOpen }) => {
    
    const handleClose = () => {
        setIsOpen(false);
    }
    
    return (
        <Modal show={isOpen} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Weight History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {Object.keys(weightData).length === 0 ? (
                    <p>No weight data available.</p>
                ) : (
                    <ListGroup>
                        {Object.entries(weightData).sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB)).map(([date, weight]) => (
                            <ListGroupItem key={date}>
                                {date}: {weight.value} {weight.unit}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default WeightHistoryModal;