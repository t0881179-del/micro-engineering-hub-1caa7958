<?php
/**
 * Contact Form API
 * Handle contact form submissions
 */
require_once 'config.php';

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    sendResponse(false, null, 'Database connection failed', 500);
}

$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($method) {
    case 'GET':
        validateToken();
        getSubmissions($db);
        break;
    case 'POST':
        submitContact($db);
        break;
    case 'PUT':
        validateToken();
        if ($action === 'mark-read') {
            markAsRead($db);
        }
        break;
    case 'DELETE':
        validateToken();
        deleteSubmission($db);
        break;
    default:
        sendResponse(false, null, 'Method not allowed', 405);
}

function getSubmissions($db) {
    try {
        $unreadOnly = isset($_GET['unread']) ? $_GET['unread'] === 'true' : false;
        
        $query = "SELECT * FROM contact_submissions";
        
        if ($unreadOnly) {
            $query .= " WHERE is_read = 0";
        }
        
        $query .= " ORDER BY created_at DESC";
        
        $stmt = $db->prepare($query);
        $stmt->execute();
        $submissions = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Get unread count
        $countQuery = "SELECT COUNT(*) as unread_count FROM contact_submissions WHERE is_read = 0";
        $countStmt = $db->prepare($countQuery);
        $countStmt->execute();
        $countRow = $countStmt->fetch(PDO::FETCH_ASSOC);
        
        sendResponse(true, [
            'submissions' => $submissions,
            'unread_count' => intval($countRow['unread_count'])
        ]);
        
    } catch(PDOException $e) {
        error_log("Get submissions error: " . $e->getMessage());
        sendResponse(false, null, 'Failed to fetch submissions', 500);
    }
}

function submitContact($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    if (!isset($data->name) || !isset($data->email) || !isset($data->message)) {
        sendResponse(false, null, 'Name, email and message are required', 400);
    }
    
    // Basic email validation
    if (!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
        sendResponse(false, null, 'Invalid email address', 400);
    }
    
    try {
        $query = "INSERT INTO contact_submissions (name, email, phone, company, message) 
                  VALUES (:name, :email, :phone, :company, :message)";
        
        $stmt = $db->prepare($query);
        
        $name = htmlspecialchars(strip_tags($data->name));
        $email = htmlspecialchars(strip_tags($data->email));
        $phone = isset($data->phone) ? htmlspecialchars(strip_tags($data->phone)) : '';
        $company = isset($data->company) ? htmlspecialchars(strip_tags($data->company)) : '';
        $message = htmlspecialchars(strip_tags($data->message));
        
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':company', $company);
        $stmt->bindParam(':message', $message);
        
        $stmt->execute();
        
        sendResponse(true, null, 'Message sent successfully');
        
    } catch(PDOException $e) {
        error_log("Submit contact error: " . $e->getMessage());
        sendResponse(false, null, 'Failed to send message', 500);
    }
}

function markAsRead($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    if (!isset($data->id)) {
        sendResponse(false, null, 'Submission ID required', 400);
    }
    
    try {
        $query = "UPDATE contact_submissions SET is_read = 1 WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $data->id);
        $stmt->execute();
        
        sendResponse(true, null, 'Marked as read');
        
    } catch(PDOException $e) {
        sendResponse(false, null, 'Failed to update', 500);
    }
}

function deleteSubmission($db) {
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    
    if ($id <= 0) {
        sendResponse(false, null, 'Valid submission ID required', 400);
    }
    
    try {
        $query = "DELETE FROM contact_submissions WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        
        sendResponse(true, null, 'Submission deleted');
        
    } catch(PDOException $e) {
        sendResponse(false, null, 'Failed to delete', 500);
    }
}
?>
