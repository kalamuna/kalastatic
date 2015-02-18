<?php

/**
 * @file
 * PHP Router. Handles 404 pages gracefully.
 */

// Check if the request is to the homepage.
if (!isset($_SERVER['REQUEST_URI']) || $_SERVER['REQUEST_URI'] == '/') {
  $content = file_get_contents(__DIR__ . '/index.html');
  echo $content;
}
else {
  // Since the page was not found, output the 404 page.
  header("HTTP/1.0 404 Not Found");
  $content = file_get_contents(__DIR__ . '/404.html');
  echo $content;
}
