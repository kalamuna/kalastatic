# Adding menu items
In order to add new menu items you need to add a new item to the 'nav' array in navigation.yaml Each array is an object containing 'name', 'title', and 'url' for the menu item.

eg for primary nav
```    
primary:
  - name: About
    title: About Us
    url: /about

  - name: Team
    title: Find out about our team
    url: /team

  - name: News
    title: Read the news, it's important
    url: /news

  - name: Contact
    title: Contact us about anything at all!
    url: /contact

  - name: Bootstrap carousel
    title: Check out the bootstrap carousel
    url: /carousel
```
