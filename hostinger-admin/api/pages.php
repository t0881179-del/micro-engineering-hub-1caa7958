<?php
/**
 * Page Settings API
 * Toggle pages on/off
 */
require_once 'config.php';

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    sendResponse(false, null, 'Database connection failed', 500);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getPages($db);
        break;
    case 'PUT':
        validateToken();
        updatePage($db);
        break;
    default:
        sendResponse(false, null, 'Method not allowed', 405);
}

function getPages($db) {
    try {
        $query = "SELECT * FROM page_settings ORDER BY page_name";
        $stmt = $db->prepare($query);
        $stmt->execute();
        
        $pages = $stmt->fetchAll(PDO::FETCH_ASSOC);
        sendResponse(true, $pages);
        
    } catch(PDOException $e) {
        error_log("Get pages error: " . $e->getMessage());
        sendResponse(false, null, 'Failed to fetch pages', 500);
    }
}

function updatePage($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    if (!isset($data->page_name) || !isset($data->is_visible)) {
        sendResponse(false, null, 'Page name and visibility required', 400);
    }
    
    try {
        $query = "UPDATE page_settings SET is_visible = :is_visible WHERE page_name = :page_name";
        $stmt = $db->prepare($query);
        
        $isVisible = $data->is_visible ? 1 : 0;
        $pageName = htmlspecialchars(strip_tags($data->page_name));
        
        $stmt->bindParam(':is_visible', $isVisible);
        $stmt->bindParam(':page_name', $pageName);
        $stmt->execute();
        
        sendResponse(true, null, 'Page updated successfully');
        
    } catch(PDOException $e) {
        error_log("Update page error: " . $e->getMessage());
        sendResponse(false, null, 'Failed to update page', 500);
    }
}
?>
