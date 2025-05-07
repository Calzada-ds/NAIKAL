<?php
// Verificar si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';
    
    // Validar los datos
    $errors = [];
    
    if (empty($name)) {
        $errors[] = "El nombre es obligatorio";
    }
    
    if (empty($email)) {
        $errors[] = "El correo electrónico es obligatorio";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "El formato del correo electrónico no es válido";
    }
    
    if (empty($subject)) {
        $errors[] = "El asunto es obligatorio";
    }
    
    if (empty($message)) {
        $errors[] = "El mensaje es obligatorio";
    }
    
    // Si no hay errores, enviar el correo
    if (empty($errors)) {
        // Destinatario del correo
        $to = "info@naikal.com";
        
        // Asunto del correo
        $email_subject = "Nuevo mensaje de contacto: $subject";
        
        // Cuerpo del correo
        $email_body = "Has recibido un nuevo mensaje desde el formulario de contacto de tu sitio web.\n\n";
        $email_body .= "Detalles:\n\n";
        $email_body .= "Nombre: $name\n";
        $email_body .= "Email: $email\n";
        $email_body .= "Teléfono: $phone\n";
        $email_body .= "Asunto: $subject\n";
        $email_body .= "Mensaje:\n$message\n";
        
        // Cabeceras del correo
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        
        // Intentar enviar el correo
        if (mail($to, $email_subject, $email_body, $headers)) {
            // Redirigir con mensaje de éxito
            header("Location: ../contacto.html?status=success");
            exit;
        } else {
            // Redirigir con mensaje de error
            header("Location: ../contacto.html?status=error");
            exit;
        }
    } else {
        // Redirigir con errores
        $error_string = implode(",", $errors);
        header("Location: ../contacto.html?status=validation_error&errors=$error_string");
        exit;
    }
} else {
    // Si alguien intenta acceder directamente a este archivo
    header("Location: ../index.html");
    exit;
}
?>