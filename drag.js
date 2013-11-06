$('.bar').on('mousedown', function(ev) {
  var target;

  if ($(ev.target).is('.handle:first-child')) {
    target = $(ev.currentTarget).width('auto');
    $(document).on('mousemove',resizeLeft);
  } else if ($(ev.target).is('.handle:last-child')) {
    target = $(ev.currentTarget).width('auto');
    $(document).on('mousemove',resizeRight);
  } else {
    target = $(this);
    $(document).on('mousemove',drag);
  }

  var startLeft = target.offset().left;
  var startPosLeft = target.position().left;
  var mouseOffset = ev.clientX - target.offset().left;
  var startWidth = target.width();
  var parent = target.parent();
  var parentOffset = parent.offset();
  var parentWidth = parent.width();
  
  var drawing = false;

  $(document).on('mouseup', function() {
    target = null;
    $(this).off('mouseup mousemove');
  });

  function resizeRight(ev) {
    var width = ev.clientX - startLeft;

    if (target && !drawing && width <= parentWidth - startPosLeft) {
      requestAnimationFrame(function() {
        drawing = false;
        target.css('min-width', width);
      });
      drawing = true;
    }
  }

  function drag(ev) {
    var left = ev.clientX - parentOffset.left - mouseOffset;

    if (target && !drawing && left >= 0 && left <= parent.width() - target.width()) {
      requestAnimationFrame(function() {
        drawing = false;
        target.css('left', left);
      });
      drawing = true;
    }
  }

  function resizeLeft(ev) {
    var left = ev.clientX - parentOffset.left;
    var width = startPosLeft + startWidth - left;

    if (target && !drawing && left >= 0 && width >= 0) {
      requestAnimationFrame(function() {
        drawing = false;
        target.css({
          minWidth: width,
          left: left
        });
      });
      drawing = true;
    }
  }
});