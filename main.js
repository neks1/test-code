/**
 * @file
 * Bizclik behaviors.
 */

(function ($, Drupal, settings) {
  'use strict';

  Drupal.behaviors.mobileMenu = {
    attach: function attach(context) {
      var $this = this;
      var btn = $('.header .burger', context),
        mobMenu = $('.header .header-right', context);

      btn.click(function () {
        return $this.toggleMenu(mobMenu, btn);
      });

      $(window).on('resize', function () {
        if ($(window).width() > 1199) {
          $this.hideMobileMenu(mobMenu, btn);
        }
      });
    },

    hideMobileMenu: function hideMobileMenu(mobMenu, btn) {
      mobMenu.removeClass('is-active');
      btn.removeClass('is-active');
      $('body').removeClass('body-fixed');
      $('.page-overlay').removeClass('blur');
    },

    toggleMenu: function toggleMenu(mobMenu, btn) {
      mobMenu.toggleClass('is-active');
      btn.toggleClass('is-active');
      $('body').toggleClass('body-fixed');
      $('.page-overlay').toggleClass('blur');
    }
  }

  Drupal.behaviors.showExpandedMobile = {
    attach: function(context, settings) {
      var self = this;
      [$('.menu--main', context)].forEach(self.addBtn.bind(self));

      $(window).on('resize', function () {
        $('.menu--main .menu .menu-item.menu-item--expanded .menu.active').removeClass('active');
      })
    },

    addBtn: function(parentEl) {
      var self = this;
      parentEl.find('li.menu-item--expanded').each(function(i, el) {
        $(el).find('> .menu').prepend('<div class="back">' + Drupal.t('Main Menu') + '</div>');

        $(el).find('> a').click(function (e) {
          if ($(window).width() < 1200) {
            e.preventDefault();
            self.nextLevel(e);
          }
        });

        $(el).find('> span').click(function (e) {
          if ($(window).width() < 1200) {
            e.preventDefault();
            self.nextLevel(e);
          }
        });

        $('.back').click(function (e) {
          if ($(window).width() < 1200) {
            self.closeMenu(e);
          }
        });

        var text = $(el).find('> a').text();
        var textSpan = $(el).find('> span').text();

        if ($(el).find('> a').length) {
          $(el).find('.back').after('<div class="menu-title">' + text + '</div>');
        }

        if ($(el).find('> span').length) {
          $(el).find('.back').after('<div class="menu-title">' + textSpan + '</div>');
        }
      });
    },

    nextLevel: function(e) {
      var open = $(e.target).closest('li').children('.menu');
      open.addClass('active');
    },

    closeMenu: function(e) {
      var close = $(e.target).closest('li').children('.menu');
      close.removeClass('active');
    }
  }

  Drupal.behaviors.servicesListSlider = {
    attach: function (context, settings) {
      var opt = [
        {
          slider: $('.block-bc-bottom-services-list-block .bottom-services-list-wrapper'),
          context: context,
          options: {
            arrows: false,
            infinite: false,
            dots: false,
            slidesToShow: 6,
            variableWidth: true,
            slidesToScroll: 1,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 4
                }
              },
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 3.5
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2.5
                }
              }
            ]
          }
        }
      ]
      for (var i = 0; i < opt.length; i++) {
        this.initialize(opt[i].slider, opt[i].options);
      }
    },

    initialize: function (slider, options, context) {
      $(slider, context).not('.slick-initialized').slick(options);
    }
  }

  Drupal.behaviors.menuBackground = {
    attach: function (context, settings) {
      this.findColor('.menu .menu-item .services-link', '.services-link', '.menu-item', 'data-main-color', context);
      this.findColor('.menu .menu-item .brands-link', '.brands-link', '.menu-item', 'data-second-color', context);
      this.createCircle('.menu .menu-item', '.brands-link', '.menu-item', context);
    },

    findColor: function (hover, el, parEl, color, context) {
      $(hover, context).on('mouseenter touchstart', function () {
        var bgColor = $(this).closest(parEl).find(el).attr(color);

        $(this).closest(parEl).find(el).css('background-color', bgColor);
      });

      $(hover, context).on('mouseleave touchend', function () {
        $(this).closest(parEl).find(el).css('background-color', '');
      });
    },

    createCircle: function (el, link, parEl, context) {
      $(el, context).find(link).append('<div class="menu-circle"></div>');

      $(el, context).once(link).each(function () {
        var bgCircleColor = $(this).closest(parEl).find(link).attr('data-main-color');

        $(this).closest(parEl).find('.menu-circle').css('border-color', bgCircleColor);
      });
    }
  }

  Drupal.behaviors.header = {
    attach: function (context, settings) {
      $(window).scroll(function(){
        if ($(window).width() > 1199) {
          if ($(this).scrollTop() > 50) {
            $('.header', context).addClass('scroll-is-active');
          }
          else {
            $('.header', context).removeClass('scroll-is-active');
          }
        } else {
          if ($(this).scrollTop() > 50) {
            $('.header .header-wrapper .header-left', context).addClass('scroll-is-active');
          }
          else {
            $('.header .header-wrapper .header-left', context).removeClass('scroll-is-active');
          }
        }
      });
    }
  };

})(jQuery, Drupal, drupalSettings);
