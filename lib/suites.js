pjs.addSuite({
    // url to start at
    url: ['http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=0','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=10','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=20','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=30','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=40','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=50','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=60','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=70','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=80','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=90','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=100','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=110','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=120','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=130','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=140','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=150','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=160','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=170','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=180','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=190','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=200','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=210','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=220','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=230','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=240','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=250','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=260','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=270','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=280','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=guterres&skip=290'],
    // selector to find more urls to spider
    moreUrls: '.ResultItem td a',
    maxDepth: 1,
    // function to get some data
    scraper: function() {
      var author = "guterres";
      var dateString = $('#openDoc .docDateBar').text().split(',')[1].trim();
      var id = window.location.pathname.slice(1).replace('.html', '');

      return {
          id: id,
          author: author,
          title: $('#openDoc h1').text(),
          date: Date.parse(dateString),
          by: $('#openDoc .docDateBar').text(),
          content: $('#openDoc').text()
      };
    }
});


pjs.addSuite({
    // url to start at
    url: ['http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=0','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=10','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=20','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=30','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=40','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=50','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=60','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=70','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=80','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=90','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=100','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=110','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=120','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=130','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=140','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=150','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=160','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=170','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=180','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=190','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=200','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=210','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=220','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=230','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=240','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=250','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=260','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=270','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=280','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lubbers&skip=290'],
    // selector to find more urls to spider
    moreUrls: '.ResultItem td a',
    maxDepth: 1,
    // function to get some data
    scraper: function() {
      var author = "lubbers";
      var dateString = $('#openDoc .docDateBar').text().split(',')[1].trim();
      var id = window.location.pathname.slice(1).replace('.html', '');

      return {
          id: id,
          author: author,
          title: $('#openDoc h1').text(),
          date: Date.parse(dateString),
          by: $('#openDoc .docDateBar').text(),
          content: $('#openDoc').text()
      };
    }
});


pjs.addSuite({
    // url to start at
    url: ['http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=0','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=10','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=20','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=30','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=40','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=50','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=60','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=70','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=80','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=90','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=100','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=110','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=120','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=130','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=140','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=150','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=160','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=170','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=180','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=190','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=200','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=210','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=220','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=230','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=240','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=250','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=260','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=270','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=280','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=ogata&skip=290'],
    // selector to find more urls to spider
    moreUrls: '.ResultItem td a',
    maxDepth: 1,
    // function to get some data
    scraper: function() {
      var author = "ogata";
      var dateString = $('#openDoc .docDateBar').text().split(',')[1].trim();
      var id = window.location.pathname.slice(1).replace('.html', '');

      return {
          id: id,
          author: author,
          title: $('#openDoc h1').text(),
          date: Date.parse(dateString),
          by: $('#openDoc .docDateBar').text(),
          content: $('#openDoc').text()
      };
    }
});


pjs.addSuite({
    // url to start at
    url: ['http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=0','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=10','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=20','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=30','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=40','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=50','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=60','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=70','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=80','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=90','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=100','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=110','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=120','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=130','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=140','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=150','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=160','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=170','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=180','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=190','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=200','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=210','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=220','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=230','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=240','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=250','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=260','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=270','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=280','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=stoltenberg&skip=290'],
    // selector to find more urls to spider
    moreUrls: '.ResultItem td a',
    maxDepth: 1,
    // function to get some data
    scraper: function() {
      var author = "stoltenberg";
      var dateString = $('#openDoc .docDateBar').text().split(',')[1].trim();
      var id = window.location.pathname.slice(1).replace('.html', '');

      return {
          id: id,
          author: author,
          title: $('#openDoc h1').text(),
          date: Date.parse(dateString),
          by: $('#openDoc .docDateBar').text(),
          content: $('#openDoc').text()
      };
    }
});


pjs.addSuite({
    // url to start at
    url: ['http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=0','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=10','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=20','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=30','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=40','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=50','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=60','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=70','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=80','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=90','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=100','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=110','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=120','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=130','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=140','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=150','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=160','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=170','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=180','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=190','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=200','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=210','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=220','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=230','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=240','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=250','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=260','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=270','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=280','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hock%C3%A9&skip=290'],
    // selector to find more urls to spider
    moreUrls: '.ResultItem td a',
    maxDepth: 1,
    // function to get some data
    scraper: function() {
      var author = "hocké";
      var dateString = $('#openDoc .docDateBar').text().split(',')[1].trim();
      var id = window.location.pathname.slice(1).replace('.html', '');

      return {
          id: id,
          author: author,
          title: $('#openDoc h1').text(),
          date: Date.parse(dateString),
          by: $('#openDoc .docDateBar').text(),
          content: $('#openDoc').text()
      };
    }
});


