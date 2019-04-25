/**
 * Given an array of URLs, build a DOM list of these URLs
 * @param {MostVisitedURL} mostVisitedURLs - The most visited URLs
 * @see https://developer.chrome.com/extensions/topSites#type-MostVisitedURL
 */
function buildPopupDom(mostVisitedURLs) {
  var urlNumb = "";
  var maxSites = 6;

  if(mostVisitedURLs.length < maxSites)
    urlNumb = mostVisitedURLs.length;
  else
    urlNumb = maxSites;

  for (var i = 0; i < urlNumb; i++) {
    var link = mostVisitedURLs[i].url;
    var title = mostVisitedURLs[i].title;
    
    // Check if logotype exists for the page
    if (availableLogotypes.indexOf(rootDomain(link)) !== -1) {
      $('#top-sites').append(
          '<a href="'+link+'" class="site">' +
            '<div class="logo" style="background-image: url(\'https://s3.eu-central-1.amazonaws.com/quotesnewtab/logotypes/'+rootDomain(link)+'.jpg\'"><span></span></div>' +
            '<p class="site-name">'+textTruncate(title)+'</p>' + 
          '</a>'
      );

      // Show the root domains first letter if logotype does not exist
    } else {
      $('#top-sites').append(
          '<a href="'+link+'" class="site">' +
            '<div class="logo"><span>' + rootDomain(link).substring(0, 1) + '</span></div>' +
            '<p class="site-name">'+textTruncate(title)+'</p>' + 
          '</a>'
      );
    }
  }
}

/**
 * Getting the top sites from Chrome
 */
chrome.topSites.get(buildPopupDom);

/**
 * Extracting the root domain without extension
 * @param {string} url - The url to extract from
 * @return {string} - The root domain without extension
 */
function rootDomain(url) {
  return extractRootDomain(url).substring(0, extractRootDomain(url).indexOf("."));
}

/**
 * Extracting the root domain
 * @param {string} url - The url to extract from
 * @return {string} - The root domain
 */
function extractRootDomain(url) {
    var domain = extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;

    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
        //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
        if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
            //this is using a ccTLD
            domain = splitArr[arrLen - 3] + '.' + domain;
        }
    }
    return domain;
}

/**
 * Extracting the host name
 * @param {string} url - The url to extract from
 * @return {string} - The host name
 */
function extractHostname(url) {
    var hostname;

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];

    return hostname;
}

/**
 * Truncating text longer than passed character limit
 * @param {string} string - The string to truncate
 * @param {string} limit - The character limit (Default: 25)
 * @return {string} - The truncated string
 */
function textTruncate(string, limit) {
  limit = limit || 25;

  if (string.length > limit) {
    return string.substring(0, limit)+"...";
  } else {
    return string;
  }
}