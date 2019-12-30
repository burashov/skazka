var api_clients = api + "/clients"

var edit_client_template = Handlebars.compile(`
<div class="row">
    <div class="col-12 mt-5">
        <div class="card">
            <div class="card-body">
                <h4 class="header-title">{{#unless client}}Новый{{/unless}} клиент</h4>
                <form id="client_form">
                <input type="hidden" name="client.id" value="{{client.id}}">
                <div class="row">
                    {{#with client}}
                    <div class="col-4">
                        <div class="form-group">
                            <label>Фамилия</label>
                            <input type="text" class="form-control" name="client.surname" value="{{surname}}">
                        </div>
                        <div class="form-group">
                            <label>Имя</label>
                            <input type="text" class="form-control" name="client.name" value="{{name}}">
                        </div>
                        <div class="form-group">
                            <label>Отчество</label>
                            <input type="text" class="form-control" name="client.patronymic" value="{{patronymic}}">
                        </div>
                        <div class="form-group">
                            <label>Дата рождения</label>
                            <input type="text" class="form-control" name="client.birthday" value="{{birthday}}">
                        </div>
                        <div class="form-group">
                            <label>Пол</label>
                            <select class="form-control" name="client.sex">
                                <option value="" {{#if noneSelected}}selected{{/if}}></option>
                                <option value="MALE" {{#if maleSelected}}selected{{/if}}>Мужской</option>
                                <option value="FEMALE" {{#if femaleSelected}}selected{{/if}}>Женский</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email</label>
                            <input type="email" class="form-control" name="client.email" placeholder="Введите email" value="{{email}}">
                        </div>
                        <div class="form-group">
                            <label>Мобильный 1</label>
                            <input type="text" class="form-control" name="client.mobile1" placeholder="Введите телефон" value="{{mobile1}}">
                        </div>
                        <div class="form-group">
                             <label>Мобильный 2</label>
                             <input type="text" class="form-control" name="client.mobile2" placeholder="Введите телефон" value="{{mobile2}}">
                         </div>
                    </div>
                    <div class="col-4">
                        <div class="form-group">
                            <label>Фамилия родителя</label>
                            <input type="text" class="form-control" name="client.parentSurname" value="{{parentSurname}}">
                        </div>
                        <div class="form-group">
                            <label>Имя родителя</label>
                            <input type="text" class="form-control" name="client.parentName" value="{{parentName}}">
                        </div>
                        <div class="form-group">
                            <label>Отчество родителя</label>
                            <input type="text" class="form-control" name="client.parentPatronymic" value="{{parentPatronymic}}">
                        </div>
                        <div class="custom-control custom-checkbox custom-control-inline">
                            <input type="checkbox" class="custom-control-input" id="activeCheck" name="client.active" {{#if active}}checked{{/if}}>
                            <label class="custom-control-label" for="activeCheck">Активный</label>
                        </div>
                        <label class="text-muted mb-3 mt-4 d-block">Источник:</label>
                        <div class="custom-control custom-checkbox custom-control-inline">
                            <input type="checkbox" class="custom-control-input" id="customCheck1">
                            <label class="custom-control-label" for="customCheck1">Интернет</label>
                        </div>
                        <div class="custom-control custom-checkbox custom-control-inline">
                            <input type="checkbox" class="custom-control-input" id="customCheck2">
                            <label class="custom-control-label" for="customCheck2">Друзья</label>
                        </div>
                        <div class="custom-control custom-checkbox custom-control-inline">
                            <input type="checkbox" class="custom-control-input" id="customCheck3">
                            <label class="custom-control-label" for="customCheck3">vk.com</label>
                        </div>
                        <div class="form-group">
                            <br/>
                            <label>Примечание</label>
                            <textarea class="form-control" name="client.notes" rows="10">{{notes}}</textarea>
                        </div>
                    </div>
                    {{/with}}
                    <div class="col-4">
                       <div class="form-group">
                            <label>Группы</label>
                            {{#each clazzes}}
                                <div class="form-check">
                                    <input type="hidden" name="clazzes[{{@index}}].clazz.id" value="{{clazz.id}}">
                                    <input type="checkbox" class="form-check-input" {{#if hasClazz}}checked{{/if}} name="clazzes[{{@index}}].hasClazz">
                                    <label>{{clazz.name}}</label>
                                </div>
                            {{/each}}
                        </div>
                     </div>
                </div>
                    <button type="button" class="btn btn-primary mt-4 pr-4 pl-4" onclick="javascript: save_client()">Сохранить</button>
                    <button type="button" class="btn btn-primary mt-4 pr-4 pl-4" onclick="javascript: history.back()">Отмена</button>
                    <button type="button" class="btn btn-danger mt-4 pr-4 pl-4" onclick="javascript: remove_client('{{client.id}}')">Удалить</button>
                </form>
            </div>
        <div>
    <div>
</div>
`);

