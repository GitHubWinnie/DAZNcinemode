// ==UserScript==
// @name         DAZN cinema mode
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Cinema mode for DAZN
// @author       Me
// @match        https://www.dazn.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var cinema_player_mode = function() {
        //PLAYER CSS SETTINGS FOR CINEMA MODE
        if( document.querySelector(".main__player-layout___32auo.main__player-layout-with-panel___2zrYN") ) {
            document.querySelector(".main__player-layout___32auo.main__player-layout-with-panel___2zrYN").style = "width:100%;padding: 0;";
        }

        if( document.querySelector(".main__player-main-overrides___udExH") ) {
            document.querySelector(".main__player-main-overrides___udExH").style = "max-width:unset;";
        }

        if( document.querySelector(".video-content__video-content-container___3ymlX.video-content__video-content-container-with-panel___GGVT2") ) {
            document.querySelector(".video-content__video-content-container___3ymlX.video-content__video-content-container-with-panel___GGVT2").className = "removed_class";
        }

        //REMOVE CINEMA BUTTON
        document.getElementById("button_cinema").remove();
        //document.getElementById("li_button_cinema").remove();

        //STATS
        if( document.querySelector(".main__player-aside___zkzRP") && document.querySelector(".main__player-aside___zkzRP").textContent.trim().length > 0 ) {
            //HIDE STATS
            document.querySelector(".main__player-aside___zkzRP").style = "display:none;";

            //ADD STATS BUTTON TO PLAYER BAR
            var button_stats = document.createElement("button");
            button_stats.setAttribute("id","button_stats")
            document.getElementsByClassName("fullscreen___fullscreen___1OXBx")[0].after(button_stats);
            document.querySelector("#button_stats").innerHTML = "STATS";
            document.querySelector("#button_stats").style = "cursor:pointer;";

            //ADD STATS LINK TO FOLLOW BAR
            //document.getElementsByClassName("event-options__favourites-list___1R00s")[0].innerHTML += '<li style="padding:0 25px"><a id="button_stats">STATS</a></li>';

            //CLICK EVENT LISTENER FOR STATS BUTTON
            document.querySelector("#button_stats").addEventListener("click", toggle_player_stats , false);
        }
    }
    var toggle_player_stats = function() {
        if( document.querySelector(".main__player-aside___zkzRP").style.display == "block" ) { document.querySelector(".main__player-aside___zkzRP").style = "display:none;"; }
        else { document.querySelector(".main__player-aside___zkzRP").style = "display:block;"; }
    }
    var add_cinema_button = function() {
        if( document.getElementsByClassName("fullscreen___fullscreen___1OXBx")[0] ) {
            //ADD CINEMA BUTTON TO PLAYER BAR
            var button_cinema = document.createElement("button");
            button_cinema.setAttribute("id","button_cinema")
            document.getElementsByClassName("fullscreen___fullscreen___1OXBx")[0].after(button_cinema);
            document.querySelector("#button_cinema").innerHTML = "CINEMA";
            document.querySelector("#button_cinema").style = "cursor:pointer;";

            //ADD CINEMA LINK TO FOLLOW BAR
            //document.getElementsByClassName("event-options__favourites-list___1R00s")[0].innerHTML += '<li id="li_button_cinema" style="padding:0 25px"><a id="button_cinema">KINOMODUS</a></li>';

            //CLICK EVENT LISTENER FOR CINEMA BUTTON
            document.querySelector("#button_cinema").addEventListener("click", cinema_player_mode , false);
        } else if (count_runs < 4) {
            count_runs += 1;
            setTimeout(add_cinema_button,3000);
            //console.log("UserScript - Cinema Button: Unsuccsessful run " + count_runs);
        }
    }
    var count_runs = 0;
    setTimeout(add_cinema_button,5000);
    //console.log("UserScript - Cinema Button: ADD BUTTON AFTER LOAD");

    // CHECK IF URL CHANGED
    let prevUrl = window.location.href;
    setInterval(() => {
        const currUrl = window.location.href;
        //console.log("UserScript - Cinema Button: URL CHECKED FOR CHANGES");
        if (currUrl != prevUrl) {
            // URL CHANGED
            prevUrl = currUrl;

            if( document.getElementById("button_cinema") ) { document.getElementById("button_cinema").remove(); }
            count_runs = 0;
            setTimeout(add_cinema_button,5000);
            //console.log("UserScript - Cinema Button: ADD BUTTON AFTER REDIRECT");
        }
    }, 4000);

})();
