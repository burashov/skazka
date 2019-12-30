var show_visits_template = Handlebars.compile(`
<div class="row">
    <div class="col-12 mt-5">
        <div class="card">
            <div class="card-body">
                <h4 class="header-title">Посещения</h4>
                <div class="row">
                    <div class="col-4">
                        <div class="form-group col-12">
                        <select>
                            <option></option>
                            {{#each _embedded.clazzes}}
                            <option>{{name}}</option>
                            {{/each}}
                         </select>
                        </div>
                    </div>
                    <div class="col-8">
                    <table class="table table-bordered text-center">
                    <thead class="text-uppercase">
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">date</th>
                    <th scope="col">price</th>
                    <th scope="col">action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>09 / 07 / 2018</td>
                    <td>$120</td>
                    <td><i class="ti-trash"></i></td>
                    </tr>
                    <tr>
                    <th scope="row">1</th>
                    <td>jone</td>
                    <td>09 / 07 / 2018</td>
                    <td>$150</td>
                    <td><i class="ti-trash"></i></td>
                    </tr>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>09 / 07 / 2018</td>
                    <td>$120</td>
                    <td><i class="ti-trash"></i></td>
                    </tr>
                    <tr>
                    <th scope="row">1</th>
                    <td>jone</td>
                    <td>09 / 07 / 2018</td>
                    <td>$150</td>
                    <td><i class="ti-trash"></i></td>
                    </tr>
                    </tbody>
                    </table>
                                        </div>
                </div>

            </div>
        <div>
    <div>
</div>
`);

function show_visits() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;




}

function _show_visits(client, year, month) {
  //   history.pushState('', '',  "?f=show_visits&client=" + client + "&year" + year + "&month" + month);


   var date = new Date(year, month, 0);
   var daysInMonth = date.getDate();

   for(var i = 1; i<=daysInMonth; i++) {
   }



   $.ajax({url: api_clazz, success: function(result){

      var html = show_visits_template(result);
      $(main_content_inner_key).html(html);
    }, error: function(result) {
       error_modal(result.responseJSON.message);
    }});
}