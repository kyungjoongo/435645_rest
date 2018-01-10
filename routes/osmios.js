var osmosis = require('osmosis');

osmosis
    .get('https://ionicabizau.net')
    .find('h1 + div a')
    .set('location')
    .follow('@href')
    .find('header + div + div li > a')
    .set('category')
    .follow('@href')
    .paginate('.totallink + a.button.next:first')
    .find('p > a')
    .follow('@href')
    .set({
        'title': 'section > h2',
        'description': '#postingbody',
        'subcategory': 'div.breadbox > span[4]',
        'date': 'time@datetime',
        'latitude': '#map@data-latitude',
        'longitude': '#map@data-longitude',
        'images': ['img@src']
    })
    .data(function (listing) {
        // do something with listing data

        console.log(listing)
    })
    .log(console.log)
    .error(console.log)
    .debug(console.log)