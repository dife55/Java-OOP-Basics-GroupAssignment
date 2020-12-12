

// Scoping jquery:
(function($) {

  // ALL JAVASCRIPT CODE HERE

  // opening and closing navbar:
  $("#open-navbar").click(function() {
    $("#side-navbar").css("width", "500px");
    $(".container").addClass("blur");
    $(".navbar-wrapper").addClass("open");
  });

  $("#close-navbar").click(function() {
    $("#side-navbar").css("width", "0");
    $(".container").removeClass("blur");
    $(".navbar-wrapper").removeClass("open");
  });

  // event delegation, preventing redirecting to image, just open it in lightbox
  $(document).on('click', '[data-toggle="lightbox"]', function(e) {
    e.preventDefault();
    $(this).ekkoLightbox();
  });

  // testing querystring
  // -------------------
  // function getParameterByName(name, url = window.location.href) {
  //   name = name.replace(/[\[\]]/g, '\\$&');
  //   let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
  //       results = regex.exec(url);
  //   if (!results) return null;
  //   if (!results[2]) return '';
  //   return decodeURIComponent(results[2].replace(/\+/g, ' '));
  // }
  // console.log(getParameterByName("note-id"));


  // create note form:
  $("#create-note-form").submit(function(e) {

    // stop form from submitting.
    e.preventDefault();

    // handling the form data
    handleFormSubmit();
  });

  // update note form:
  $("#update-note-form").submit(function(e) {

    // stop form from submitting.
    e.preventDefault();

    // handling the form data
    handleFormSubmit();
  })

  const handleFormSubmit = async () => {
    // getting file
    let $fileArray = $("#note-file").prop('files');
    let formData = new FormData();

    // adding the file to formData
    for(let file of $fileArray) {
      formData.append('files', file, file.name);
    }

    // sending post request to endpoint for storing the file
    let uploadResult = await fetch('/api/file-upload', {
      method: 'POST',
      body: formData
    });

    // get path
    let fileUrl = await uploadResult.text();

    console.log(fileUrl);

    // await fetch('/');

    // getting values from form:
    // console.log($("#note-title").val());
    // console.log($("#note-text").val());
    // console.log($("#note-end").val());
    // console.log($("#note-category").val());
  }





  // Async functions for PathEndpoints

  async function getPathsFromDb(){

    let result = await fetch("/rest/paths");
    let paths = await result.json();
    console.log(paths);

  }

  async function createPathInDb(path){

    let result = await fetch("/rest/paths", {
        method: "POST",
        body: JSON.stringify(path)
    });

    console.log(await result.text());
  }

  async function deletePathInDb(path){

    let result = await fetch("/rest/paths/id", {
        method: "DELETE",
        body: JSON.stringify(path)
    });


    console.log(await result.text());

  }

  // la till en get all notes function för att spara i en array for att delete ska funka, kan ha fel!
  let notes = [];

  async function getAllNotes(){
    let result = await fetch("/rest/notes");
    notes = await result.json();
  }

  async function getNote(){
    let result = await fetch("/rest/notes/id");
    notes = await result.json();
  }

  $("#deleteNoteByIdButton").click(function() {
    deleteNoteById();

  });

  async function deleteNoteById(id){
    let result = await fetch("/rest/notes/id", {
      method: "DELETE",
      body: JSON.stringify(id)
    });

  }
})(jQuery);
