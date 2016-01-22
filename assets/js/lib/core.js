var app = angular.module('robin', []);
app.controller('controller', function ($scope) {

    var ref = new Firebase("https://projectbird.firebaseio.com");
    var authData = ref.getAuth();
    $scope.tabsLimit = 5; 
    $scope.caughtColor = "#7B1FA2";
    $scope.saved = localStorage.getItem('banndedUrls');
    $scope.banndedUrlsList=[{text:"porn",done:false},{text:"sex",done:false},{text:"facebook",done:false},{text:"twitters",done:false},{text:"rob",done:false}];
    $scope.themeList=[{color:"#F44336",active:true}];
    $scope.banndedUrls = (localStorage.getItem('banndedUrls') !== null) ?JSON.parse($scope.saved) : $scope.banndedUrlsList;
    $scope.savedTheme = localStorage.getItem('theme');
    $scope.theme = (localStorage.getItem('theme') !== null) ? JSON.parse(
    $scope.savedTheme) : $scope.themeList;
    $scope.themeStyle = (localStorage.getItem('theme') !== null) ? {'background-color': $scope.theme[0][0]['color']} : console.log('no color set');

    $scope.init = function () {
        createTab('google');
        localStorage.setItem('banndedUrls', JSON.stringify($scope.banndedUrls));
    };


    $scope.addLocalStorage = function () {
        $scope.newID = $scope.banndedUrls.length + 1;
        $scope.banndedUrls.forEach(function (item) {console.log(item);});
        localStorage.setItem('banndedUrls', JSON.stringify($scope.banndedUrls));
    };



    $scope.loadDefault = function () {
        $scope.banndedUrls = (localStorage.getItem('banndedUrls') !== null) ?JSON.parse($scope.saved) : $scope.banndedUrlsList;
    }



    $scope.setColor = function (color) {
        $scope.removeLocalStorage('theme');
        $scope.theme = [];
        $scope.theme.push([{color: color,active: true}]);
        localStorage.setItem('theme', JSON.stringify($scope.theme));
        $scope.themeStyle = {'background-color': color};
    }



    $scope.clearLocalStorage = function () {
        alert('you clicked clear ');
        $scope.banndedUrls = [];
        $scope.removeLocalStorage('banndedUrls');
        $scope.removeLocalStorage('theme');
        $scope.loadDefault();
        console.log('Reset');
    };



    $scope.removeLocalStorage = function (key) {
        localStorage.removeItem(key);
    };


    $scope.showTabs = function (key) {
        expandTabs();
    };

    $scope.goBack = function () {
        document.getElementById($('.iframe.active').attr('id')).contentWindow.history.back();
    };


    $scope.goForword = function () {
        document.getElementById($('.iframe.active').attr('id')).contentWindow.history.forword();
    };


    $scope.refresh = function () {
        $('.iframe.active').attr('src', $('.iframe.active').attr('src'));
    };


    $scope.home = function () {
      $('.iframe.active').attr('src', 'http://wwww.google.ie');
    };


    $scope.createTab = function () {
        createTab('');
    };

    $scope.search = function (keyEvent) {
        if (keyEvent.which === 13) {
            searchResult($scope.searchTerm);
            setPageTitle($scope.searchTerm);
        };
    }
function setPageTitle(title) {
    document.title = "Robin : " + title;
}

function searchResult(search) {
    $('.iframe.active').attr('src', "http://www.bing.com/search?q=" + search);
    resizeIframe();
}

    function createTab(url) {
        var getAmountOfTabs = document.getElementsByTagName("iframe").length;
          if (getAmountOfTabs !== $scope.tabsLimit) {
              if (url == '[object MouseEvent]') {
                  url = 'batman';
              }
              $('.home').removeClass('active');
              $('.iframe').removeClass('active');
              var tabs = document.getElementById('tabs');
              var span = document.createElement("section");
              span.setAttribute("class", "home active");
              var title = document.createElement("h1");
              title.setAttribute("class", "title");
              title.innerHTML = "http://www.bing.com/search?q=" + url;
              span.appendChild(title);
              var iframes = document.createElement("iframe");
              iframes.setAttribute("sandbox","allow-same-origin allow-scripts allow-popups allow-forms");
              iframes.setAttribute("src", "http://www.bing.com/search?q=" + url);
              iframes.setAttribute("class", "iframe active");
              iframes.setAttribute("id", getAmountOfTabs);
              iframes.setAttribute("width", window.innerWidth);
              iframes.setAttribute("height", "100%");
              span.appendChild(iframes);
              tabs.appendChild(span);
              resizeIframe();
              $('section').on('click', function() {
                  $(this).closest('section').prependTo('.contain');
                  $('section').removeClass('active');
                  $('.home.active .iframe').removeClass('active');
                  $(this).addClass('active');
                  $('.home.active .iframe').addClass('active');
                  $('.contain').removeClass('active');
              });
          } else {
              alert('tab Limit reached');
          }
    }


        $scope.login = function () { // Saves options to chrome.storage
            ref.authWithPassword({
                email: $('input[name="email"]').val(),
                password: $('input[name="password"]').val()
            }, function (error, userObj) {
                error ? errorCodes(error) : displayMessage(userObj);
            });
        };

        function errorCodes(error) {
            switch (error.code) {
                case "EMAIL_TAKEN":
                    displayMessage("The new user account cannot be created use.");
                    break;
                case "INVALID_EMAIL":
                    displayMessage("The specified eeeeemail is not a valid email.");
                    break;
                default:
                    displayMessage("Error creating user:", error);
            }
        }

        function displayMessage(message) {
            setTimeout(function () {
                $scope.showError = true;
                $scope.errorMessage = message;
                $scope.$apply();
            }, 1000)
        }



    function expandTabs() {
        $('section').scrollTop(54);
        $('.contain').toggleClass('active');
    }

    function createIframe(url, tabId) {
        var iframes = document.createElement("iframe");
        iframes.setAttribute("src", "http://www.bing.com/search?q=" + url);
        iframes.setAttribute("class", "iframe active");
        iframes.setAttribute("id", tabId);
        iframes.setAttribute("width", window.innerWidth);
        iframes.setAttribute("height", "100%");
    }



    function resizeIframe() {
        $("iframe").each(function () {
            $(this).width = window.innerWidth;
            $(this).height = "100%";
            $(this).load(onSrcIframeChange());
        });
    }



    function onSrcIframeChange() {
        var iframeId = $('.iframe.active').attr('id');
        var url = $('.iframe.active').attr('src');
        console.log('src changed ' + $('.iframe.active').attr('src'));

        //  urlCleaner(url);
    }
});
