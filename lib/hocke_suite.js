pjs.addSuite({
    // url to start at
    url: ['http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=0','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=10','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=20','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=30','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=40','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=50','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=60','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=70','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=80','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=90','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=100','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=110','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=120','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=130','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=140','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=150','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=160','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=170','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=180','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=190','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=200','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=210','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=220','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=230','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=240','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=250','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=260','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=270','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=280','http://www.unhcr.org/cgi-bin/texis/vtx/search?comid=42b2f01a4&cid=49aea93a4c&scid=49aea93a2f&author=hocké&skip=290'],
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


