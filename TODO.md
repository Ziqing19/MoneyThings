## Sitemap

### login page

- log in form
- sign up form
- verification form
- reset password form

### main page

- overview
- entries
- profile

## Function components

### input box

- elements
  - input 
  - label
  
- props
  - .name 
  - .label
  
- event
  - onChange: modify value
  
### category

- elements
  - svg / i from fontawesome
  - div
  
- props
  - svg url?
  - category name
  
- event
  - onClick: filter entries
  
### entry

- elements
  - li
  - input box
  - dropdown
  - div
  
- props
  - category
  - amount
  - date
  - remark
  
### entry container (table)
- elements
  - ul
  - entry
  
- props
  - array of entries
  
- event
  - table header onclick: sort 
  
### search form
- elements
  - input box
  - button
  
- props
  - query
  
- event
  - submit: fetch and rerender entry container(how to pass the res?)
  
### pie chart
- elements
  - use library
  
- props
  - array of entries