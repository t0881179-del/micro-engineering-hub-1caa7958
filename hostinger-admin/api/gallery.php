<?php
/**
 * Gallery API
 * CRUD operations for gallery images
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
        if ($action === 'categories') {
            getCategories($db);
        } else {
            getGalleryImages($db);
        }
        break;
    case 'POST':
        validateToken();
        addGalleryImage($db);
        break;
    case 'PUT':
        validateToken();
        updateGalleryImage($db);
        break;
    case 'DELETE':
        validateToken();
        deleteGalleryImage($db);
        break;
    default:
        sendResponse(false, null, 'Method not allowed', 405);
}

function getGalleryImages($db) {
    try {
        $category = isset($_GET['category']) ? $_GET['category'] : null;
        $onlyVisible = isset($_GET['visible']) ? $_GET['visible'] === 'true' : false;
        
        $query = "SELECT * FROM gallery_images";
        $conditions = [];
        
        if ($category && $category !== 'all') {
            $conditions[] = "category = :category";
        }
        
        if ($onlyVisible) {
            $conditions[] = "is_visible = 1";
        }
        
        if (!empty($conditions)) {
            $query .= " WHERE " . implode(" AND ", $conditions);
        }
        
        $query .= " ORDER BY sort_order ASC, created_at DESC";
        
        $stmt = $db->prepare($query);
        
        if ($category && $category !== 'all') {
            $stmt->bindParam(':category', $category);
        }
        
        $stmt->execute();
        $images = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        sendResponse(true, $images);
        
    } catch(PDOException $e) {
        error_log("Get gallery error: " . $e->getMessage());
        sendResponse(false, null, 'Failed to fetch gallery images', 500);
    }
}

function getCategories($db) {
    try {
        $query = "SELECT DISTINCT category FROM gallery_images ORDER BY category";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $categories = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        sendResponse(true, $categories);
        
    } catch(PDOException $e) {
        sendResponse(false, null, 'Failed to fetch categories', 500);
    }
}

function addGalleryImage($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    if (!isset($data->title) || !isset($data->image_url)) {
        sendResponse(false, null, 'Title and image URL required', 400);
    }
    
    try {
        $query = "INSERT INTO gallery_images (title, description, image_url, category, is_visible, sort_order) 
                  VALUES (:title, :description, :image_url, :category, :is_visible, :sort_order)";
        
        $stmt = $db->prepare($query);
        
        $title = htmlspecialchars(strip_tags($data->title));
        $description = isset($data->description) ? htmlspecialchars(strip_tags($data->description)) : '';
        $imageUrl = htmlspecialchars(strip_tags($data->image_url));
        $category = isset($data->category) ? htmlspecialchars(strip_tags($data->category)) : 'general';
        $isVisible = isset($data->is_visible) ? ($data->is_visible ? 1 : 0) : 1;
        $sortOrder = isset($data->sort_order) ? intval($data->sort_order) : 0;
        
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':image_url', $imageUrl);
        $stmt->bindParam(':category', $category);
        $stmt->bindParam(':is_visible', $isVisible);
        $stmt->bindParam(':sort_order', $sortOrder);
        
        $stmt->execute();
        
        $newId = $db->lastInsertId();
        sendResponse(true, ['id' => $newId], 'Image added successfully');
        
    } catch(PDOException $e) {
        error_log("Add gallery error: " . $e->getMessage());
        sendResponse(false, null, 'Failed to add image', 500);
    }
}

function updateGalleryImage($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    if (!isset($data->id)) {
        sendResponse(false, null, 'Image ID required', 400);
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
        if (isset($data->image_url)) {
            $updates[] = "image_url = :image_url";
            $params[':image_url'] = htmlspecialchars(strip_tags($data->image_url));
        }
        if (isset($data->category)) {
            $updates[] = "category = :category";
            $params[':category'] = htmlspecialchars(strip_tags($data->category));
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
        
        $query = "UPDATE gallery_images SET " . implode(", ", $updates) . " WHERE id = :id";
        $stmt = $db->prepare($query);
        
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        
        $stmt->execute();
        sendResponse(true, null, 'Image updated successfully');
        
    } catch(PDOException $e) {
        error_log("Update gallery error: " . $e->getMessage());
        sendResponse(false, null, 'Failed to update image', 500);
    }
}

function deleteGalleryImage($db) {
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    
    if ($id <= 0) {
        sendResponse(false, null, 'Valid image ID required', 400);
    }
    
    try {
        $query = "DELETE FROM gallery_images WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        
        sendResponse(true, null, 'Image deleted successfully');
        
    } catch(PDOException $e) {
        error_log("Delete gallery error: " . $e->getMessage());
        sendResponse(false, null, 'Failed to delete image', 500);
    }
}
?>
