$(document).ready(function() {
  var $lines = $('.prompt .line');
  var lineCommands = new Array();
  var lineNumber = 1;

  $lines.hide();

  $lines.each(function(index) {
    lineCommands[index] = {
      command: $(this).find(".command").text(),
      response: $(this).find(".response").text()
    }

    $(this).text('').show();
  });

  var terminal = function() {
    typeLine = function(idx) {
      idx == null && (idx = 0);
      var element = $lines.eq(idx);
      var line = lineCommands[idx]

      if (typeof line == "undefined") {
        $(".prompt").append('<span class="irb end">irb(main):00' + lineNumber +':0></span> ');
        return;
      }

      var command = line.command;
      var response = line.response;
      var charIdx = 0;

      var typeChar = function() {
        var rand = Math.round(Math.random() * 150) + 25;

        setTimeout(function() {
          var char = command[charIdx++];
          element.append(char);

          if (typeof char !== "undefined") {
            typeChar();
          } else {
            element.append('<br/><span class="output"> => ' + response + '</span>');
            element.removeClass('active');
            lineNumber++;
            typeLine(++idx);
          }
        }, rand);
      }

      element.append('<span class="irb">irb(main):00' + lineNumber +':0></span> ').addClass('active');
      typeChar();
    }
    typeLine();
  }();
});

