
function setHotSpot() {
    var pos;
    for (var i = 0;i<square.length;i++)
        window.frames[0].document.getElementById("mini"+i).innerHTML = "";
    for (var i = 0;i<pcount;i++){
        pos = player[i].position;
        if (pos == "20_5") pos = 21;
        var minisq = window.frames[0].document.getElementById("mini"+pos);
        // minisq.display.;
        if (minisq.innerHTML=="") {
            //     window.frames[0].document.getElementsByClassName("info-icon1")[0].offsetTop = minisq.offsetTop;
            //     window.frames[0].document.getElementsByClassName("info-icon1")[0].offsetLeft = minisq.offsetLeft;
            //     console.log(window.frames[0].document.getElementsByClassName("info-icon1")[0].offsetTop+"  1 "+minisq.offsetTop);
            //     console.log(window.frames[0].document.getElementsByClassName("info-icon1")[0].offsetLeft+"  2 "+minisq.offsetLeft);

            var container2 = minisq.appendChild(document.createElement("div"));
            container2.id = "container2";
            var popover = container2.appendChild(document.createElement("div"));
            popover.class = "container2 popover innertop";
            popover.data_easein = "cardInTop";
            popover.data_easeout = "cardOutTop";
            popover.id = "pop5";
            var popoverinner = popover.appendChild(document.createElement("div"));
            popoverinner.className = "popover-inner";
            var popovertitle = popoverinner.appendChild(document.createElement("h3"));
            popovertitle.innerText = "到达玩家";
            popovertitle.class = "popover-title";
            var popovercontent = popoverinner.appendChild(document.createElement("div"));
            popovercontent.className = "popover-content";
            var p = popovercontent.appendChild(document.createElement("p"));
            p.innerText = player[i].name;

            var arrow = container2.appendChild(document.createElement("img"));
            arrow.src = "./image/arrow2.png";
            arrow.class = "info-icon info-icon1";
            arrow.data_target = "pop5";
            arrow.alt = "info";
        }
        // console.log(minisq.innerHTML);

    }
}