pjs.addSuite({
    // url to start at
    url: ['http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=0','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=10','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=20','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=30','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=40','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=50','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=60','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=70','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=80','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=90','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=100','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=110','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=120','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=130','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=140','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=150','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=160','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=170','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=180','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=190','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=200','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=210','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=220','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=230','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=240','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=250','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=260','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=270','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=280','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hartling&skip=290'],
    // selector to find more urls to spider
    moreUrls: '.ResultItem td a',
    maxDepth: 1,
    // function to get some data
    scraper: function() {
      var author = "hartling";
      var dateString = $('#openDoc .docDateBar').text().split(',')[1].trim();
      var id = window.location.pathname.slice(1).replace('.html', '');

      return {
          id: id,
          author: author,
          title: $('#openDoc h1').text(),
          date: Date.parse(dateString),
          by: $('#openDoc .docDateBar').text(),
          content: $('#openDoc').text()
      };
    }
});


pjs.addSuite({
    // url to start at
    url: ['http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=0','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=10','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=20','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=30','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=40','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=50','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=60','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=70','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=80','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=90','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=100','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=110','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=120','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=130','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=140','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=150','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=160','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=170','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=180','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=190','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=200','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=210','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=220','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=230','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=240','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=250','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=260','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=270','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=280','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=khan&skip=290'],
    // selector to find more urls to spider
    moreUrls: '.ResultItem td a',
    maxDepth: 1,
    // function to get some data
    scraper: function() {
      var author = "khan";
      var dateString = $('#openDoc .docDateBar').text().split(',')[1].trim();
      var id = window.location.pathname.slice(1).replace('.html', '');

      return {
          id: id,
          author: author,
          title: $('#openDoc h1').text(),
          date: Date.parse(dateString),
          by: $('#openDoc .docDateBar').text(),
          content: $('#openDoc').text()
      };
    }
});


pjs.addSuite({
    // url to start at
    url: ['http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=0','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=10','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=20','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=30','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=40','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=50','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=60','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=70','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=80','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=90','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=100','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=110','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=120','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=130','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=140','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=150','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=160','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=170','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=180','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=190','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=200','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=210','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=220','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=230','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=240','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=250','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=260','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=270','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=280','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=schnyder&skip=290'],
    // selector to find more urls to spider
    moreUrls: '.ResultItem td a',
    maxDepth: 1,
    // function to get some data
    scraper: function() {
      var author = "schnyder";
      var dateString = $('#openDoc .docDateBar').text().split(',')[1].trim();
      var id = window.location.pathname.slice(1).replace('.html', '');

      return {
          id: id,
          author: author,
          title: $('#openDoc h1').text(),
          date: Date.parse(dateString),
          by: $('#openDoc .docDateBar').text(),
          content: $('#openDoc').text()
      };
    }
});


pjs.addSuite({
    // url to start at
    url: ['http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=0','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=10','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=20','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=30','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=40','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=50','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=60','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=70','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=80','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=90','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=100','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=110','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=120','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=130','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=140','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=150','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=160','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=170','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=180','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=190','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=200','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=210','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=220','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=230','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=240','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=250','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=260','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=270','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=280','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=lindt&skip=290'],
    // selector to find more urls to spider
    moreUrls: '.ResultItem td a',
    maxDepth: 1,
    // function to get some data
    scraper: function() {
      var author = "lindt";
      var dateString = $('#openDoc .docDateBar').text().split(',')[1].trim();
      var id = window.location.pathname.slice(1).replace('.html', '');

      return {
          id: id,
          author: author,
          title: $('#openDoc h1').text(),
          date: Date.parse(dateString),
          by: $('#openDoc .docDateBar').text(),
          content: $('#openDoc').text()
      };
    }
});


pjs.addSuite({
    // url to start at
    url: ['http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=0','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=10','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=20','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=30','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=40','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=50','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=60','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=70','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=80','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=90','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=100','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=110','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=120','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=130','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=140','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=150','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=160','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=170','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=180','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=190','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=200','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=210','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=220','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=230','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=240','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=250','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=260','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=270','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=280','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=Goedhart&skip=290'],
    // selector to find more urls to spider
    moreUrls: '.ResultItem td a',
    maxDepth: 1,
    // function to get some data
    scraper: function() {
      var author = "Goedhart";
      var dateString = $('#openDoc .docDateBar').text().split(',')[1].trim();
      var id = window.location.pathname.slice(1).replace('.html', '');

      return {
          id: id,
          author: author,
          title: $('#openDoc h1').text(),
          date: Date.parse(dateString),
          by: $('#openDoc .docDateBar').text(),
          content: $('#openDoc').text()
      };
    }
});


pjs.config({
    writer: 'file'
});

