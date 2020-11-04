(()=>{"use strict";window.network={upload:(e,t)=>{const o=new XMLHttpRequest;o.responseType="json",o.open("GET","https://21.javascript.pages.academy/keksobooking/data"),o.send(),o.addEventListener("load",(()=>{200===o.status?e(o.response):t(`Статус ответа: ${o.status} ${o.statusText}`)})),o.addEventListener("error",(()=>{t("Произошла ошибка соединения")})),o.addEventListener("timeout",(()=>{t(`Запрос не успел выполниться за ${o.timeout}мс`)})),o.timeout=1e4},save:(e,t,o)=>{const r=new XMLHttpRequest;r.responseType="json",r.open("POST","https://21.javascript.pages.academy/keksobooking"),r.send(e),r.addEventListener("load",(()=>200===r.status?t():o())),r.timeout=1e4}},(()=>{const e="any",t=document.querySelector("#housing-price"),o=document.querySelector("#housing-type"),r=document.querySelector("#housing-rooms"),n=document.querySelector("#housing-guests"),a=document.querySelector("#filter-wifi"),l=document.querySelector("#filter-dishwasher"),c=document.querySelector("#filter-parking"),d=document.querySelector("#filter-washer"),s=document.querySelector("#filter-elevator"),i=document.querySelector("#filter-conditioner");window.filter={filterAllOptions:u=>(e=>(i.checked&&(e=e.filter((e=>e.offer.features.includes("conditioner")))),e))(u=(e=>(s.checked&&(e=e.filter((e=>e.offer.features.includes("elevator")))),e))(u=(e=>(d.checked&&(e=e.filter((e=>e.offer.features.includes("washer")))),e))(u=(e=>(c.checked&&(e=e.filter((e=>e.offer.features.includes("parking")))),e))(u=(e=>(l.checked&&(e=e.filter((e=>e.offer.features.includes("dishwasher")))),e))(u=(e=>(a.checked&&(e=e.filter((e=>e.offer.features.includes("wifi")))),e))(u=(t=>(n.value!==e&&(t=t.filter((e=>e.offer.guests===parseInt(n.value,10)))),t))(u=(t=>(r.value!==e&&(t=t.filter((e=>e.offer.rooms===parseInt(r.value,10)))),t))(u=(o=>(t.value!==e&&("low"===t.value?o=o.filter((e=>e.offer.price<1e4)):"middle"===t.value?o=o.filter((e=>e.offer.price>=1e4&&e.offer.price<5e4)):"high"===t.value&&(o=o.filter((e=>e.offer.price>=5e4)))),o))(u=(t=>(o.value!==e&&(t=t.filter((e=>e.offer.type===o.value))),t))(u))))))))))}})(),window.utils={removeChildrenNode:(e,t=null)=>{for(;e.firstChild;)e.removeChild(e.firstChild);null!==t&&e.appendChild(t)}},(()=>{const e=document.querySelector(".map"),t=e.querySelectorAll(".map__filter"),o=e.querySelector(".map__features"),r=e.querySelector(".map__pins"),n=r.querySelector(".map__pin--main"),a=r.querySelectorAll(".map__pin"),l=document.querySelector(".ad-form"),c=l.querySelector(".ad-form-header"),d=l.querySelectorAll(".ad-form__element"),s=l.querySelector(".ad-form-header__preview img").src,i=l.querySelector(".ad-form__photo-container").innerHTML,u={x:n.style.left,y:n.style.top},m=()=>{e.classList.add("map--faded"),l.classList.add("ad-form--disabled");for(let e of t)e.disabled=!0;o.disabled=!0;for(let e of a)e.classList.contains("map__pin--main")||(e.disabled=!0);n.style.left=u.x,n.style.top=u.y,c.disabled=!0;for(let e of d)e.disabled=!0;l.querySelector(".ad-form-header__preview img").src=s,l.querySelector(".ad-form__photo-container").innerHTML=i};m(),window.map={mapFilters:t,mapFeatures:o,pins:a,mapPins:r,adFormHeader:c,adFormElements:d,deactivateForms:m}})(),(()=>{const e={palace:"Дворец",flat:"Квартира",house:"Дом",bungalow:"Бунгало"},t=document.querySelector("#card").content.querySelector(".popup"),o=window.utils.removeChildrenNode,r=document.querySelector(".map__filters-container"),n=document.querySelector(".map"),a=r=>{const n=t.cloneNode(!0),a=n.querySelector(".popup__title");r.offer.title?a.textContent=r.offer.title:a.remove();const l=n.querySelector(".popup__text--address");r.offer.address?l.textContent=r.offer.address:l.remove();const c=n.querySelector(".popup__text--price");r.offer.price?c.textContent=r.offer.price+"₽/ночь":c.remove();const d=n.querySelector(".popup__type");r.offer.type?d.textContent=e[r.offer.type]:d.remove();const s=n.querySelector(".popup__text--capacity");r.offer.rooms&&r.offer.guests?s.textContent=`${r.offer.rooms} комнаты для ${r.offer.guests} гостей`:s.remove();const i=n.querySelector(".popup__text--time");r.offer.checkin&&r.offer.checkout?i.textContent=`Заезд после ${r.offer.checkin} выезд до ${r.offer.checkout}`:i.remove();const u=n.querySelector(".popup__features"),m=n.querySelector(".popup__feature");if(r.offer.features&&r.offer.features.length>0){o(u);for(let e=0;e<r.offer.features.length;e++){const t=m.cloneNode(!0);t.className="popup__feature popup__feature--"+r.offer.features[e],u.appendChild(t)}}else u.remove();const p=n.querySelector(".popup__description");r.offer.description?p.textContent=r.offer.description:p.remove();const f=n.querySelector(".popup__photos"),y=n.querySelector(".popup__photo");if(r.offer.photos&&r.offer.photos.length>0){o(f);for(let e=0;e<r.offer.photos.length;e++){const t=y.cloneNode(!0);t.src=""+r.offer.photos[e],f.appendChild(t)}}else f.remove();const v=n.querySelector(".popup__avatar");return r.author.avatar?v.src=r.author.avatar:v.remove(),n},l=()=>{d()},c=e=>{"Escape"===e.key&&d()},d=()=>{document.removeEventListener("keydown",c),document.querySelector(".popup__close").removeEventListener("click",l);const e=document.querySelector(".popup");e&&n.removeChild(e)};window.card={renderCard:a,showCardPopup:e=>{const t=a(e);document.querySelector(".popup")&&d(),n.insertBefore(t,r),t.querySelector(".popup__close").addEventListener("click",l),document.addEventListener("keydown",c)},closeCardPopup:d,onBtnCloseCardClick:l,onCardPopupKeydown:c}})(),window.debounce=e=>{let t=null;return(...o)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),500)}},(()=>{const e=document.querySelector("#pin").content.querySelector("button"),t=document.querySelector(".map__pin--main"),o=document.querySelector("#address"),r=window.utils.removeChildrenNode,n=window.map.mapFilters,a=window.map.mapFeatures,l=window.map.adFormHeader,c=window.map.adFormElements,d=window.card.showCardPopup,s=document.querySelector(".map__pins"),i=document.querySelector(".map__overlay").offsetWidth-20,u=(e,t)=>{const o=parseInt(e.style.left,10),r=parseInt(e.style.top,10),n=e.offsetWidth,a=e.offsetHeight;t.value=`${Math.round(o+n/2)}, ${Math.round(r+a/2)}`};u(t,o);const m=t=>{let o=e.cloneNode(!0),r=o.querySelector("img");return r.src=t.author.avatar,r.alt=t.offer.title,o.style.left=t.location.x-o.offsetWidth/2+"px",o.style.top=t.location.y-o.offsetHeight+"px",o},p=()=>{t.style.transform="translateY(-100%)",document.querySelector(".map").classList.remove("map--faded"),a.disabled=!1;for(let e of n)e.disabled=!1;document.querySelector(".ad-form").classList.remove("ad-form--disabled"),l.disabled=!1;for(let e of c)e.disabled=!1;const e=document.createDocumentFragment();window.network.upload((o=>{let n=o,a=window.filter.filterAllOptions(n);a=a.slice(0,5),o=a;for(let t=0;t<o.length;t++){const r=o[t];if(r.offer){const t=m(r);e.appendChild(t),t.addEventListener("click",(()=>{d(r)}))}}r(s,t),s.appendChild(e)}),(e=>{const t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: rgba(240, 0, 0, 0.3);",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.color="white",t.style.fontSize="20px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)}))},f=e=>{if(0===e.button){let r={x:e.clientX,y:e.clientY};const n=e=>{let o=r.x-e.clientX,n=r.y-e.clientY;r={x:e.clientX,y:e.clientY};let a=t.offsetTop-n,l=t.offsetLeft-o;a<130&&(a=130),a>630&&(a=630),l<0&&(l=0),l>i&&(l=i),t.style.top=a+"px",t.style.left=l+"px"},a=()=>{p(),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",a),u(t,o)};document.addEventListener("mousemove",n),document.addEventListener("mouseup",a)}},y=e=>{"Enter"===e.key&&(p(),t.removeEventListener("mousedown",f),t.removeEventListener("keydown",y))};t.addEventListener("mousedown",f),t.addEventListener("keydown",y),window.pin={templatePin:e,mainPin:t,renderPin:m,activateForms:p,onFormsActivateMousedown:f,onFormsActivateKeydown:y,removePins:(e,t)=>{r(e,t)}}})(),(()=>{const e=window.pin.activateForms,t=window.card.closeCardPopup,o=document.querySelector("#housing-type"),r=document.querySelector("#housing-price"),n=document.querySelector("#housing-rooms"),a=document.querySelector("#housing-guests"),l=document.querySelector("#filter-wifi"),c=document.querySelector("#filter-dishwasher"),d=document.querySelector("#filter-parking"),s=document.querySelector("#filter-washer"),i=document.querySelector("#filter-elevator"),u=document.querySelector("#filter-conditioner"),m=()=>{window.debounce(e)(),document.querySelector(".map__card")&&t()};o.addEventListener("change",m),r.addEventListener("change",m),n.addEventListener("change",m),a.addEventListener("change",m),l.addEventListener("change",m),c.addEventListener("change",m),d.addEventListener("change",m),s.addEventListener("change",m),i.addEventListener("change",m),u.addEventListener("change",m)})(),(()=>{const e=document.querySelector(".ad-form"),t=e.querySelector("#type"),o=e.querySelector("#price"),r=e.querySelector("#timein"),n=e.querySelector("#timeout"),a=e.querySelector("#room_number"),l=e.querySelector("#capacity").querySelectorAll("option"),c=e.querySelector(".ad-form__reset"),d=document.querySelector(".map__pins"),s=d.querySelector(".map__pin--main"),i=document.querySelector(".map__filters"),u="0",m="1000",p="5000",f="10000",y=()=>{switch(t.value){case"bungalow":o.min=u,o.placeholder=u;break;case"flat":o.min=m,o.placeholder=m;break;case"house":o.min=p,o.placeholder=p;break;case"palace":o.min=f,o.placeholder=f}},v=()=>{y()};t.addEventListener("change",v);const h=()=>{"12:00"===r.value?n.value="12:00":"13:00"===r.value?n.value="13:00":"14:00"===r.value&&(n.value="14:00")},w=()=>{"12:00"===n.value?r.value="12:00":"13:00"===n.value?r.value="13:00":"14:00"===n.value&&(r.value="14:00")},q=()=>{h()},S=()=>{w()};r.addEventListener("change",q),n.addEventListener("change",S);const _=()=>{for(let e of l)e.disabled=!1;let e;if("1"===a.value){for(let t of l)"1"!==t.value?(t.disabled=!0,t.selected=!1):e=t;e.selected=!0}else if("2"===a.value){for(let t of l)"1"!==t.value&&"2"!==t.value?t.disabled=!0:e=t;e.selected=!0}else if("3"===a.value){for(let t of l)"1"!==t.value&&"2"!==t.value&&"3"!==t.value?t.disabled=!0:e=t;e.selected=!0}else if("100"===a.value){for(let t of l)"0"!==t.value?t.disabled=!0:e=t;e.selected=!0}},g=()=>{_()};a.addEventListener("change",g);const L=()=>{y(),h(),w(),_()};L(),e.addEventListener("submit",(t=>{window.network.save(new FormData(e),E,k),t.preventDefault()}));const E=()=>{const t=document.querySelector("#success").content,o=document.querySelector("main"),r=t.cloneNode(!0);o.appendChild(r);const n=document.querySelector(".success"),a=()=>{n.remove(),e.reset(),window.map.deactivateForms(),window.pin.removePins(d,s),L(),n.removeEventListener("click",a)},l=e=>{"Escape"===e.key&&(n.remove(),document.removeEventListener("keydown",l))};n.addEventListener("click",a),document.addEventListener("keydown",l)},k=()=>{const e=document.querySelector("#error").content,t=document.querySelector("main"),o=e.cloneNode(!0);t.appendChild(o);const r=document.querySelector(".error"),n=r.querySelector(".error__button"),a=()=>{r.remove(),r.removeEventListener("click",a)},l=e=>{"Escape"===e&&(r.remove(),r.removeEventListener("keydown",l))};r.addEventListener("click",a),r.addEventListener("keydown",l),n.addEventListener("click",a)};c.addEventListener("click",(()=>{window.map.deactivateForms(),window.utils.removeChildrenNode(d,s),e.reset(),i.reset(),e.querySelector("#images").addEventListener("change",window.photo.onImagesChooserClick)})),window.form={setTypeApartment:y,onTypeApartmentChange:v,setTimeInApartment:h,setTimeOutApartment:w,onTimeInApartmentChange:q,onTimeOutApartmentChange:S,setRoomsApartment:_,onRoomsApartmentChange:g}})(),(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector("#avatar"),o=document.querySelector(".ad-form-header__preview img"),r=document.querySelector("#images"),n=document.querySelector(".ad-form__photo"),a=document.querySelector(".ad-form__photo-container"),l=document.querySelector(".ad-form__upload");t.addEventListener("change",(()=>{const r=t.files[0],n=r.name.toLowerCase();if(e.some((e=>n.endsWith(e)))){let e=new FileReader;e.addEventListener("load",(()=>{o.src=e.result})),e.readAsDataURL(r)}}));const c=()=>{const t=r.files;window.utils.removeChildrenNode(a,l);for(let o of t){const t=o.name.toLowerCase();if(e.some((e=>t.endsWith(e)))){const e=new FileReader;e.addEventListener("load",(()=>{const t=document.createElement("img"),o=n.cloneNode(!0);t.src=e.result,t.style.maxWidth="100%",t.style.height="auto",t.style.maxHeight="100%",t.style.display="block",t.style.margin="auto",o.style.display="flex",o.appendChild(t),a.appendChild(o)})),e.readAsDataURL(o)}}};r.addEventListener("change",c),window.photo={onImagesChooserClick:c}})()})();