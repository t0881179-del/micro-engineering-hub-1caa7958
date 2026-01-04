<?php
/**
 * Admin Authentication API
 */
require_once 'config.php';

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    sendResponse(false, null, 'Database connection failed', 500);
}

$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'login':
        handleLogin($db);
        break;
    case 'logout':
        handleLogout();
        break;
    case 'check':
        checkAuth();
        break;
    case 'change-password':
        changePassword($db);
        break;
    default:
        sendResponse(false, null, 'Invalid action', 400);
}

function handleLogin($db) {
    $data = json_decode(file_get_contents("php://input"));
    
    if (!isset($data->username) || !isset($data->password)) {
        sendResponse(false, null, 'Username and password required', 400);
    }
    
    $username = htmlspecialchars(strip_tags($data->username));
    $password = $data->password;
    
    try {
        $query = "SELECT id, username, password FROM admin_users WHERE username = :username LIMIT 1";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (password_verify($password, $row['password'])) {
                // Generate simple token
                $token = bin2hex(random_bytes(32));
                $_SESSION['admin_token'] = $token;
                $_SESSION['admin_id'] = $row['id'];
                $_SESSION['admin_username'] = $row['username'];
                
                sendResponse(true, [
                    'token' => $token,
                    'username' => $row['username']
                ], 'Login successful');
            }
        }
        
        sendResponse(false, null, 'Invalid username or password', 401);
        
    } catch(PDOException $e) {
        error_log("Login error: " . $e->getMessage());
        sendResponse(false, null, 'Login failed', 500);
    }
}

function handleLogout() {
    session_destroy();
    sendResponse(true, null, 'Logged out successfully');
}

function checkAuth() {
    $headers = getallheaders();
    $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';
    
    if (!empty($authHeader) && preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        $token = $matches[1];
        if (isset($_SESSION['admin_token']) && $_SESSION['admin_token'] === $token) {
            sendResponse(true, [
                'username' => $_SESSION['admin_username']
            ], 'Authenticated');
        }
    }
    
    sendResponse(false, null, 'Not authenticated', 401);
}

function changePassword($db) {
    validateToken();
    
    $data = json_decode(file_get_contents("php://input"));
    
    if (!isset($data->current_password) || !isset($data->new_password)) {
        sendResponse(false, null, 'Current and new password required', 400);
    }
    
    $adminId = $_SESSION['admin_id'];
    
    try {
        // Verify current password
        $query = "SELECT password FROM admin_users WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $adminId);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!password_verify($data->current_password, $row['password'])) {
            sendResponse(false, null, 'Current password is incorrect', 400);
        }
        
        // Update password
        $newPasswordHash = password_hash($data->new_password, PASSWORD_DEFAULT);
        $updateQuery = "UPDATE admin_users SET password = :password WHERE id = :id";
        $updateStmt = $db->prepare($updateQuery);
        $updateStmt->bindParam(':password', $newPasswordHash);
        $updateStmt->bindParam(':id', $adminId);
        $updateStmt->execute();
        
        sendResponse(true, null, 'Password changed successfully');
        
    } catch(PDOException $e) {
        error_log("Password change error: " . $e->getMessage());
        sendResponse(false, null, 'Failed to change password', 500);
    }
}
?>
