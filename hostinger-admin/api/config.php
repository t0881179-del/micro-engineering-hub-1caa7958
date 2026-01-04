<?php
/**
 * Database Configuration
 * Update these values with your Hostinger database credentials
 */

// CORS Headers - Allow requests from your domain
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database credentials
define('DB_HOST', 'localhost');
define('DB_NAME', 'u770567693_microeng_admin');
define('DB_USER', 'u770567693_microggn');
define('DB_PASS', '.pdJjh?4Y^23bij');

// JWT Secret for authentication
define('JWT_SECRET', 'microeng-admin-secret-2024-xyz');

// Session configuration
session_start();

/**
 * Database Connection Class
 */
class Database {
    private $host = DB_HOST;
    private $db_name = DB_NAME;
    private $username = DB_USER;
    private $password = DB_PASS;
    public $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            error_log("Connection error: " . $exception->getMessage());
            return null;
        }

        return $this->conn;
    }
}

/**
 * Response helper function
 */
function sendResponse($success, $data = null, $message = '', $code = 200) {
    http_response_code($code);
    echo json_encode([
        'success' => $success,
        'data' => $data,
        'message' => $message
    ]);
    exit();
}

/**
 * Simple token validation
 */
function validateToken() {
    $headers = getallheaders();
    $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';
    
    if (empty($authHeader) || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        sendResponse(false, null, 'Unauthorized', 401);
    }
    
    $token = $matches[1];
    
    // Verify token (simple approach - in production use proper JWT)
    if (!isset($_SESSION['admin_token']) || $_SESSION['admin_token'] !== $token) {
        sendResponse(false, null, 'Invalid token', 401);
    }
    
    return true;
}
?>
