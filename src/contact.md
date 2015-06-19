---
template: contact.html
title: Contact
pageSlug: contact

# Destination action for the form
# FormSpree: http://formspree.io
action: //formspree.io/kalastatic@example.com
---

<div class="form-group">
  <label for="name">Name</label>
  <input name="name" type="name" class="form-control" id="name" placeholder="Enter name" required>
</div>
<div class="form-group">
  <label for="email">Email address</label>
  <input name="_replyto" type="email" class="form-control" id="email" placeholder="Enter email" required>
</div>
<div class="form-group">
  <label for="phone">Phone</label>
  <input name="phone" type="tel" class="form-control" id="phone" placeholder="Enter phone number">
</div>
<div class="form-group">
  <label for="message">Message</label>
  <textarea name="message" class="form-control" rows="3" required></textarea>
</div>
<input type="hidden" name="_next" value="//localhost:8000/contact-thanks" />
<button type="submit" class="btn btn-primary">Submit</button>
