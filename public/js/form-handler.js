(function () {

  function init(){
    $('#emailSubmit').click(submitButtonHandler);
  }

  function submitButtonHandler (evt) {
     var testForm = document.getElementById('contactForm');

      //prevent form submission
      evt.preventDefault();
      evt.stopPropagation();

    //  $('#post-results-container').fadeOut();
      $('.ajaxLoader').css('display', 'inline-block');


      //make the AJAX call
      $.ajax({
        url: '/send-sms',
        type: 'POST',
        data: {
          nameOfSender: contactForm.nameOfSender.value,
          comment: contactForm.comment.value,
          email:contactForm.email.value
        },
        success: postSuccessHandler
      });
  }

  function postSuccessHandler (jsonData) {
   
    var $data = $('#post-results-container .message');
    $('.ajaxLoader').hide();

    //update the UI with the data returned from the AJAX call 
     $.each(jsonData, function (key, val) {
      $data.append('Hello! ' +  val + ', your message has been sent');
    });

    $('#post-results-container').fadeIn();
  };

//init on document ready
$(document).ready(init);
})();