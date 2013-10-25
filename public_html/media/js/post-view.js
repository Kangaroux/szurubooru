$(function()
{
	$('li.edit a').click(function(e)
	{
		e.preventDefault();

		var aDom = $(this);
		if (aDom.hasClass('inactive'))
			return;
		aDom.addClass('inactive');

		var tags = [];
		$.getJSON('/tags?json', function(data)
		{
			tags = data['tags'];

			var tagItOptions = getTagItOptions();
			tagItOptions.availableTags = tags;
			tagItOptions.placeholderText = $('.tags input').attr('placeholder');
			$('.tags input').tagit(tagItOptions);

			e.preventDefault();
			var formDom = $('form.edit-post');
			formDom.show().css('height', formDom.height()).hide().slideDown();

			$('html, body').animate({ scrollTop: $(formDom).offset().top + 'px' }, 'fast');
		});
	});

	$('form.edit-post').submit(function(e)
	{
		e.preventDefault();

		var formDom = $(this);
		if (formDom.hasClass('inactive'))
			return;
		formDom.addClass('inactive');
		formDom.find(':input').attr('readonly', true);

		var url = formDom.attr('action') + '?json';
		var fd = new FormData(formDom[0]);

		var ajaxData =
		{
			url: url,
			data: fd,
			processData: false,
			contentType: false,
			type: 'POST',

			success: function(data)
			{
				if (data['success'])
				{
					window.location.reload();
				}
				else
				{
					alert(data['errorMessage']);
					formDom.find(':input').attr('readonly', false);
					formDom.removeClass('inactive');
				}
			}
		};

		$.ajax(ajaxData);
	});

	$('form.add-comment').submit(function(e)
	{
		e.preventDefault();

		var formDom = $(this);
		if (formDom.hasClass('inactive'))
			return;
		formDom.addClass('inactive');
		formDom.find(':input').attr('readonly', true);

		var url = formDom.attr('action') + '?json';
		var fd = new FormData(formDom[0]);

		var preview = false;
		$.each(formDom.serializeArray(), function(i, x)
		{
			if (x.name == 'sender' && x.value == 'preview')
				preview = true;
		});

		var ajaxData =
		{
			url: url,
			data: fd,
			processData: false,
			contentType: false,
			type: 'POST',

			success: function(data)
			{
				if (data['success'])
				{
					if (preview)
					{
						formDom.find('.preview').html(data['textPreview']).show();
						formDom.find(':input').attr('readonly', false);
						formDom.removeClass('inactive');
					}
					else
					{
						window.location.reload();
					}
				}
				else
				{
					alert(data['errorMessage']);
					formDom.find(':input').attr('readonly', false);
					formDom.removeClass('inactive');
				}
			}
		};

		$.ajax(ajaxData);
	});

	Mousetrap.bind('a', function() { var url = $('#sidebar .left a').attr('href'); if (typeof url !== 'undefined') window.location.href = url; });
	Mousetrap.bind('d', function() { var url = $('#sidebar .right a').attr('href'); if (typeof url !== 'undefined') window.location.href = url; });
	Mousetrap.bind('e', function() { $('li.edit a').trigger('click'); return false; });
});
