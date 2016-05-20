<?php

/**
 * Clear the cache through QuickSilver.
 */
$site = getenv('PSITE');
$env = getenv('PENV');

passthru("terminus --yes --site=$site --env=$env site clear-cache");