var show_clients_template = Handlebars.compile(`
<div class="row">
    <div class="col-12 mt-5">
        <div class="card">
            <div class="card-body">
                <h4 class="header-title">Клиенты</h4>
                <table class="table text-center table-bordered" id="main-content-table">
                    <thead class="bg-primary">
                    <tr class="text-white">
                        <th scope="col">ID</th>
                        <th scope="col">Клиент</th>
                        <th scope="col">Телефон</th>
                        <th scope="col">Email</th>
                        <th scope="col">Статус</th>
                        <th scope="col">Заметки</th>
                    </tr>
                    </thead>
                    <tbody>
                        {{#each _embedded.clients}}
                        <tr onclick="edit_client('{{id}}')" onmouseover='this.className = "table-primary"' onmouseout='this.className = ""' style="cursor: pointer">
                            <td>{{id}}</td>
                            <td>{{surname}} {{name}} {{patronymic}}</td>
                            <td>{{mobile1}}</td>
                            <td>{{email}}</td>
                            <td>{{#if active}}Активный{{/if}}</td>
                            <td>{{notes}}</td>
                        </tr>
                        {{/each}}
                    </tbody>
                </table>
                <div class="row">
                    <div class="col-sm-12 col-md-7">
                        <button type="button" class="btn btn-primary mb-3" onclick="add_client()">Добавить клиента</button>
                    </div>
                    <div class="col-sm-12 col-md-5">
                        <ul class="pagination">
                            <li class="paginate_button page-item previous {{#unless page.previousActive}}disabled{{/unless}}" id="dataTable_previous"><a href="javascript: show_clients({{page.previous}})" aria-controls="dataTable" data-dt-idx="0" tabindex="0" class="page-link">Предыдущая</a></li>
                            <li class="paginate_button page-item disabled"><a href="#" aria-controls="dataTable" data-dt-idx="2" tabindex="0" class="page-link">{{page.numberPlusOne}} из {{page.totalPages}}</a></li>
                            <li class="paginate_button page-item next {{#unless page.nextActive}}disabled{{/unless}}" id="dataTable_next"><a href="javascript: show_clients({{page.next}})" aria-controls="dataTable" data-dt-idx="3" tabindex="0" class="page-link">Следующая</a></li>
                         </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

`);



function show_clients(page) {
     history.pushState('', '',  "?f=show_clients&page=" + page);

    _show_clients(page);
}

function _show_clients(page) {
     $.ajax({url: api_clients +"?page="+page, success: function(result){

        result.page.numberPlusOne = result.page.number + 1;
        result.page.previousActive = result.page.number > 0;
        result.page.previous = result.page.previousActive ? result.page.number - 1 : 0;
        result.page.nextActive = result.page.number + 1 < result.page.totalPages;
        result.page.next = result.page.number + 1;

        var html = show_clients_template(result);
        $(main_content_inner_key).html(html);
      }});
}

function edit_client(id) {
    history.pushState('', '',  "?f=edit_client&id=" + id);

    _edit_client(id);
}

function _edit_client(id) {
     $.ajax({url: api_clients + "/" + id + "/withClasses", success: function(result){
        result.client.maleSelected = result.client.sex == "MALE";
        result.client.femaleSelected = result.client.sex == "FEMALE";
        result.client.noneSelected = result.client.sex == null;

        var html = edit_client_template(result);
        $(main_content_inner_key).html(html);
     }});
}

function add_client() {
    history.pushState('', '',  "?f=add_client");

    _add_client();
}

function _add_client() {
    var html = edit_client_template();
    $(main_content_inner_key).html(html);
}

function save_client() {
    var json = $("form#client_form").serializeObject();

    json.active = json.active == "on" ? "true" : "false";
    json = JSON.stringify(json);

    $.ajax({url: api_clients + "/withClazzes", type: "POST", data: json, contentType: "application/json",
        success: function(result){
            success_modal("Клиент сохранен", function() {
                show_clients(0)
            });
        },
        error: function(result) {
            error_modal(result.responseJSON.message);
        }
    });
}

function remove_client(id) {
    confirm_modal("Удалить клиента ?", function() {
         $.ajax({url: api_clients + "/" + id, type: "DELETE",
               success: function(result){
                    success_modal("Клиент удален", function() {
                        show_clients(0)
                    });
                },
                error: function(result) {
                    error_modal(result.responseJSON.message);
                }
         });
    });
}
