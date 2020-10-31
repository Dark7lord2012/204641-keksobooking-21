(()=>{"use strict";window.network={upload:(e,t)=>{const o=new XMLHttpRequest;o.responseType="json",o.open("GET","https://21.javascript.pages.academy/keksobooking/data"),o.send(),o.addEventListener("load",(()=>{200===o.status?e(o.response):t(`Статус ответа: ${o.status} ${o.statusText}`)})),o.addEventListener("error",(()=>{t("Произошла ошибка соединения")})),o.addEventListener("timeout",(()=>{t(`Запрос не успел выполниться за ${o.timeout}мс`)})),o.timeout=1e4},save:(e,t)=>{const o=new XMLHttpRequest;o.responseType="json",o.open("POST","https://21.javascript.pages.academy/keksobooking"),o.send(e),o.addEventListener("load",(()=>200===o.status?t(!0):t(o))),o.timeout=1e4}},(()=>{const e=document.querySelector("#housing-price"),t=document.querySelector("#housing-type"),o=document.querySelector("#housing-rooms"),r=document.querySelector("#housing-guests"),n=document.querySelector("#filter-wifi"),a=document.querySelector("#filter-dishwasher"),l=document.querySelector("#filter-parking"),d=document.querySelector("#filter-washer"),i=document.querySelector("#filter-elevator"),s=document.querySelector("#filter-conditioner"),c="any",u=e=>{let o=e;return t.value!==c&&(o=o.filter((e=>e.offer.type===t.value))),o},m=t=>{let o=t;return e.value!==c&&("low"===e.value?o=o.filter((e=>e.offer.price<1e4)):"middle"===e.value?o=o.filter((e=>e.offer.price>=1e4&&e.offer.price<5e4)):"high"===e.value&&(o=o.filter((e=>e.offer.price>=5e4)))),o},p=e=>{let t=e;return o.value!==c&&(t=t.filter((e=>e.offer.rooms===parseInt(o.value,10)))),t},f=e=>{let t=e;return r.value!==c&&(t=t.filter((e=>e.offer.guests===parseInt(r.value,10)))),t},y=e=>{let t=e;return n.checked&&(t=t.filter((e=>e.offer.features.includes("wifi")))),t},v=e=>{let t=e;return a.checked&&(t=t.filter((e=>e.offer.features.includes("dishwasher")))),t};window.filter={housingType:t,filterType:u,filterPrice:m,filterRooms:p,filterGuests:f,filterWifi:y,filterDishwasher:v,filterAllOptions:e=>{let t=u(e);return t=m(t),t=p(t),t=f(t),t=y(t),t=v(t),t=(e=>{let t=e;return l.checked&&(t=t.filter((e=>e.offer.features.includes("parking")))),t})(t),t=(e=>{let t=e;return d.checked&&(t=t.filter((e=>e.offer.features.includes("washer")))),t})(t),t=(e=>{let t=e;return i.checked&&(t=t.filter((e=>e.offer.features.includes("elevator")))),t})(t),t=(e=>{let t=e;return s.checked&&(t=t.filter((e=>e.offer.features.includes("conditioner")))),t})(t),t}}})(),(()=>{const e=["img/avatars/user01.png","img/avatars/user02.png","img/avatars/user03.png","img/avatars/user04.png","img/avatars/user05.png","img/avatars/user06.png","img/avatars/user07.png","img/avatars/user08.png"],t=["palace","flat","house","bungalow"],o=["12:00","13:00","14:00"],r=["12:00","13:00","14:00"],n=["wifi","dishwasher","parking","washer","elevator","conditioner"],a=["http://o0.github.io/assets/images/tokyo/hotel2.jpg","http://o0.github.io/assets/images/tokyo/hotel1.jpg","http://o0.github.io/assets/images/tokyo/hotel3.jpg"],l=document.querySelector(".map__pins"),d=document.querySelector(".map__overlay").offsetWidth-20,i=e=>e[Math.round(Math.random()*(e.length-1))],s=(e,t)=>Math.round(Math.random()*(t-e)+e),c=(e,t=s(0,e.length-1))=>{const o=e;for(let t=o.length-1;t>0;t--){let o=Math.floor(Math.random()*(t+1));[e[t],e[o]]=[e[o],e[t]]}return o.slice(0,t)};window.data={AVATARS:e,TYPE_APARTMENT:t,TYPE_APARTMENT_RUSSIAN:{palace:"Дворец",flat:"Квартира",house:"Дом",bungalow:"Бунгало"},CHECHKIN:o,CHECHKOUT:r,FEATURES:n,PHOTOS:a,MAP_RANGE_TOP:130,MAP_RANGE_BOTTOM:630,mapPins:l,mapWidth:d,randomElementArray:i,getRandomNumber:s,getRandomArray:c,removeChildrenNode:(e,t=null)=>{for(;e.firstChild;)e.removeChild(e.firstChild);null!==t&&e.appendChild(t)},generateApartments:l=>{const u=[];for(let m=0;m<l;m++)u[m]={author:{avatar:""+e[s(0,e.length-1)]},offer:{title:"Cтрока, заголовок предложения",address:"Площадь Сталина",price:1300,type:i(t),rooms:s(1,3),guests:s(1,2),checkin:i(o),checkout:i(r),features:c(n),description:null,photos:c(a)},location:{x:s(0,d),y:s(130,630)}};return u}}})(),(()=>{const e=document.querySelector(".map"),t=e.querySelectorAll(".map__filter"),o=e.querySelector(".map__features"),r=e.querySelector(".map__pins"),n=r.querySelector(".map__pin--main"),a=r.querySelectorAll(".map__pin"),l=document.querySelector(".ad-form"),d=l.querySelector(".ad-form-header"),i=l.querySelectorAll(".ad-form__element"),s=l.querySelector(".ad-form-header__preview img").src,c=l.querySelector(".ad-form__photo-container").innerHTML,u={x:n.style.left,y:n.style.top},m=()=>{e.classList.add("map--faded"),l.classList.add("ad-form--disabled");for(let e of t)e.disabled=!0;o.disabled=!0;for(let e of a)e.classList.contains("map__pin--main")||(e.disabled=!0);n.style.left=u.x,n.style.top=u.y,d.disabled=!0;for(let e of i)e.disabled=!0;l.querySelector(".ad-form-header__preview img").src=s,l.querySelector(".ad-form__photo-container").innerHTML=c};m(),window.map={mapFilters:t,mapFeatures:o,pins:a,mapPins:r,adFormHeader:d,adFormElements:i,deactivateForms:m}})(),(()=>{const e=document.querySelector("#card").content.querySelector(".popup"),t=window.data.TYPE_APARTMENT_RUSSIAN,o=window.data.removeChildrenNode,r=document.querySelector(".map__filters-container"),n=document.querySelector(".map"),a=r=>{const n=e.cloneNode(!0);n.querySelector(".popup__title").textContent=r.offer.title,n.querySelector(".popup__text--address").textContent=r.offer.address,n.querySelector(".popup__text--price").textContent=r.offer.price+"₽/ночь",n.querySelector(".popup__type").textContent=t[r.offer.type],n.querySelector(".popup__text--capacity").textContent=`${r.offer.rooms} комнаты для ${r.offer.guests} гостей`,n.querySelector(".popup__text--time").textContent=`Заезд после ${r.offer.checkin} выезд до ${r.offer.checkout}`;const a=n.querySelector(".popup__features"),l=n.querySelector(".popup__feature");o(a);for(let e=0;e<r.offer.features.length;e++){const t=l.cloneNode(!0);t.className="popup__feature popup__feature--"+r.offer.features[e],a.appendChild(t)}n.querySelector(".popup__description").textContent=r.offer.description;const d=n.querySelector(".popup__photos"),i=n.querySelector(".popup__photo");for(;d.firstChild;)d.removeChild(d.firstChild);for(let e=0;e<r.offer.photos.length;e++){const t=i.cloneNode(!0);t.src=""+r.offer.photos[e],d.appendChild(t)}return n.querySelector(".popup__avatar").src=r.author.avatar,n},l=()=>{i()},d=e=>{"Escape"===e.key&&i()},i=()=>{document.removeEventListener("keydown",d),document.querySelector(".popup__close").removeEventListener("click",l);const e=document.querySelector(".popup");e&&n.removeChild(e)};window.card={renderCard:a,showCardPopup:e=>{const t=a(e);document.querySelector(".popup")&&i(),n.insertBefore(t,r),t.querySelector(".popup__close").addEventListener("click",l),document.addEventListener("keydown",d)},closeCardPopup:i,onBtnCloseCardClick:l,onCardPopupKeydown:d}})(),window.debounce=e=>{let t=null;return(...o)=>{t&&window.clearTimeout(t),t=window.setTimeout((function(){e(...o)}),500)}},(()=>{const e=document.querySelector("#pin").content.querySelector("button"),t=document.querySelector(".map__pin--main"),o=document.querySelector("#address"),r=window.data.removeChildrenNode,n=window.map.mapFilters,a=window.map.mapFeatures,l=window.map.adFormHeader,d=window.map.adFormElements,i=window.data.mapPins,s=window.card.showCardPopup,c=window.data.MAP_RANGE_TOP,u=window.data.MAP_RANGE_BOTTOM,m=window.data.mapWidth,p=(e,t)=>{const o=parseInt(e.style.left,10),r=parseInt(e.style.top,10),n=e.offsetWidth,a=e.offsetHeight;t.value=`${Math.round(o+n/2)}, ${Math.round(r+a/2)}`};p(t,o);const f=t=>{let o=e.cloneNode(!0),r=o.querySelector("img");return r.src=t.author.avatar,r.alt=t.offer.title,o.style.left=t.location.x-o.offsetWidth/2+"px",o.style.top=t.location.y-o.offsetHeight+"px",o},y=()=>{t.style.transform="translateY(-100%)",document.querySelector(".map").classList.remove("map--faded"),a.disabled=!1;for(let e of n)e.disabled=!1;document.querySelector(".ad-form").classList.remove("ad-form--disabled"),l.disabled=!1;for(let e of d)e.disabled=!1;const e=document.createDocumentFragment();window.network.upload((o=>{let n=o,a=window.filter.filterAllOptions(n);a=a.slice(0,5),o=a;for(let t=0;t<o.length;t++){const r=o[t],n=f(r);e.appendChild(n),n.addEventListener("click",(()=>{s(r)}))}r(i,t),i.appendChild(e)}),(e=>{const t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: rgba(240, 0, 0, 0.3);",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.color="white",t.style.fontSize="20px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)}))},v=e=>{if(0===e.button){let r={x:e.clientX,y:e.clientY};const n=e=>{let o=r.x-e.clientX,n=r.y-e.clientY;r={x:e.clientX,y:e.clientY};let a=t.offsetTop-n,l=t.offsetLeft-o;a<c&&(a=c),a>u&&(a=u),l<0&&(l=0),l>m&&(l=m),t.style.top=a+"px",t.style.left=l+"px"},a=()=>{y(),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",a),p(t,o)};document.addEventListener("mousemove",n),document.addEventListener("mouseup",a)}},h=e=>{"Enter"===e.key&&(y(),t.removeEventListener("mousedown",v),t.removeEventListener("keydown",h))};t.addEventListener("mousedown",v),t.addEventListener("keydown",h),window.pin={templatePin:e,mainPin:t,renderPin:f,activateForms:y,onFormsActivateMousedown:v,onFormsActivateKeydown:h,removePins:(e,t)=>{window.data.removeChildrenNode(e,t)}}})(),(()=>{const e=window.pin.activateForms,t=window.card.closeCardPopup,o=document.querySelector("#housing-type"),r=document.querySelector("#housing-price"),n=document.querySelector("#housing-rooms"),a=document.querySelector("#housing-guests"),l=document.querySelector("#filter-wifi"),d=document.querySelector("#filter-dishwasher"),i=document.querySelector("#filter-parking"),s=document.querySelector("#filter-washer"),c=document.querySelector("#filter-elevator"),u=document.querySelector("#filter-conditioner"),m=()=>{window.debounce(e)(),document.querySelector(".map__card")&&t()};o.addEventListener("change",m),r.addEventListener("change",m),n.addEventListener("change",m),a.addEventListener("change",m),l.addEventListener("change",m),d.addEventListener("change",m),i.addEventListener("change",m),s.addEventListener("change",m),c.addEventListener("change",m),u.addEventListener("change",m)})(),(()=>{const e=document.querySelector("#type"),t=document.querySelector("#price"),o=document.querySelector("#timein"),r=document.querySelector("#timeout"),n=document.querySelector("#room_number"),a=document.querySelector("#capacity").querySelectorAll("option"),l=document.querySelector(".ad-form"),d=document.querySelector(".map__pins"),i=d.querySelector(".map__pin--main"),s=()=>{"bungalow"===e.value?(t.min="0",t.placeholder="0"):"flat"===e.value?(t.min="1000",t.placeholder="1000"):"house"===e.value?(t.min="5000",t.placeholder="5000"):"palace"===e.value&&(t.min="10000",t.placeholder="10000")},c=()=>{s()};e.addEventListener("change",c);const u=()=>{"12:00"===o.value?r.value="12:00":"13:00"===o.value?r.value="13:00":"14:00"===o.value&&(r.value="14:00")},m=()=>{"12:00"===r.value?o.value="12:00":"13:00"===r.value?o.value="13:00":"14:00"===r.value&&(o.value="14:00")},p=()=>{u()},f=()=>{m()};o.addEventListener("change",p),r.addEventListener("change",f);const y=()=>{for(let e of a)e.disabled=!1;let e;if("1"===n.value){for(let t of a)"1"!==t.value?(t.disabled=!0,t.selected=!1):e=t;e.selected=!0}else if("2"===n.value){for(let t of a)"1"!==t.value&&"2"!==t.value?t.disabled=!0:e=t;e.selected=!0}else if("3"===n.value){for(let t of a)"1"!==t.value&&"2"!==t.value&&"3"!==t.value?t.disabled=!0:e=t;e.selected=!0}else if("100"===n.value){for(let t of a)"0"!==t.value?t.disabled=!0:e=t;e.selected=!0}},v=()=>{y()};n.addEventListener("change",v);const h=()=>{s(),u(),m(),y()};h(),l.addEventListener("submit",(e=>{window.network.save(new FormData(l),w),e.preventDefault()}));const w=e=>{if(!0===e){const e=document.querySelector("#success").content,t=document.querySelector("main"),o=e.cloneNode(!0);t.appendChild(o);const r=document.querySelector(".success"),n=()=>{r.remove(),l.reset(),window.map.deactivateForms(),window.pin.removePins(d,i),h(),r.removeEventListener("click",n)},a=e=>{"Escape"===e.key&&(r.remove(),document.removeEventListener("keydown",a))};r.addEventListener("click",n),document.addEventListener("keydown",a)}else{const e=document.querySelector("#error").content,t=document.querySelector("main"),o=e.cloneNode(!0);t.appendChild(o);const r=document.querySelector(".error"),n=r.querySelector(".error__button"),a=()=>{r.remove(),r.removeEventListener("click",a)},l=e=>{"Escape"===e&&(r.remove(),r.removeEventListener("keydown",l))};r.addEventListener("click",a),r.addEventListener("keydown",l),n.addEventListener("click",a)}};window.form={setTypeApartment:s,onTypeApartmentChange:c,setTimeInApartment:u,setTimeOutApartment:m,onTimeInApartmentChange:p,onTimeOutApartmentChange:f,setRoomsApartment:y,onRoomsApartmentChange:v}})(),(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector("#avatar"),o=document.querySelector(".ad-form-header__preview img"),r=document.querySelector("#images"),n=document.querySelector(".ad-form__photo"),a=document.querySelector(".ad-form__photo-container"),l=document.querySelector(".ad-form__upload");t.addEventListener("change",(()=>{let r=t.files[0],n=r.name.toLowerCase();if(e.some((e=>n.endsWith(e)))){let e=new FileReader;e.addEventListener("load",(()=>{o.src=e.result})),e.readAsDataURL(r)}})),r.addEventListener("change",(()=>{let t=r.files;window.data.removeChildrenNode(a,l);for(let o of t){let t=o.name.toLowerCase();if(e.some((e=>t.endsWith(e)))){let e=new FileReader;e.addEventListener("load",(()=>{const t=document.createElement("img"),o=n.cloneNode(!0);t.src=e.result,t.style.maxWidth="100%",t.style.height="auto",t.style.maxHeight="100%",t.style.display="block",t.style.margin="auto",o.style.display="flex",o.appendChild(t),a.appendChild(o)})),e.readAsDataURL(o)}}}))})()})();