document.addEventListener('DOMContentLoaded', ()=>{
  const menuToggle = document.getElementById('menu-toggle');
  const siteNav = document.getElementById('site-nav');
  if(menuToggle) menuToggle.addEventListener('click', ()=> { siteNav.style.display = siteNav.style.display === 'flex' ? 'none' : 'flex'; });

  async function loadJson(path, fallback){ try{ const r=await fetch(path,{cache:'no-store'}); if(!r.ok) return fallback; const j=await r.json(); return Array.isArray(j)?j:fallback;}catch(e){return fallback} }
  const dataFallback = ["projects/data/IMG_3820.png","projects/data/IMG_3787.png"];
  const designFallback = []; const certFallback = [];
  function populateGallery(id, list){ const container=document.getElementById(id); container.innerHTML=''; if(!list || list.length===0){ container.innerHTML='<div class="empty-note">No items yet</div>'; return;} list.forEach(src=>{ const card=document.createElement('div'); card.className='proj-card'; const img=document.createElement('img'); img.src=src; img.alt='project image'; img.addEventListener('click', ()=> openModal(src)); card.appendChild(img); container.appendChild(card); }); }
  const modal=document.getElementById('image-modal'); const modalImg=document.getElementById('modal-img'); const modalClose=document.getElementById('modal-close');
  function openModal(src){ modalImg.src=src; modal.style.display='flex'; }
  modalClose && modalClose.addEventListener('click', ()=> modal.style.display='none');
  modal.addEventListener('click', (e)=>{ if(e.target===modal) modal.style.display='none'; });
  (async function init(){ const d=await loadJson('projects/data/images.json', dataFallback); const g=await loadJson('projects/design/images.json', designFallback); const c=await loadJson('projects/certificates/images.json', certFallback); populateGallery('data-gallery', d); populateGallery('design-gallery', g); populateGallery('certificates-grid', c); const profile='IMG_profile.jpeg'; fetch(profile,{cache:'no-store'}).then(r=>{ if(r.ok){ document.getElementById('photo-slot').innerHTML='<img src="'+profile+'" alt="profile" class="profile-img" style="width:140px;height:140px;border-radius:50%;object-fit:cover;box-shadow:0 8px 30px rgba(0,0,0,0.6);">'; }}).catch(()=>{}); })();
  let lastScroll=0; const header=document.querySelector('.site-header'); window.addEventListener('scroll', ()=>{ const cur=window.pageYOffset; if(cur>lastScroll && cur>80){ header.style.transform='translateY(-6px)'; header.style.transition='transform .25s ease'; } else { header.style.transform='translateY(0)'; } lastScroll=cur; });
});