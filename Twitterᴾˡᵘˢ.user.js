// ==UserScript==
// @name        Twitterᴾˡᵘˢ
// @name:zh-TW  Twitterᴾˡᵘˢ
// @name:zh-CN  Twitterᴾˡᵘˢ
// @name:ja     Twitterᴾˡᵘˢ
// @namespace   https://greasyfork.org
// @version     0.4.0
// @description         Enhance the X(Twitter) user experience by loading images in their original quality and removing ads and spam tweets.
// @description:zh-TW   增強 X(Twitter) 使用體驗。讀取原始畫質的圖片，移除廣告與垃圾推文。
// @description:zh-CN   增强 X(Twitter) 使用体验。读取原始画质的图片，移除广告与垃圾推文。
// @description:ja      X(Twitter)の利用体験を向上させます。元の高画質で画像をロードします、広告や迷惑なツイートを削除します。
// @author      Pixmi
// @homepage    https://github.com/Pixmi/twitter-plus
// @supportURL  https://github.com/Pixmi/twitter-plus/issues
// @icon        https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @match       https://x.com/*
// @match       https://twitter.com/*
// @match       https://mobile.twitter.com/*
// @match       https://pbs.twimg.com/media/*
// @license     MPL-2.0
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_addStyle
// @grant       GM_registerMenuCommand
// @require     https://openuserjs.org/src/libs/sizzle/GM_config.js
// @compatible  Chrome
// @compatible  Firefox
// ==/UserScript==
null==GM_getValue("MAX_HASHTAGS")&&GM_setValue("MAX_HASHTAGS",20),null==GM_getValue("OUT_HASHTAGS")&&GM_setValue("OUT_HASHTAGS","#tag1,#tag2"),"object"==typeof GM_getValue("OUT_HASHTAGS")&&GM_setValue("OUT_HASHTAGS",GM_getValue("OUT_HASHTAGS").join(",")),GM_addStyle("\niframe#twitter_plus_setting {\n    max-width: 300px !important;\n    max-height: 300px !important;\n}"),function(){"use strict";const t=t=>{let e=t.match(/https:\/\/(pbs\.twimg\.com\/media\/[a-zA-Z0-9\-\_]+)(\?format=|.)(jpg|jpeg|png|webp)/);return!!e&&("webp"==e[3]&&(e[3]="jpg"),("?format="==e[2]||!/name=orig/.test(t))&&`https://${e[1]}.${e[3]}?name=orig`)},e=window.location.href;if(e.includes("twimg.com")){let n=t(e);n&&window.location.replace(n)}if(e.includes("twitter.com")||e.includes("x.com")){const e=document.evaluate('//div[@id="react-root"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,n=GM_getValue("MAX_HASHTAGS"),i=GM_getValue("OUT_HASHTAGS").split(","),a=t=>["tweet"==t.dataset.testid,"tweetPhoto"==t.dataset.testid,"css-175oi2r r-1pi2tsx r-u8s1d r-13qz1uu"==t.className].some((t=>t));if(e){new MutationObserver(((e,o)=>{for(const o of e){const e=o.target;if(!a(e))continue;if("ARTICLE"==e.nodeName)try{const t=Array.from(e.querySelectorAll('a[href^="/hashtag/"]'),(t=>t.textContent));if(n>0&&t.length>=n)throw e;if(t.some((t=>i.find((e=>e==t)))))throw e;if(e.querySelector("svg.r-1q142lx"))throw e}catch(t){t instanceof HTMLElement&&(t.closest('div[data-testid="cellInnerDiv"]').style.display="none");continue}const l=e.querySelectorAll("img");if(l.length)for(const e of l){let n=t(e.src);n&&(e.src=n)}}})).observe(document.body,{attributes:!0,childList:!0,subtree:!0})}}}(),GM_registerMenuCommand("Setting",(()=>config.open()));const config=new GM_config({id:"twitter_plus_setting",css:"\n        #twitter_plus_setting_wrapper {\n            height: 100%;\n            display: flex;\n            flex-direction: column;\n        }\n        #twitter_plus_setting_section_0 {\n            flex: 1;\n        }\n        #twitter_plus_setting_buttons_holder {\n            text-align: center;\n        }\n        .config_var {\n            display: flex;\n            flex-direction: column;\n            margin-bottom: 1rem !important;\n        }\n    ",title:"Remove Spam",fields:{MAX_HASHTAGS:{label:"When exceeding how many hashtags?",type:"number",title:"input 0 to disable",min:0,max:100,default:20},OUT_HASHTAGS:{label:"When containing which hashtags?",type:"textarea",title:"Must include # and separated by commas.",default:"#tag1,#tag2"}},events:{init:()=>{GM_getValue("MAX_HASHTAGS")&&config.set("MAX_HASHTAGS",GM_getValue("MAX_HASHTAGS")),GM_getValue("OUT_HASHTAGS")&&config.set("OUT_HASHTAGS",GM_getValue("OUT_HASHTAGS"))},save:()=>{GM_setValue("OUT_HASHTAGS",config.get("OUT_HASHTAGS")),GM_setValue("MAX_HASHTAGS",config.get("MAX_HASHTAGS")),config.close()}}});
