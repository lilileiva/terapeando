export default function smoothscroll(){
   let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
   if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo (0,currentScroll - (currentScroll/8));
   }
 }