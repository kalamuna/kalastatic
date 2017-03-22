# Testing via other devices

So as long as the node server serves at 0.0.0.0 as opposed to localhost, and you target
X.X.X.X:8000 where X.X.X.X is your computer's network IP, it should just work.

On OS X you can also use your Mac's host name instead of an IP. You can see/edit your Mac's host name in the Sharing panel of the system preferences.

Here's further infos for debugging android via firefox:
https://developer.mozilla.org/en-US/docs/Tools/Remote_Debugging/Firefox_for_Android
A bit more steps, but not difficult.

Recently chrome has had a hard time accessing local ip's (unclear why), pointing to localhost works in that case, but then the above testing recommendations dont apply. Use firefox!
