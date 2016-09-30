$(".draggable").draggable({
    revert: true,
    revertDuration: 0
});

$(".droppable").droppable({
    activeClass: "active",
    hoverClass: "hover",

    accept: function (draggable) {
        // The droppable (li element).
        var droppable = $(this);

        // The droppable which contains the draggable, i.e., the parent element of the draggable (li element).
        var draggablesDropable = draggable.parent();

        // Is the draggable being dragged/sorted to the same group?
        // => We could just sort it, because there's always enough space inside the group.
        if (droppable.parent().is(draggablesDropable.parent())) {
           return true;
        }

        // Nope, the draggable is being dragged/sorted to another group.
        // => Is there an empty droppable left in the group to which the draggable is being dragged/sorted?
        else if (droppable.parent().find(".draggable").size() < droppable.parent().find(".droppable").size()) {
            return true;
        }

        // Nothing true?
        return false;
    },

    drop: function(event, ui) {
        // The droppable (li element).
        var droppable = $(this);

        // The draggable (span element).
        var draggable = ui.draggable;

        // The droppable which contains the draggable, i.e., the parent element of the draggable (li element).
        var draggablesDropable = draggable.parent();

        // Is the draggable being dragged to it's own droppable?
        // => Abort, there's nothing to drag/sort!
        if (droppable.is(draggablesDropable)) {
            return;
        }

        // Is the draggable being dragged to an empty droppable?
        else if (!droppable.find(".draggable").size()) {
            // Just drop the draggable there.
            droppable.append(draggable);
        }

        // Is the draggable being dragged/sorted to the same group?
        // => We can just sort it, because there's always enough space inside the group.
        else if (droppable.parent().is(draggablesDropable.parent())) {
            // Is the draggable being dragged up?
            if (droppable.parent().find(".droppable").index(draggablesDropable) > droppable.parent().find(".droppable").index(droppable)) {
                // Add the dragged draggable's droppable before the droppable.
                draggablesDropable.insertBefore(droppable);
            }

            // No, the draggable is being dragged down.
            else {
                // Add the dragged draggable's droppable after the droppable.
                draggablesDropable.insertAfter(droppable);
            }
        }

        // Nope, the draggable is being dragged/sorted to another group.
        // => Is there an empty droppable left in the group to which the draggable is being dragged/sorted?
        else if (droppable.parent().find(".draggable").size() < droppable.parent().find(".droppable").size()) {
            // Find the first empty droppable in which the draggable is being dragged/sorted.
            var emptyDroppable = $($.grep(droppable.parent().find(".droppable"), function (item) {
                // Are there draggables inside this droppable?
                // => Return TRUE if not.
                return !$(item).find(".draggable").size();
            })).first();

            // Clone the dragged draggable's droppable before itself, because we need to remember it's position after moving it.
            var draggablesDropableClone = draggablesDropable.clone().insertBefore(draggablesDropable);

            // Is the draggable being dragged above the empty droppable?
            if (droppable.parent().find(".droppable").index(emptyDroppable) > droppable.parent().find(".droppable").index(droppable)) {
                // Add the dragged draggable's droppable before the droppable.
                draggablesDropable.insertBefore(droppable);
            }

            // No, the draggable is being dragged below the empty droppable.
            else {
                // Add the dragged draggable's droppable after the droppable.
                draggablesDropable.insertAfter(droppable);
            }

            // Remove the position of the dragged draggable, because there's still some css left of the dragging.
            draggable.css({"top": 0, "left": 0});

            // Add the first empty droppable before the cloned draggable's droppable. Remove the latter afterwards.
            draggablesDropableClone.before(emptyDroppable).remove();
        }
    }
});
