$(document).ready(function() {
  var windowPath = window.location.pathname;
  if (windowPath === "/" || windowPath === "/charges/new") {
    var $tripeButton = $('#stripe-button');
    var $tripeAmount = $('#stripe-amount');
    var $tripeToken = $('#stripe-token');
    var $tripeForm = $('#stripe-form');

    var handler = StripeCheckout.configure({
      key: 'pk_test_fads0ZlNqu7ZE4dh5Ko3U4Mr',
      image: 'https://s3.amazonaws.com/stripe-uploads/acct_16RqArF0tqdkC24nmerchant-icon-1456718573239-Screen%20Shot%202016-02-28%20at%209.03.00%20PM.png',
      locale: 'auto',
      token: function(token) {
        $("#stripe-token").val(token.id);
        $tripeForm.submit();
      }
    });

    $tripeButton.click(function(e) {
      e.preventDefault();
      handler.open({
        name: 'Flea',
        amount: $tripeAmount.val() * 100
      });
    });

    $(window).on('popstate', function() {
      handler.close();
    });
  }
});
