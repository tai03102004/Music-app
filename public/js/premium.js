const listAllInfo = document.querySelectorAll(".abc");
const upAll = document.querySelectorAll("#up");
const downAll = document.querySelectorAll("#down");

listAllInfo.forEach((info,index) => {
  const upIcon = upAll[index];
  const downIcon = downAll[index];
  info.addEventListener("click", () => {
    info.classList.toggle("clicked");
    if (info.classList.contains("clicked")) {
      downIcon.style.display = "none";
      upIcon.style.display = "block";
      upIcon.style.top = "20%";
    } else {
      downIcon.style.display = "block";
      upIcon.style.display = "none";
    }
  });
});
