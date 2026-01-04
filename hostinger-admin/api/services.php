<?php
/**
 * Services API
 * CRUD operations for services
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
        getServices($db);
        break;
    case 'POST':
        validateToken();
        addService($db);
        break;
    case 'PUT':
        validateToken();
        updateService($db);
        break;
    case 'DELETE':
        validateToken();
        deleteService($db);
        break;
    default:
        sendResponse(false, null, 'Method not allowed', 405);
}

function getServices($db) {
    try {
        $onlyVisible = isset($_GET['visible']) ? $_GET['visible'] === 'true' : false;
        
        $query = "SELECT * FROM services";
        
        if ($onlyVisible) {
            $query .= " WHERE is_visible = 1";
        }
        
        $query .= " ORDER BY sort_order ASC, created_at DESC";
        
        $stmt = $db->prepare($query);
        $stmt->execute();
        $services = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        sendResponse(true, $services);
        
    } catch(PDOException $e) {
        error_log("Get services error: " . $e->getMessage());
        sendResponse(false, null, 'Failed to fetch services', 500);
    }
}

function addService($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    if (!isset($data->title)) {
        sendResponse(false, null, 'Service title required', 400);
    }
    
    try {
        $query = "INSERT INTO services (title, description, icon, is_visible, sort_order) 
                  VALUES (:title, :description, :icon, :is_visible, :sort_order)";
        
        $stmt = $db->prepare($query);
        
        $title = htmlspecialchars(strip_tags($data->title));
        $description = isset($data->description) ? htmlspecialchars(strip_tags($data->description)) : '';
        $icon = isset($data->icon) ? htmlspecialchars(strip_tags($data->icon)) : '';
        $isVisible = isset($data->is_visible) ? ($data->is_visible ? 1 : 0) : 1;
        $sortOrder = isset($data->sort_order) ? intval($data->sort_order) : 0;
        
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':icon', $icon);
        $stmt->bindParam(':is_visible', $isVisible);
        $stmt->bindParam(':sort_order', $sortOrder);
        
        $stmt->execute();
        
        $newId = $db->lastInsertId();
        sendResponse(true, ['id' => $newId], 'Service added successfully');
        
    } catch(PDOException $e) {
        error_log("Add service error: " . $e->getMessage());
        sendResponse(false, null, 'Failed to add service', 500);
    }
}

function updateService($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    if (!isset($data->id)) {
        sendResponse(false, null, 'Service ID required', 400);
    }
    
    try {
        $updates = [];
        $params = [':id' => $data->id];
        
        if (isset($data->title)) {
            $updates[] = "title = :title";
            $params[':title'] = htmlspecialchars(strip_tags($data->title));
        }
        if (isset($data->description)) {
            $updates[] = "description = :description";
            $params[':description'] = htmlspecialchars(strip_tags($data->description));
        }
        if (isset($data->icon)) {
            $updates[] = "icon = :icon";
            $params[':icon'] = htmlspecialchars(strip_tags($data->icon));
        }
        if (isset($data->is_visible)) {
            $updates[] = "is_visible = :is_visible";
            $params[':is_visible'] = $data->is_visible ? 1 : 0;
        }
        if (isset($data->sort_order)) {
            $updates[] = "sort_order = :sort_order";
            $params[':sort_order'] = intval($data->sort_order);
        }
        
        if (empty($updates)) {
            sendResponse(false, null, 'No fields to update', 400);
        }
        
        $query = "UPDATE services SET " . implode(", ", $updates) . " WHERE id = :id";
        $stmt = $db->prepare($query);
        
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        
        $stmt->execute();
        sendResponse(true, null, 'Service updated successfully');
        
    } catch(PDOException $e) {
        error_log("Update service error: " . $e->getMessage());
        sendResponse(false, null, 'Failed to update service', 500);
    }
}

function deleteService($db) {
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    
    if ($id <= 0) {
        sendResponse(false, null, 'Valid service ID required', 400);
    }
    
    try {
        $query = "DELETE FROM services WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        
        sendResponse(true, null, 'Service deleted successfully');
        
    } catch(PDOException $e) {
        error_log("Delete service error: " . $e->getMessage());
        sendResponse(false, null, 'Failed to delete service', 500);
    }
}
?>
