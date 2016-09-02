html(lang='en')
  head
    meta(charset='utf-8')
    meta(http-equiv='X-UA-Compatible', content='IE=edge')
    meta(name='viewport', content='width=device-width, initial-scal=1')
    title My-Pantry
    meta(name='description', content='')
    meta(name='author', content='')
    meta(name='keywords', content='')
    link(rel='icon', href='assets/img/favicon.ico')
    link(href='http://getbootstrap.com/dist/css/bootstrap.min.css', rel='stylesheet')
    link(href='https://getbootstrap.com/assets/css/ie10-viewport-bug-workaround.css', rel='stylesheet')
    link(href='./stylesheets/justified-nav.css', rel='stylesheet')
    link(href='./stylesheets/styles.css', rel='stylesheet')
  body
    .container
      //
        The justified navigation menu is meant for single line per list item.
        Multiple lines will require custom code not provided by Bootstrap.
      .masthead
        h3 My-Pantry
        nav
          ul.nav.nav-justified
            li.active
              a(href='/') Recipe Search
            li
              a(href='/favorites') Favorites
      .jumbotron
        h1 Recipes
        p.lead
          | (Change This to js) x Recipe found
      //js statement to show each recipe returned by the api call
      .bs-example(data-example-id='thumbnails-with-custom-content')
        .row
          .col-sm-6.col-md-4
            .thumbnail
              img(src='./Images/Recipe1.jpg', alt='100%x200', data-holder-rendered='true', style='height: 200px; width: 100%; display: block;')
              .caption
                h3.caption-text
                p.caption-text Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.
                p
                  a.btn.btn-primary(href='#', role='button') Favorite
        footer.footer
          p &copy 2016 Bradley Corp.
