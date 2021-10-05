var element = $(".floating-chat");
var myStorage = localStorage;

if (!myStorage.getItem("chatID")) {
    myStorage.setItem("chatID", createUUID());
}

setTimeout(function () {
    element.addClass("enter");
}, 1000);

element.click(openElement);

function openElement() {
    var messages = element.find(".messages");
    var textInput = element.find(".text-box");
    element.find(">i").hide();
    element.addClass("expand");
    element.find(".chat").addClass("enter");
    var strLength = textInput.val().length * 2;
    textInput.keydown(onMetaAndEnter).prop("disabled", false).focus();
    element.off("click", openElement);
    element.find(".header button").click(closeElement);
    element.find("#sendMessage").click(sendNewMessage);
    messages.scrollTop(messages.prop("scrollHeight"));
}

function closeElement() {
    element.find(".chat").removeClass("enter").hide();
    element.find(">i").show();
    element.removeClass("expand");
    element.find(".header button").off("click", closeElement);
    element.find("#sendMessage").off("click", sendNewMessage);
    element
        .find(".text-box")
        .off("keydown", onMetaAndEnter)
        .prop("disabled", true)
        .blur();
    setTimeout(function () {
        element.find(".chat").removeClass("enter").show();
        element.click(openElement);
    }, 500);
}

function createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

function sendNewMessage() {
    var userInput = $(".text-box");
    var newMessage = userInput
        .html()
        .replace(/\<div\>|\<br.*?\>/gi, "\n")
        .replace(/\<\/div\>/g, "")
        .trim()
        .replace(/\n/g, "<br>");

    if (!newMessage) return;

    var messagesContainer = $(".messages");

    messagesContainer.append(
        ['<li class="self">', newMessage, "</li>"].join("")
    );

    // clean out old message
    userInput.html("");
    // focus on input
    userInput.focus();

    messagesContainer.finish().animate(
        {
            scrollTop: messagesContainer.prop("scrollHeight")
        },
        250
    );
}

function onMetaAndEnter(event) {
    if ((event.metaKey || event.ctrlKey) && event.keyCode == 13) {
        sendNewMessage();
    }
}
$(function() {
    var INDEX = 0; 
    $("#chat-submit").click(function(e) {
      e.preventDefault();
      var msg = $("#chat-input").val(); 
      if(msg.trim() == ''){
        return false;
      }
      generate_message(msg, 'self');
      var buttons = [
          {
            name: 'Existing User',
            value: 'existing'
          },
          {
            name: 'New User',
            value: 'new'
          }
        ];

      // Copy message
      setTimeout(function() {      
        admin_message(msg, 'Admin');  
      }, 1000)
      
    })
    
    function generate_message(msg, type) {
      INDEX++;
      var str="";
      str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
      str += "          <div class=\"cm-msg-text\">";
      str += msg;
      str += "          <\/div>";
      str += "        <\/div>";
      $(".chat-logs").append(str);
      $("#cm-msg-"+INDEX).hide().fadeIn(300);
      if(type == 'self'){
       $("#chat-input").val(''); 
      }    
      $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
    }  
        function admin_message(msg, type) {
      INDEX++;
      var str="";
      str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
      str += "          <div class=\"cm-msg-text\">";
      str += msg;
      str += "          <\/div>";
      str += "        <\/div>";
      $(".chat-logs").append(str);
      $("#cm-msg-"+INDEX).hide().fadeIn(300);
      if(type == 'self'){
       $("#chat-input").val(''); 
      }    
      $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
    }  
    
    
    $(document).delegate(".chat-btn", "click", function() {
      var value = $(this).attr("chat-value");
      var name = $(this).html();
      $("#chat-input").attr("disabled", false);
      generate_message(name, 'self');
    })
    
    $("#chat-circle").click(function() {    
      $("#chat-circle").toggle('scale');
      $(".chat-box").toggle('scale');
    })
    
    $(".chat-box-toggle").click(function() {
      $("#chat-circle").toggle('scale');
      $(".chat-box").toggle('scale');
    })
    
  })