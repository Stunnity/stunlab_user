import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor() {}
  ngOnInit() {
    $(document).ready(function() {
      $(".navlist").on("click", function() {
        $(this)
          .siblings()
          .removeClass("active");
        $(this).addClass("active");
      });
    });

    $(document).ready(function() {
      $(".navlist1").on("click", function() {
        $(this)
          .siblings()
          .removeClass("active");
        $(this).addClass("active");
      });
    });
    $(function() {
      $(document).scroll(function() {
        var $nav = $(".navbar");
        $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
      });
    });
    // $(document).ready(function() {
    //   $(".post-wrapper1").slick({
    //     dots: false,
    //     infinite: false,
    //     speed: 300,
    //     slidesToShow: 3,
    //     slidesToScroll: 3,
    //     nextArrow: $(".next1"),
    //     prevArrow: $(".prev1"),
    //     responsive: [
    //       {
    //         breakpoint: 1024,
    //         settings: {
    //           slidesToShow: 2,
    //           slidesToScroll: 2,
    //           infinite: true,
    //           dots: false
    //         }
    //       },
    //       {
    //         breakpoint: 600,
    //         settings: {
    //           slidesToShow: 1,
    //           slidesToScroll: 1
    //         }
    //       },
    //       {
    //         breakpoint: 480,
    //         settings: {
    //           slidesToShow: 0,
    //           slidesToScroll: 0
    //         }
    //       }
    //       // You can unslick at a given breakpoint now by adding:
    //       // settings: "unslick"
    //       // instead of a settings object
    //     ]
    //   });
    // });
    // setTimeout(() => {
    //   $(document).ready(function() {
    //     $(".post-wrapper").slick({
    //       dots: false,
    //       infinite: false,
    //       speed: 300,
    //       slidesToShow: 4,
    //       slidesToScroll: 4,
    //       nextArrow: $(".next"),
    //       prevArrow: $(".prev"),
    //       responsive: [
    //         {
    //           breakpoint: 1024,
    //           settings: {
    //             slidesToShow: 3,
    //             slidesToScroll: 3,
    //             infinite: true,
    //             dots: false
    //           }
    //         },
    //         {
    //           breakpoint: 600,
    //           settings: {
    //             slidesToShow: 2,
    //             slidesToScroll: 2
    //           }
    //         },
    //         {
    //           breakpoint: 480,
    //           settings: {
    //             slidesToShow: 1,
    //             slidesToScroll: 1
    //           }
    //         }
    //         // You can unslick at a given breakpoint now by adding:
    //         // settings: "unslick"
    //         // instead of a settings object
    //       ]
    //     });
    //   });
    // }, 10000);
  }
}
