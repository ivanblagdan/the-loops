
jQuery(function($) {
	// date range picker
	var dates = $("#loop-min-date, #loop-max-date").datepicker({
		changeMonth: true,
		onSelect: function( selectedDate ) {
			var option = this.id == "loop-min-date" ? "minDate" : "maxDate",
				instance = $( this ).data("datepicker"),
				date = $.datepicker.parseDate(
					instance.settings.dateFormat ||
					$.datepicker._defaults.dateFormat,
					selectedDate, instance.settings);
			dates.not(this).datepicker("option", option, date);
		}
	});

	// parameter table addition
	$(".tl-add-parameter").click(function(e) {
		e.preventDefault();

		var parent, tax_count, tax_table;

		parent = $(this).parent();

		tax_count = parent.siblings().length - 1;

		tax_table = parent.next().clone()
			.removeClass("hide-if-js")
			.wrap("<div>").parent().html()
			.replace(/{key}/gi, tax_count);

		tax_table = $(tax_table);
		tax_table.insertBefore($(this));

		// tags input
		tax_table.find('.tl-tagsinput').tagsInput({
			height           : "5em",
			width            : "24em",
			defaultText      : "add a value",
			delimiter        : "\t"
		});
	});

	// parameter table deletion
	$(".inside").on("click", ".tl-delete", function(e) {
		e.preventDefault();

		$(this).parents(".tl-parameter").remove();
	});

	// toggle target elements when an input value change to one of the predefined values
	// if no condition is specified, just check if the input value is not empty
	var toggleInput = function (input, targets, conditions) {
		var match = false
			, value = input.val()
			, valueIsArray = $.isArray(value);

		if ( valueIsArray ) {
			$.each(value, function (i, val) {
				if ( $.inArray(val, conditions) > -1 ) {
					match = true;
					return;
				}
			});
		} else if ( ! conditions ) {
			value = $.trim(value);
			match = value.length > 0;
		} else {
			match = $.inArray(value, conditions) > -1;
		}

		targets = targets.join(",");

		if ( match )
			$(targets).removeClass("hide-if-js");
		else
			$(targets).addClass("hide-if-js");
	}

	$("#loop_orderby").change(function () {
		toggleInput($(this), [".tl_meta_key"], ["meta_value", "meta_value_num"]);
	});

	$("#loop_pagination").change(function () {
		toggleInput($(this), [".tl_offset", ".tl_paged"], ["none"]);
	});

	$("#loop_post_status").change(function () {
		toggleInput($(this), [".tl_readable"], ["private"]);
	});
});
