# BrowserSync

When running the default task ```npm start```
 (in the as yet unmerged browserSync branch)

Once the built in server is ready it will print the following into the console:

```
Running "browserSync:bsFiles" (browserSync) task
[BS] Access URLs:
----------------------------------
      Local: http://localhost:8000
   External: http://10.0.0.9:8000
----------------------------------
         UI: http://localhost:3001
UI External: http://10.0.0.9:3001
----------------------------------
[BS] Serving files from: ./build
[BS] Watching files...
```

The "Local" url represents where in your localhost the prototype is served (this has not changed)

The "External URL" is where one may access the prototype via your local network.

If a user navigates from the local URL, the external URL follows suit!

To access the prototype from outside your local network, one needs to set up port forwarding on the router.

The UI urls provide configuration options for browsersyc.
