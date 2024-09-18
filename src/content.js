const commandDom = document.createElement('div');
const shadow = commandDom.attachShadow({ mode: 'open' });
const style = document.createElement('style');
style.textContent = `
  .wrapper {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(2px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content {
    width: min(800px, 80vw);
    display: flex;
    background: rgba(255, 255, 255, 0.93);
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 32px;
    backdrop-filter: blur(42px);
    padding: 32px 24px;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
  }
  .title {
    display: flex;
    align-items: center;
  }
  .title > img {
    width: 32px;
    height: 32px;
    margin-inline-end: 8px;
  }
  .title span {
    color: #16394A;
    font-size: 28px;
    line-height: 130%;
    font-family: "Segoe Sans";
    font-style: normal;
    font-weight: 300;
    text-align: start;
 }
  input {
    margin-top: 24px;
    height: 80px;
    border-radius: 20px;
    color: #181921;
    padding: 16px;
    box-sizing: border-box;
    font-size: 24px;
    line-height: 145%;
    font-family: "Segoe Sans";
    font-style: normal;
    font-weight: 400;

    border: none;
    outline: none;
    background: rgba(123, 117, 114, 0.08);
    box-shadow: var(--Layout-Inner-shadow-Composer-Input-X-Offset, 0px) var(--Layout-Inner-shadow-Composer-Input-Y-Offset, 1.399px) var(--Layout-Inner-shadow-Composer-Input-Blur-radius, 2.797px) var(--Layout-Inner-shadow-Composer-Input-Spread, 0px) var(--Color-Control-Color-L2---Composer-Input-Inner-shadow, rgba(0, 0, 0, 0.08)) inset, var(--Layout-Drop-shadow-Composer-Input-X-Offset, 0px) var(--Layout-Drop-shadow-Composer-Input-Y-Offset, 1.399px) var(--Layout-Drop-shadow-Composer-Input-Blur-radius, 1.399px) var(--Layout-Drop-shadow-Composer-Input-Spread, 0px) var(--Color-Control-Color-L2---Composer-Input-Drop-shadow, #FFF);
  }
  .item {
    margin-top: 16px;
    padding: 8px 28px;
    box-sizing: border-box;
    display: flex;
    align-items: start;
    flex-direction: column;
  }
  .item:hover {
    border-radius: 16px;
    background: #DFDFDF;
  }
  .item > .icon {
    width: 32px;
    height: 32px;
    margin-inline-end: 16px;
  }
  .item > .name {
    color: #16394A;
    font-family: "Segoe Sans";
    font-size: 20px;
    font-style: normal;
    font-weight: 350;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
  .item > .description {
    color: #16394A;
    font-family: "Segoe Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 200;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }

`;

const iconUrl = chrome.runtime.getURL('images/logo.svg');
const template = document.createElement('template');
template.innerHTML = `
  <div class="wrapper">
    <div class="content">
      <div class="title">
        <img src=${iconUrl} />
        <span>Hi, what do you want to do?</span>
      </div>
      <input type="text" placeholder="Anything you need...">
      <div class="list"></div>
    </div>
  </div>
`;

shadow.appendChild(style);
shadow.appendChild(template.content.cloneNode(true));

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    commandDom.remove();
  }
});

const debounce = (callback, wait = 500) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

const handleInutChange = debounce(() => {
  const url = location.href;
  const keywords = commandDom.shadowRoot.querySelector('input').value;
  chrome.runtime.sendMessage({ url, keywords }, res => {
    if (!res) return;
    const listDom = commandDom.shadowRoot.querySelector('.list');
    while (listDom.firstChild) {
      listDom.removeChild(listDom.firstChild);
    }
    res.forEach(extension => {
      const item = document.createElement('div');
      item.className = 'item';
      // <img class="icon" src=${extension.thumbnail} />
      item.innerHTML = `
        <div class="name">${extension.Name}</div>
        <div class="description">${extension.Description}</div>
        `;
      listDom.appendChild(item);
    });
  });
});

commandDom.shadowRoot.querySelector('input').addEventListener('input', handleInutChange);

document.addEventListener('keydown', function (event) {
  if ((event.metaKey || event.ctrlKey) && event.key === '/') {
    if (commandDom.parentNode) {
      commandDom.remove();
    } else {
      document.body.appendChild(commandDom);
      commandDom.shadowRoot.querySelector('input').focus();
      // default trigger fetch
      handleInutChange();
    }
  }
}, true);
