const girls = {
  taipei: [
    {
      id: "tp-1",
      name: "小薇",
      age: 24,
      tags: "今晚可約｜健談主動",
      line: "https://line.me/ti/p/~ty1xi",
      photo: "images/girl-01.jpg",
    },
    {
      id: "tp-2",
      name: "語婷",
      age: 22,
      tags: "可過夜｜短髮可愛",
      line: "https://line.me/ti/p/~ty1xi",
      photo: "images/girl-02.jpg",
    },
    {
      id: "tp-3",
      name: "安琪",
      age: 26,
      tags: "輕熟女｜會撒嬌",
      line: "https://line.me/ti/p/~ty1xi",
      photo: "images/girl-03.jpg",
    },
  ],
  taichung: [
    {
      id: "tc-1",
      name: "蔓蔓",
      age: 23,
      tags: "台中可約｜身材好",
      line: "https://line.me/ti/p/~p50sp",
      photo: "images/girl-04.jpg",
    },
    {
      id: "tc-2",
      name: "小雨",
      age: 25,
      tags: "可出差｜晚點回也行",
      line: "https://line.me/ti/p/~p50sp",
      photo: "images/girl-05.jpg",
    },
    {
      id: "tc-3",
      name: "詩涵",
      age: 21,
      tags: "學生臉｜第一次找伴",
      line: "https://line.me/ti/p/~p50sp",
      photo: "images/girl-06.jpg",
    },
  ],
  kaohsiung: [
    {
      id: "kh-1",
      name: "喬喬",
      age: 27,
      tags: "高雄夜貓｜敢玩",
      line: "https://line.me/ti/p/~kt7m4",
      photo: "images/girl-07.jpg",
    },
    {
      id: "kh-2",
      name: "心心",
      age: 24,
      tags: "可到府｜低調私密",
      line: "https://line.me/ti/p/~kt7m4",
      photo: "images/girl-08.jpg",
    },
    {
      id: "kh-3",
      name: "妮妮",
      age: 22,
      tags: "南部女孩｜今晚有空",
      line: "https://line.me/ti/p/~kt7m4",
      photo: "images/girl-09.jpg",
    },
  ],
};

function lineId(url) {
  try {
    return decodeURIComponent(url.split("/").pop() || "").replace(/^~/, "");
  } catch {
    return "";
  }
}

function renderGirl(girl) {
  const photo = girl.photo
    ? `<img src="${girl.photo}" alt="${girl.name}" loading="lazy" />`
    : `<span aria-hidden="true">${girl.name.slice(0, 1)}</span>`;

  const photoClass = girl.photo
    ? "girl__photo"
    : "girl__photo girl__photo--placeholder";

  return `
    <a class="girl" href="${girl.line}" target="_blank" rel="noopener noreferrer" aria-label="加 ${girl.name} 的 Line">
      <div class="${photoClass}">${photo}</div>
      <div class="girl__body">
        <div class="girl__meta">
          <h3 class="girl__name">${girl.name}</h3>
          <span class="girl__age">${girl.age} 歲</span>
        </div>
        <p class="girl__tags">${girl.tags}</p>
        <span class="girl__action">點擊加 Line → ${lineId(girl.line)}</span>
      </div>
    </a>
  `;
}

function mountGrids() {
  Object.entries(girls).forEach(([region, list]) => {
    const grid = document.querySelector(`[data-region="${region}"]`);
    if (!grid) return;
    grid.innerHTML = list.map(renderGirl).join("");
  });
}

function observeRegions() {
  const regions = document.querySelectorAll(".region");
  if (!("IntersectionObserver" in window)) {
    regions.forEach((el) => el.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  regions.forEach((el) => io.observe(el));
}

mountGrids();
observeRegions();
