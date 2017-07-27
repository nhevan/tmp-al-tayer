define(['jquery'], function ($) {
    function init(container) {

        $('.brand-tabs__container a').click(function (e) {
            e.preventDefault();

            $(this).closest('.brand-tabs__container').find('a').removeClass('active').filter(this)
                .addClass('active');

            var pane = $(this).attr('href');
            $('#brand_content_container .accessory-detail').hide().filter(pane).show();
        });

        $('.btn').click(function (e) {
            e.preventDefault();

            var $this = $(this),
                currentLevel = $this.closest('.brand-content-group').data('level'),
                target = $(this).attr('target'),
                $target = $(target),
                maxLevel = 10, // harcode max level of buttons can be displayed
                normalBgColor = '#FD5204',
                selectedBgColor = '#454545';

            $('.brand-content-group-level' + currentLevel).find('.btn').css('background-color', normalBgColor);
            $this.css('background-color', selectedBgColor);

            if ($target) {
                var targetLevel = $target.data('level') || ++currentLevel;
                for (var i = targetLevel; i < maxLevel; i++) {
                    $('.brand-content-group-level' + i).hide().find('.btn').css('background-color', normalBgColor);
                }

                if (!$this.hasClass('show-group'))
                    $(this.getAttribute("target") + ' .modal-dialog').css('top', '50%');
                else
                    $target.show();

            }
        });

        $('.btn-close').click(function () {
            $(this).closest('.modal-dialog').css('top', '-200%');
        });
    }

    return {
        init: function (container) {
            init(container);
        }
    };
});