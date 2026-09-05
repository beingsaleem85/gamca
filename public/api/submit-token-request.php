<?php
/**
 * Gamca Centre - Shared Hosting PHP Submission Handler
 * Works on any cPanel / Apache / Nginx shared hosting server with PHP 7.4+
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit();
}

// Generate unique Application ID
$dateStr = date('Ymd');
$randomPart = strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 5));
$applicationId = "GC-{$dateStr}-{$randomPart}";

// Read form fields
$firstName = sanitize($_POST['firstName'] ?? '');
$lastName = sanitize($_POST['lastName'] ?? '');
$email = sanitize($_POST['email'] ?? '');
$phone = sanitize($_POST['phone'] ?? '');
$passportNumber = sanitize($_POST['passportNumber'] ?? '');
$confirmPassportNumber = sanitize($_POST['confirmPassportNumber'] ?? '');
$examinationCountry = sanitize($_POST['examinationCountry'] ?? 'Pakistan');
$city = sanitize($_POST['city'] ?? '');
$destinationCountry = sanitize($_POST['destinationCountry'] ?? '');
$appointmentType = sanitize($_POST['appointmentType'] ?? '');
$preferredAppointmentDate = sanitize($_POST['preferredAppointmentDate'] ?? '');
$dateOfBirth = sanitize($_POST['dateOfBirth'] ?? '');
$nationality = sanitize($_POST['nationality'] ?? '');
$gender = sanitize($_POST['gender'] ?? '');
$maritalStatus = sanitize($_POST['maritalStatus'] ?? '');
$passportIssueDate = sanitize($_POST['passportIssueDate'] ?? '');
$passportIssuePlace = sanitize($_POST['passportIssuePlace'] ?? '');
$passportExpiryDate = sanitize($_POST['passportExpiryDate'] ?? '');
$visaType = sanitize($_POST['visaType'] ?? '');
$positionApplied = sanitize($_POST['positionApplied'] ?? '');
$otherPosition = sanitize($_POST['otherPosition'] ?? '');
$nationalId = sanitize($_POST['nationalId'] ?? '');
$additionalInformation = sanitize($_POST['additionalInformation'] ?? '');

// Validation
if (empty($firstName) || empty($lastName) || empty($passportNumber) || empty($email) || empty($phone)) {
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
    exit();
}

if ($passportNumber !== $confirmPassportNumber) {
    echo json_encode(['success' => false, 'message' => 'Passport numbers do not match.']);
    exit();
}

// Handle Passport Copy Upload
$uploadDir = __DIR__ . '/uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$passportFilename = '';
$uploadedPassportPath = '';

if (isset($_FILES['passportCopy']) && $_FILES['passportCopy']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['passportCopy']['tmp_name'];
    $fileName = $_FILES['passportCopy']['name'];
    $fileSize = $_FILES['passportCopy']['size'];
    $fileType = $_FILES['passportCopy']['type'];
    
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'pdf'];
    $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    
    if (in_array($fileExtension, $allowedExtensions) && $fileSize <= 5 * 1024 * 1024) {
        $passportFilename = $applicationId . '_PASSPORT_' . time() . '.' . $fileExtension;
        $uploadedPassportPath = $uploadDir . $passportFilename;
        move_uploaded_file($fileTmpPath, $uploadedPassportPath);
    }
}

if (empty($uploadedPassportPath)) {
    echo json_encode(['success' => false, 'message' => 'Please attach a valid passport copy document (PNG, JPG, WEBP, PDF under 5MB).']);
    exit();
}

// Handle Screenshot Upload
$screenshotFilename = '';
$uploadedFilePath = '';

if (isset($_FILES['screenshot']) && $_FILES['screenshot']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['screenshot']['tmp_name'];
    $fileName = $_FILES['screenshot']['name'];
    $fileSize = $_FILES['screenshot']['size'];
    $fileType = $_FILES['screenshot']['type'];
    
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    
    if (in_array($fileExtension, $allowedExtensions) && $fileSize <= 5 * 1024 * 1024) {
        $screenshotFilename = $applicationId . '_SCREENSHOT_' . time() . '.' . $fileExtension;
        $uploadedFilePath = $uploadDir . $screenshotFilename;
        move_uploaded_file($fileTmpPath, $uploadedFilePath);
    }
}

if (empty($uploadedFilePath)) {
    echo json_encode(['success' => false, 'message' => 'Please attach a valid payment screenshot image (PNG, JPG, WEBP under 5MB).']);
    exit();
}

// Format dates to DD-MMM-YYYY
$formattedPreferredDate = formatDateDisplay($preferredAppointmentDate);
$formattedDob = formatDateDisplay($dateOfBirth);
$formattedIssueDate = formatDateDisplay($passportIssueDate);
$formattedExpiryDate = formatDateDisplay($passportExpiryDate);

// 1. Prepare HTML Email for mts.pk@hotmail.com
$to = "mts.pk@hotmail.com";
$subject = "New Gamca Token Request — {$firstName} {$lastName} — {$passportNumber}";

$htmlContent = "
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; color: #333; }
  .container { max-width: 650px; background: #ffffff; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid #e1e8ed; }
  .header { background: #061224; color: #ffffff; padding: 25px 30px; text-align: center; border-bottom: 3px solid #D4AF37; }
  .header h1 { margin: 0; font-size: 24px; color: #D4AF37; font-weight: 700; }
  .header p { margin: 5px 0 0 0; font-size: 13px; color: #94a3b8; }
  .section { padding: 20px 30px; border-bottom: 1px solid #edf2f7; }
  .section-title { font-size: 15px; font-weight: bold; color: #061224; text-transform: uppercase; margin-bottom: 12px; border-left: 4px solid #D4AF37; padding-left: 10px; }
  .row { display: flex; margin-bottom: 8px; font-size: 14px; }
  .label { width: 40%; font-weight: 600; color: #4a5568; }
  .value { width: 60%; color: #1a202c; font-weight: 500; }
  .footer { background: #f8fafc; padding: 15px 30px; font-size: 12px; color: #64748b; text-align: center; }
</style>
</head>
<body>
  <div class='container'>
    <div class='header'>
      <h1>GAMCA CENTRE</h1>
      <p>Official Wafid Medical Token Request Notification</p>
    </div>
    
    <div class='section'>
      <div class='section-title'>1. APPLICATION SUMMARY</div>
      <div class='row'><div class='label'>Application ID:</div><div class='value'><strong>{$applicationId}</strong></div></div>
      <div class='row'><div class='label'>Submission Date:</div><div class='value'>" . date('Y-m-d H:i:s T') . "</div></div>
      <div class='row'><div class='label'>Appointment Type:</div><div class='value'>{$appointmentType}</div></div>
      <div class='row'><div class='label'>Preferred Date:</div><div class='value'>{$formattedPreferredDate}</div></div>
    </div>
    
    <div class='section'>
      <div class='section-title'>2. APPOINTMENT LOCATION</div>
      <div class='row'><div class='label'>Examination Country:</div><div class='value'>{$examinationCountry}</div></div>
      <div class='row'><div class='label'>City:</div><div class='value'>{$city}</div></div>
      <div class='row'><div class='label'>Destination Country:</div><div class='value'>{$destinationCountry}</div></div>
    </div>
    
    <div class='section'>
      <div class='section-title'>3. CANDIDATE INFORMATION</div>
      <div class='row'><div class='label'>First Name:</div><div class='value'>{$firstName}</div></div>
      <div class='row'><div class='label'>Last Name:</div><div class='value'>{$lastName}</div></div>
      <div class='row'><div class='label'>Date of Birth:</div><div class='value'>{$formattedDob}</div></div>
      <div class='row'><div class='label'>Nationality:</div><div class='value'>{$nationality}</div></div>
      <div class='row'><div class='label'>Gender:</div><div class='value'>{$gender}</div></div>
      <div class='row'><div class='label'>Marital Status:</div><div class='value'>{$maritalStatus}</div></div>
    </div>

    <div class='section'>
      <div class='section-title'>4. PASSPORT INFORMATION</div>
      <div class='row'><div class='label'>Passport Number:</div><div class='value'><strong>{$passportNumber}</strong></div></div>
      <div class='row'><div class='label'>Issue Date:</div><div class='value'>{$formattedIssueDate}</div></div>
      <div class='row'><div class='label'>Issue Place:</div><div class='value'>{$passportIssuePlace}</div></div>
      <div class='row'><div class='label'>Expiry Date:</div><div class='value'>{$formattedExpiryDate}</div></div>
    </div>

    <div class='section'>
      <div class='section-title'>5. VISA & EMPLOYMENT</div>
      <div class='row'><div class='label'>Visa Type:</div><div class='value'>{$visaType}</div></div>
      <div class='row'><div class='label'>Position Applied For:</div><div class='value'>{$positionApplied} " . ($otherPosition ? "({$otherPosition})" : "") . "</div></div>
    </div>

    <div class='section'>
      <div class='section-title'>6. CONTACT DETAILS</div>
      <div class='row'><div class='label'>Email Address:</div><div class='value'>{$email}</div></div>
      <div class='row'><div class='label'>Phone Number:</div><div class='value'>{$phone}</div></div>
      <div class='row'><div class='label'>National ID / CNIC:</div><div class='value'>{$nationalId}</div></div>
    </div>

    <div class='section'>
      <div class='section-title'>7. ADDITIONAL INFORMATION</div>
      <div class='row'><div class='label'>Notes:</div><div class='value'>" . ($additionalInformation ?: "N/A") . "</div></div>
    </div>

    <div class='section'>
      <div class='section-title'>8. ATTACHED DOCUMENTS (2 ATTACHMENTS)</div>
      <div class='row'><div class='label'>Passport Copy:</div><div class='value'>{$passportFilename}</div></div>
      <div class='row'><div class='label'>Payment Screenshot:</div><div class='value'>{$screenshotFilename}</div></div>
      <div class='row'><div class='label'>Submission Timestamp:</div><div class='value'>" . date('Y-m-d H:i:s') . "</div></div>
    </div>

    <div class='footer'>
      Gamca Centre Medical Token Assistance System &copy; " . date('Y') . "
    </div>
  </div>
</body>
</html>
";

// Multi-part Email Boundary
$semi_rand = md5(time()); 
$mime_boundary = "==Multipart_Boundary_x{$semi_rand}x"; 

$headers = "From: Gamca Centre <noreply@gamcacentre.pk>\n";
$headers .= "Reply-To: {$email}\n";
$headers .= "MIME-Version: 1.0\n";
$headers .= "Content-Type: multipart/mixed;\n boundary=\"{$mime_boundary}\"";

$message = "--{$mime_boundary}\n" .
           "Content-Type: text/html; charset=\"UTF-8\"\n" .
           "Content-Transfer-Encoding: 7bit\n\n" .
           $htmlContent . "\n\n";

if (file_exists($uploadedPassportPath)) {
    $passportContent = chunk_split(base64_encode(file_get_contents($uploadedPassportPath)));
    $message .= "--{$mime_boundary}\n";
    $message .= "Content-Type: application/octet-stream; name=\"{$passportFilename}\"\n";
    $message .= "Content-Description: {$passportFilename}\n";
    $message .= "Content-Disposition: attachment;\n filename=\"{$passportFilename}\"; size=" . filesize($uploadedPassportPath) . ";\n";
    $message .= "Content-Transfer-Encoding: base64\n\n" . $passportContent . "\n\n";
}

if (file_exists($uploadedFilePath)) {
    $fileContent = chunk_split(base64_encode(file_get_contents($uploadedFilePath)));
    $message .= "--{$mime_boundary}\n";
    $message .= "Content-Type: application/octet-stream; name=\"{$screenshotFilename}\"\n";
    $message .= "Content-Description: {$screenshotFilename}\n";
    $message .= "Content-Disposition: attachment;\n filename=\"{$screenshotFilename}\"; size=" . filesize($uploadedFilePath) . ";\n";
    $message .= "Content-Transfer-Encoding: base64\n\n" . $fileContent . "\n\n";
}

$message .= "--{$mime_boundary}--";

@mail($to, $subject, $message, $headers);

echo json_encode([
    'success' => true,
    'applicationId' => $applicationId,
    'message' => 'Request submitted successfully'
]);

function sanitize($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

function formatDateDisplay($dateStr) {
    $dateStr = trim($dateStr);
    if (empty($dateStr)) return '';
    $timestamp = strtotime($dateStr);
    if ($timestamp !== false) {
        return date('d-M-Y', $timestamp);
    }
    return $dateStr;
}
?>
