// This script would exist within the node module and doesn't need invoking during a real project
import { kstat } from "./kstat-twig-loader.js";

kstat(process.env.npm_package_kalastatic_pages_directory);
