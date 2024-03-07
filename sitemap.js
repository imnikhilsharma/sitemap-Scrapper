function importSitemapUrlsToSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear(); // Clear the existing contents
  var sitemapUrl = 'https://abc.com/sitemap.xml'; // Sitemap URL
  var xml = UrlFetchApp.fetch(sitemapUrl).getContentText(); // Fetch sitemap content
  var document = XmlService.parse(xml); // Parse the XML
  var namespace = XmlService.getNamespace('http://www.sitemaps.org/schemas/sitemap/0.9');
  var urls = document.getRootElement().getChildren('url', namespace);
  
  var data = [];
  for (var i = 0; i < urls.length; i++) {
    var loc = urls[i].getChild('loc', namespace).getText();
    data.push([loc]);
  }

  if(data.length > 0){
    sheet.getRange(1, 1, data.length, 1).setValues(data); // Write URLs to the sheet
  }
}
