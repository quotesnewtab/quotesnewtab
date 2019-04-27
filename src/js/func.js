/**
 * DOM Ready
 */
$(document).ready(function() {
    //-----------------//
    // Initializations //
    //-----------------//

    /**
     * Populates the DOM with values from contants
     */
    populateDOM();

    /**
     * Get quote from API
     */
    fetchQuote();

    /**
     * Check user settings in Local Storage
     */
    checkSettings();

    /**
     * Initialize custom select dropdowns
     */
    $("select").dropdown();


    /**
     * Auto-refresh quotes functionality
     */
    if ($("#auto-refresh-quote-toggle").is(":checked")) {
        var autoRefresh = setInterval(function() {
            $("#quote, #author, #suggestor").css("opacity", "0");
            setTimeout(fetchQuote, 300);
        }, 15000);
    }


    //-----------------------//
    // Click functionalities //
    //-----------------------//

    /**
     * Load new quote
     */
    $("#new-quote").click(function() {
        $("#quote, #author, #suggestor").css("opacity", "0");
        //$("#background-image").css("opacity", "0");
        setTimeout(fetchQuote, 300);
    });

    /**
     * Popups functionality
     */
    $(".popup-toggle").click(function() {
        var popup = $(this).attr("data-popup");
        $(".popup-toggle").not(this).removeClass("active");
        $(this).toggleClass("active");
        $(".popup:not(#"+popup+")").removeClass("active");
        $("#"+popup).toggleClass("active");
    });

    /**
     * Top sites grid toggle functionality
     */
    $("#grid-btn").click(function() {
        $("#top-sites").toggleClass("active");
        $("#grid-btn").toggleClass("active");
        $("#quote-wrapper").toggleClass("top-sites-active");
    });

    /**
     * Share on Facebook popup
     */
    $("#facebook").click(function(e) {
        e.preventDefault();
        window.open($(this).attr('href'), 'fbShareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
        return false;
    });


    //------------------------//
    // Settings functionality //
    //------------------------//

    /**
     * Toggles functionality
     */
    $(".settings-toggle").change(function() {
        var context = $(this).attr("data-context");
        $("#"+context).toggleClass("active");
        
        if (context === "top-sites") {
            $("#grid-btn").toggleClass("active");
            $("#quote-wrapper").toggleClass("top-sites-active");
        }

        if (context === "background") {
            $("#background-image").toggleClass("show");
        }

        if (context === "auto-refresh") {
            if ($("#auto-refresh-quote-toggle").is(":checked")) {
                autoRefresh = setInterval(function() {
                    $("#quote, #author, #suggestor").css("opacity", "0");
                    setTimeout(fetchQuote, 300);
                }, 15000);
            } else {
                clearInterval(autoRefresh);
            }
        }
        
        storeSettings();
    });

    /**
     * Color picking functionality
     */
    $(".color").click(function() {
        var context = $(this).attr("data-context");
        var color = $(this).attr("data-color");
        
        $("#"+context+"-list .color").removeClass("selected");
        $(this).addClass("selected");
        
        if (context === "background-color") {
            document.documentElement.style.setProperty('--background-color', color);
        } else if (context === "font-color") {
            document.documentElement.style.setProperty('--font-color', color);
        }
        
        storeSettings();
    });

    /**
     * Select dropdowns functionality
     */
    $(".dropdown-link").click(function() {
        var context = $(this).parent().parent().parent().parent().parent().parent().prev("select").attr("data-context");
        var font = $(this).find("span").text();
        var settings = [];

        if (context === "quote") {
            setFont(font, context);
            settings.quoteFont = font;
        } else if (context === "author") {
            setFont(font, context);
            settings.authorFont = font;
        }

        storeSettings(settings);
    });

    /**
     * Set background color for color picking elements based on their data-color attribute
     */
    $(".color").each(function() {
      var color = $(this).attr("data-color");
        $(this).css('background', color);
    });
});

/**
 * Populates the DOM with values from contants
 */
function populateDOM() {
    populateColors();
    populateDropdowns();
}

/**
 * Populates the color rows
 */
function populateColors() {
    let colorRows = $(".color-row");
    let colorRowBackgroundColors = colorRows[0];
    let colorRowFontColors = colorRows[1];

    for (let color of colors) {
        colorRowBackgroundColors.innerHTML +='<div class="color" data-color="' + color + '" data-context="background-color"></div>';
        colorRowFontColors.innerHTML += '<div class="color" data-color="' + color + '" data-context="font-color"></div>';
    }
}

function populateDropdowns() {
    let quoteFontDropdown = $("select#quote-font-select");
    let authorFontDropdown = $("select#author-font-select");

    for (let font of fonts) {
        quoteFontDropdown.append('<option value="' + font.value + '">' + font.name + '</option>');
        authorFontDropdown.append('<option value="' + font.value + '">' + font.name + '</option>');
    }
}

/**
 * Checking settings stored in Local Storage
 */
function checkSettings() {
    // Get stored settings
    var storedSettings = localStorage.getItem("settings");

    // If stored settings does not exist – Most likely first time use
    if (!storedSettings) {
        // Store default settings in Local Storage
        storeSettings(defaultSettings);

        // Get stored settings again
        storedSettings = localStorage.getItem("settings");
    }

    // If stored settings exist
    if (storedSettings) {
        storedSettings = JSON.parse(storedSettings);

        // Quote Font
        setFont(storedSettings.quoteFont, "quote");
        $("#quote-font-select").val(storedSettings.quoteFont);

        // Author Font
        setFont(storedSettings.authorFont, "author");
        $("#author-font-select").val(storedSettings.authorFont);

        // Background Color
        document.documentElement.style.setProperty('--background-color', storedSettings.backgroundColor);
        $("#background-color-list .color").removeClass("selected");
        $("#background-color-list .color[data-color='"+storedSettings.backgroundColor+"']").addClass("selected");

        // Font color
        document.documentElement.style.setProperty('--font-color', storedSettings.fontColor);
        $("#font-color-list .color").removeClass("selected");
        $("#font-color-list .color[data-color='"+storedSettings.fontColor+"']").addClass("selected");

        // Always show top sites
        if (storedSettings.alwaysShowTopSites === true) {
            $("#quote-wrapper").toggleClass("top-sites-active");
            setTimeout(function() {
                $("#top-sites").toggleClass("active");
                $("#grid-btn").toggleClass("active");
            }, 1000);
            $("#top-sites-toggle").prop("checked", true);
        }

        // Show background image
        if (storedSettings.showBackgroundImage === false) {
            $("#background-image").removeClass("show");
            $("#background-toggle").prop("checked", false);
        } else {
            $("#background-image-loader").on("load", function() {
                var src = $("#background-image-loader").attr("src");
                $("#background-image").css("background-image", "url("+src+")");
                $("#background-image").css("opacity", "0.25");
            });
        }

        // Auto-refresh a new quote
        if (storedSettings.autoRefreshQuote === true) {
            $("#auto-refresh-quote-toggle").prop("checked", true);
        } else {
            $("#auto-refresh-quote-toggle").prop("checked", false);
        }
    }
}

/**
 * Storing settings in Local Storage
 * @param {Object} defaultSettings - The default settings (Defined in checkSettings())
 */
function storeSettings(defaultSettingsObject) {
    //defaultSettings = defaultSettingsObject || new Object({});

    quoteFont = defaultSettings.quoteFont || $("#quote-font-select option:selected").val();
    authorFont = defaultSettings.authorFont || $("#author-font-select option:selected").val();
    alwaysShowTopSites = defaultSettings.alwaysShowTopSites || $("#top-sites-toggle").is(":checked");
    showBackgroundImage = defaultSettings.showBackgroundImage || $("#background-toggle").is(":checked");
    autoRefreshQuote = defaultSettings.autoRefreshQuote || $("#auto-refresh-quote-toggle").is(":checked");
    backgroundColor = defaultSettings.backgroundColor || $("#background-color-list").find(".selected").attr("data-color");
    fontColor = defaultSettings.fontColor || $("#font-color-list").find(".selected").attr("data-color");
    
    var data = {
        quoteFont: quoteFont,
        authorFont: authorFont,
        alwaysShowTopSites: alwaysShowTopSites,
        showBackgroundImage: showBackgroundImage,
        autoRefreshQuote: autoRefreshQuote,
        backgroundColor: backgroundColor,
        fontColor: fontColor
    };
    
    localStorage.setItem("settings", JSON.stringify(data));
}

/**
 * Fetching quote data from API
 */
function fetchQuote() {
    // Checking if internet connection exists
    if (navigator.onLine) {
        $.ajax({
            url: "https://api.quotesnewtab.com/v1/quotes/random",
            dataType: 'json',
            success: function (result) {
                // Set HTML-text for quote and author
                $("#quote").html(result.quote);
                $("#author").html(result.author);
                setTimeout(function() {
                    $("#quote, #author").css("opacity", "1");
                }, 250);

                // Show suggestor if there is one
                if (result.submitter !== undefined) {
                    $("#suggestor").html("Quote submitted by " + result.submitter);
                    setTimeout(function() {
                        $("#suggestor").css("opacity", "1");
                    }, 250);
                }

                // Fetch image of author
                $("#background-image-loader").attr("src", "https://quotesnewtab.com/assets/authors/"+convertAuthorName(result.author)+".jpg");

                // Generate twitter intent URL
                $("#twitter").attr("href", "https://twitter.com/intent/tweet?text=" + encodeURIComponent('"' + result.quote + '" – ' + result.author) + "&via=QuotesNewTab");

                // Generate facebook share URL
                $("#facebook").attr("href", "https://www.facebook.com/dialog/share?app_id=1796316614011305&display=popup&href=https://chrome.google.com/webstore/detail/quotes-new-tab/fnhpicigolcacikdjdocmkfnplmefadg&quote=" + encodeURIComponent('"' + result.quote + '" – ' + result.author));
            },
            error: function(jqXHR, textStatus, errorThrown) {
                fetchOfflineQuote();
            }
        });
    } else {
        fetchOfflineQuote();
    }
}

/**
 * Fetching quote from locally stored Array with quotes and images if there is no internet connection
 */
function fetchOfflineQuote() {
    var randomQuote = offlineQuotes[Math.floor(Math.random() * offlineQuotes.length)];

    // Set HTML-text for quote and author
    $("#quote").html(randomQuote.quote);
    $("#author").html(randomQuote.author);
    setTimeout(function() {
        $("#quote, #author").css("opacity", "1");
    }, 250);

    // Fetch image of author
    $("#background-image-loader").attr("src", "../images/offline/"+convertAuthorName(randomQuote.author)+".jpg");

    // Hide share buttons
    $(".share").addClass("hide");

    // Show offline notice text if offline
    if (!navigator.onLine) {
        $("#offline-notice").addClass("show");
    }
}

/**
 * Wait for image to finish loading before showing
 */
function showBackgroundWhenLoaded() {
    $("#background-image-loader").one("load", function() {
        var src = $("#background-image-loader").attr("src");
        $("#background-image").css("background-image", "url("+src+")");
        $("#background-image").css("opacity", "0.25");
    }).each(function() {
        if(this.complete) $(this).load();
    });
}

/**
 * Dynamically load the chosen font in settings, removing the need to load all fonts on page load
 * @param {string} font - The font to load
 * @param {string} context - The context where the font should be set
 */
function loadFont(font, context) {
    WebFont.load({
        google: {
            families: [font]
        },
        classes: false,
        // Wait for font to load before setting
        active: function() {
            if (context === "quote") {
                document.documentElement.style.setProperty('--quote-font', font);
            } else if (context === "author") {
                document.documentElement.style.setProperty('--author-font', font);
            }
        }
    });
}

/**
 * Setting the desired font
 * @param {string} font - Font to set to
 * @param {[type]} context - The context where the font should be set
 */
function setFont(font, context) {
    // Check first if font is not a default font, in which case it needs to be loaded
    if (defaultFonts.indexOf(font) === -1) {
        loadFont(font, context);
        return;
    }

    if (context === "quote") {
        document.documentElement.style.setProperty('--quote-font', font);
    } else if (context === "author") {
        document.documentElement.style.setProperty('--author-font', font);
    }
}

/**
 * Convert author name to match URL call for image
 * @param {string} author - The author's name
 * @return {string} - The converted name
 */
function convertAuthorName(author) {
    return author.toLowerCase().replace(/\s+/g, "-").replace(/[, .]+/g, "");
}

/**
 * Clicking outside popup functionality
 * @param {event} e
 */
$(document).mouseup(function (e) {
    var info = $("#info-popup");
    var infoButton = $("#info-btn");
    var settings = $("#settings-popup");
    var settingsButton = $("#settings-btn");

    if (!info.is(e.target) && !infoButton.is(e.target) && info.has(e.target).length === 0 && infoButton.has(e.target).length === 0)
    {
        info.removeClass("active");
        infoButton.removeClass("active");
    }

    if (!settings.is(e.target) && !settingsButton.is(e.target) && settings.has(e.target).length === 0 && settingsButton.has(e.target).length === 0)
    {
        settings.removeClass("active");
        settingsButton.removeClass("active");
    }
});


