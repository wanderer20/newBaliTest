$(document).ready(function() {
$('.header_burger').click(function(event){
$('.header_burger, .menu').toggleClass('active');
$('body').toggleClass('lock');
    });
});