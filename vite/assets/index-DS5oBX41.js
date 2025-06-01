(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();class h{async get(t){try{const e=await fetch(t);if(!e.ok)throw new Error(`Ошибка GET-запроса: ${e.status}`);return await e.json()}catch(e){throw console.error("Ошибка сети или сервера:",e),e}}async post(t,e){try{const i=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!i.ok)throw new Error(`Ошибка POST-запроса: ${i.status}`);return await i.json()}catch(i){throw console.error("Ошибка отправки данных:",i),i}}async put(t,e){try{const i=await fetch(t,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!i.ok)throw new Error(`Ошибка PUT-запроса: ${i.status}`);return await i.json()}catch(i){throw console.error("Ошибка редактирования:",i),i}}async delete(t){try{const e=await fetch(t,{method:"DELETE"});if(!e.ok)throw new Error(`Ошибка DELETE-запроса: ${e.status}`);return await e.json()}catch(e){throw console.error("Ошибка удаления:",e),e}}}const n=new h;class p{constructor(){this.baseUrl="http://localhost:3000"}getStocks(){return`${this.baseUrl}/stocks`}getStockById(t){return`${this.baseUrl}/stocks/${t}`}createStock(){return`${this.baseUrl}/stocks`}removeStockById(t){return`${this.baseUrl}/stocks/${t}`}updateStockById(t){return`${this.baseUrl}/stocks/${t}`}replaceStockById(t){return`${this.baseUrl}/stocks/${t}`}}const c=new p;class d{constructor(t){this.parent=t}getHTML(t){return`
            <div class="card" style="width: 300px;">
                <div class="image-container" style="width: 100%; height: 200px; overflow: hidden;">
                    <img class="card-img-top" src="${t.src}" alt="картинка" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${t.title}</h5>
                    <p class="card-text">${t.text}</p>
                    <button class="btn btn-primary" id="click-card-${t.id}" data-id="${t.id}">Узнать больше...</button>
                    <div class="d-flex justify-content-between mt-2">
                        <div class="d-flex align-items-center">
                            <i class="bi bi-hand-thumbs-up-fill text-success me-1"></i>
                            <span id="like-counter-${t.id}">${t.likes}</span>
                        </div>
                        <div class="d-flex align-items-center">
                            <i class="bi bi-hand-thumbs-down-fill text-danger me-1"></i>
                            <span id="dislike-counter-${t.id}">${t.dislikes}</span>
                        </div>
                    </div>
                </div>
            </div>
        `}addListeners(t,e){const i=this.parent.querySelector(`#click-card-${t.id}`);i?i.addEventListener("click",e):console.error(`Кнопка click-card-${t.id} не найдена`)}render(t,e){const i=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",i),this.addListeners(t,e)}}class u{constructor(t,e={}){this.parent=t,this.options=e}getHTML(){return`
            <div aria-live="polite" aria-atomic="true" class="position-fixed bottom-0 end-0 p-3">
                <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header bg-info text-white">
                        <strong class="me-auto">${this.options.title}</strong>
                        <small class="text-muted">${this.options.time}</small>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Закрыть"></button>
                    </div>
                    <div class="toast-body">
                        ${this.options.message||"Сообщение отсутствует."}
                    </div>
                </div>
            </div>
        `}render(){const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t);const e=this.parent.querySelector(".toast");new bootstrap.Toast(e,{autohide:this.options.autohide,delay:this.options.delay}).show()}}class m{constructor(t,e=[]){this.parent=t,this.items=e}getHTML(){return`
            <div class="accordion accordion-flush" id="accordionExample">
                ${this.items.map((t,e)=>`
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading${e}">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${e}" aria-expanded="false" aria-controls="collapse${e}">
                                ${t.title}
                            </button>
                        </h2>
                        <div id="collapse${e}" class="accordion-collapse collapse" aria-labelledby="heading${e}" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                ${t.content}
                            </div>
                        </div>
                    </div>
                `).join("")}
            </div>
        `}render(){const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t)}}class g{constructor(t){this.parent=t}getHTML(t,e){return`
            <div class="card mb-3 w-100 h-100">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${t.src}" class="img-fluid" alt="картинка">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${t.title}</h5>
                            <p class="card-text">${t.text}</p>
                            ${e.getHTML()}
                        </div>
                    </div>
                </div>
            </div>
        `}render(t,e){let i;t.title==="Ориентал"?i=[{title:"Особенности характера",content:`
                    <ul>
                        <li>Веселый игривый характер.</li>
                        <li>Необычайная привязанность к своему хозяину.</li>
                        <li>Любопытство: ни одно событие в доме не обойдется без их активного участия.</li>
                        <li>Ориенталы прекрасно уживаются с детьми и никогда не позволяют себе выпустить коготки даже, если их излишне тискают и теребят за хвост.</li>
                        <li>Дружат с другими домашними животными, вовлекая их в свои активные игры.</li>
                        <li>За недостаток любви и внимания ориенталы могут мстить: раскачиваться на шторах, точить когти об мебель или демонстративно игнорировать хозяина.</li>
                    </ul>
                `},{title:"Особенности ухода",content:`<ul>
                        <li>Регулярно очищайте шерсть от отмерших волосков влажной перчаткой или резиновой щеткой.</li>
                        <li>Подстригайте отросшие коготки.</li>
                        <li>Чистите ушные раковины.</li>
                        <li>Купите когтеточку, чтобы питомец не точил когти об мебель.</li>
                        <li>Подготовьте спальное место, подальше от сквозняков.</li>
                        <li>Не кормите кошку свининой и жирными сортами рыбы, избегайте сырого мяса.</li>
                    </ul>`}]:t.title==="Абиссин"?i=[{title:"Особенности породы",content:`
                    <ul>
                        <li>Шерсть мягкая и шелковистая, с блестящим отливом.</li>
                        <li>Тело среднего размера и длины, с развитой мускулатурой, очень гибкое.</li>
                        <li>Уши крупные, широко расставлены, имеют небольшой наклон вперед и немного закруглены на концах.</li>
                        <li>Глаза большие и выразительные, миндалевидной формы.</li>
                        <li>Ноги длинные и тонкие.</li>
                        <li>Хвост длинный, у основания толстый, к концу сужается.</li>
                    </ul>
                `},{title:"Особенности ухода",content:`<ul>
                        <li>Шерсть. Расчёсывайте кошку 1 раз в неделю металлической щёткой, а во время линьки купайте, но не чаще 1 раза в 2 недели.</li>
                        <li>Уши. Чистите уши ватными дисками по мере их загрязнения. Очищайте только ушные раковины без проникновения в слуховой проход.</li>
                        <li>Глаза. Не спешите протирать кошке глаза. Пусть она учится умываться самостоятельно.</li>
                        <li>Зубы. Очищайте кошке зубы хотя бы 1 раз в неделю с помощью щётки, ватной палочки.</li>
                        <li>Когти. Подстригайте кончики когтей 1 раз в 2 недели, если она не выходит из дома. Поставьте в доме когтеточку, чтобы кошка самостоятельно стачивала когти.</li>
                        <li>Вакцинация. Проводите своевременную дегельминтизацию и прививки.</li>
                    </ul>`}]:i=[{title:"Возможные заболевания",content:`
                    <ul>
                        <li>Ген сложенных ушей. Он не доминантный, то есть проявляется не у всех особей. При грамотном уходе инфекции ушей, глухота и другие проблемы возникают редко.</li>
                        <li>Поликистоз почек. </li>
                        <li>Дефекты скелета. Они во многом связаны с проявлениями гена сложенных ушей. К ним относят утолщенный, короткий и не гибкий хвост, растопыренные пальцы, грубые кости лап.</li>
                    </ul>
                `},{title:"Особенности ухода",content:`<ul>
                        <li>Предоставьте качественный кошачий корм, соответствующий возрасту и активности кошки. Следите за рационом и не перекармливайте, чтобы избежать ожирения.</li>
                        <li>Уделяйте внимание гигиеническому уходу в зоне ушей.</li>
                        <li>Предоставьте чистый лоток для кошачьего туалета и регулярно его чистите.</li>
                        <li>Обеспечьте физическую активность. Предоставьте игрушки и выделите время для развлечения.</li>
                        <li>Регулярно проводите визиты к ветеринару для проверок здоровья и вакцинации. Обеспечьте профилактику от блох, глистов и других паразитов.</li>
                        <li>Вакцинация. Проводите своевременную дегельминтизацию и прививки.</li>
                    </ul>`}];const r=new m(this.parent,i),s=this.getHTML(t,r);this.parent.insertAdjacentHTML("beforeend",s);const o={title:"Интересный факт",message:"Ваш интересный факт здесь.",time:"сейчас",autohide:!0,delay:5e3};new u(this.parent,o).render()}}class b{constructor(t){this.parent=t}addListeners(t){document.getElementById("back-button").addEventListener("click",t)}getHTML(){return`
            <button id="back-button" class="btn btn-primary" type="button">Назад</button>
        `}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class f{constructor(t,e,i){this.parent=t,this.stockId=e,this.initialData=i}render(){this.parent.innerHTML=`
            <form class="edit-form">
                <div class="form-group">
                    <label>Название:</label>
                    <input type="text" name="title" value="${this.initialData.title}">
                </div>
                <div class="form-group">
                    <label>Описание:</label>
                    <input type="text" name="text" value="${this.initialData.text}">
                </div>
                <div class="form-group">
                    <label>URL изображения:</label>
                    <input type="text" name="src" value="${this.initialData.src}">
                </div>
                <button type="submit" class="save-btn">Сохранить изменения</button>
            </form>
        `,this.parent.querySelector("form").addEventListener("submit",this.handleSubmit.bind(this))}handleSubmit(t){t.preventDefault();const e={title:t.target.title.value,text:t.target.text.value,src:t.target.src.value};n.put(c.replaceStockById(this.stockId),e,(i,r)=>{alert(r===200?"Данные успешно обновлены!":"Ошибка при обновлении данных")})}}class v{constructor(t,e,i){this.parent=t,this.id=e,this.mainPage=i,this.isEditing=!1,this.pageRoot=null}async getData(){try{const t=await n.get(c.getStockById(this.id));this.renderData(t)}catch(t){console.error("Ошибка загрузки карточки:",t)}}async handleDelete(){if(confirm("Вы уверены, что хотите удалить эту карточку?"))try{await n.delete(c.removeStockById(this.id)),alert("Карточка успешно удалена"),this.mainPage.getData(),this.clickBack()}catch(t){console.error("Ошибка при удалении карточки:",t),alert("Ошибка при удалении карточки")}}clickBack(){this.mainPage.render()}toggleEditMode(){if(this.isEditing=!this.isEditing,this.isEditing)this.renderEditForm();else{const t=this.pageRoot.querySelector(".edit-form-container");t&&t.remove()}}renderEditForm(){const t=document.createElement("div");t.className="edit-form-container",this.pageRoot.appendChild(t),new f(t,this.id,this.productData,async e=>{try{const i=await n.put(c.replaceStockById(this.id),e);this.handleFormSubmit(i),this.toggleEditMode()}catch(i){alert("Ошибка при сохранении изменений"),console.error("Ошибка PUT-запроса:",i)}}).render()}handleFormSubmit(t){this.productData=t,this.renderData(t)}renderData(t){if(!this.pageRoot||!t)return;this.productData=t,this.pageRoot.innerHTML="";const e=document.createElement("div");this.pageRoot.appendChild(e),new g(e).render(t,this.mainPage);const r=document.createElement("button");r.textContent="Редактировать",r.className="edit-button",r.addEventListener("click",()=>this.toggleEditMode()),this.pageRoot.appendChild(r);const s=document.createElement("button");s.textContent="Удалить",s.className="delete-button btn btn-danger ms-3",s.addEventListener("click",()=>this.handleDelete()),this.pageRoot.appendChild(s),new b(this.pageRoot).render(this.clickBack.bind(this))}render(){this.parent.innerHTML="",this.pageRoot=document.createElement("div"),this.parent.appendChild(this.pageRoot),this.getData()}}class y{constructor(t,e){this.parent=t,this.onCreate=e}render(){this.parent.innerHTML=`
            <form class="create-form">
                <h4>Добавить кошечку</h4>
                <div class="form-group">
                    <label for="title">Название:</label>
                    <input type="text" name="title" id="title" required />
                </div>
                <div class="form-group">
                    <label for="text">Описание:</label>
                    <input type="text" name="text" id="text" required />
                </div>
                <div class="form-group">
                    <label for="src">URL изображения:</label>
                    <input type="text" name="src" id="src" required />
                </div>
                <button type="submit" class="btn btn-success">Создать</button>
            </form>
        `,this.parent.querySelector(".create-form").addEventListener("submit",this.handleSubmit.bind(this))}handleSubmit(t){t.preventDefault();const e={title:t.target.title.value,text:t.target.text.value,src:t.target.src.value};n.post(c.createStock(),e,(i,r)=>{r===201?(alert("Карточка успешно создана!"),this.onCreate(i)):alert("Ошибка при создании карточки")})}}class w{constructor(t){this.parent=t,this.container=t,this.pageRoot=document.createElement("div"),this.pageRoot.className="main-page"}async render(){this.parent.innerHTML="",this.parent.appendChild(this.pageRoot),this.pageRoot.innerHTML=this.getHTML();try{const t=await n.get(c.getStocks());this.renderData(t)}catch(t){this.showError(`Не удалось загрузить данные: ${t.message}`)}}async renderData(t){if(!t||!Array.isArray(t)){console.error("Получены некорректные данные:",t),this.showError("Невозможно отобразить карточки");return}this.pageRoot.innerHTML="";const e=this.pageRoot.querySelector(".main-header");this.pageRoot.innerHTML="",e&&this.pageRoot.appendChild(e);const i=document.createElement("div");i.className="cards-container",i.style.display="flex",i.style.flexWrap="wrap",i.style.gap="20px",t.forEach(s=>{if(!s||!s.id){console.warn("Пропущен невалидный элемент:",s);return}try{const o=document.createElement("div");o.className="card-wrapper",new d(o).render(s,()=>this.clickCard(s.id)),i.appendChild(o)}catch(o){console.error("Ошибка рендеринга карточки:",o)}});const r=document.createElement("div");new y(r,async s=>{try{const o=document.createElement("div");new d(o).render(s,()=>this.clickCard(s.id)),i.appendChild(o)}catch(o){console.error("Ошибка при добавлении новой карточки:",o)}}).render(),this.pageRoot.prepend(r),this.pageRoot.appendChild(i)}clickCard(t){new v(this.container,t,this).render()}showError(t){const e=document.createElement("div");e.className="error-message",e.textContent=t,this.pageRoot.innerHTML="",this.pageRoot.appendChild(e)}getHTML(){return`
            <div class="main-header">
                <h1>Кошечки</h1>
            </div>
        `}}const E=document.getElementById("root"),k=new w(E);k.render();
