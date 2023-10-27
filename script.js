(()=>{
  const $wrapper = document.querySelector('#_BLOCK_ .wrapper');
  const $video = document.querySelector('#_BLOCK_ video');
  let yStart = 0;
  let yEnd = window.innerHeight;
  let updateWrapperDimsTimer;
  const updateWrapperDims = () => {
    const rect = $wrapper.getBoundingClientRect();
    yStart = window.scrollY + rect.y;
    yEnd = yStart + rect.height + window.innerHeight;

    yStart += window.innerHeight * 0.2;
    yEnd -= window.innerHeight * 0.2;
  };
  const updateVideoTime = () => {
    if(!$video.duration)
      return;
    let scrollFraction = (window.scrollY + window.innerHeight - yStart) / (yEnd-yStart);
    //console.log(scrollFraction);
    $video.currentTime = Math.min(Math.max(0, $video.duration * scrollFraction), $video.duration);
    
    clearTimeout(updateWrapperDimsTimer);
    updateWrapperDimsTimer = setTimeout(()=>{
      updateWrapperDims();
    }, 200);
  };
  let isSetup = false;
  $video.oncanplay = (e)=>{
    if(isSetup)
      return;
    isSetup = true;
    updateWrapperDims();
  };
  window.addEventListener('scroll', updateVideoTime, { passive: true });
})();