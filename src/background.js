let kPageNumber = 1;
let kPageCount = 24;
const kExtensionList = [];

// fetch extension list
(async () => {
  while (true) {
    const kExtensionListURL = `https://microsoftedge.microsoft.com/addons/getcomputedextensionslist/MostPopular?hl=en-US&gl=HK&noItems=24&pgNo=${kPageNumber}&IncludeExtensionDetailsFields=false&category=Edge-Extensions`;
    try {
      const response = await fetch(kExtensionListURL);
      const data = await response.json();
      const { extensionList, nextPageNo, hasMorePages } = data;
      kExtensionList.push(...extensionList);
      kPageNumber = nextPageNo;
      if (!hasMorePages) {
        break;
      }
    } catch (error) {
      console.error(error);
      break;
    }
  } 
})();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { url, keywords } = message;
  if (!keywords) {
    sendResponse([]);
    return;
  }
  const matchedExtensions = kExtensionList.filter(extension => {
    const {name, shortDescription} = extension;
    return name.toLowerCase().includes(keywords.toLowerCase()) || shortDescription.toLowerCase().includes(keywords.toLowerCase());
  }).slice(0, 5);
  sendResponse(matchedExtensions);
});
