var api_clazz = api + "/clazzes"

var edit_clazz_template = Handlebars.compile(`
<div class="row">
    <div class="col-12 mt-5">
        <div class="card">
            <div class="card-body">
                <h4 class="header-title">{{#unless .}}Новая{{/unless}} группа</h4>
                <form id="clazz_form">
                <input type="hidden" name="id" value="{{id}}">
                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <label>Название</label>
                            <input type="text" class="form-control" name="name" value="{{name}}">
                        </div>
                    </div>
                </div>
                    <button type="button" class="btn btn-primary mt-4 pr-4 pl-4" onclick="javascript: save_clazz()">Сохранить</button>
                    <button type="button" class="btn btn-primary mt-4 pr-4 pl-4" onclick="javascript: history.back()">Отмена</button>
                    <button type="button" class="btn btn-danger mt-4 pr-4 pl-4" onclick="javascript: remove_clazz('{{id}}')">Удалить</button>
                </form>
            </div>
        <div>
    <div>
</div>
`);

var show_clazz_template = Handlebars.compile(`
<div class="row">
    <div class="col-12 mt-5">
        <div class="card">
            <div class="card-body">
                <h4 class="header-title">Группы</h4>
                <table class="table text-center table-bordered" id="main-content-table">
                    <thead class="bg-primary">
                    <tr class="text-white">
                        <th scope="col">ID</th>
                        <th scope="col">Название</th>
                    </tr>
                    </thead>
                    <tbody>
                        {{#each _embedded.clazzes}}
                        <tr onclick="edit_clazz('{{id}}')" onmouseover='this.className = "table-primary"' onmouseout='this.className = ""' style="cursor: pointer">
                            <td>{{id}}</td>
                            <td>{{name}}</td>
                        </tr>
                        {{/each}}
                    </tbody>
                </table>
                <div class="row">
                    <div class="col-sm-12 col-md-7">
                        <button type="button" class="btn btn-primary mb-3" onclick="add_clazz()">Добавить группу</button>
                    </div>
                    <div class="col-sm-12 col-md-5">
                        <ul class="pagination">
                            <li class="paginate_button page-item previous {{#unless page.previousActive}}disabled{{/unless}}" id="dataTable_previous"><a href="javascript: show_clazz({{page.previous}})" aria-controls="dataTable" data-dt-idx="0" tabindex="0" class="page-link">Предыдущая</a></li>
                            <li class="paginate_button page-item disabled"><a href="#" aria-controls="dataTable" data-dt-idx="2" tabindex="0" class="page-link">{{page.numberPlusOne}} из {{page.totalPages}}</a></li>
                            <li class="paginate_button page-item next {{#unless page.nextActive}}disabled{{/unless}}" id="dataTable_next"><a href="javascript: show_clazz({{page.next}})" aria-controls="dataTable" data-dt-idx="3" tabindex="0" class="page-link">Следующая</a></li>
                         </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

`);



function show_clazz(page) {
     history.pushState('', '',  "?f=show_clazz&page=" + page);

    _show_clazz(page);
}

function _show_clazz(page) {
     $.ajax({url: api_clazz +"?page="+page, success: function(result){

        result.page.numberPlusOne = result.page.number + 1;
        result.page.previousActive = result.page.number > 0;
        result.page.previous = result.page.previousActive ? result.page.number - 1 : 0;
        result.page.nextActive = result.page.number + 1 < result.page.totalPages;
        result.page.next = result.page.number + 1;

        var html = show_clazz_template(result);
        $(main_content_inner_key).html(html);
      }, error: function(result) {
         error_modal(result.responseJSON.message);
      }});
}

function edit_clazz(id) {
    history.pushState('', '',  "?f=edit_clazz&id=" + id);

    _edit_clazz(id);
}

function _edit_clazz(id) {
     $.ajax({url: api_clazz + "/" + id, success: function(result){

        var html = edit_clazz_template(result);
        $(main_content_inner_key).html(html);
     }});
}

function add_clazz() {
    history.pushState('', '',  "?f=add_clazz");

    _add_clazz();
}

function _add_clazz() {
    var html = edit_clazz_template();
    $(main_content_inner_key).html(html);
}

function save_clazz() {
    var json = $("form#clazz_form").serializeJSON();

    json.active = json.active == "on" ? "true" : "false";
    json = JSON.stringify(json);

    $.ajax({url: api_clazz, type: "POST", data: json, contentType: "application/json",
        success: function(result){
            success_modal("Группа сохранена", function() {
                show_clazz(0)
            });
        },
        error: function(result) {
            error_modal(result.responseJSON.message);
        }
    });
}

function remove_clazz(id) {
    confirm_modal("Удалить группу ?", function() {
         $.ajax({url: api_clazz + "/" + id, type: "DELETE",
               success: function(result){
                    success_modal("Группа удалена", function() {
                        show_clazz(0)
                    });
                },
                error: function(result) {
                    error_modal(result.responseJSON.message);
                }
         });
    });
}
