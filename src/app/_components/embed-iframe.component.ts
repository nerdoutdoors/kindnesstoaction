/** iframely-embed.component.ts */
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Input, Output } from '@angular/core';
import { samples } from './samples';

// Importing Iframely's embed.js as library.
import { iframely } from '@iframely/embed.js';
// It is also available on GitHub at https://github.com/itteco/embedjs,
// Or you can load it off our CDN.

@Component({
  selector: 'app-embed-iframe',
  template: `<div>
              <p bind-innerHTML="htmlCode | safeHtml" ></p>
            </div>`,
})
export class EmbedIframeComponent implements OnInit {
  /** Get html via JSON API calls to /api/oembed or /api/iframely. */
  htmlCode = `
    <div id="amznCharityBanner">83-3215671
      <script type="text/javascript">
      console.log('whoo!');
        (function() {
          console.log('whoo!22222');
          const iFrame = document.createElement('iframe');
          iFrame.style.display = 'none';
          iFrame.style.border = "none";
          iFrame.width = 310;
          iFrame.height = 256;
          iFrame.setAttribute && iFrame.setAttribute('scrolling', 'no');
          iFrame.setAttribute('frameborder', '0');
          setTimeout(function() {
            console.log('whoo33!');
            const contents = (iFrame.contentWindow) ? iFrame.contentWindow : (iFrame.contentDocument.document) ? iFrame.contentDocument.document : iFrame.contentDocument;
            contents.document.open();
            contents.document.write(decodeURIComponent("%3Cdiv%20id%3D%22amznCharityBannerInner%22%3E%3Ca%20href%3D%22https%3A%2F%2Fsmile.amazon.com%2Fch%2F83-3215671%22%20target%3D%22_blank%22%3E%3Cdiv%20class%3D%22text%22%20height%3D%22%22%3E%3Cdiv%20class%3D%22support-wrapper%22%3E%3Cdiv%20class%3D%22support%22%20style%3D%22font-size%3A%2025px%3B%20line-height%3A%2028px%3B%20margin-top%3A%2015px%3B%20margin-bottom%3A%2015px%3B%22%3ESupport%20%3Cspan%20id%3D%22charity-name%22%20style%3D%22display%3A%20inline-block%3B%22%3EKindness%20To%20Action.%3C%2Fspan%3E%3C%2Fdiv%3E%3C%2Fdiv%3E%3Cp%20class%3D%22when-shop%22%3EWhen%20you%20shop%20at%20%3Cb%3Esmile.amazon.com%2C%3C%2Fb%3E%3C%2Fp%3E%3Cp%20class%3D%22donates%22%3EAmazon%20donates.%3C%2Fp%3E%3C%2Fdiv%3E%3C%2Fa%3E%3C%2Fdiv%3E%3Cstyle%3E%23amznCharityBannerInner%7Bbackground-image%3Aurl(https%3A%2F%2Fm.media-amazon.com%2Fimages%2FG%2F01%2Fx-locale%2Fpaladin%2Fcharitycentral%2Fbanner-background-image._CB309675353_.png)%3Bwidth%3A300px%3Bheight%3A250px%3Bposition%3Arelative%7D%23amznCharityBannerInner%20a%7Bdisplay%3Ablock%3Bwidth%3A100%25%3Bheight%3A100%25%3Bposition%3Arelative%3Bcolor%3A%23000%3Btext-decoration%3Anone%7D.text%7Bposition%3Aabsolute%3Btop%3A20px%3Bleft%3A15px%3Bright%3A15px%3Bbottom%3A100px%7D.support-wrapper%7Boverflow%3Ahidden%3Bmax-height%3A86px%7D.support%7Bfont-family%3AArial%2Csans%3Bfont-weight%3A700%3Bline-height%3A28px%3Bfont-size%3A25px%3Bcolor%3A%23333%3Btext-align%3Acenter%3Bmargin%3A0%3Bpadding%3A0%3Bbackground%3A0%200%7D.when-shop%7Bfont-family%3AArial%2Csans%3Bfont-size%3A15px%3Bfont-weight%3A400%3Bline-height%3A25px%3Bcolor%3A%23333%3Btext-align%3Acenter%3Bmargin%3A0%3Bpadding%3A0%3Bbackground%3A0%200%7D.donates%7Bfont-family%3AArial%2Csans%3Bfont-size%3A15px%3Bfont-weight%3A400%3Bline-height%3A21px%3Bcolor%3A%23333%3Btext-align%3Acenter%3Bmargin%3A0%3Bpadding%3A0%3Bbackground%3A0%200%7D%3C%2Fstyle%3E"));
            contents.document.close(); iFrame.style.display = 'block';
          });
          document.getElementById('amznCharityBanner').appendChild(iFrame);
        })();
      </script>
    </div>
  `;

  htmlData1 = "<blockquote class=\"twitter-tweet\" data-dnt=\"true\" align=\"center\"><p lang=\"en\" dir=\"ltr\"><a href=\"https://twitter.com/hashtag/HiwalayanMoNa?src=hash&amp;ref_src=twsrc%5Etfw\">#HiwalayanMoNa</a> mga friends mong plastic , ungrateful and arrogant. They don&#39;t deserve you. Marami pang iba diyan na darating sa buhay mo na mas better sa kanila. It is okay to be alone as long as you are comfortable, respected and unabused. Keep those real with you.</p>&mdash; Angelique (@ArmyAnji) <a href=\"https://twitter.com/ArmyAnji/status/1258411686484033536?ref_src=twsrc%5Etfw\">May 7, 2020</a></blockquote>\n<script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>\n"

  htmlData2 = `<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://www.shutterstock.com/image-illustration/white-arrow-fall-down-on-background-1323403484" data-iframely-url="//cdn.iframe.ly/qYVUNqp?iframe=card-small"></a></div></div>`

  constructor () {
    /** Trigger on data load from source in case html has embed.js. */
    iframely.load();
  }

  ngOnInit() { }

}
