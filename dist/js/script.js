$(document).ready(function() {

    let header_nav = $(".nav-header");
    header_nav.hover(function(){
        $(this).toggleClass("_active");
    });


    let checkbox_parent = $(".forms__checkbox--parent[data-check-name]");
    $('#continue').prop('disabled', true);
      
    checkbox_parent.change(function() {
        let checkbox_parent_data = checkbox_parent.attr("data-check-name");
        $('[data-check-name=' + checkbox_parent_data + ']')
        .prop('disabled', function(i, val) {
            if(!$(this).hasClass("forms__checkbox--parent")) {
                return !val;
            }
          
        })
        .prop('checked', function(i, val) {
            if(!$(this).hasClass("forms__checkbox--parent")) {
                return false;
            }
          
        })
    });
    
    if ($(window).width() > 992) {
        (function () {
            var a = document.querySelector('.aside__wrap'), b = null, K = null, Z = 0, P = 50, N = -100;  // если у P ноль заменить на число, то блок будет прилипать до того, как верхний край окна браузера дойдёт до верхнего края элемента, если у N — нижний край дойдёт до нижнего края элемента. Может быть отрицательным числом
            var btn = document.querySelector('.nav-side__link');
            var maxWidth = 992;

            window.addEventListener('scroll', Ascroll, false);
            btn.addEventListener('click', Ascroll, false);
            document.body.addEventListener('scroll', Ascroll, false);
            
            function Ascroll() {
                var Ra = a.getBoundingClientRect(),
                    R1bottom = document.querySelector('.main__body').getBoundingClientRect().bottom;
                if ((Ra.bottom < R1bottom) && (window.innerWidth >= maxWidth)) {
                    if (b == null) {
                        var Sa = getComputedStyle(a, ''), s = '';
                        for (var i = 0; i < Sa.length; i++) {
                            if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
                                s += Sa[i] + ': ' + Sa.getPropertyValue(Sa[i]) + '; '
                            }
                        }
                        b = document.createElement('div');
                        b.className = "aside__wrap--stop";
                        b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
                        a.insertBefore(b, a.firstChild);
                        var l = a.childNodes.length;
                        for (var i = 1; i < l; i++) {
                            b.appendChild(a.childNodes[1]);
                        }
                        a.style.height = b.getBoundingClientRect().height + 'px';
                        a.style.padding = '0';
                        a.style.border = '0';
                    }
                    var Rb = b.getBoundingClientRect(),
                        Rh = Ra.top + Rb.height,
                        W = document.documentElement.clientHeight,
                        R1 = Math.round(Rh - R1bottom),
                        R2 = Math.round(Rh - W);
                    if (Rb.height > W) {
                        if (Ra.top < K) {  // скролл вниз
                            if (R2 + N > R1) {  // не дойти до низа
                                if (Rb.bottom - W + N <= 0) {  // подцепиться
                                    b.className = 'aside__wrap--sticky';
                                    b.style.top = W - Rb.height - N + 'px';
                                    Z = N + Ra.top + Rb.height - W;
                                } else {
                                    b.className = 'aside__wrap--stop';
                                    b.style.top = - Z + 'px';
                                }
                            } else {
                                b.className = 'aside__wrap--stop';
                                b.style.top = - R1 + 'px';
                                Z = R1;
                            }
                        } else {  // скролл вверх
                            if (Ra.top - P < 0) {  // не дойти до верха
                                if (Rb.top - P >= 0) {  // подцепиться
                                    b.className = 'aside__wrap--sticky';
                                    b.style.top = P + 'px';
                                    Z = Ra.top - P;
                                } else {
                                    b.className = 'aside__wrap--stop';
                                    b.style.top = - Z + 'px';
                                }
                            } else {
                                b.className = '';
                                b.style.top = '';
                                Z = 0;
                            }
                        }
                        K = Ra.top;
                    } else {
                        if ((Ra.top - P) <= 0) {
                            if ((Ra.top - P) <= R1) {
                                b.className = 'aside__wrap--stop';
                                b.style.top = - R1 + 'px';
                            } else {
                                b.className = 'aside__wrap--sticky';
                                b.style.top = P + 'px';
                            }
                        } else {
                            b.className = '';
                            b.style.top = '';
                        }
                    }
                    window.addEventListener('resize', function () {
                        a.children[0].style.width = getComputedStyle(a, '').width
                    }, false);
                }
            }
        })()
    }

    $(window).resize(function (params) {
        if ($(window).width() < 992) {
            $(".aside__wrap > div").removeClass("aside__wrap--sticky");
            $(".aside__wrap > div").attr("style", "");
            $(".aside__wrap").attr("style", "");
        }        
    });

    $(".card-area__item--card").mask("9999 9999 9999 9999");
    $(".card-area__item--date").mask("99 / 99");
    $(".card-area__item--cvv").mask("999");

    var tabEl = $('.nav-tabs__link[data-bs-toggle="tab"]');  
    
    var tabTitle = $('#titleTabs');
    tabEl.on("click", function (params) {
        tabTitle.text($(this).text());
    });

    displaySideMenu();

    $(".nav-side__toggle").on("click", function (params) {
        if($(this).attr("data-menu-side") === "1") {
            $(this).attr("data-menu-side", 0);
        } else {
            $(this).attr("data-menu-side", 1);
        }      
        let a = $(this).attr("data-menu-side");
        slideSideMenu(a);
    });

    $(".nav-side__link").on("click", function (e) {        
        if ($(this).siblings(".nav-side__submenu").length > 0) {
            e.preventDefault();
            if ($(this).hasClass("_active")) {
                $(this).removeClass("_active");
            } else {
                $(this).addClass("_active");
            }            
        }
        $(".nav-side__link").not($(this)).removeClass("_active");
    });

    $(window).resize(function () {
        displaySideMenu();
    });


    // Активируем таб при переходе с другой страницы
    if (getHash() !== "") {
        let hash = getHash();
        let str = hash.indexOf('tab');
        if (str !== -1) {
            let actvieItem = $("[data-bs-target='#"+ hash +"']");
            let actvieTab = new bootstrap.Tab(actvieItem);
            actvieTab.show();
        }
    }
    $("[data-bs-toggle-double]").on("click", function (params) {
        let hash = $(this).attr("href").split('#');
        let actvieItem = $("[data-bs-target='#"+ hash[1] +"']");
        let actvieTab = new bootstrap.Tab(actvieItem);
        actvieTab.show();
    });

});

function getHash() {
    let hash = location.hash.substring(1);
    return hash;
}

function slideSideMenu(param) {
    if ($(".nav-side").hasClass("_mini")) {
        if (param === "1") {
            $(".nav-side").addClass("_open");
            $(".nav-side__btn").removeClass("icon-tmenu").addClass("icon-close");
        } else if (param === "0") {
            $(".nav-side").removeClass("_open");
            $(".nav-side__link").removeClass("_active");            
            $(".nav-side__btn").removeClass("icon-close").addClass("icon-tmenu");
        }
    }
}
function displaySideMenu() {
    if ($(window).width() < 992) {
        $(".nav-side").addClass("_mini");
    } else {
        $(".nav-side").removeClass("_mini");
        $(".nav-side").removeClass("_open");
        $(".nav-side__link").removeClass("_active");
        $(".nav-side__btn").removeClass("icon-close").addClass("icon-tmenu");
    }
}
