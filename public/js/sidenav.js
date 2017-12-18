function openNav() {
	
	if(document.getElementById("mySidenav").style.display == "block") {
		closeNav();
		return;
	}
	document.getElementById("mySidenav").style.display = "block";
    //document.getElementById("header").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.display = "none";
    //document.getElementById("header").style.marginLeft = "0px";
}