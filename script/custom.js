/* include header */
fetch("/include/header.html")
.then(response => response.text())
.then(data => {
  document.querySelector('.header-include').innerHTML = data;
  function initMegaNavi() {
    const trigger = document.querySelector('.trigger');
    const megaNavi = document.querySelector('.mega-navi');

    if (!trigger || !megaNavi) return;

    const isPC = window.innerWidth > 767;
    megaNavi.style.display = isPC ? "none" : "";
    trigger.classList.remove('active');

    if (isPC) {
      trigger.addEventListener('click', toggleMegaNavi);

      // 섹션 클릭 시 메가 네비 숨김
      document.querySelectorAll('.front-slider, .category-shortcut, .focus-class, .best-class, .timer, .eary-bird').forEach(section => {
        section.addEventListener('click', hideMegaNavi);
      });
    } else {
      // 모바일에서는 필요 없는 이벤트 리스너 제거
      trigger.removeEventListener('click', toggleMegaNavi);
      document.querySelectorAll('.front-slider, .category-shortcut, .focus-class, .best-class, .timer, .eary-bird').forEach(section => {
        section.removeEventListener('click', hideMegaNavi);
      });
    }
    
  }

  function toggleMegaNavi() {
    this.classList.toggle('active');
    const megaNavi = document.querySelector('.mega-navi');
    megaNavi.style.display = megaNavi.style.display === "block" ? "none" : "block";
  }

  function hideMegaNavi() {
    const megaNavi = document.querySelector('.mega-navi');
    megaNavi.style.display = "none";
    document.querySelector('.trigger').classList.remove('active');
  }

  window.addEventListener('resize', initMegaNavi);
  initMegaNavi();
  loginModal()
  headerLoginAfter();
});
/* include fooer */
fetch("/include/footer.html")
  .then(response => response.text())
  .then(data => {
    document.querySelector(".footer-include").innerHTML = data;

    // Footer LNB
    document.querySelectorAll(".link-item-title").forEach(item => {
      item.addEventListener("click", function() {
        this.nextElementSibling.style.display = this.nextElementSibling.style.display === "block" ? "none" : "block";
        this.classList.toggle("active");
      });
    });

    // Company Info Trigger
    const address = document.querySelector("address");
    document.querySelector(".company-info-trigger").addEventListener("click", function() {
      address.style.display = address.style.display === "block" ? "none" : "block";
    });

    // 화면 리사이즈 이벤트
    function handleResize() {
      const isDesktop = window.innerWidth > 767;

      // 링크 목록과 회사 정보 초기화
      document.querySelectorAll(".link-item-title").forEach(item => {
        item.nextElementSibling.style.display = isDesktop ? "block" : "none";
      });
      address.style.display = isDesktop ? "block" : "none";
    }

    window.addEventListener("resize", handleResize);
    handleResize(); 
  });

/* 로그인 모달 */
/* 
.btn-login클릭하면 
.member-login-overlay가 display : block;
.btn-modal-close클릭하면 
.member-login-overlay display : none;
*/
function loginModal() {
  const loginOverlay = document.querySelector('.member-login-overlay');
  const loginButtons = document.querySelectorAll('.btn-login');
  const modalClose = document.querySelector('.member-login .btn-modal-close');
  // 모달 열기/닫기 토글 함수
  const toggleModal = (isOpen) => {
    if (isOpen) {
      loginOverlay.style.display = 'block';       
      document.body.classList.add('active'); 
    } else {
      loginOverlay.style.display = 'none'; 
      document.body.classList.remove('active'); 
    }
  };
  // 로그인 버튼에 클릭 이벤트 추가
  loginButtons.forEach(btn => btn.addEventListener('click', () => toggleModal(true)));
  // 모달 닫기 버튼에 클릭 이벤트 추가
  modalClose.addEventListener('click', () => toggleModal(false));
}
/* 로인 후 헤더 UI 변경 */
/* 
  .btn-member-primary클릭 되었을 때
    .user-alarm 보이게
    .member-login-overlay 숨기기
    .login-register-buttons 숨기기
*/ 
function headerLoginAfter(){
  document.querySelector('.btn-member-primary').addEventListener('click', function(){
    document.querySelector('.member-login-overlay').style.display="none";//로그인 모달 숨기기
    document.querySelector('.user-alarm').style.display="block";//유저알람이 보이게
    document.querySelector('.login-register-buttons').style.display="none";//로그인 버튼 숨기기
  })
}
function initAccordion(){
  let faqTitle=document.querySelectorAll('.faq-title');
  faqTitle.forEach(title=>{
    title.addEventListener('click', ()=>{
      let content = title.nextElementSibling;
      document.querySelectorAll('.faq-content').forEach(item=>{
        if(item !== content){
          item.classList.remove('active');
        }
      });
      content.classList.toggle('active')
    })
  })
}
/* DOMContentLoaded 시 모든 기능 초기화 */
document.addEventListener('DOMContentLoaded', function(){
  initAccordion();
})