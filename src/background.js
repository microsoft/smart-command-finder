let kPageNumber = 1;
let kPageCount = 24;
const kExtensionList = [];



/**
 *
 * sample response
 *
  [
    {
        "Index": "9",
        "Type": "Edge Tool",
        "Name": "Edge Translator",
        "Description": "Edge Translator is a edge internal tool, to help user translate any text to any language.",
        "Source": "Edge://settings"
    },
    {
        "Index": "1",
        "Type": "Extension",
        "Name": "Toucan - Language Learning",
        "Description": "Toucan seamlessly teaches you a new language by translating words and phrases as you browse the web, integrating learning into your daily online activities.",
        "Source": "https://microsoftedge.microsoft.com/addons/detail/toucan-language-learnin/ljbocbkhabkbkedlhmppmpfajejdkoei?hl=en-US"
    },
    {
        "Index": "8",
        "Type": "Extension",
        "Name": "Quick Translation",
        "Description": "Quick Translation is an easy-to-use app that provides instant translations directly on the same page without switching tabs. It allows you to translate words or text fragments in context, choose your default language, and ensures privacy by not tracking your data or geolocation. With Quick Translation, you'll save time and never struggle with foreign languages again. To use it, press \"Esc\" if the Edge context menu interferes with clicking the floating icon. Download Quick Translation and experience fast, convenient translations right on your browser.",
        "Source": "https://microsoftedge.microsoft.com/addons/detail/quick-translation/ofjbpjokjnflcmdjpnocfdonajdoando?hl=en-US"
    }
]
 * @param {*} payload
 * @returns
 */
async function fetchExtensionList(payload) {
  // const kExtensionListURL = `https://microsoftedge.microsoft.com/addons/getcomputedextensionslist/MostPopular?hl=en-US&gl=HK&noItems=24&pgNo=${kPageNumber}&IncludeExtensionDetailsFields=false&category=Edge-Extensions`;
  const kExtensionListURL = `https://edgecreation.edgebrowser.microsoft-testing-falcon.io/api/spotlight/search`;
  const { url, keywords } = payload;
  let requestPayload = {};
  if (!keywords) {
    requestPayload = {
      Url: url,
    };
  } else {
    requestPayload = {
      Query: keywords,
    }
  }
  try {
    const response = await fetch(kExtensionListURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestPayload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { url, keywords } = message;
  fetchExtensionList({ url, keywords }).then(data => {
    if (data && data.length > 0) {
      const matchedExtensions = data.slice(0, 5);
      sendResponse(matchedExtensions);
    } else {
      sendResponse([]);
    }
  });
  return true;
});
