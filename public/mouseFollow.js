let circle = document.getElementsByClassName('follower');

const onMouseMove = (e) =>{
  setTimeout(() => {
    circle[0].style.left = e.pageX + 'px';
    circle[0].style.top = e.pageY + 'px';
  }, 25)
}
document.addEventListener('mousemove', onMouseMove);