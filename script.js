$(function () {
    //reading words
    var words = [];
    for (let i = 0; i < 5; i++) {
        words[i] = $(`.word${i}`).find(".letter").text();
    }

    //console.log(words);

    var selected = "";

    //letter selection
    $(".circleLetter").click(function () {
        if (!$(this).hasClass("circleLetter-selected")) {
            $(this).addClass("circleLetter-selected");
            selected += $(this).text();
            $("#selected-text").css("visibility", "visible");
            $("#selected-text").text(selected);
        }
        else {
            $(this).effect("bounce");
        }

    })

    //shuffle button
    $(".shuffle").click(function () {
        let flag = true;
        $(".circleLetter").each(function () {
            if ($(this).hasClass("circleLetter-selected")) {
                flag = false;
            }
        })

        if (flag) {
            var numbers = [];
            while (numbers.length < 5) {
                var num = Math.floor(Math.random() * 5);
                //console.log(num);
                if (numbers.indexOf(num) === -1) {
                    numbers.push(num);
                }
            }
            
            let i = 0;
            $(".circleLetter").each(function () {
                let cls = `circleLetter pos${numbers[i++]}`;
                $(this).attr("class", cls);
            })
        }
        else {
            $(this).effect("shake", {distance: 60}, 500);
        }

    })

    //word submission
    $(".circleMain").mousedown(function (e) {
        e.stopPropagation();
        if (e.which === 3) {
            e.preventDefault();
            let index = words.indexOf(selected);
            let flag = false; //used for detecting if the word is found already
            //console.log(selected);
            //console.log(index);
            if(index !== -1) {
                $(`.word${index}`).each(function() {
                    if(!$(this).hasClass("squareLetter-selected")) {
                        flag = true;
                    }
                })

                //if the word is entered for the first time
                if(flag) {
                    $(`.word${index}`).each(function() {
                        $(this).addClass("squareLetter-selected");
                        $(this).removeClass("squareLetter-help");
                        selected = "";
                        $("#selected-text").css("visibility", "hidden");
                    })
                }
                //if it is aready entered
                else {
                    $(`.word${index}`).each(function() {
                        $(this).find("span").effect("pulsate", {times: 2}, 1000);
                    });
                    $("#selected-text").effect("shake", {distance: 6}, 500, function() {
                        selected = "";
                        $("#selected-text").css("visibility", "hidden");
                    });
                }
            }
            //if the word does not exist
            else {
                $("#selected-text").effect("shake", {distance: 6}, 500, function() {
                    selected = "";
                    $("#selected-text").css("visibility", "hidden");
                });
            }

            $(".circleLetter").each(function () {
                $(this).removeClass("circleLetter-selected");
            })

           
        }
    })

    //tip button
    $("#help").click(function () {
        $(".squareLetter").each(function() {
            if(!$(this).hasClass("squareLetter-selected")) {
                $(this).toggleClass("squareLetter-help");
            }
        })
    })
})
