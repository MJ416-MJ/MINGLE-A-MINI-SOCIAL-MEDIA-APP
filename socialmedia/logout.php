<?php
session_start();
session_unset();
session_destroy();
header('Location: /Register/Login/Login.html');
exit;
